import { useEffect, useState } from 'react';

// Text stays local; each image card requests an unfiltered image from API Ninjas.
const fixtures = [
  { key: 'quoteContent', id: 'quote', title: 'quote', hasImage: true, values: [
    { text: '"A small step can start a great journey."', author: 'A Friend' },
    { text: '"Every day has room for a little wonder."', author: 'A Friend' }
  ] },
  { key: 'triviaContent', id: 'trivia', title: 'trivia', values: [
    { text: 'Which planet is known as the Red Planet?', answer: 'Mars' },
    { text: 'How many sides does a hexagon have?', answer: 'Six' }
  ] },
  { key: 'factContent', id: 'fact', title: 'fact', hasImage: true, values: [
    { text: 'Octopuses have three hearts.' }, { text: 'Honeybees communicate through movement.' }
  ] },
  { key: 'dadJokeContent', id: 'dad joke', title: 'dad joke', values: [
    { text: 'Why did the bicycle take a nap? It was two-tired.' },
    { text: 'What do you call a sleeping bull? A bulldozer.' }
  ] },
  { key: 'bucketListContent', id: 'bucket list item', title: 'bucket list item', hasImage: true, values: [
    { text: 'Watch a sunrise from a new place.' }, { text: 'Try a new recipe with a friend.' }
  ] }
];

export function useHomeScreen() {
  const [revisions, setRevisions] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    setData(fixtures.map(({ key, values, hasImage, ...card }) => {
      const revision = revisions[key] || 0;
      return {
        ...card,
        ...values[revision % values.length],
        image: hasImage && apiKey ? {
          revision,
          source: { uri: 'https://api.api-ninjas.com/v1/randomimage', headers: { 'X-Api-Key': apiKey, Accept: 'image/jpg' }, cache: 'reload' }
        } : null,
        onRefresh: async () => setRevisions(previous => ({ ...previous, [key]: (previous[key] || 0) + 1 }))
      };
    }));
  }, [revisions]);
  return { data };
}
