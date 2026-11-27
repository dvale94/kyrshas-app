import { useCallback, useEffect, useRef, useState } from 'react';
import { fetch } from 'expo/fetch';

const cards = [
  { id: 'quote', path: '/v2/randomquotes', field: 'quote', hasImage: true },
  { id: 'trivia', path: '/v1/trivia', field: 'question' },
  { id: 'fact', path: '/v1/facts', field: 'fact', hasImage: true },
  { id: 'dad joke', path: '/v1/dadjokes', field: 'joke' },
  { id: 'bucket list item', path: '/v1/bucketlist', field: 'item', hasImage: true }
];
const unavailable = 'Content unavailable. Tap refresh to try again.';

function validText(value, apiKey) {
  return typeof value === 'string' && value.trim() && value.length <= 4000 && !value.includes(apiKey);
}

export function useHomeScreen() {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const [content, setContent] = useState({});
  const [revisions, setRevisions] = useState({});
  const requests = useRef({});
  const mounted = useRef(false);

  const load = useCallback(async (card) => {
    const requestId = (requests.current[card.id] || 0) + 1;
    requests.current[card.id] = requestId;
    setRevisions(previous => ({ ...previous, [card.id]: (previous[card.id] || 0) + 1 }));
    if (!apiKey) {
      setContent(previous => ({ ...previous, [card.id]: { text: unavailable } }));
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`https://api.api-ninjas.com${card.path}`, {
        headers: { 'X-Api-Key': apiKey }, redirect: 'error', signal: controller.signal
      });
      if (!response.ok) throw new Error('Request failed');
      const body = await response.json();
      const item = card.id === 'bucket list item' ? body : Array.isArray(body) ? body[0] : null;
      if (!item || !validText(item[card.field], apiKey)) throw new Error('Invalid response');
      if (card.id === 'trivia' && !validText(item.answer, apiKey)) throw new Error('Invalid response');
      const next = { text: card.id === 'quote' ? `"${item.quote.trim()}"` : item[card.field].trim() };
      if (card.id === 'quote' && validText(item.author, apiKey)) next.author = item.author.trim();
      if (card.id === 'trivia') next.answer = item.answer.trim();
      if (mounted.current && requests.current[card.id] === requestId) {
        setContent(previous => ({ ...previous, [card.id]: next }));
      }
    } catch {
      if (mounted.current && requests.current[card.id] === requestId) {
        setContent(previous => ({ ...previous, [card.id]: previous[card.id] || { text: unavailable } }));
      }
    } finally {
      clearTimeout(timeout);
    }
  }, [apiKey]);

  useEffect(() => {
    mounted.current = true;
    cards.forEach(card => { void load(card); });
    return () => { mounted.current = false; };
  }, [load]);

  return {
    data: cards.map(card => {
      const revision = revisions[card.id] || 0;
      return {
        id: card.id, title: card.id,
        ...(content[card.id] || { text: 'Loading...' }),
        image: card.hasImage && apiKey ? {
          revision,
          source: { uri: 'https://api.api-ninjas.com/v1/randomimage', headers: { 'X-Api-Key': apiKey, Accept: 'image/jpg' }, cache: 'reload' }
        } : null,
        onRefresh: () => load(card)
      };
    })
  };
}
