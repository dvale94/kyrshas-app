import { HomeScreen } from '../../src/home/HomeScreen';
import { normalizeContent, type CardContent, type CardId, type ContentProvider } from '../../src/home/content';

// External simulator entry only. The production provider never imports board copy.
const copy: Record<CardId, Omit<CardContent, 'id' | 'title'>> = {
  quote: { text: '“The best adventures often begin with curiosity.”', author: 'Unknown' },
  trivia: { text: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  fact: { text: 'Octopuses have three hearts, nine brains, and blue blood.' },
  'dad joke': { text: 'Why don’t skeletons fight each other?\n\nBecause they don’t have the guts.' },
  'bucket list item': { text: 'Watch the sunrise from a mountain peak.' },
};
let failedJoke = false;
const provider: ContentProvider = { async load(id, { revision }) {
  if (id === 'fact' && revision === 0) await new Promise(resolve => setTimeout(resolve, 20000));
  if (id === 'quote' && revision > 0) await new Promise(resolve => setTimeout(resolve, 7000));
  if (id === 'dad joke' && revision > 0 && !failedJoke) {
    failedJoke = true;
    throw new Error('Synthetic refresh error');
  }
  const item = { id, title: id, ...copy[id] };
  if (id === 'fact' && revision > 0) item.text = 'An extended synthetic field note about the reef. '.repeat(26) + 'End of field note.';
  return normalizeContent(id, item);
} };

export default function ConceptFixture() { return <HomeScreen provider={provider} />; }
