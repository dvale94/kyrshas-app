import { useEffect } from 'react';
import { AccessibilityInfo, ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CardId } from './content';
import type { CardState } from './useHomeContent';
import { CardText } from './CardText';
import { ImagePlaceholder } from './ImagePlaceholder';

export function ContentCard({ card, state, onLoad }: {
  card: Readonly<{ id: CardId; title: string }>;
  state: CardState;
  onLoad: () => void;
}) {
  const { content, revision, status } = state;
  const busy = status === 'idle' || status === 'loading';
  const failed = status === 'error';
  const action = failed ? 'Retry' : 'Refresh';
  const message = busy
    ? `${content ? 'Refreshing' : 'Loading'} ${card.title}…`
    : failed ? `Could not ${content ? 'refresh' : 'load'} this example. Use Retry ${card.title} to try again.`
    : `${card.title} ready`;
  useEffect(() => {
    // Live regions cover Android; VoiceOver needs an explicit status announcement.
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(message);
  }, [message]);

  return (
    <View testID={`card-${card.id}`} style={styles.card}>
      <View style={styles.headingRow}>
        <Text accessibilityRole="header" style={styles.heading}>{card.title.toUpperCase()}</Text>
        <Pressable
          testID={`refresh-${card.id}`}
          accessibilityRole="button"
          accessibilityLabel={`${action} ${card.title}`}
          accessibilityHint="Show the next synthetic example for this card"
          accessibilityState={{ busy, disabled: busy }}
          disabled={busy}
          onPress={onLoad}
          style={({ pressed }) => [styles.refresh, pressed && styles.pressed]}
        >
          {busy
            ? <ActivityIndicator testID={`busy-${card.id}`} color="#38761d" />
            : <Text accessible={false} style={styles.refreshText}>↻</Text>}
        </Pressable>
      </View>
      {busy && (
        <Text testID={`status-${card.id}`} accessibilityLiveRegion="polite" style={styles.status}>
          {message}
        </Text>
      )}
      {failed && (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>
          {message}
        </Text>
      )}
      {content && <View style={content.image ? styles.imageSurface : styles.textSurface}>
        {content.image && <ImagePlaceholder image={content.image} />}
        <CardText
          key={revision}
          text={content.text}
          author={content.author}
          answer={content.id === 'trivia' ? content.answer : undefined}
          overlay={!!content.image}
        />
      </View>}
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
  status: { color: '#40513a', fontSize: 16, lineHeight: 24 },
  error: { color: '#823315', fontSize: 16, lineHeight: 24 },
});
