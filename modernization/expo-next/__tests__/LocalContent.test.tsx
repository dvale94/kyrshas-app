import { act, cleanup, render, screen, userEvent } from '@testing-library/react-native';
import { configure } from '@testing-library/react-native';
import { fetch as expoFetch } from 'expo/fetch';
import { HomeScreen } from '../src/home/HomeScreen';
import { createContentSource } from '../src/home/contentSource';
import { mockContentProvider, type CardId } from '../src/home/content';
import { createLocalApiNinjasProvider, type LocalResponse, type LocalTransport } from '../src/home/localApiNinjas';

jest.mock('expo/fetch', () => ({ fetch: jest.fn(() => { throw new Error('Real transport forbidden in tests'); }) }));
const KEY = 'synthetic-local-test-token';
const SAFE = 'Content unavailable. Please try again.';
const ids: CardId[] = ['quote', 'trivia', 'fact', 'dad joke', 'bucket list item'];
const payloads: Record<CardId, unknown> = {
  quote: [{ quote: 'Synthetic quote.', author: 'Fictional Author', image: 'https://example.invalid/ignored' }],
  trivia: [{ question: 'Synthetic question?', answer: 'Synthetic answer.' }],
  fact: [{ fact: 'Synthetic fact.' }],
  'dad joke': [{ joke: 'Synthetic joke.' }],
  'bucket list item': { item: 'Synthetic idea.' },
};
const routeId = (url: string): CardId => {
  if (url.includes('randomquotes')) return 'quote';
  if (url.includes('/trivia')) return 'trivia';
  if (url.includes('/facts')) return 'fact';
  if (url.includes('/dadjokes')) return 'dad joke';
  return 'bucket list item';
};
function response(url: string, payload: unknown = payloads[routeId(url)], overrides: Partial<LocalResponse> = {}): LocalResponse {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let consumed = false;
  return {
    status: 200, url, redirected: false,
    headers: { get: (name) => name === 'content-type' ? 'application/json; charset=utf-8' : null },
    body: { getReader: () => ({
      read: async () => consumed ? { done: true } : (consumed = true, { done: false, value: bytes }),
      cancel: async () => {},
    }) },
    ...overrides,
  };
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const goodTransport = () => jest.fn<ReturnType<LocalTransport>, Parameters<LocalTransport>>(async (url) => response(url));
const load = (provider: ReturnType<typeof createLocalApiNinjasProvider>, id: CardId = 'quote') => provider.load(id, { revision: 0 });
const dev = (value: boolean) => { (globalThis as unknown as { __DEV__: boolean }).__DEV__ = value; };
let network: jest.SpyInstance;
let xhr: jest.Mock;
const originalXhr = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
let logs: jest.SpyInstance[];
beforeEach(() => {
  configure({ defaultIncludeHiddenElements: true }); // Inspect retained offscreen data slots.
  dev(true);
  jest.useFakeTimers();
  network = jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network forbidden'));
  xhr = jest.fn(() => { throw new Error('XHR forbidden'); });
  Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: xhr });
  logs = ['log', 'warn', 'error'].map((method) => jest.spyOn(console, method as 'log').mockImplementation(() => {}));
});
afterEach(async () => {
  try {
    await cleanup();
    // React Native accessibility/act scheduling owns timers too; adapter deadlines
    // are checked separately below before UI cleanup.
    jest.clearAllTimers();
    expect(network).not.toHaveBeenCalled();
    expect(xhr).not.toHaveBeenCalled();
    expect(expoFetch).not.toHaveBeenCalled();
    for (const log of logs) expect(log).not.toHaveBeenCalled();
  } finally {
    dev(true);
    jest.restoreAllMocks();
    if (originalXhr) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXhr);
    else Reflect.deleteProperty(globalThis, 'XMLHttpRequest');
    jest.useRealTimers();
  }
});

