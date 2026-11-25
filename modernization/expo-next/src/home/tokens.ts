import { Platform } from 'react-native';
import type { CardId } from './content';

/** Concrete opaque surfaces: text contrast never depends on artwork. */
export const colors = {
  canvas: '#0B1026',
  surface: '#161D3D',
  elevated: '#24224D',
  primary: '#FFF8F5',
  secondary: '#D8D2EC',
  inactive: '#8E88B2',
  stroke: '#D8D2EC',
  error: '#FFAF9E',
  pressed: '#302D5C',
} as const;

export const chapters: Record<CardId, { label: string; accent: string }> = {
  quote: { label: 'Quote', accent: '#DAB7FF' },
  trivia: { label: 'Trivia', accent: '#F3A6FF' },
  fact: { label: 'Fact', accent: '#6EE7EF' },
  'dad joke': { label: 'Dad Joke', accent: '#FFAF9E' },
  'bucket list item': { label: 'Bucket List Item', accent: '#DCBCFF' },
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, quiet: 48 } as const;
export const radius = { panel: 20, status: 16, pill: 999, control: 24 } as const;
export const touch = 48;
const readingFamily = Platform.select({ ios: 'Georgia', android: 'serif', default: undefined });
export const type = {
  title: { fontSize: 24, lineHeight: 31, fontFamily: readingFamily },
  body: { fontSize: 28, lineHeight: 37, fontFamily: readingFamily },
  answer: { fontSize: 26, lineHeight: 35, fontFamily: readingFamily },
  secondary: { fontSize: 17, lineHeight: 25 },
  label: { fontSize: 16, lineHeight: 22 },
  button: { fontSize: 17, lineHeight: 24 },
} as const;
