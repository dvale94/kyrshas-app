import { HOME_CARDS, type CardId, type PlaceholderImage } from './fixtures';

export type { CardId } from './fixtures';

type ContentFields = Readonly<{
  title: string;
  text: string;
  author?: string;
  image?: PlaceholderImage;
}>;

export type CardContent = ContentFields & (
  | Readonly<{ id: 'trivia'; answer: string }>
  | Readonly<{ id: Exclude<CardId, 'trivia'>; answer?: never }>
);

export interface ContentProvider {
  /** revision counts successful loads only; failed attempts retry the same example. */
  load(id: CardId, context: Readonly<{ revision: number }>): Promise<CardContent>;
}

function requiredText(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Invalid content');
  return value.trim();
}

/** Validate even typed providers at the seam; copy only known display fields. */
export function normalizeContent(id: CardId, value: unknown): CardContent {
  if (!value || typeof value !== 'object') throw new Error('Invalid content');
  const data = value as Record<string, unknown>;
  if (data.id !== id) throw new Error('Invalid content identity');
  const title = requiredText(data.title);
  const text = requiredText(data.text);
  const author = data.author === undefined ? undefined : (
    typeof data.author === 'string' ? data.author.trim() || undefined : requiredText(data.author)
  );
  let image: PlaceholderImage | undefined;
  if (data.image !== undefined) {
    if (!data.image || typeof data.image !== 'object') throw new Error('Invalid image');
    const raw = data.image as Record<string, unknown>;
    const color = (value: unknown) => {
      if (typeof value !== 'string' || !/^#[\da-f]{6}$/i.test(value)) throw new Error('Invalid image');
      return value;
    };
    image = { label: requiredText(raw.label), sky: color(raw.sky), land: color(raw.land), sun: color(raw.sun) };
  }
  const fields = { title, text, author, image };
  if (id === 'trivia') return { ...fields, id, answer: requiredText(data.answer) };
  if (data.answer !== undefined) throw new Error('Unexpected answer');
  return { ...fields, id };
}

/** All delay belongs to this in-process demonstration provider, never the UI. */
export function createMockContentProvider({ delayMs = 650, wait }: {
  delayMs?: number;
  wait?: () => Promise<void>;
} = {}): ContentProvider {
  if (!Number.isFinite(delayMs) || delayMs < 0) throw new Error('Invalid mock delay');
  return {
    async load(id, { revision }) {
      if (wait) await wait();
      else if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
      const card = HOME_CARDS.find((card) => card.id === id)!;
      const variant = card.variants[revision % card.variants.length];
      return normalizeContent(id, { ...variant, id, title: card.title });
    },
  };
}

export const mockContentProvider = createMockContentProvider();
