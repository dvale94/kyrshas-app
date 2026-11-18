export type CardId = 'quote' | 'trivia' | 'fact' | 'dad joke' | 'bucket list item';

/** Optional locally drawn artwork: nonblank accessible label and #RRGGBB colors.
 * Omit image for a text-only panel. Invalid supplied metadata is a card error.
 * This is a synthetic placeholder, not a remote URI/base64/photo contract.
 */
export type PlaceholderImage = Readonly<{
  label: string;
  sky: string;
  land: string;
  sun: string;
}>;

type Content = Readonly<{
  text: string;
  author?: string;
  image?: PlaceholderImage;
}>;

export type CardFixture =
  | Readonly<{ id: 'trivia'; title: string; variants: readonly [Content & { answer: string }, ...(Content & { answer: string })[]] }>
  | Readonly<{ id: Exclude<CardId, 'trivia'>; title: string; variants: readonly [Content & { answer?: never }, ...(Content & { answer?: never })[]] }>;

const landscape = {
  label: 'Synthetic landscape placeholder', sky: '#829b85', land: '#405b42', sun: '#f2d694',
} as const;
const shapes = {
  label: 'Synthetic abstract shapes placeholder', sky: '#738c95', land: '#385b67', sun: '#e5cc9c',
} as const;
const horizon = {
  label: 'Synthetic horizon placeholder', sky: '#9b9682', land: '#53634a', sun: '#f3db9a',
} as const;

/** Canonical normal-day order and legacy IDs. Fixed variants; no clock or randomness. */
export const HOME_CARDS = [
  {
    id: 'quote', title: 'quote', variants: [
      { text: '“Small steps can open new paths.”', author: 'Demo Author', image: landscape },
      { text: '“Make room for a little curiosity.”', author: 'Demo Author', image: landscape },
    ],
  },
  {
    id: 'trivia', title: 'trivia', variants: [
      { text: 'How many sides does a triangle have?', answer: 'Three sides.' },
      { text: 'How many corners does a square have?', answer: 'Four corners.' },
    ],
  },
  {
    id: 'fact', title: 'fact', variants: [
      { text: 'A week contains seven days.', image: shapes },
      { text: 'An hour contains sixty minutes.', image: shapes },
    ],
  },
  {
    id: 'dad joke', title: 'dad joke', variants: [
      { text: 'Why did the notebook take a break? It needed a new page.' },
      { text: 'Why was the ruler calm? It knew its limits.' },
    ],
  },
  {
    id: 'bucket list item', title: 'bucket list item', variants: [
      { text: 'Make a paper boat and invent a story for its voyage.', image: horizon },
      { text: 'Draw a map of an imaginary island.', image: horizon },
    ],
  },
] as const satisfies readonly CardFixture[];