test.each([
  {}, { mode: 'mock', key: KEY }, { mode: 'LIVE-LOCAL', key: KEY },
  { mode: 'live-local' }, { mode: 'live-local', key: '  ' },
  { mode: 'live-local', key: 'bad\r\nheader' }, { mode: 'live-local', key: 'x'.repeat(257) },
  { mode: 'live-local', key: 'REPLACE_WITH_NEW_LOCAL_KEY' },
])('selects network-free mock for absent/invalid settings %p', (settings) => {
  const transport = goodTransport();
  expect(createContentSource({ ...settings, transport })).toEqual({ provider: mockContentProvider, liveLocal: false });
  expect(transport).not.toHaveBeenCalled();
});

test('accepts header-safe synthetic punctuation without assuming a provider key alphabet', async () => {
  const transport = goodTransport();
  const key = 'synthetic/+key==.test';
  const source = createContentSource({ mode: 'live-local', key, transport });
  expect(source.liveLocal).toBe(true);
  await source.provider.load('fact', { revision: 0 });
  expect(transport.mock.calls[0][1].headers['X-Api-Key']).toBe(key);
});

test('mock mode does not read the key', () => {
  const key = jest.fn(() => { throw new Error('Key must not be read'); });
  expect(createContentSource({ mode: 'mock', get key() { return key(); } }).liveLocal).toBe(false);
  expect(key).not.toHaveBeenCalled();
});

test('production ignores live settings and does not read mode/key/transport', () => {
  dev(false);
  const read = jest.fn((): never => { throw new Error('Production must not read configuration'); });
  expect(createContentSource({ get mode() { return read(); }, get key() { return read(); }, get transport() { return read(); } }))
    .toEqual({ provider: mockContentProvider, liveLocal: false });
  expect(read).not.toHaveBeenCalled();
  expect(() => createLocalApiNinjasProvider({ get key() { return read(); } })).toThrow(SAFE);
  expect(read).not.toHaveBeenCalled();
});

test('production also rejects a previously created live provider without transport', async () => {
  const transport = goodTransport();
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  dev(false);
  await expect(load(provider)).rejects.toThrow(SAFE);
  expect(transport).not.toHaveBeenCalled();
});

test('literal Expo environment selection requires both public fields and development', () => {
  const oldMode = process.env.EXPO_PUBLIC_CONTENT_MODE;
  const oldKey = process.env.EXPO_PUBLIC_API_KEY;
  try {
    delete process.env.EXPO_PUBLIC_CONTENT_MODE;
    delete process.env.EXPO_PUBLIC_API_KEY;
    expect(createContentSource().liveLocal).toBe(false);
    process.env.EXPO_PUBLIC_CONTENT_MODE = 'live-local';
    expect(createContentSource().liveLocal).toBe(false);
    process.env.EXPO_PUBLIC_API_KEY = KEY;
    expect(createContentSource().liveLocal).toBe(true);
    dev(false);
    expect(createContentSource().liveLocal).toBe(false);
  } finally {
    if (oldMode === undefined) delete process.env.EXPO_PUBLIC_CONTENT_MODE;
    else process.env.EXPO_PUBLIC_CONTENT_MODE = oldMode;
    if (oldKey === undefined) delete process.env.EXPO_PUBLIC_API_KEY;
    else process.env.EXPO_PUBLIC_API_KEY = oldKey;
  }
});

