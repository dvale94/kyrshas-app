// Synthetic acceptance fixture. Copy/use only in an external Metro workspace;
// the production App entry never imports this module. No transport or credentials.
import { HomeScreen } from '../../src/home/HomeScreen';
import { normalizeContent, type ContentProvider } from '../../src/home/content';

const body = Array.from({ length: 40 }, (_, index) => `Synthetic line ${index + 1}: café, 三, 🌌 and a quiet imaginary path.`).join('\n');
const answer = Array.from({ length: 24 }, (_, index) => `Synthetic answer line ${index + 1}: ✨ curiosity.`).join('\n');
let triviaFailed = false;
const provider: ContentProvider = { async load(id, context) {
  if (id === 'trivia' && context.revision > 0 && !triviaFailed) {
    triviaFailed = true;
    throw new Error('Synthetic failure; never display this payload.');
  }
  return normalizeContent(id, {
    id, title: id,
    text: id === 'fact' ? `${body}\nEND OF SYNTHETIC BODY` : id === 'trivia' ? 'Synthetic question?' : `Short synthetic ${id}.`,
    ...(id === 'fact' ? { author: 'Fictional author — complete attribution END OF AUTHOR' } : {}),
    ...(id === 'trivia' ? { answer: `${answer}\nEND OF SYNTHETIC ANSWER` } : {}),
  });
} };

export default function PagingFixture() { return <HomeScreen provider={provider} />; }
