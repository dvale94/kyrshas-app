import { act, render, screen, userEvent, within } from '@testing-library/react-native';
import { configure } from '@testing-library/react-native';
import App from '../App';
import { HomeScreen } from '../src/home/HomeScreen';
import { ContentCard } from '../src/home/ContentCard';
import { CardText } from '../src/home/CardText';
import { HOME_CARDS } from '../src/home/fixtures';
import { createMockContentProvider, normalizeContent, type CardId, type ContentProvider } from '../src/home/content';

let network: jest.SpyInstance;
let xhr: jest.Mock;
const originalXhr = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
beforeEach(() => {
  // Data/presentation regressions inspect all mounted slots; Paging tests verify active-only focus.
  configure({ defaultIncludeHiddenElements: true });
  jest.useFakeTimers();
  network = jest.spyOn(globalThis, 'fetch').mockImplementation(() => {
    throw new Error('Synthetic cards must never request network content');
  });
  xhr = jest.fn(() => { throw new Error('Synthetic cards must never request network content'); });
  Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: xhr });
});
afterEach(async () => {
  try {
    await act(async () => { jest.runOnlyPendingTimers(); });
    expect(network).not.toHaveBeenCalled();
    expect(xhr).not.toHaveBeenCalled();
  } finally {
    jest.restoreAllMocks();
    if (originalXhr) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXhr);
    else Reflect.deleteProperty(globalThis, 'XMLHttpRequest');
    jest.useRealTimers();
  }
});

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const cardIds = () => screen.getAllByTestId(/^card-/).map((node) => node.props.testID);
const expectedIds = ['card-quote', 'card-trivia', 'card-fact', 'card-dad joke', 'card-bucket list item'];
const settleDemo = () => act(async () => { jest.advanceTimersByTime(650); });
async function renderLoaded() {
  await render(<App />);
  await settleDemo();
}
function refreshingProvider(complete: (id: CardId) => Promise<void>): ContentProvider {
  const mock = createMockContentProvider({ delayMs: 0 });
  return { async load(id, context) {
    if (context.revision > 0) await complete(id);
    return mock.load(id, context);
  } };
}

test('renders the branded normal-day feed in exact legacy order with conditional images and author', async () => {
  await renderLoaded();
  expect(screen.getByRole('header', { name: "Kyrsha's App" })).toBeTruthy();
  expect(screen.getByText('Offline demo · synthetic content')).toBeTruthy();
  expect(cardIds()).toEqual(expectedIds);
  expect(screen.getAllByRole('header').map((node) => node.props.children)).toEqual([
    "Kyrsha's App", 'Quote', 'Trivia', 'Fact', 'Dad Joke', 'Bucket List Item',
  ]);
  for (const id of ['quote', 'fact', 'bucket list item']) expect(within(screen.getByTestId(`card-${id}`)).getByRole('image')).toBeTruthy();
  for (const id of ['trivia', 'dad joke']) expect(within(screen.getByTestId(`card-${id}`)).queryByRole('image')).toBeNull();
  expect(screen.getAllByRole('image')).toHaveLength(3);
  expect(screen.getAllByText('- Demo Author')).toHaveLength(1);
  expect(screen.getAllByRole('button', { name: /^Refresh / })).toHaveLength(5);
  expect(screen.getAllByRole('button', { name: 'Show Answer' })).toHaveLength(1);
  expect(screen.queryByText(/birthday/i)).toBeNull();
});

test('retains baseline offline trivia: initially hidden, reveals and hides with accessible state', async () => {
  await renderLoaded();
  expect(screen.getByText('How many sides does a triangle have?')).toBeTruthy();
  expect(screen.queryByText('Three sides.')).toBeNull();
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Show Answer', expanded: false }));
  expect(screen.getByText('Three sides.')).toBeTruthy();
  await user.press(screen.getByRole('button', { name: 'Hide Answer', expanded: true }));
  expect(screen.queryByText('Three sides.')).toBeNull();
  expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();
});

test('quote refresh shows busy/disabled state, rotates deterministically and preserves other cards and IDs', async () => {
  await renderLoaded();
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Show Answer' }));
  const otherContents = HOME_CARDS.slice(1).map((card) => card.variants[0].text);
  await user.press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(screen.getByRole('button', { name: 'Refresh quote', busy: true, disabled: true })).toBeTruthy();
  expect(screen.getByTestId('busy-quote')).toBeTruthy();
  expect(screen.queryByTestId('busy-trivia')).toBeNull();
  expect(screen.getByText('Refreshing quote…').props.accessibilityLiveRegion).toBe('polite');
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
  await settleDemo();
  expect(screen.getByRole('button', { name: 'Refresh quote', busy: false, disabled: false })).toBeTruthy();
  expect(screen.queryByTestId('busy-quote')).toBeNull();
  expect(screen.getByText(HOME_CARDS[0].variants[1].text)).toBeTruthy();
  for (const text of otherContents) expect(screen.getByText(text)).toBeTruthy();
  expect(screen.getByText('Three sides.')).toBeTruthy();
  expect(cardIds()).toEqual(expectedIds);
  await user.press(screen.getByRole('button', { name: 'Refresh quote' }));
  await settleDemo();
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
});

