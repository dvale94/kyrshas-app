import { normalizeContent, type CardContent, type CardId, type ContentProvider } from './content';

const ORIGIN = 'https://api.api-ninjas.com';
const MAX_BYTES = 16 * 1024;
const MAX_TEXT = 2000;
const DEADLINE_MS = 8000;
const SAFE_ERROR = 'Content unavailable. Please try again.';
const QUOTE_TOPICS = ['courage', 'happiness', 'inspirational', 'life', 'love'] as const;

type Reader = {
  read(): Promise<{ done: boolean; value?: Uint8Array }>;
  cancel(): Promise<void>;
};
export type LocalResponse = Readonly<{
  status: number;
  url: string;
  redirected: boolean;
  headers: { get(name: string): string | null };
  body: { getReader(): Reader } | null;
}>;
export type LocalTransport = (url: string, init: Readonly<{
  method: 'GET';
  headers: Readonly<Record<string, string>>;
  redirect: 'error';
  credentials: 'omit';
  cache: 'no-store';
  signal: AbortSignal;
}>) => Promise<LocalResponse>;

// Use Expo's native redirect policy and streams, never legacy RN/XHR fetch.
const expoTransport: LocalTransport = (url, init) => {
  const { fetch } = require('expo/fetch') as typeof import('expo/fetch');
  return fetch(url, init);
};

function requestUrl(id: CardId): string {
  const topic = (values: readonly string[]) => values[Math.floor(Math.random() * values.length)];
  switch (id) {
    case 'quote': return `${ORIGIN}/v2/randomquotes?categories=${topic(QUOTE_TOPICS)}`;
    case 'trivia': return `${ORIGIN}/v1/trivia`;
    case 'fact': return `${ORIGIN}/v1/facts`;
    case 'dad joke': return `${ORIGIN}/v1/dadjokes`;
    case 'bucket list item': return `${ORIGIN}/v1/bucketlist`;
    default: throw new Error(SAFE_ERROR);
  }
}

function mapContent(id: CardId, payload: unknown, key: string): CardContent {
  let raw = payload;
  if (id !== 'bucket list item') {
    if (!Array.isArray(payload) || payload.length !== 1) throw new Error(SAFE_ERROR);
    raw = payload[0];
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(SAFE_ERROR);
  const record = raw as Record<string, unknown>;
  const text = (value: unknown): string => {
    if (typeof value !== 'string' || !value.trim() || value.length > MAX_TEXT || value.includes(key)) {
      throw new Error(SAFE_ERROR);
    }
    return value.trim();
  };
  const fields = { id, title: id };
  switch (id) {
    case 'quote': return normalizeContent(id, {
      ...fields, text: text(record.quote),
      author: record.author === undefined || record.author === '' ? undefined : text(record.author),
    });
    case 'trivia': return normalizeContent(id, { ...fields, text: text(record.question), answer: text(record.answer) });
    case 'fact': return normalizeContent(id, { ...fields, text: text(record.fact) });
    case 'dad joke': return normalizeContent(id, { ...fields, text: text(record.joke) });
    case 'bucket list item': return normalizeContent(id, { ...fields, text: text(record.item) });
  }
}

/** Local experiment only. Never construct with a real key in tests or artifacts. */
export function createLocalApiNinjasProvider(options: {
  key: string;
  transport?: LocalTransport;
}): ContentProvider {
  // This second gate prevents direct factory callers bypassing app selection.
  if (!__DEV__) throw new Error(SAFE_ERROR);
  const key = options.key.trim();
  if (key === 'REPLACE_WITH_NEW_LOCAL_KEY' || !/^[\x21-\x7e]{1,256}$/.test(key)) throw new Error(SAFE_ERROR);
  const transport = options.transport ?? expoTransport;
  const pending = new Map<CardId, Promise<CardContent>>();

  async function request(id: CardId): Promise<CardContent> {
    const controller = new AbortController();
    let reader: Reader | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(SAFE_ERROR));
        controller.abort();
      }, DEADLINE_MS);
    });
    try {
      const operation = async () => {
        const url = requestUrl(id);
        const response = await transport(url, {
          method: 'GET', headers: { Accept: 'application/json', 'X-Api-Key': key },
          redirect: 'error', credentials: 'omit', cache: 'no-store', signal: controller.signal,
        });
        if (controller.signal.aborted) throw new Error(SAFE_ERROR);
        if (response.status !== 200 || response.redirected || response.url !== url) throw new Error(SAFE_ERROR);
        if (!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type') ?? '')) throw new Error(SAFE_ERROR);
        const length = response.headers.get('content-length');
        if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_BYTES)) throw new Error(SAFE_ERROR);
        if (!response.body) throw new Error(SAFE_ERROR);
        reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let size = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (controller.signal.aborted) throw new Error(SAFE_ERROR);
          if (done) break;
          if (!(value instanceof Uint8Array)) throw new Error(SAFE_ERROR);
          size += value.byteLength;
          if (size > MAX_BYTES) throw new Error(SAFE_ERROR);
          chunks.push(value);
        }
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
        return mapContent(id, JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)), key);
      };
      return await Promise.race([operation(), deadline]);
    } catch {
      // Discard provider bodies, request headers and original exception/cause.
      throw new Error(SAFE_ERROR);
    } finally {
      clearTimeout(timer);
      controller.abort();
      try { void reader?.cancel().catch(() => {}); } catch { /* No raw errors/logs. */ }
    }
  }

  return {
    load(id) {
      if (!__DEV__) return Promise.reject(new Error(SAFE_ERROR));
      const current = pending.get(id);
      if (current) return current;
      const next = request(id).finally(() => { if (pending.get(id) === next) pending.delete(id); });
      pending.set(id, next);
      return next;
    },
  };
}
