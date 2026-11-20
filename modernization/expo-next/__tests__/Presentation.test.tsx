import { AccessibilityInfo, Platform, StyleSheet } from 'react-native';
import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import { configure } from '@testing-library/react-native';
import { HomeScreen } from '../src/home/HomeScreen';
import { ContentCard } from '../src/home/ContentCard';
import { HOME_CARDS } from '../src/home/fixtures';
import { createMockContentProvider, normalizeContent, type CardContent, type CardId, type ContentProvider } from '../src/home/content';
import { edgeContents, edgeImage, edgeProvider, longAnswer, longAuthor, longQuestion, longText, longTitle } from './fixtures/contentEdges';

let network: jest.SpyInstance;
let xhr: jest.Mock;
let announce: jest.SpyInstance;
const originalXhr = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
beforeEach(() => {
  configure({ defaultIncludeHiddenElements: true }); // Inspect all five mounted presentations.
  network = jest.spyOn(globalThis, 'fetch').mockImplementation(() => { throw new Error('No network'); });
  xhr = jest.fn(() => { throw new Error('No network'); });
  Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: xhr });
  announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibility').mockImplementation(() => {}).mockClear();
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  expect(xhr).not.toHaveBeenCalled();
  jest.restoreAllMocks();
  if (originalXhr) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXhr);
  else Reflect.deleteProperty(globalThis, 'XMLHttpRequest');
});
function deferred() {
  let resolve!: (value: CardContent) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<CardContent>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const mock = createMockContentProvider({ delayMs: 0 });
function readyCard(id: CardId, value: unknown) {
  const card = HOME_CARDS.find((item) => item.id === id)!;
  return <ContentCard card={card} state={{ status: 'ready', revision: 1, content: normalizeContent(id, value) }} onLoad={jest.fn()} />;
}

// Absence of clipping props is structural evidence; actual geometry is checked on iPhone.
function expectGrowingText(value: string) {
  const node = screen.getByText(value);
  expect(node.props.numberOfLines).toBeUndefined();
  expect(node.props.ellipsizeMode).toBeUndefined();
  expect(node.props.adjustsFontSizeToFit).not.toBe(true);
  expect(node.props.allowFontScaling).not.toBe(false);
  let current = node;
  while (current) {
    const style = StyleSheet.flatten(current.props.style) ?? {};
    // The chapter viewport is bounded; text and its reading content still grow naturally.
    if (!String(current.props.testID).startsWith('chapter-')) expect(style.height).toBeUndefined();
    expect(style.maxHeight).toBeUndefined();
    current = current.parent!;
  }
}

test('all five edge categories keep complete multiline Unicode/punctuation and exact order offline', async () => {
  await render(<HomeScreen provider={edgeProvider} />);
  expect(screen.getAllByTestId(/^card-/).map((item) => item.props.testID)).toEqual(HOME_CARDS.map(({ id }) => `card-${id}`));
  for (const content of Object.values(edgeContents)) expectGrowingText(content.text);
  expectGrowingText(`- ${longAuthor}`);
  expectGrowingText(longTitle.toUpperCase());
  expect(screen.getAllByRole('image')).toHaveLength(2);
  expect(screen.queryByText('-    ')).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer', expanded: false }));
  expectGrowingText(longAnswer);
  expect(screen.getByRole('button', { name: 'Hide Answer', expanded: true }).props.accessibilityHint).toBe('Hide the answer to this question');
  await fireEvent.press(screen.getByRole('button', { name: 'Hide Answer' }));
  expect(screen.queryByText(longAnswer)).toBeNull();
});

test.each(['quote', 'fact', 'bucket list item'] as const)('%s supports local image then text-only fallback with no empty attribution', async (id) => {
  const value = { ...edgeContents[id], text: '✓', author: ' \n ', image: edgeImage };
  await render(readyCard(id, value));
  expect(screen.getByRole('image', { name: edgeImage.label })).toBeTruthy();
  expect(screen.queryByText(/^-/)).toBeNull();
  await screen.rerender(readyCard(id, { ...value, image: undefined }));
  expect(screen.queryByRole('image')).toBeNull();
  expectGrowingText('✓');
  expect(screen.getByText('✓')).toHaveStyle({ color: '#fff' });
  expect(screen.queryByRole('button', { name: 'Show Answer' })).toBeNull();
});

test.each([undefined, '', ' \n '])('optional author %p is omitted without losing short body', async (author) => {
  await render(readyCard('quote', { ...edgeContents.quote, text: 'Go.', author, image: undefined }));
  expectGrowingText('Go.');
  expect(screen.queryByText(/^-/)).toBeNull();
});

const malformedImages = [null, 'https://invalid.example/image', {}, { ...edgeImage, label: ' \n ' }, { ...edgeImage, sky: '#fff' }, { ...edgeImage, land: 'red' }, { ...edgeImage, sun: 12 }];
test.each(malformedImages)('invalid image %p is isolated, safe and retryable', async (image) => {
  let attempts = 0;
  const provider: ContentProvider = { async load(id) {
    if (id === 'quote' && attempts++ === 0) return { ...edgeContents.quote, image } as unknown as CardContent;
    return edgeContents[id];
  } };
  await render(<HomeScreen provider={provider} />);
  expect(screen.getByRole('alert')).toHaveTextContent(/Use Retry quote/);
  expect(screen.getByText(longQuestion)).toBeTruthy();
  expect(screen.queryByText(longText)).toBeNull();
  const retry = screen.getByRole('button', { name: 'Retry quote', disabled: false, busy: false });
  expect(retry.props.accessibilityHint).toBe('Try this card again to load an example');
  await fireEvent.press(retry);
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByText(longText)).toBeTruthy();
  expect(within(screen.getByTestId('card-quote')).getByRole('image', { name: edgeImage.label })).toBeTruthy();
});

