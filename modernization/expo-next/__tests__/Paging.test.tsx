import { AccessibilityInfo, StyleSheet } from 'react-native';
const Native = require('react-native') as typeof import('react-native');
import { act, configure, fireEvent, render, screen } from '@testing-library/react-native';
import { HomeScreen } from '../src/home/HomeScreen';
import { HOME_CARDS } from '../src/home/fixtures';
import { createMockContentProvider, type CardId, type ContentProvider } from '../src/home/content';

// Record imperative reading commands explicitly; native arbitration is a simulator check.
const mockScrollCommands = new Map<string, jest.Mock>();
jest.mock('react-native', () => {
  const native = jest.requireActual('react-native');
  const React = jest.requireActual('react');
  const MockScroll = React.forwardRef((props: { testID: string; children?: unknown }, ref: unknown) => {
    const command = React.useMemo(() => jest.fn(), []);
    React.useImperativeHandle(ref, () => ({ scrollTo: command }));
    mockScrollCommands.set(props.testID, command);
    return React.createElement(native.View, props, props.children);
  });
  return new Proxy(native, { get(target, key) { return key === 'ScrollView' ? MockScroll : target[key]; } });
});

const ids = ['quote', 'trivia', 'fact', 'dad joke', 'bucket list item'] as const;
const mock = createMockContentProvider({ delayMs: 0 });
const hidden = { includeHiddenElements: true };
let network: jest.SpyInstance;
let xhr: jest.Mock;
const originalXhr = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
beforeEach(() => {
  configure({ defaultIncludeHiddenElements: false });
  jest.useFakeTimers();
  jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockResolvedValue(false);
  jest.spyOn(AccessibilityInfo, 'setAccessibilityFocus').mockImplementation(() => {}).mockClear();
  jest.spyOn(Native, 'findNodeHandle').mockReturnValue(7);
  network = jest.spyOn(globalThis, 'fetch').mockImplementation(() => { throw new Error('Network forbidden'); });
  xhr = jest.fn(() => { throw new Error('Network forbidden'); });
  Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: xhr });
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  expect(xhr).not.toHaveBeenCalled();
  jest.restoreAllMocks();
  jest.useRealTimers();
  if (originalXhr) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXhr);
  else Reflect.deleteProperty(globalThis, 'XMLHttpRequest');
});
const pager = () => screen.getByTestId('chapter-pager');
const reader = (id: CardId) => screen.getByTestId(`reading-${id}`, hidden);
const position = () => screen.getByTestId('chapter-progress').props.accessibilityValue.now;
const event = (y: number) => ({ nativeEvent: { contentOffset: { x: 0, y } } });
async function layout(height = 600) {
  await fireEvent(screen.getByTestId('chapter-viewport'), 'layout', { nativeEvent: { layout: { height, width: 375, x: 0, y: 0 } } });
}
async function measure(id: CardId, height: number) {
  await fireEvent(reader(id), 'contentSizeChange', 375, height);
}
async function ready(provider: ContentProvider = mock) {
  await render(<HomeScreen provider={provider} />);
  await layout();
  for (const id of ids) await measure(id, 250);
}
async function next() { await fireEvent.press(screen.getByTestId('next-chapter')); }
async function previous() { await fireEvent.press(screen.getByTestId('previous-chapter')); }
async function swipe(from: number, to: number) {
  await fireEvent(pager(), 'scrollBeginDrag', event(from));
  await fireEvent.scroll(pager(), event(to));
  await fireEvent(pager(), 'scrollEndDrag', event(to));
  await fireEvent(pager(), 'momentumScrollEnd', event(to));
}
function nativeReader(id: CardId) {
  return mockScrollCommands.get(`reading-${id}`)!;
}