test('maps all five documented shapes and makes one new request on every sequential refresh', async () => {
  const transport = goodTransport();
  const source = createContentSource({ mode: 'live-local', key: KEY, transport });
  expect(source.liveLocal).toBe(true);
  const contents = await Promise.all(ids.map((id) => source.provider.load(id, { revision: 0 })));
  expect(contents).toEqual([
    expect.objectContaining({ id: 'quote', title: 'quote', text: 'Synthetic quote.', author: 'Fictional Author' }),
    expect.objectContaining({ id: 'trivia', text: 'Synthetic question?', answer: 'Synthetic answer.' }),
    expect.objectContaining({ id: 'fact', text: 'Synthetic fact.' }),
    expect.objectContaining({ id: 'dad joke', text: 'Synthetic joke.' }),
    expect.objectContaining({ id: 'bucket list item', text: 'Synthetic idea.' }),
  ]);
  for (const content of contents) expect(content.image).toBeUndefined();
  expect(transport).toHaveBeenCalledTimes(5);
  for (const id of ids) await source.provider.load(id, { revision: 1 });
  expect(transport).toHaveBeenCalledTimes(10);
  expect(jest.getTimerCount()).toBe(0);
  const urls = transport.mock.calls.map(([url]) => url);
  expect(urls[0]).toMatch(/^https:\/\/api\.api-ninjas\.com\/v2\/randomquotes\?categories=(courage|happiness|inspirational|life|love)$/);
  expect([urls[1], urls[6]]).toEqual(Array(2).fill('https://api.api-ninjas.com/v1/trivia'));
  expect(urls.slice(2, 5)).toEqual(['https://api.api-ninjas.com/v1/facts', 'https://api.api-ninjas.com/v1/dadjokes', 'https://api.api-ninjas.com/v1/bucketlist']);
  for (const [url, init] of transport.mock.calls) {
    expect(url).not.toContain(KEY);
    expect(url).not.toMatch(/image|dreams|limit=/);
    expect(init).toEqual({ method: 'GET', headers: { Accept: 'application/json', 'X-Api-Key': KEY }, redirect: 'error', credentials: 'omit', cache: 'no-store', signal: expect.any(AbortSignal) });
    expect(init.signal.aborted).toBe(true);
  }
});

test('all retained quote topics are reachable without arbitrary queries', async () => {
  const transport = goodTransport();
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  const random = jest.spyOn(Math, 'random');
  for (let i = 0; i < 5; i++) { random.mockReturnValue((i + 0.1) / 5); await load(provider, 'quote'); }
  expect(transport.mock.calls.map(([url]) => url.split('=').pop())).toEqual([
    'courage', 'happiness', 'inspirational', 'life', 'love',
  ]);
});

test('Free-tier trivia loads and refreshes without any query and accepts random catalog repeats', async () => {
  const next = { category: 'music', question: 'Another synthetic question?', answer: 'Another synthetic answer.' };
  const transport = goodTransport()
    .mockImplementationOnce(async (url) => response(url))
    .mockImplementation(async (url) => response(url, [next]));
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  await expect(provider.load('trivia', { revision: 0 })).resolves.toMatchObject({ text: 'Synthetic question?', answer: 'Synthetic answer.' });
  for (const revision of [1, 2]) {
    await expect(provider.load('trivia', { revision })).resolves.toMatchObject({ text: next.question, answer: next.answer });
  }
  expect(transport.mock.calls.map(([url]) => url)).toEqual(Array(3).fill('https://api.api-ninjas.com/v1/trivia'));
  expect(jest.getTimerCount()).toBe(0);
});

test('shares only pending same-card requests while allowing another card and a later refresh', async () => {
  const waiting = deferred<LocalResponse>();
  const transport = goodTransport().mockImplementationOnce(() => waiting.promise);
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  const first = load(provider);
  expect(load(provider)).toBe(first);
  await load(provider, 'fact');
  expect(transport).toHaveBeenCalledTimes(2);
  waiting.resolve(response(transport.mock.calls[0][0]));
  await first;
  await load(provider);
  expect(transport).toHaveBeenCalledTimes(3);
});

const invalidPayloads: [string, CardId, unknown][] = [
  ['empty array', 'quote', []], ['two items', 'quote', [{ quote: 'a' }, { quote: 'b' }]],
  ['wrong root', 'quote', { quote: 'a' }], ['null item', 'fact', [null]],
  ['missing quote', 'quote', [{}]], ['blank author', 'quote', [{ quote: 'a', author: ' ' }]],
  ['oversize text', 'fact', [{ fact: 'x'.repeat(2001) }]], ['wrong field type', 'dad joke', [{ joke: 3 }]],
  ['missing answer', 'trivia', [{ question: 'q' }]], ['blank answer', 'trivia', [{ question: 'q', answer: ' ' }]],
  ['oversize answer', 'trivia', [{ question: 'q', answer: 'x'.repeat(2001) }]],
  ['bucket array', 'bucket list item', [{ item: 'a' }]], ['blank bucket', 'bucket list item', { item: ' ' }],
  ['echoed credential', 'quote', [{ quote: KEY }]],
];
test.each(invalidPayloads)('rejects %s with safe errors and no hidden retry', async (_, id, payload) => {
  const transport = goodTransport().mockImplementation(async (url) => response(url, payload));
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  await expect(load(provider, id)).rejects.toEqual(new Error(SAFE));
  expect(transport).toHaveBeenCalledTimes(1);
});

