import { mockContentProvider, type ContentProvider } from './content';
import type { LocalTransport } from './localApiNinjas';

export type ContentSource = Readonly<{ provider: ContentProvider; liveLocal: boolean }>;
type LocalSettings = Readonly<{ mode?: string; key?: string; transport?: LocalTransport }>;
const mockSource: ContentSource = { provider: mockContentProvider, liveLocal: false };

/** Expo requires literal process.env.EXPO_PUBLIC_* access for Metro substitution. */
export function createContentSource(settings?: LocalSettings): ContentSource {
  // Do not even read credentials or initialize the live module in production.
  if (!__DEV__) return mockSource;
  const mode = settings ? settings.mode : process.env.EXPO_PUBLIC_CONTENT_MODE;
  if (mode !== 'live-local') return mockSource;
  const key = (settings ? settings.key : process.env.EXPO_PUBLIC_API_KEY)?.trim();
  if (!key || key === 'REPLACE_WITH_NEW_LOCAL_KEY' || !/^[\x21-\x7e]{1,256}$/.test(key)) return mockSource;
  const { createLocalApiNinjasProvider } = require('./localApiNinjas') as typeof import('./localApiNinjas');
  return { provider: createLocalApiNinjasProvider({ key, transport: settings?.transport }), liveLocal: true };
}
