import { act, fireEvent, render, renderHook, screen, userEvent, within } from '@testing-library/react-native';
import { HomeScreen } from '../src/home/HomeScreen';
import { useHomeContent } from '../src/home/useHomeContent';
import { HOME_CARDS } from '../src/home/fixtures';
import { createMockContentProvider, normalizeContent, type CardContent, type CardId, type ContentProvider } from '../src/home/content';

type Request = {
  id: CardId; revision: number;
  resolve: (content: CardContent) => void;
  reject: (reason: Error) => void;
};
function controlled() {
  const requests: Request[] = [];
  const load = jest.fn((id: CardId, { revision }: { revision: number }) => new Promise<CardContent>((resolve, reject) => {
    requests.push({ id, revision, resolve, reject });
  }));
  return { requests, provider: { load } satisfies ContentProvider };
}
function content(id: CardId, variant = 0) {
  const card = HOME_CARDS.find((card) => card.id === id)!;
  return normalizeContent(id, { id, title: card.title, ...card.variants[variant] });
}
const fulfill = (request: Request) => request.resolve(content(request.id, request.revision % 2));
const ids = () => screen.getAllByTestId(/^card-/).map((node) => node.props.testID);
const expectedIds = HOME_CARDS.map(({ id }) => `card-${id}`);
let network: jest.SpyInstance;
let xhr: jest.Mock;
const originalXhr = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
beforeEach(() => {
  network = jest.spyOn(globalThis, 'fetch').mockImplementation(() => { throw new Error('Network forbidden'); });
  xhr = jest.fn(() => { throw new Error('Network forbidden'); });
  Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: xhr });
});
afterEach(() => {
  try {
    expect(network).not.toHaveBeenCalled();
    expect(xhr).not.toHaveBeenCalled();
  } finally {
    jest.restoreAllMocks();
    if (originalXhr) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXhr);
    else Reflect.deleteProperty(globalThis, 'XMLHttpRequest');
  }
});

test('starts all five loads before any resolves; out-of-order success keeps slots, independent loading and IDs', async () => {
  const { provider, requests } = controlled();
  await render(<HomeScreen provider={provider} />);
  expect(requests.map(({ id }) => id)).toEqual(HOME_CARDS.map(({ id }) => id));
  expect(ids()).toEqual(expectedIds);
  expect(screen.getAllByRole('button', { busy: true, disabled: true })).toHaveLength(5);
  expect(screen.getByText('Loading quote…').props.accessibilityLiveRegion).toBe('polite');
  await act(async () => { fulfill(requests[4]!); });
  expect(screen.getByText(HOME_CARDS[4].variants[0].text)).toBeTruthy();
  expect(screen.getByTestId('busy-quote')).toBeTruthy();
  expect(screen.queryByTestId('busy-bucket list item')).toBeNull();
  await act(async () => { fulfill(requests[1]!); });
  await userEvent.setup().press(screen.getByRole('button', { name: 'Show Answer' }));
  expect(screen.getByText('Three sides.')).toBeTruthy();
  await act(async () => { [requests[3]!, requests[2]!, requests[0]!].forEach(fulfill); });
  expect(screen.queryAllByTestId(/^busy-/)).toHaveLength(0);
  expect(ids()).toEqual(expectedIds);
  expect(screen.getByText('Three sides.')).toBeTruthy();
});

test.each([1, 2])('%i initial failure(s) isolate errors and allow only the affected card to retry', async (count) => {
  const { provider, requests } = controlled();
  await render(<HomeScreen provider={provider} />);
  await act(async () => {
    requests.slice(0, count).forEach((request) => request.reject(new Error('internal-payload')));
    fulfill(requests[4]!);
  });
  expect(screen.getAllByRole('alert')).toHaveLength(count);
  expect(screen.getAllByRole('alert')[0]!.props.accessibilityLiveRegion).toBe('polite');
  expect(screen.queryByText('internal-payload')).toBeNull();
  expect(screen.getByText(HOME_CARDS[4].variants[0].text)).toBeTruthy();
  expect(screen.getByTestId('busy-fact')).toBeTruthy();
  expect(screen.queryByTestId('busy-quote')).toBeNull();
  await userEvent.setup().press(screen.getByRole('button', { name: 'Retry quote', busy: false, disabled: false }));
  expect(requests).toHaveLength(6);
  expect(requests[5]!.id).toBe('quote');
  expect(requests[5]!.revision).toBe(0);
  expect(screen.getByText('Loading quote…')).toBeTruthy();
  await act(async () => { fulfill(requests[5]!); });
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
  expect(within(screen.getByTestId('card-quote')).queryByRole('alert')).toBeNull();
  expect(screen.getByRole('button', { name: 'Refresh quote', busy: false })).toBeTruthy();
  expect(ids()).toEqual(expectedIds);
});

test('same-tick duplicate actions are suppressed before a React rerender, while another category overlaps', async () => {
  const { provider, requests } = controlled();
  const hook = await renderHook(() => useHomeContent(provider));
  await act(async () => { requests.slice().forEach(fulfill); });
  await act(async () => {
    hook.result.current.load('quote');
    hook.result.current.load('quote');
    hook.result.current.load('fact');
  });
  expect(requests).toHaveLength(7);
  expect(requests.slice(5).map(({ id }) => id)).toEqual(['quote', 'fact']);
  expect(hook.result.current.cards.quote.status).toBe('loading');
  await act(async () => { fulfill(requests[6]!); });
  expect(hook.result.current.cards.fact.status).toBe('ready');
  expect(hook.result.current.cards.quote.status).toBe('loading');
  await act(async () => { requests[5]!.reject(new Error('private-detail')); });
  expect(hook.result.current.cards.quote.status).toBe('error');
  expect(hook.result.current.cards.quote.content).toEqual(content('quote'));
  await act(async () => { hook.result.current.load('quote'); });
  expect(requests[7]!.revision).toBe(1);
  await act(async () => { fulfill(requests[7]!); });
  expect(hook.result.current.cards.quote.content).toEqual(content('quote', 1));
});

