import { useEffect, useRef } from 'react';
import { AccessibilityInfo, ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CardId } from './content';
import type { CardState } from './useHomeContent';
import { CardText } from './CardText';
import { ImagePlaceholder } from './ImagePlaceholder';
import { chapters, colors, radius, space, touch, type } from './tokens';

export function ContentCard({ card, state, onLoad }: {
  card: Readonly<{ id: CardId; title: string }>;
  state: CardState;
  onLoad: () => void;
}) {
  const { content, revision, status } = state;
  const busy = status === 'idle' || status === 'loading';
  const failed = status === 'error';
  const action = failed ? 'Retry' : 'Refresh';
  const chapter = chapters[card.id];
  const suppliedTitle = content?.title && content.title.toLowerCase() !== card.title.toLowerCase() ? content.title : undefined;
  const message = busy
    ? `${content ? 'Refreshing' : 'Loading'} ${card.title}…`
    : failed ? `Could not ${content ? 'refresh' : 'load'} this example. Use Retry ${card.title} to try again.`
    : `${card.title} ready`;
  const requested = useRef(false);
  useEffect(() => {
    // A replacement provider returns to idle: discard the previous action's intent.
    if (status === 'idle') requested.current = false;
    if (busy || !requested.current) return;
    requested.current = false;
    // Startup/loading stays quiet. Announce only the user's settled action once.
    if (Platform.OS === 'ios') AccessibilityInfo.announceForAccessibility(message);
    // Check every commit: loading and an identical retry error can be batched.
  });

  return (
    <View testID={`card-${card.id}`} style={styles.card}>
      <View style={styles.headingRow}>
        <View style={styles.pill}>
          <Text accessibilityRole="header" style={[styles.heading, { color: chapter.accent }]}>{chapter.label}</Text>
        </View>
        <Pressable
          testID={`refresh-${card.id}`}
          accessibilityRole="button"
          accessibilityLabel={`${action} ${card.title}`}
          accessibilityHint={failed
            ? content ? 'Try this card again; current content stays until a new example is ready' : 'Try this card again to load an example'
            : 'Load another example for this card'}
          accessibilityState={{ busy, disabled: busy }}
          disabled={busy}
          onPress={() => { requested.current = true; onLoad(); }}
          style={({ pressed }) => [styles.refresh, failed && styles.retry, pressed && styles.pressed]}
        >
          {busy
            ? <ActivityIndicator testID={`busy-${card.id}`} accessible={false} color={chapter.accent} />
            : <Text accessible={false} style={[failed ? styles.retryText : styles.refreshText, { color: chapter.accent }]}>{failed ? 'Retry' : '↻'}</Text>}
        </Pressable>
      </View>
      {!!suppliedTitle && <Text style={styles.suppliedTitle}>{suppliedTitle}</Text>}
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
      <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none" style={styles.quiet}>
        <View style={[styles.accentLine, { backgroundColor: chapter.accent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingTop: space.xl, paddingBottom: space.sm, gap: space.lg },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
  pill: { flexShrink: 1, backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: space.lg, paddingVertical: space.sm },
  heading: { ...type.label, flexShrink: 1, fontWeight: '600' },
  refresh: { flexShrink: 0, minWidth: touch, minHeight: touch, padding: space.sm, borderRadius: radius.control, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  refreshText: { fontSize: 30, lineHeight: 34 },
  retry: { borderWidth: 1, borderColor: colors.error, paddingHorizontal: space.md },
  retryText: { ...type.button, fontWeight: '600' },
  pressed: { backgroundColor: colors.pressed },
  imageSurface: { paddingBottom: space.xl, borderRadius: radius.panel, overflow: 'hidden' },
  textSurface: { width: '100%' },
  suppliedTitle: { ...type.secondary, color: colors.secondary },
  status: { ...type.secondary, color: colors.secondary, paddingHorizontal: space.sm },
  error: { ...type.secondary, color: colors.error, backgroundColor: colors.surface, borderRadius: radius.status, padding: space.lg },
  quiet: { paddingTop: space.lg, paddingBottom: space.sm, alignItems: 'center' },
  accentLine: { width: 40, height: 2, borderRadius: 2, opacity: 0.5 },
});