test('malformed refresh media retains last-good image/author and retry uses the same successful revision', async () => {
  const revisions: number[] = [];
  let failed = false;
  const provider: ContentProvider = { async load(id, context) {
    if (id !== 'quote') return mock.load(id, context);
    revisions.push(context.revision);
    if (context.revision === 1 && !failed) {
      failed = true;
      return { ...edgeContents.quote, image: { ...edgeImage, sky: 'invalid' } } as unknown as CardContent;
    }
    return context.revision === 0 ? edgeContents.quote : { id, title: id, text: 'Recovered without media.' };
  } };
  await render(<HomeScreen provider={provider} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(screen.getByRole('alert')).toHaveTextContent(/Could not refresh/);
  expect(screen.getByText(longText)).toBeTruthy();
  expect(screen.getByText(`- ${longAuthor}`)).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Retry quote' }).props.accessibilityHint).toContain('current content stays');
  await fireEvent.press(screen.getByRole('button', { name: 'Retry quote' }));
  expect(revisions).toEqual([0, 1, 1]);
  expect(screen.getByText('Recovered without media.')).toBeTruthy();
  expect(within(screen.getByTestId('card-quote')).queryByRole('image')).toBeNull();
});

test('initial pending, success and failure generate no explicit iOS announcement flood', async () => {
  const gates = Object.fromEntries(HOME_CARDS.map(({ id }) => [id, deferred()]));
  await render(<HomeScreen provider={{ load: (id) => gates[id]!.promise }} />);
  expect(announce).not.toHaveBeenCalled();
  expect(screen.getAllByRole('button', { busy: true, disabled: true })).toHaveLength(5);
  expect(screen.getByTestId('busy-quote').props.accessible).toBe(false);
  await act(async () => {
    for (const { id } of HOME_CARDS) {
      if (id === 'quote') gates[id]!.reject(new Error('private-payload-do-not-show'));
      else gates[id]!.resolve(edgeContents[id]);
    }
  });
  expect(announce).not.toHaveBeenCalled();
  expect(screen.queryByText('private-payload-do-not-show')).toBeNull();
  expect(screen.getByRole('alert').props.accessibilityLiveRegion).toBe('polite');
});

test('iOS explicitly announces only one settled outcome for refresh failure and retry success', async () => {
  const gate = deferred();
  let attempt = 0;
  const provider: ContentProvider = { load(id, context) {
    if (id === 'quote' && context.revision > 0 && attempt++ === 0) return gate.promise;
    return mock.load(id, context);
  } };
  await render(<HomeScreen provider={provider} />);
  expect(announce).not.toHaveBeenCalled();
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(announce).not.toHaveBeenCalled();
  expect(screen.getByText('Refreshing quote…').props.accessibilityLiveRegion).toBe('polite');
  await act(async () => { gate.reject(new Error('hidden')); });
  expect(announce.mock.calls).toEqual([['Could not refresh this example. Use Retry quote to try again.']]);
  await fireEvent.press(screen.getByRole('button', { name: 'Retry quote' }));
  expect(announce.mock.calls).toEqual([['Could not refresh this example. Use Retry quote to try again.'], ['quote ready']]);
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  expect(announce).toHaveBeenCalledTimes(2);
});

test('each immediate failed retry announces once even when status, revision and error text repeat', async () => {
  const provider: ContentProvider = { load(id, context) {
    return id === 'quote' ? Promise.reject(new Error('hidden')) : mock.load(id, context);
  } };
  await render(<HomeScreen provider={provider} />);
  expect(announce).not.toHaveBeenCalled();
  await fireEvent.press(screen.getByRole('button', { name: 'Retry quote' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Retry quote' }));
  expect(announce.mock.calls).toEqual([
    ['Could not load this example. Use Retry quote to try again.'],
    ['Could not load this example. Use Retry quote to try again.'],
  ]);
});

test('success announces once even when consecutive refreshes have the same ready message', async () => {
  await render(<HomeScreen provider={mock} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh fact' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh fact' }));
  expect(announce.mock.calls).toEqual([['fact ready'], ['fact ready']]);
});

test('provider replacement drops pending user announcement intent and ignores stale completion', async () => {
  const gate = deferred();
  const provider: ContentProvider = { load(id, context) {
    return id === 'quote' && context.revision > 0 ? gate.promise : mock.load(id, context);
  } };
  await render(<HomeScreen provider={provider} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh quote' }));
  await screen.rerender(<HomeScreen provider={edgeProvider} />);
  await act(async () => { gate.resolve({ id: 'quote', title: 'quote', text: 'Obsolete quote.' }); });
  expect(screen.queryByText('Obsolete quote.')).toBeNull();
  expect(announce).not.toHaveBeenCalled();
});

test('Android keeps live-region feedback without duplicate explicit iOS calls', async () => {
  jest.replaceProperty(Platform, 'OS', 'android');
  await render(<HomeScreen provider={mock} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh fact' }));
  expect(announce).not.toHaveBeenCalled();
});

function luminance(hex: string) {
  const channels = hex.match(/[\da-f]{2}/gi)!.map((part) => parseInt(part, 16) / 255)
    .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
}
test('white text contrast remains above 4.5 on brand panel and worst-case white artwork overlay', async () => {
  await render(<HomeScreen provider={edgeProvider} />);
  expect((1.05) / (luminance('#38761d') + 0.05)).toBeGreaterThan(4.5);
  // Composite rgba(20,35,24,.88) against the brightest permitted background.
  const overlay = [20, 35, 24].map((n) => Math.round(n * 0.88 + 255 * 0.12).toString(16).padStart(2, '0')).join('');
  expect(1.05 / (luminance('#' + overlay) + 0.05)).toBeGreaterThan(4.5);
  expect(screen.getByText(longText).parent).toHaveStyle({ backgroundColor: 'rgba(20, 35, 24, 0.88)' });
  expect(screen.getByText(edgeContents.fact.text).parent).toHaveStyle({ backgroundColor: '#38761d' });
  for (const button of screen.getAllByRole('button')) {
    const style = StyleSheet.flatten(button.props.style);
    expect(style.minHeight).toBeGreaterThanOrEqual(48);
    expect(style.minWidth).toBeGreaterThanOrEqual(48);
  }
  const image = screen.getAllByRole('image')[0]!;
  expect(image.props.accessibilityLabel).toBe(edgeImage.label);
  for (const decoration of image.children) {
    if (typeof decoration === 'string') continue;
    expect(decoration.props.accessible).toBe(false);
    expect(decoration.props.accessibilityElementsHidden).toBe(true);
  }
});