test.each([201, 204, 301, 302, 307, 308, 401, 403, 429, 500])('rejects status %i without reading raw body or retrying', async (status) => {
  const read = jest.fn(() => { throw new Error(KEY); });
  const transport = goodTransport().mockImplementation(async (url) => response(url, {}, { status, body: { getReader: read } }));
  await expect(load(createLocalApiNinjasProvider({ key: KEY, transport }))).rejects.toEqual(new Error(SAFE));
  expect(read).not.toHaveBeenCalled();
  expect(transport).toHaveBeenCalledTimes(1);
});

test.each([
  { redirected: true }, { url: 'https://example.invalid/redirected' }, { url: 'http://api.api-ninjas.com/v1/facts' },
  { body: null }, { headers: { get: () => 'text/html' } },
  { headers: { get: (name: string) => name === 'content-type' ? 'application/json' : '16385' } },
])('rejects unsafe transport response %p', async (overrides) => {
  const transport = goodTransport().mockImplementation(async (url) => response(url, undefined, overrides));
  await expect(load(createLocalApiNinjasProvider({ key: KEY, transport }))).rejects.toEqual(new Error(SAFE));
});

test.each(['oversized', 'malformed JSON', 'invalid UTF-8'])('bounds and validates streamed %s and cancels', async (kind) => {
  let count = 0;
  const cancel = jest.fn(async () => {});
  const body = { getReader: () => ({ cancel, read: async () => {
    count++;
    const value = kind === 'oversized' ? new Uint8Array(8193) : kind === 'invalid UTF-8' ? Uint8Array.of(255) : Uint8Array.of(123);
    return count <= (kind === 'oversized' ? 2 : 1) ? { done: false, value } : { done: true };
  } }) };
  const transport = goodTransport().mockImplementation(async (url) => response(url, undefined, { body }));
  await expect(load(createLocalApiNinjasProvider({ key: KEY, transport }))).rejects.toEqual(new Error(SAFE));
  expect(cancel).toHaveBeenCalledTimes(1);
  if (kind === 'oversized') expect(count).toBe(2);
});

test('decodes split UTF-8 chunks within the byte and text limits', async () => {
  const bytes = new TextEncoder().encode(JSON.stringify([{ fact: 'Café ✨' }]));
  let index = 0;
  const body = { getReader: () => ({ cancel: async () => {}, read: async () => index < bytes.length ? { done: false, value: bytes.slice(index, ++index) } : { done: true } }) };
  const transport = goodTransport().mockImplementation(async (url) => response(url, undefined, { body }));
  await expect(load(createLocalApiNinjasProvider({ key: KEY, transport }), 'fact')).resolves.toMatchObject({ text: 'Café ✨' });
});

test.each(['request', 'body'])('deadline covers stalled %s, aborts and permits independent retry', async (stage) => {
  const stalled = deferred<LocalResponse>();
  const cancel = jest.fn(async () => {});
  const transport = goodTransport().mockImplementationOnce(async (url) => stage === 'request' ? stalled.promise : response(url, undefined, {
    body: { getReader: () => ({ cancel, read: () => new Promise(() => {}) }) },
  }));
  const provider = createLocalApiNinjasProvider({ key: KEY, transport });
  const result = load(provider).catch((error: Error) => error);
  await jest.advanceTimersByTimeAsync(8000);
  expect(await result).toEqual(new Error(SAFE));
  expect(transport.mock.calls[0][1].signal.aborted).toBe(true);
  await load(provider, 'fact');
  await load(provider);
  expect(transport).toHaveBeenCalledTimes(3);
  expect(jest.getTimerCount()).toBe(0);
  if (stage === 'body') expect(cancel).toHaveBeenCalledTimes(1);
  else { stalled.resolve(response(transport.mock.calls[0][0])); await Promise.resolve(); }
});