test('five mounted measured pages have exact order, selected location and active-only focus', async () => {
  await ready();
  expect(screen.getAllByTestId(/^chapter-(quote|trivia|fact|dad joke|bucket list item)$/, hidden).map((node) => node.props.testID)).toEqual(ids.map((id) => `chapter-${id}`));
  expect(pager().props.snapToOffsets).toEqual([0, 600, 1200, 1800, 2400]);
  expect(pager().props.pagingEnabled).toBe(true);
  expect(pager().props.disableIntervalMomentum).toBe(true);
  expect(pager().props.refreshControl).toBeUndefined();
  expect(screen.getAllByTestId(/^card-/)).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Show Answer' })).toBeNull();
  expect(screen.getByTestId('chapter-progress')).toHaveAccessibilityValue({ min: 1, max: 5, now: 1 });
  expect(screen.getByTestId('chapter-progress')).toHaveProp('accessibilityLabel', 'Quote, chapter 1 of 5');
  expect(screen.getByTestId('progress-quote', hidden)).toHaveStyle({ width: 27, height: 5 });
  for (const id of ids) expect(screen.getByTestId(`chapter-${id}`, hidden)).toHaveStyle({ height: 600 });
  for (const id of ['previous-chapter', 'next-chapter']) {
    const style = StyleSheet.flatten(screen.getByTestId(id).props.style);
    expect(style.minWidth).toBeGreaterThanOrEqual(48);
    expect(style.minHeight).toBeGreaterThanOrEqual(48);
  }
});

