import { useCallback, useEffect, useRef, useState } from 'react';
import { HOME_CARDS } from './fixtures';
import { normalizeContent, type CardContent, type CardId, type ContentProvider } from './content';

export type CardState = Readonly<{
  status: 'idle' | 'loading' | 'ready' | 'error';
  content?: CardContent;
  revision: number;
}>;
type Slots = Record<CardId, CardState>;
const initialSlots = (): Slots => Object.fromEntries(
  HOME_CARDS.map(({ id }) => [id, { status: 'idle', revision: 0 }]),
) as Slots;

export function useHomeContent(provider: ContentProvider) {
  const [snapshot, setSnapshot] = useState(() => ({ provider, cards: initialSlots() }));
  const controller = useRef<((id: CardId) => void) | null>(null);

  useEffect(() => {
    let active = true;
    let cards = initialSlots();
    const requests = new Map<CardId, symbol>();
    const publish = (id: CardId, state: CardState) => {
      cards = { ...cards, [id]: state };
      setSnapshot({ provider, cards });
    };

    async function request(id: CardId) {
      if (!active || requests.has(id)) return;
      const token = Symbol(id);
      requests.set(id, token);
      const previous = cards[id];
      publish(id, { ...previous, status: 'loading' });
      try {
        const result = await provider.load(id, { revision: previous.revision });
        if (!active || requests.get(id) !== token) return;
        const content = normalizeContent(id, result);
        publish(id, { status: 'ready', content, revision: previous.revision + 1 });
      } catch {
        if (!active || requests.get(id) !== token) return;
        // Preserve last-good content; never render or log provider error payloads.
        publish(id, { ...previous, status: 'error' });
      } finally {
        if (requests.get(id) === token) requests.delete(id);
      }
    }

    controller.current = request;
    // Independent requests: an initial rejection never blocks another category.
    HOME_CARDS.forEach(({ id }) => { void request(id); });
    return () => {
      active = false;
      requests.clear();
      if (controller.current === request) controller.current = null;
    };
  }, [provider]);

  const load = useCallback((id: CardId) => { controller.current?.(id); }, []);
  // Never render old-provider data in the commit before the replacement effect runs.
  return { cards: snapshot.provider === provider ? snapshot.cards : initialSlots(), load };
}
