import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { TextContainer } from '../src/screens/HomeScreen/components/TextContainer';
import { ContentContainer } from '../src/screens/HomeScreen/components/ContentContainer';

jest.mock('@expo/vector-icons', () => ({ FontAwesome: 'FontAwesome' }));
import { useHomeScreen } from '../src/screens/HomeScreen/useHomescreen';

function ContentFixture({ onData }) {
  const { data } = useHomeScreen();
  onData(data);
  return null;
}

test('trivia answer starts hidden and toggles', async () => {
  await render(<TextContainer text='Question' answer='Mars' />);
  expect(screen.queryByText('- Mars -')).toBeNull();
  await fireEvent.press(screen.getByText('Show Answer:'));
  expect(screen.getByText('- Mars -')).toBeTruthy();
  await fireEvent.press(screen.getByText('Hide Answer:'));
  expect(screen.queryByText('- Mars -')).toBeNull();
});

test('failed image falls back to readable content', async () => {
  const image = { revision: 0, source: { uri: 'https://example.test/image' } };
  await render(<ContentContainer title='quote' text='Hello' image={image} onRefresh={async () => {}} />);
  await fireEvent(screen.getByTestId('legacy-card-image'), 'error');
  expect(screen.queryByTestId('legacy-card-image')).toBeNull();
  expect(screen.getByText('Hello')).toBeTruthy();
});

test('cards retain original order, imagery and independent refresh', async () => {
  process.env.EXPO_PUBLIC_API_KEY = 'synthetic-test-key';
  let cards = [];
  await render(<ContentFixture onData={data => { cards = data; }} />);
  await waitFor(() => expect(cards.map(card => card.id)).toEqual(['quote', 'trivia', 'fact', 'dad joke', 'bucket list item']));
  expect(cards.map(card => Boolean(card.image))).toEqual([true, false, true, false, true]);
  expect(cards[0].image.source.uri).toBe('https://api.api-ninjas.com/v1/randomimage');
  expect(cards[0].image.source.headers).toEqual({ 'X-Api-Key': 'synthetic-test-key', Accept: 'image/jpg' });
  const first = cards[0].text;
  const other = cards[1].text;
  await act(async () => { await cards[0].onRefresh(); });
  await waitFor(() => expect(cards[0].text).not.toBe(first));
  expect(cards[1].text).toBe(other);
});
