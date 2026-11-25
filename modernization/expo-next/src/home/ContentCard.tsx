import { useEffect, useRef } from 'react';
import { AccessibilityInfo, ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CardId } from './content';
import type { CardState } from './useHomeContent';
import { CardText } from './CardText';
import { chapters, colors, radius, space, touch, type } from './tokens';

const icons: Record<CardId, string> = { quote: '❝', trivia: '?', fact: '', 'dad joke': '☺︎', 'bucket list item': '◭' };

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

  const lowerRetry = failed && content && content.text.length <= 150 && !content.answer && !suppliedTitle;
  const control = <Pressable testID={`refresh-${card.id}`} accessibilityRole="button" accessibilityLabel={`${action} ${card.title}`}
    accessibilityHint={failed ? content ? 'Try this card again; current content stays until a new example is ready' : 'Try this card again to load an example' : 'Load another example for this card'}
    accessibilityState={{ busy, disabled: busy }} disabled={busy} onPress={() => { requested.current = true; onLoad(); }}
    style={({ pressed }) => [styles.refresh, failed && styles.retry, lowerRetry && styles.lowerRetry, pressed && styles.pressed]}>
    {busy ? <ActivityIndicator testID={`busy-${card.id}`} accessible={false} color={chapter.accent} />
      : <Text accessible={false} style={[failed ? styles.retryText : styles.refreshText, { color: chapter.accent }]}>{failed ? 'Retry' : '↻'}</Text>}
  </Pressable>;
  return (
    <View testID={`card-${card.id}`} style={styles.card}>
      <View style={styles.headingRow}>
        <View style={[styles.pill, { borderColor: chapter.accent, shadowColor: chapter.accent }]}>
          {card.id === 'fact' ? <View accessible={false} accessibilityElementsHidden style={styles.bulb}>
            <View style={[styles.bulbGlass, { borderColor: chapter.accent }]} />
            <View style={[styles.bulbBase, { backgroundColor: chapter.accent }]} />
          </View> : <Text accessible={false} accessibilityElementsHidden style={[styles.icon, { color: chapter.accent }]}>{icons[card.id]}</Text>}
          <Text accessibilityRole="header" style={[styles.heading, { color: chapter.accent }]}>{chapter.label}</Text>
        </View>
        {lowerRetry ? <View accessible={false} accessibilityElementsHidden style={styles.refresh}><Text style={[styles.refreshText, { color: chapter.accent }]}>↻</Text></View> : control}
      </View>
      {!!suppliedTitle && <Text style={styles.suppliedTitle}>{suppliedTitle}</Text>}
      {busy && !content && <View accessible={false} accessibilityElementsHidden style={styles.skeleton}>
        {[70, 92, 79, 55].map(width => <View key={width} style={[styles.skeletonLine, { width: `${width}%`, borderColor: chapter.accent }]} />)}
      </View>}
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
      {content && <View style={styles.textSurface}>
        {content.image && <View accessible accessibilityRole="image" accessibilityLabel={content.image.label} style={styles.metadata} />}
        <CardText
          key={revision}
          text={content.text}
          author={content.author}
          answer={content.id === 'trivia' ? content.answer : undefined}
          id={card.id}
          feedback={busy || failed || !!suppliedTitle}
        />
      </View>}
      {lowerRetry ? control : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexGrow: 1, paddingTop: space.sm, paddingBottom: space.sm, gap: space.md },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
  pill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: '43%', gap: 12, flexShrink: 1, backgroundColor: '#1B1435D9', borderWidth: 1.3, borderRadius: radius.pill, paddingHorizontal: 17, paddingVertical: 6, shadowOpacity: 0.45, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  icon: { fontSize: 25, lineHeight: 29, fontWeight: '700' },
  bulb: { width: 20, height: 29, alignItems: 'center', justifyContent: 'center' },
  bulbGlass: { width: 16, height: 18, borderWidth: 2, borderRadius: 9 },
  bulbBase: { width: 8, height: 4, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 },
  heading: { fontSize: 14, letterSpacing: 2.2, textTransform: 'uppercase', flexShrink: 1, fontWeight: '600' },
  refresh: { flexShrink: 0, minWidth: touch, minHeight: touch, paddingHorizontal: 7, borderWidth: 1, borderColor: '#AFABD28A', borderRadius: radius.pill, backgroundColor: '#211F47CC', alignItems: 'center', justifyContent: 'center' },
  refreshText: { fontSize: 30, lineHeight: 34 },
  retry: { borderWidth: 1, borderColor: colors.error, paddingHorizontal: space.md },
  lowerRetry: { alignSelf: 'center', width: '66%', shadowColor: colors.error, shadowOpacity: 0.7, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  retryText: { ...type.button, fontWeight: '600' },
  pressed: { backgroundColor: colors.pressed },
  metadata: { position: 'absolute', width: 1, height: 1 },
  textSurface: { flexGrow: 1, width: '100%' },
  skeleton: { gap: 10, paddingHorizontal: space.md, paddingVertical: space.xl },
  skeletonLine: { height: 12, borderRadius: 6, backgroundColor: '#57738ECC', borderWidth: 1 },
  suppliedTitle: { ...type.secondary, color: colors.secondary },
  status: { ...type.secondary, fontFamily: type.body.fontFamily, fontStyle: 'italic', textAlign: 'center', color: colors.secondary, paddingHorizontal: space.sm },
  error: { ...type.secondary, color: colors.error, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.error, borderRadius: radius.status, padding: space.md },
});
