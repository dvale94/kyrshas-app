import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ContentContainer } from '../src/ContentContainer';
import { TextContainer } from '../src/TextContainer';
import { useHomeScreen } from '../src/useHomescreen';

jest.mock('@expo/vector-icons', () => ({ FontAwesome: 'FontAwesome' }));

function ContentFixture({ onData }) {
  const result = useHomeScreen();
  onData(result.data);
  return null;
}

test('trivia answer starts hidden and toggles', async () => {
  await render(<TextContainer text="Question" answer="Mars" />);
  expect(screen.queryByText('- Mars -')).toBeNull();
  await fireEvent.press(screen.getByText('Show Answer:'));
  expect(screen.getByText('- Mars -')).toBeTruthy();
  await fireEvent.press(screen.getByText('Hide Answer:'));
  expect(screen.queryByText('- Mars -')).toBeNull();
});

test('image-backed cards render their bundled image', async () => {
  const source = require('../assets/quote.jpg');
  await render(<ContentContainer title="quote" text="Hello" image={source} onRefresh={async () => {}} />);
  expect(screen.getByTestId('legacy-card-image').props.source).toEqual(source);
});

test('fixtures retain original order and refresh one category deterministically', async () => {
  let cards = [];
  await render(<ContentFixture onData={data => { cards = data; }} />);
  await waitFor(() => expect(cards.map(card => card.id)).toEqual(['quote', 'trivia', 'fact', 'dad joke', 'bucket list item']));
  expect(cards.map(card => Boolean(card.image))).toEqual([true, false, true, false, true]);
  const originalQuote = cards[0].text;
  const originalTrivia = cards[1].text;
  await require('@testing-library/react-native').act(async () => { await cards[0].onRefresh(); });
  await waitFor(() => expect(cards[0].text).not.toBe(originalQuote));
  expect(cards[1].text).toBe(originalTrivia);
});