test('explicit navigation has labeled bounds and no wrap, preserves mounted slots and never refetches', async () => {
  const load = jest.fn(mock.load);
  await ready({ load });
  expect(load).toHaveBeenCalledTimes(5);
  expect(screen.getByRole('button', { name: 'Previous chapter', disabled: true })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Next chapter, Trivia' })).toBeTruthy();
  for (let i = 2; i <= 5; i++) { await next(); expect(position()).toBe(i); }
  await next();
  expect(position()).toBe(5);
  expect(screen.getByRole('button', { name: 'Next chapter', disabled: true })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Previous chapter, Dad Joke' })).toBeTruthy();
  for (let i = 4; i >= 1; i--) { await previous(); expect(position()).toBe(i); }
  await previous();
  expect(position()).toBe(1);
  expect(load).toHaveBeenCalledTimes(5);
});

test('progress stays on settled location during drag; fast overshoot is limited to one chapter', async () => {
  await ready();
  await fireEvent(pager(), 'scrollBeginDrag', event(0));
  await fireEvent.scroll(pager(), event(1900));
  expect(position()).toBe(1);
  await fireEvent(pager(), 'scrollEndDrag', event(1900));
  expect(position()).toBe(1);
  await next(); // Ignored during settlement.
  expect(position()).toBe(1);
  await fireEvent(pager(), 'momentumScrollEnd', event(2400));
  expect(position()).toBe(2);
  await fireEvent(pager(), 'momentumScrollEnd', event(2400)); // Obsolete duplicate.
  expect(position()).toBe(2);
  await swipe(600, 0);
  expect(position()).toBe(1);
});

test('short, cancelled and no-momentum gestures settle without changing chapter', async () => {
  await ready();
  await swipe(0, 90);
  expect(position()).toBe(1);
  await fireEvent(pager(), 'scrollBeginDrag', event(0));
  await fireEvent.scroll(pager(), event(500));
  await fireEvent(pager(), 'touchCancel', {});
  expect(position()).toBe(1);
  await fireEvent(pager(), 'scrollBeginDrag', event(0));
  await fireEvent(pager(), 'scrollEndDrag', event(80));
  await act(async () => { jest.advanceTimersByTime(160); });
  expect(position()).toBe(1);
  expect(screen.getByTestId('next-chapter')).toBeEnabled();
});

test('idle fallback waits for scrolling to stop and rapid triggers cannot skip a chapter', async () => {
  await ready();
  await fireEvent(pager(), 'scrollBeginDrag', event(0));
  await fireEvent(pager(), 'scrollEndDrag', event(400));
  await act(async () => { jest.advanceTimersByTime(100); });
  await fireEvent.scroll(pager(), event(600));
  await fireEvent(pager(), 'scrollBeginDrag', event(600));
  await next();
  await act(async () => { jest.advanceTimersByTime(159); });
  expect(position()).toBe(1);
  await act(async () => { jest.advanceTimersByTime(1); });
  expect(position()).toBe(2);
});

test('swipes at either end stay bounded', async () => {
  await ready();
  await swipe(0, -600);
  expect(position()).toBe(1);
  for (let i = 0; i < 4; i++) await next();
  await swipe(2400, 3000);
  expect(position()).toBe(5);
});

test('geometry changes retain last settled ID, cancel a transient drag and recalculate offsets', async () => {
  const load = jest.fn(mock.load);
  await ready({ load });
  await next();
  await next();
  await fireEvent(pager(), 'scrollBeginDrag', event(1200));
  await fireEvent.scroll(pager(), event(1750));
  await layout(420);
  expect(position()).toBe(3);
  expect(pager().props.snapToOffsets).toEqual([0, 420, 840, 1260, 1680]);
  await fireEvent(pager(), 'momentumScrollEnd', event(1800));
  expect(position()).toBe(3);
  expect(load).toHaveBeenCalledTimes(5);
});

test('unknown geometry and overflow lock paging; reading edges cannot change position; actions still work', async () => {
  await render(<HomeScreen provider={mock} />);
  expect(pager().props.scrollEnabled).toBe(false);
  await layout(360);
  expect(pager().props.scrollEnabled).toBe(false);
  await measure('quote', 2400);
  expect(reader('quote').props.scrollEnabled).toBe(true);
  await fireEvent.scroll(reader('quote'), event(2040));
  await swipe(0, 360);
  expect(position()).toBe(1);
  await next();
  expect(position()).toBe(2);
  await measure('trivia', 200);
  expect(pager().props.scrollEnabled).toBe(true);
  expect(reader('trivia').props.scrollEnabled).toBe(false);
  await previous();
  expect(pager().props.scrollEnabled).toBe(false);
});

test('content/answer and viewport changes recalculate overflow without changing position or answer', async () => {
  await ready();
  await next();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  await measure('trivia', 900);
  expect(pager().props.scrollEnabled).toBe(false);
  expect(screen.getByRole('button', { name: 'Hide Answer' })).toBeTruthy();
  await layout(1000);
  expect(pager().props.scrollEnabled).toBe(true);
  await layout(400);
  expect(pager().props.scrollEnabled).toBe(false);
  await fireEvent.press(screen.getByRole('button', { name: 'Hide Answer' }));
  await measure('trivia', 250);
  expect(pager().props.scrollEnabled).toBe(true);
  expect(position()).toBe(2);
});

test('native reading offset survives revisit and failed refresh, clamps on shrink and resets on success', async () => {
  let failure = true;
  const provider: ContentProvider = { load(id, context) {
    if (id === 'quote' && context.revision > 0 && failure) return Promise.reject(new Error('hidden-detail'));
    return mock.load(id, context);
  } };
  await ready(provider);
  await measure('quote', 2000);
  const scroll = nativeReader('quote').mockClear();
  await fireEvent.scroll(reader('quote'), event(700));
  await next();
  await previous();
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(scroll).not.toHaveBeenCalled();
  expect(screen.getByRole('alert')).toHaveTextContent(/Could not refresh/);
  expect(screen.queryByText('hidden-detail')).toBeNull();
  await measure('quote', 800);
  expect(scroll).toHaveBeenLastCalledWith({ y: 200, animated: false });
  failure = false;
  await fireEvent.press(screen.getByRole('button', { name: 'Retry quote' }));
  expect(scroll).toHaveBeenLastCalledWith({ y: 0, animated: false });
  expect(position()).toBe(1);
});

test('trivia survives revisits, unrelated refresh and failed refresh; identical successful revision resets', async () => {
  let fail = true;
  const original = await mock.load('trivia', { revision: 0 });
  const load = jest.fn((id: CardId, context: { revision: number }) => {
    if (id === 'trivia') {
      if (context.revision > 0 && fail) return Promise.reject(new Error('synthetic-private'));
      return Promise.resolve(original);
    }
    return mock.load(id, context);
  });
  await ready({ load });
  await next();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  await next();
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh fact' }));
  await previous();
  expect(screen.getByText('Three sides.')).toBeTruthy();
  await fireEvent.press(screen.getByRole('button', { name: 'Refresh trivia' }));
  expect(position()).toBe(2);
  expect(screen.getByText('Three sides.')).toBeTruthy();
  await previous(); await next();
  expect(screen.getByRole('button', { name: 'Hide Answer', expanded: true })).toBeTruthy();
  fail = false;
  await fireEvent.press(screen.getByRole('button', { name: 'Retry trivia' }));
  expect(screen.queryByText('Three sides.')).toBeNull();
  expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();
  expect(load).toHaveBeenCalledTimes(8); // Five initial, fact, failed trivia, successful retry.
});

test('provider session replacement resets answer and read position while retaining active chapter', async () => {
  await ready();
  await next();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  const scroll = nativeReader('trivia').mockClear();
  await fireEvent.scroll(reader('trivia'), event(100));
  const replacement = createMockContentProvider({ delayMs: 0 });
  await screen.rerender(<HomeScreen provider={replacement} />);
  expect(position()).toBe(2);
  expect(screen.queryByText('Three sides.')).toBeNull();
  expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();
  expect(scroll).toHaveBeenCalledWith({ y: 0, animated: false });
});

test('screen reader disables swipe paging and exposes equivalent chapter actions with one focus mechanism', async () => {
  jest.mocked(AccessibilityInfo.isScreenReaderEnabled).mockResolvedValue(true);
  await ready();
  expect(pager().props.scrollEnabled).toBe(false);
  expect(AccessibilityInfo.setAccessibilityFocus).not.toHaveBeenCalled();
  await fireEvent(screen.getByTestId('chapter-progress'), 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
  expect(position()).toBe(2);
  expect(screen.getByRole('button', { name: 'Show Answer' })).toBeTruthy();
  expect(AccessibilityInfo.setAccessibilityFocus).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('button', { name: 'Refresh quote' })).toBeNull();
  await fireEvent(screen.getByTestId('chapter-progress'), 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
  expect(position()).toBe(1);
  await fireEvent(screen.getByTestId('chapter-progress'), 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
  expect(position()).toBe(1);
});

test('font-scale change realigns the settled chapter without reloading or hiding its answer', async () => {
  const geometry = jest.spyOn(Native, 'useWindowDimensions');
  geometry.mockReturnValue({ width: 375, height: 667, scale: 2, fontScale: 1 });
  const provider = { load: jest.fn(mock.load) };
  await ready(provider);
  await next();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  const scroll = mockScrollCommands.get('chapter-pager')!.mockClear();
  geometry.mockReturnValue({ width: 375, height: 667, scale: 2, fontScale: 3.2 });
  await screen.rerender(<HomeScreen provider={provider} />);
  await measure('trivia', 1800);
  expect(position()).toBe(2);
  expect(scroll).toHaveBeenCalledWith({ y: 600, animated: false });
  expect(screen.getByRole('button', { name: 'Hide Answer' })).toBeTruthy();
  expect(pager().props.scrollEnabled).toBe(false);
  expect(provider.load).toHaveBeenCalledTimes(5);
});

test('very long Unicode question, attribution and answer stay complete with scalable reachable controls', async () => {
  const text = 'Synthetic reading 🌌 café —\n'.repeat(150);
  const answer = 'Synthetic answer ✨\n'.repeat(120);
  const author = 'Fictional author '.repeat(30);
  const provider: ContentProvider = { async load(id, context) {
    if (id === 'trivia') return { id, title: id, text, answer, author };
    return mock.load(id, context);
  } };
  await ready(provider);
  await next();
  await measure('trivia', 15000);
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  for (const value of [text, answer, `- ${author.trim()}`]) {
    const node = screen.getByText(value.trim());
    expect(node.props.numberOfLines).toBeUndefined();
    expect(node.props.allowFontScaling).not.toBe(false);
    expect(node.props.adjustsFontSizeToFit).not.toBe(true);
  }
  expect(reader('trivia').props.scrollEnabled).toBe(true);
  expect(pager().props.scrollEnabled).toBe(false);
  expect(screen.getByRole('button', { name: 'Hide Answer' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Next chapter, Fact' })).toBeEnabled();
});
