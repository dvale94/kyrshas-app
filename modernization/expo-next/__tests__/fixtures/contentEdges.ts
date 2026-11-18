import type { CardContent, ContentProvider } from '../../src/home/content';

/** Shared by Jest and the external-only simulator entry; never imported by the app. */
export const edgeImage = {
  label: 'Synthetic sunrise over paper hills', sky: '#ffffff', land: '#000000', sun: '#ffff00',
} as const;
export const longText = '“Imagine a paper city,” said the fictional guide.\nCafé paths, naïve robots & curious stars — all invented. '.repeat(8).trim() + '\nEnd of the synthetic story.';
export const longAuthor = 'Fictional Cartographer of the Paper City, Department of Imaginary Paths and Entirely Synthetic Adventures';
export const longTitle = 'Trivia from the imaginary paper city with a deliberately long heading';
export const longQuestion = 'In an imaginary paper city, a guide draws three paths, folds four maps, and labels every invented bridge. '.repeat(4) + '\nWhich shape has exactly three sides?';
export const longAnswer = 'A triangle has three sides. '.repeat(14) + '\nEnd of the synthetic answer.';
export const edgeContents = {
  quote: { id: 'quote', title: 'quote', text: longText, author: longAuthor, image: edgeImage },
  trivia: { id: 'trivia', title: longTitle, text: longQuestion, answer: longAnswer },
  fact: { id: 'fact', title: 'fact', text: 'One.\nTwo.\n三 ✨', author: '   ' },
  'dad joke': { id: 'dad joke', title: 'dad joke', text: 'Why did the fictional map smile?\nIt found its “point” — voilà! \\ No real journeys.' },
  'bucket list item': { id: 'bucket list item', title: 'bucket list item', text: 'Fold a tiny paper boat.\nInvent a name for every imaginary passenger.', image: edgeImage },
} as const satisfies Record<string, CardContent>;
export const edgeProvider: ContentProvider = {
  async load(id) { return edgeContents[id]; },
};