test('discards network errors including synthetic headers and cause', async () => {
  const transport = goodTransport().mockRejectedValue(new Error(`private headers ${KEY}`));
  const error = await load(createLocalApiNinjasProvider({ key: KEY, transport })).catch((value: Error) => value);
  expect(error).toEqual(new Error(SAFE));
  expect((error as Error & { cause?: unknown }).cause).toBeUndefined();
});

test('live adapter preserves loading, isolated errors, last-good retry and accessible trivia controls', async () => {
  const quote = deferred<LocalResponse>();
  const refresh = deferred<LocalResponse>();
  let quoteUrl = '';
  let triviaAttempts = 0;
  let facts = 0;
  const transport = goodTransport().mockImplementation(async (url) => {
    const id = routeId(url);
    if (id === 'quote') { quoteUrl = url; return quote.promise; }
    if (id === 'fact' && facts++ === 0) return response(url, undefined, { status: 429 });
    if (id === 'trivia') {
      triviaAttempts++;
      if (triviaAttempts === 2) return refresh.promise;
      if (triviaAttempts === 3) return response(url, [{ question: 'New synthetic question?', answer: 'New synthetic answer.' }]);
    }
    return response(url);
  });
  const source = createContentSource({ mode: 'live-local', key: KEY, transport });
  await render(<HomeScreen {...source} />);
  expect(screen.queryByText('Live local development · API Ninjas')).toBeNull();
  expect(screen.queryByText('Offline demo · synthetic content')).toBeNull();
  expect(screen.getByRole('button', { name: 'Refresh quote', busy: true, disabled: true })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Retry fact' })).toBeTruthy();
  expect(screen.getByText('Synthetic joke.')).toBeTruthy();
  expect(transport).toHaveBeenCalledTimes(5);
  await act(async () => { quote.resolve(response(quoteUrl)); });
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Retry fact' }));
  expect(screen.getByText('Synthetic fact.')).toBeTruthy();
  expect(transport).toHaveBeenCalledTimes(6);
  await user.press(screen.getByRole('button', { name: 'Show Answer', expanded: false }));
  expect(screen.getByText('Synthetic answer.')).toBeTruthy();
  await user.press(screen.getByRole('button', { name: 'Refresh trivia' }));
  await user.press(screen.getByRole('button', { name: 'Refresh trivia' }));
  expect(transport).toHaveBeenCalledTimes(7);
  expect(screen.getByRole('button', { name: 'Hide Answer', expanded: true })).toBeTruthy();
  await act(async () => { refresh.reject(new Error(KEY)); });
  expect(screen.getByText('Synthetic answer.')).toBeTruthy();
  expect(screen.getByRole('alert')).toBeTruthy();
  expect(screen.queryByText(KEY)).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Retry trivia' }));
  expect(transport).toHaveBeenCalledTimes(8);
  expect(screen.getByText('New synthetic question?')).toBeTruthy();
  expect(screen.queryByText('Synthetic answer.')).toBeNull();
  expect(screen.queryByText('New synthetic answer.')).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Show Answer', expanded: false }));
  expect(screen.getByText('New synthetic answer.')).toBeTruthy();
  expect(screen.getAllByTestId(/^card-/).map((node) => node.props.testID)).toEqual(ids.map((id) => `card-${id}`));
});

test('an obsolete live provider cannot replace newly selected mocks', async () => {
  const old = deferred<LocalResponse>();
  const transport = goodTransport().mockImplementation(() => old.promise);
  const source = createContentSource({ mode: 'live-local', key: KEY, transport });
  const view = await render(<HomeScreen {...source} />);
  await view.rerender(<HomeScreen />);
  await act(async () => { jest.advanceTimersByTime(650); });
  await act(async () => { old.resolve(response(transport.mock.calls[0][0])); });
  expect(screen.getByText('“Small steps can open new paths.”')).toBeTruthy();
  expect(screen.queryByText('Synthetic quote.')).toBeNull();
  expect(screen.queryByText('Offline demo · synthetic content')).toBeNull();
});
