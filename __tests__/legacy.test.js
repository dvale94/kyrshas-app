import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { fetch } from 'expo/fetch';
import { TextContainer } from '../src/screens/HomeScreen/components/TextContainer';
import { ContentContainer } from '../src/screens/HomeScreen/components/ContentContainer';
import { useHomeScreen } from '../src/screens/HomeScreen/useHomescreen';

jest.mock('@expo/vector-icons', () => ({ FontAwesome: 'FontAwesome' }));
jest.mock('expo/fetch', () => ({ fetch: jest.fn() }));

function ContentFixture({ onData }) {
  const { data } = useHomeScreen();
  onData(data);
  return null;
}

beforeEach(() => {
  process.env.EXPO_PUBLIC_API_KEY = 'synthetic-test-key';
  fetch.mockReset();
  fetch.mockImplementation(async url => ({ ok: true, json: async () => {
    if (url.endsWith('/v2/randomquotes')) return [{ quote: 'A real quote', author: 'A writer' }];
    if (url.endsWith('/v1/trivia')) return [{ question: 'A question?', answer: 'An answer' }];
    if (url.endsWith('/v1/facts')) return [{ fact: 'A fact' }];
    if (url.endsWith('/v1/dadjokes')) return [{ joke: 'A joke' }];
    if (url.endsWith('/v1/bucketlist')) return { item: 'A goal' };
    throw new Error('Unexpected route');
  }}));
});

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

test('loads free-tier live content in original order and refreshes independently', async () => {
  let shown = [];
  await render(<ContentFixture onData={data => { shown = data; }} />);
  await waitFor(() => expect(shown.map(card => card.text)).toEqual(['"A real quote"', 'A question?', 'A fact', 'A joke', 'A goal']));
  expect(shown.map(card => card.id)).toEqual(['quote', 'trivia', 'fact', 'dad joke', 'bucket list item']);
  expect(shown[0].author).toBe('A writer');
  expect(shown[1].answer).toBe('An answer');
  expect(shown.map(card => Boolean(card.image))).toEqual([true, false, true, false, true]);
  expect(fetch).toHaveBeenCalledTimes(5);
  expect(fetch.mock.calls.every(([, init]) => init.headers['X-Api-Key'] === 'synthetic-test-key' && init.redirect === 'error')).toBe(true);
  expect(fetch.mock.calls.find(([url]) => url.endsWith('/v1/trivia'))).toBeTruthy();
  fetch.mockImplementationOnce(async () => ({ ok: true, json: async () => [{ quote: 'Another quote', author: 'Another writer' }] }));
  await act(async () => { await shown[0].onRefresh(); });
  await waitFor(() => expect(shown[0].text).toBe('"Another quote"'));
  expect(shown[1].text).toBe('A question?');
  expect(fetch).toHaveBeenCalledTimes(6);
});

test('a failing provider does not block other cards or expose errors', async () => {
  const normalFetch = fetch.getMockImplementation();
  fetch.mockImplementation((url, init) => url.endsWith('/v1/facts') ? Promise.reject(new Error('private failure')) : normalFetch(url, init));
  let shown = [];
  await render(<ContentFixture onData={data => { shown = data; }} />);
  await waitFor(() => expect(shown[2].text).toBe('Content unavailable. Tap refresh to try again.'));
  await waitFor(() => expect(shown[0].text).toBe('"A real quote"'));
});
