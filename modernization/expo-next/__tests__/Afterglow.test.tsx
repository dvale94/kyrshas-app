import { AccessibilityInfo, StyleSheet } from 'react-native';
const Native = require('react-native') as typeof import('react-native');
import { configure, fireEvent, render, screen, within } from '@testing-library/react-native';
import { HomeScreen } from '../src/home/HomeScreen';
import { ContentCard } from '../src/home/ContentCard';
import { CardText } from '../src/home/CardText';
import { artwork } from '../src/home/ChapterScene';
import { HOME_CARDS } from '../src/home/fixtures';
import { createMockContentProvider } from '../src/home/content';
import { chapters, colors, touch } from '../src/home/tokens';

const hidden = { includeHiddenElements: true };
beforeEach(() => {
  configure({ defaultIncludeHiddenElements: false });
  jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockResolvedValue(false);
  jest.spyOn(globalThis, 'fetch').mockImplementation(() => { throw new Error('No visual-test network'); });
});
afterEach(() => {
  expect(globalThis.fetch).not.toHaveBeenCalled();
  jest.restoreAllMocks();
});

test('canonical chapter framing stays separate from complete natural-case provider titles', async () => {
  const title = 'A supplied title 🌌\nwith Unicode and ' + 'long wrapping text '.repeat(20);
  await render(<ContentCard card={HOME_CARDS[2]} state={{ status: 'ready', revision: 1, content: { id: 'fact', title, text: 'A complete thought.' } }} onLoad={jest.fn()} />);
  expect(screen.getByRole('header', { name: 'Fact' })).toHaveStyle({ color: chapters.fact.accent });
  expect(screen.getByText(title)).toHaveStyle({ color: colors.secondary });
  expect(screen.getByText(title).props.numberOfLines).toBeUndefined();
  expect(screen.getByText('A complete thought.')).toHaveStyle({ color: colors.primary, fontFamily: 'Georgia' });
  expect(StyleSheet.flatten(screen.getByText('A complete thought.').parent!.props.style).backgroundColor).toBeUndefined();
});

test('every selected location uses its category accent and shape without recoloring inactive segments', async () => {
  await render(<HomeScreen provider={createMockContentProvider({ delayMs: 0 })} />);
  await fireEvent(screen.getByTestId('chapter-viewport'), 'layout', { nativeEvent: { layout: { width: 375, height: 470, x: 0, y: 0 } } });
  for (const [index, card] of HOME_CARDS.entries()) {
    expect(screen.getByTestId('chapter-progress')).toHaveAccessibilityValue({ now: index + 1 });
    expect(screen.getByTestId(`progress-${card.id}`, hidden)).toHaveStyle({ backgroundColor: chapters[card.id].accent, width: 27, height: 5 });
    for (const other of HOME_CARDS.filter(({ id }) => id !== card.id)) {
      expect(screen.getByTestId(`progress-${other.id}`, hidden)).toHaveStyle({ backgroundColor: colors.inactive, width: 20, height: 4 });
    }
    expect(screen.getByTestId(`scene-${card.id}`, hidden)).toHaveProp('source', artwork[card.id]);
    const slot = within(screen.getByTestId(`card-${card.id}`));
    expect(slot.getByRole('header', { name: chapters[card.id].label })).toHaveStyle({ color: chapters[card.id].accent });
    const refreshStyle = StyleSheet.flatten(slot.getByRole('button', { name: `Refresh ${card.title}` }).props.style);
    expect(refreshStyle.minHeight).toBeGreaterThanOrEqual(touch);
    expect(refreshStyle.minWidth).toBeGreaterThanOrEqual(touch);
    if (index < 4) await fireEvent.press(screen.getByTestId('next-chapter'));
  }
  expect(screen.getByTestId('next-chapter')).toBeDisabled();
});

test('art failure keeps midnight canvas and content actions available', async () => {
  await render(<HomeScreen provider={createMockContentProvider({ delayMs: 0 })} />);
  await fireEvent(screen.getByTestId('scene-quote', hidden), 'error');
  expect(screen.queryByTestId('scene-quote', hidden)).toBeNull();
  expect(screen.getByText(HOME_CARDS[0].variants[0].text)).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Refresh quote' })).toBeEnabled();
});

test('compact large text gives navigation labels the full available width', async () => {
  jest.spyOn(Native, 'useWindowDimensions').mockReturnValue({ width: 375, height: 667, scale: 2, fontScale: 3.2 });
  await render(<HomeScreen provider={createMockContentProvider({ delayMs: 0 })} />);
  expect(screen.getByTestId('chapter-navigation')).toHaveStyle({ flexDirection: 'column' });
  for (const id of ['previous-chapter', 'next-chapter']) {
    expect(screen.getByTestId(id)).toHaveStyle({ flex: 0, minWidth: 48, minHeight: 48 });
  }
});

test('revealed answer has a luminous labeled surface and complete readable text', async () => {
  const answer = 'A complete answer ✨\n' + 'More detail. '.repeat(80);
  await render(<CardText text="A question?" answer={answer} />);
  expect(screen.queryByText(answer)).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: 'Show Answer' }));
  expect(screen.getByText('Answer')).toHaveStyle({ color: chapters.trivia.accent });
  expect(screen.getByText(answer)).toHaveStyle({ color: colors.primary, fontSize: 26, lineHeight: 35 });
  expect(screen.getByText(answer).parent).toHaveStyle({ borderColor: chapters.trivia.accent });
  expect(screen.getByText(answer).props.numberOfLines).toBeUndefined();
  expect(screen.getByRole('button', { name: 'Hide Answer' })).toHaveStyle({ minHeight: 48, minWidth: 48, borderColor: chapters.trivia.accent });
});

test('safe error, retry and busy affordances retain readable dark surfaces and practical targets', async () => {
  const load = jest.fn();
  const card = HOME_CARDS[0];
  await render(<ContentCard card={card} state={{ status: 'error', revision: 0 }} onLoad={load} />);
  expect(screen.getByRole('alert')).toHaveStyle({ color: colors.error, backgroundColor: colors.surface });
  const retry = screen.getByRole('button', { name: 'Retry quote' });
  expect(retry).toHaveStyle({ minHeight: 48, minWidth: 48 });
  expect(screen.getByText('Retry')).toBeTruthy();
  await fireEvent.press(retry);
  expect(load).toHaveBeenCalledTimes(1);
  await screen.rerender(<ContentCard card={card} state={{ status: 'loading', revision: 0 }} onLoad={load} />);
  expect(screen.getByRole('button', { name: 'Refresh quote', busy: true })).toBeDisabled();
  expect(screen.getByTestId('busy-quote').props.color).toBe(chapters.quote.accent);
  expect(screen.getByText('Loading quote…')).toHaveStyle({ color: colors.secondary });
});
