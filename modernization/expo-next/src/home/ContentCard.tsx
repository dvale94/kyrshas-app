import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CardFixture } from './fixtures';
import { CardText } from './CardText';
import { ImagePlaceholder } from './ImagePlaceholder';

/** A visible, deterministic demonstration delay; no provider or transport work. */
const demoRefresh = () => new Promise<void>((resolve) => setTimeout(resolve, 650));

export function ContentCard({ card, completeRefresh = demoRefresh }: {
  card: CardFixture;
  completeRefresh?: () => Promise<void>;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const refreshing = useRef(false);
  const content = card.variants[variantIndex]!;

  async function refresh() {
    if (refreshing.current) return;
    refreshing.current = true;
    setBusy(true);
    setFailed(false);
    try {
      await completeRefresh();
      setVariantIndex((index) => (index + 1) % card.variants.length);
    } catch {
      // Keep the current fixture and never render/log an untrusted error payload.
      setFailed(true);
    } finally {
      refreshing.current = false;
      setBusy(false);
    }
  }

  return (
    <View testID={`card-${card.id}`} style={styles.card}>
      <View style={styles.headingRow}>
        <Text accessibilityRole="header" style={styles.heading}>{card.title.toUpperCase()}</Text>
        <Pressable
          testID={`refresh-${card.id}`}
          accessibilityRole="button"
          accessibilityLabel={`Refresh ${card.title}`}
          accessibilityHint="Show the next synthetic example for this card"
          accessibilityState={{ busy, disabled: busy }}
          disabled={busy}
          onPress={refresh}
          style={({ pressed }) => [styles.refresh, pressed && styles.pressed]}
        >
          {busy
            ? <ActivityIndicator testID={`busy-${card.id}`} color="#38761d" />
            : <Text accessible={false} style={styles.refreshText}>↻</Text>}
        </Pressable>
      </View>
      {failed && (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>
          Could not refresh this example. Try again.
        </Text>
      )}
      <View style={content.image ? styles.imageSurface : styles.textSurface}>
        {content.image && <ImagePlaceholder image={content.image} />}
        <CardText
          key={variantIndex}
          text={content.text}
          author={content.author}
          answer={card.id === 'trivia' ? content.answer : undefined}
          overlay={!!content.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderBottomColor: '#38761d', borderBottomWidth: 2, paddingTop: 16, paddingBottom: 20, gap: 12 },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heading: { flex: 1, color: '#38761d', fontSize: 24, fontWeight: '700', textAlign: 'center' },
  refresh: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  refreshText: { color: '#38761d', fontSize: 32 },
  pressed: { opacity: 0.65 },
  imageSurface: { minHeight: 320, padding: 16, justifyContent: 'center', borderRadius: 16, overflow: 'hidden' },
  textSurface: { width: '100%' },
  error: { color: '#823315', fontSize: 16, lineHeight: 24 },
});