test.each(['initial', 'refresh'])('provider replacement during %s ignores old success and failure and preserves newer busy ownership', async (phase) => {
  const old = controlled();
  const fresh = controlled();
  const view = await render(<HomeScreen provider={old.provider} />);
  if (phase === 'refresh') {
    await act(async () => { old.requests.slice().forEach(fulfill); });
    await fireEvent.press(screen.getByRole('button', { name: 'Refresh quote' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Refresh fact' }));
  }
  await view.rerender(<HomeScreen provider={fresh.provider} />);
  await act(async () => {
    fresh.requests[0]!.resolve(content('quote', 1));
    fulfill(fresh.requests[1]!);
  });
  const stale = phase === 'initial' ? old.requests : old.requests.slice(5);
  await act(async () => {
    stale[0]!.resolve(content(stale[0]!.id));
    stale.slice(1).forEach((request) => request.reject(new Error('obsolete-error')));
  });
  expect(screen.getByText(HOME_CARDS[0].variants[1].text)).toBeTruthy();
  expect(screen.queryByText(HOME_CARDS[0].variants[0].text)).toBeNull();
  expect(screen.queryAllByRole('alert')).toHaveLength(0);
  expect(screen.getByTestId('busy-fact')).toBeTruthy();
  await act(async () => { fresh.requests.slice(2).forEach(fulfill); });
  expect(screen.queryAllByTestId(/^busy-/)).toHaveLength(0);
  expect(ids()).toEqual(expectedIds);
});

test('unmount safely consumes pending success/rejection; a new mounted home owns independent data', async () => {
  const old = controlled();
  const view = await render(<HomeScreen provider={old.provider} />);
  await view.unmount();
  const fresh = controlled();
  await render(<HomeScreen provider={fresh.provider} />);
  const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => {
    fulfill(old.requests[0]!);
    old.requests.slice(1).forEach((request) => request.reject(new Error('after-unmount')));
  });
  expect(errors).not.toHaveBeenCalled();
  expect(screen.getAllByTestId(/^busy-/)).toHaveLength(5);
  expect(screen.queryAllByRole('alert')).toHaveLength(0);
  await act(async () => { fresh.requests.forEach(fulfill); });
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
});

const invalid = [
  null, [], {},
  { id: 'quote', title: 'quote', text: '' },
  { id: 'quote', title: 'quote', text: '   ' },
  { id: 'quote', title: '', text: 'Valid' },
  { id: 'fact', title: 'fact', text: 'Wrong identity' },
  { id: 'quote', title: 'quote', text: 'Valid', answer: 'Unexpected' },
  { id: 'quote', title: 'quote', text: 'Valid', author: 3 },
  { id: 'quote', title: 'quote', text: 'Valid', image: 'remote-image' },
  { id: 'quote', title: 'quote', text: 'Valid', image: { label: 'Bad', sky: '#123456', land: '#123456' } },
];
test.each(invalid.map((value, index) => ({ value, index })))('invalid response $index becomes a safe card-level error and retry recovers', async ({ value }) => {
  const mock = createMockContentProvider({ delayMs: 0 });
  const load = jest.fn((id: CardId, context: { revision: number }) => mock.load(id, context));
  load.mockImplementationOnce(async () => value as CardContent);
  await render(<HomeScreen provider={{ load }} />);
  expect(within(screen.getByTestId('card-quote')).getByRole('alert')).toBeTruthy();
  expect(screen.getByText(HOME_CARDS[2].variants[0].text)).toBeTruthy();
  await userEvent.setup().press(screen.getByRole('button', { name: 'Retry quote' }));
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
  expect(screen.queryAllByRole('alert')).toHaveLength(0);
});

test.each([undefined, '', '   '])('trivia rejects missing/empty answer %p', (answer) => {
  expect(() => normalizeContent('trivia', { id: 'trivia', title: 'trivia', text: 'Question?', answer })).toThrow();
});

test('normalization trims optional text, copies local artwork and drops unknown fields', () => {
  const result = normalizeContent('quote', { ...content('quote'), text: '  Example  ', author: '   ', extra: 'ignored' });
  expect(result.text).toBe('Example');
  expect(result.author).toBeUndefined();
  expect(result).not.toHaveProperty('extra');
  expect(result.image).toEqual(HOME_CARDS[0].variants[0].image);
  expect(result.image).not.toBe(HOME_CARDS[0].variants[0].image);
});

test('mock wait is injectable and rejectable, with deterministic stateless per-card revision and wraparound', async () => {
  const gate = controlled();
  const wait = jest.fn(() => gate.provider.load('quote', { revision: 0 }).then(() => {}));
  const mock = createMockContentProvider({ wait });
  const pending = mock.load('trivia', { revision: 1 });
  expect(wait).toHaveBeenCalledTimes(1);
  fulfill(gate.requests[0]!);
  expect(await pending).toEqual(content('trivia', 1));
  const failure = mock.load('quote', { revision: 0 });
  const assertion = expect(failure).rejects.toThrow('controlled');
  gate.requests[1]!.reject(new Error('controlled'));
  await assertion;
  const instant = createMockContentProvider({ delayMs: 0 });
  expect(await instant.load('quote', { revision: 2 })).toEqual(content('quote'));
  expect(await instant.load('fact', { revision: 0 })).toEqual(content('fact'));
});