test('refreshing trivia hides the previous answer and exposes the new matching answer', async () => {
  await renderLoaded();
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Show Answer' }));
  await user.press(screen.getByRole('button', { name: 'Refresh trivia' }));
  await settleDemo();
  expect(screen.getByText('How many corners does a square have?')).toBeTruthy();
  expect(screen.queryByText('Three sides.')).toBeNull();
  expect(screen.queryByText('Four corners.')).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Show Answer', expanded: false }));
  expect(screen.getByText('Four corners.')).toBeTruthy();
  expect(cardIds()).toEqual(expectedIds);
});

test('prevents duplicate in-flight refresh and retains scoped busy state for overlapping cards', async () => {
  const quote = deferred();
  const fact = deferred();
  const complete = jest.fn((id: CardId) => id === 'quote' ? quote.promise : fact.promise);
  await render(<HomeScreen provider={refreshingProvider(complete)} />);
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Refresh quote' }));
  await user.press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(complete).toHaveBeenCalledTimes(1);
  await user.press(screen.getByRole('button', { name: 'Refresh fact' }));
  expect(screen.getAllByRole('button', { busy: true, disabled: true })).toHaveLength(2);
  await act(async () => { quote.resolve(); });
  expect(screen.getByText(HOME_CARDS[0].variants[1].text)).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Refresh fact', busy: true })).toBeTruthy();
  expect(screen.getByText(HOME_CARDS[2].variants[0].text)).toBeTruthy();
  await act(async () => { fact.resolve(); });
  expect(screen.getByText(HOME_CARDS[2].variants[1].text)).toBeTruthy();
  expect(screen.queryAllByRole('button', { busy: true })).toHaveLength(0);
});

test('rejection retains content and answer, clears busy, hides error payload and permits retry', async () => {
  const attempt = deferred();
  const complete = jest.fn().mockImplementationOnce(() => attempt.promise).mockResolvedValue(undefined);
  await render(<HomeScreen provider={refreshingProvider(complete)} />);
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Show Answer' }));
  await user.press(screen.getByRole('button', { name: 'Refresh trivia' }));
  await act(async () => { attempt.reject(new Error('synthetic-internal-detail')); });
  expect(screen.getByRole('alert')).toHaveTextContent('Could not refresh this example. Use Retry trivia to try again.');
  expect(screen.queryByText('synthetic-internal-detail')).toBeNull();
  expect(screen.getByText('Three sides.')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Retry trivia', busy: false, disabled: false })).toBeTruthy();
  expect(screen.queryByTestId('busy-trivia')).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Retry trivia' }));
  expect(complete).toHaveBeenCalledTimes(2);
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByText('How many corners does a square have?')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();
});

test('a synchronous refresh failure also leaves the card usable', async () => {
  await render(<HomeScreen provider={refreshingProvider(() => { throw new Error('demo failure'); })} />);
  await userEvent.setup().press(screen.getByRole('button', { name: 'Refresh quote' }));
  expect(screen.getByRole('alert')).toBeTruthy();
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Retry quote', busy: false, disabled: false })).toBeTruthy();
});

test.each([0, 1, 2, 3, 4])('card %i rotates through local examples with its identity and presentation intact', async (index) => {
  const card = HOME_CARDS[index]!;
  await renderLoaded();
  await userEvent.setup().press(screen.getByRole('button', { name: `Refresh ${card.title}` }));
  await settleDemo();
  const slot = within(screen.getByTestId(`card-${card.id}`));
  expect(slot.getByText(card.variants[1].text)).toBeTruthy();
  expect(slot.queryAllByRole('image')).toHaveLength('image' in card.variants[1] ? 1 : 0);
});

test('long body and attribution are complete, grow naturally and have no line truncation', async () => {
  const longText = 'A synthetic example can span many lines without losing its meaning. '.repeat(35).trim();
  const author = 'A fictional author with a deliberately long attribution for layout checks';
  const card = HOME_CARDS[0];
  const content = normalizeContent(card.id, { id: card.id, title: card.title, text: longText, author, image: card.variants[0].image });
  await render(<ContentCard card={card} state={{ status: 'ready', revision: 1, content }} onLoad={jest.fn()} />);
  expect(screen.getByText(longText).props.numberOfLines).toBeUndefined();
  expect(screen.getByText(`- ${author}`).props.numberOfLines).toBeUndefined();
  expect(screen.getByRole('image')).toBeTruthy();
});

test.each([undefined, '', '   '])('empty optional author and answer %p create no empty controls', async (optional) => {
  await render(<CardText text="A plain synthetic panel." author={optional} answer={optional} />);
  expect(screen.getByText('A plain synthetic panel.')).toBeTruthy();
  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.queryAllByRole('image')).toHaveLength(0);
  expect(screen.queryByText(/^-/)).toBeNull();
});

test('card without optional image or attribution uses a readable plain panel', async () => {
  const card = HOME_CARDS[2];
  const content = normalizeContent('fact', { id: 'fact', title: card.title, text: 'Synthetic text only.' });
  await render(<ContentCard card={card} state={{ status: 'ready', revision: 1, content }} onLoad={jest.fn()} />);
  expect(screen.getByText('Synthetic text only.')).toBeTruthy();
  expect(screen.queryByRole('image')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Show Answer' })).toBeNull();
});
