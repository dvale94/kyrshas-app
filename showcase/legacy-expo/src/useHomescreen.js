import { useEffect, useState } from 'react';

// Synthetic stand-ins for the original ApiProvider responses; no network or credentials.
const fixtures = [
  { key: 'quoteContent', id: 'quote', title: 'quote', image: require('../assets/quote.jpg'), values: [
    { text: '"A small step can start a great journey."', author: 'A Friend' },
    { text: '"Every day has room for a little wonder."', author: 'A Friend' }
  ] },
  { key: 'triviaContent', id: 'trivia', title: 'trivia', values: [
    { text: 'Which planet is known as the Red Planet?', answer: 'Mars' },
    { text: 'How many sides does a hexagon have?', answer: 'Six' }
  ] },
  { key: 'factContent', id: 'fact', title: 'fact', image: require('../assets/fact.jpg'), values: [
    { text: 'Octopuses have three hearts.' }, { text: 'Honeybees communicate through movement.' }
  ] },
  { key: 'dadJokeContent', id: 'dad joke', title: 'dad joke', values: [
    { text: 'Why did the bicycle take a nap? It was two-tired.' },
    { text: 'What do you call a sleeping bull? A bulldozer.' }
  ] },
  { key: 'bucketListContent', id: 'bucket list item', title: 'bucket list item', image: require('../assets/bucket-list.jpg'), values: [
    { text: 'Watch a sunrise from a new place.' }, { text: 'Try a new recipe with a friend.' }
  ] }
];

export function useHomeScreen() {
  const [revisions, setRevisions] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(fixtures.map(({ key, values, ...card }) => ({
      ...card,
      ...values[(revisions[key] || 0) % values.length],
      onRefresh: async () => setRevisions(previous => ({ ...previous, [key]: (previous[key] || 0) + 1 }))
    })));
  }, [revisions]);
  return { data };
}
