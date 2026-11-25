import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type ComponentRef } from 'react';
import { AccessibilityInfo, findNodeHandle, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { HOME_CARDS } from './fixtures';
import type { CardId, ContentProvider } from './content';
import { ChapterScene } from './ChapterScene';
import { ChapterReading } from './ChapterReading';
import { chapters, colors, radius, space, touch, type } from './tokens';

// Resolve the built-in primitive once; no third-party safe-area dependency is adopted.
const NativeSafeArea = SafeAreaView;
const names = ['Quote', 'Trivia', 'Fact', 'Dad Joke', 'Bucket List Item'];
const bound = (index: number) => Math.max(0, Math.min(4, index));
type Drag = { origin: number; offset: number; released: boolean };

export function ChapterPager({ session, revisions, renderChapter }: {
  session: ContentProvider;
  revisions: Record<CardId, number>;
  renderChapter: (id: CardId) => ReactNode;
}) {
  const pager = useRef<ComponentRef<typeof ScrollView>>(null);
  const progress = useRef<ComponentRef<typeof Text>>(null);
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState(0);
  const settled = useRef(0);
  const drag = useRef<Drag | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [settling, setSettling] = useState(false);
  const [overflows, setOverflows] = useState<Record<string, boolean>>({});
  const [screenReader, setScreenReader] = useState(true);
  const { width, fontScale } = useWindowDimensions();
  const onOverflow = useCallback((id: CardId, overflow: boolean) => {
    setOverflows((previous) => previous[id] === overflow ? previous : { ...previous, [id]: overflow });
  }, []);
  const clearIdle = useCallback(() => {
    if (idle.current !== null) clearTimeout(idle.current);
    idle.current = null;
  }, []);
  const align = useCallback((index: number) => {
    if (height > 0) pager.current?.scrollTo({ y: index * height, animated: false });
  }, [height]);
  const commit = useCallback((index: number) => {
    settled.current = index;
    setActive(index);
  }, []);
  const finish = useCallback((offset: number) => {
    const transaction = drag.current;
    if (!transaction || height <= 0) return;
    const nearest = Math.round(offset / height);
    const next = bound(Math.max(transaction.origin - 1, Math.min(transaction.origin + 1, nearest)));
    clearIdle();
    drag.current = null;
    // Correct native overshoot as well as fractional/no-momentum settlement.
    align(next);
    commit(next);
    setSettling(false);
  }, [height, align, commit, clearIdle]);
  const scheduleIdle = useCallback(() => {
    clearIdle();
    idle.current = setTimeout(() => {
      if (drag.current?.released) finish(drag.current.offset);
    }, 160);
  }, [finish, clearIdle]);
  const navigate = (direction: number) => {
    if (drag.current || height <= 0) return;
    const next = bound(settled.current + direction);
    if (next === settled.current) return;
    // Immediate programmatic travel also provides the reduced-motion equivalent.
    align(next);
    commit(next);
  };

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isScreenReaderEnabled().then((enabled) => { if (mounted) setScreenReader(enabled); });
    const subscription = AccessibilityInfo.addEventListener('screenReaderChanged', setScreenReader);
    return () => { mounted = false; subscription.remove(); };
  }, []);
  useEffect(() => clearIdle, [clearIdle]);
  useLayoutEffect(() => {
    clearIdle();
    drag.current = null;
    setSettling(false);
    align(settled.current);
  }, [height, width, fontScale, align, clearIdle]);
  const previousActive = useRef(active);
  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    // One focus mechanism, no competing explicit position announcement.
    const node = findNodeHandle(progress.current);
    if (node != null) AccessibilityInfo.setAccessibilityFocus(node);
  }, [active]);

  const overflow = overflows[HOME_CARDS[active]!.id] !== false;
  const canSwipe = height > 0 && !overflow && !screenReader;
  return (
    <View style={styles.screen}>
      <ChapterScene key={active} id={HOME_CARDS[active]!.id} />
      <NativeSafeArea style={styles.safe}>
      <View style={styles.location}>
        <Text
          ref={progress}
          testID="chapter-progress"
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel={`${names[active]}, chapter ${active + 1} of 5`}
          accessibilityValue={{ min: 1, max: 5, now: active + 1 }}
          accessibilityHint="Current location. Use Previous or Next chapter to navigate."
          accessibilityActions={[
            { name: 'increment', label: 'Next chapter' },
            { name: 'decrement', label: 'Previous chapter' },
          ]}
          onAccessibilityAction={(event) => {
            if (event.nativeEvent.actionName === 'increment') navigate(1);
            if (event.nativeEvent.actionName === 'decrement') navigate(-1);
          }}
          style={styles.position}
        >{names[active]} · {active + 1} of 5</Text>
        <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.segments}>
          {HOME_CARDS.map(({ id }, index) => <View key={id} testID={`progress-${id}`} style={[styles.segment, index === active && styles.selected, index === active && { backgroundColor: chapters[id].accent }]} />)}
        </View>
      </View>
      <View testID="chapter-viewport" style={styles.viewport} onLayout={(event) => setHeight(Math.max(0, event.nativeEvent.layout.height))}>
        <ScrollView
          ref={pager}
          testID="chapter-pager"
          style={styles.viewport}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          pagingEnabled
          snapToOffsets={height > 0 ? HOME_CARDS.map((_, index) => index * height) : undefined}
          snapToAlignment="start"
          disableIntervalMomentum
          decelerationRate="fast"
          bounces={false}
          scrollsToTop={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          scrollEnabled={canSwipe}
          pointerEvents={settling ? 'none' : 'auto'}
          scrollEventThrottle={16}
          onScrollBeginDrag={(event) => {
            if (!canSwipe || drag.current) return;
            drag.current = { origin: settled.current, offset: event.nativeEvent.contentOffset.y, released: false };
          }}
          onScroll={(event) => {
            if (!drag.current) return;
            drag.current.offset = event.nativeEvent.contentOffset.y;
            if (drag.current.released) scheduleIdle();
          }}
          onScrollEndDrag={(event) => {
            if (!drag.current) return;
            drag.current.offset = event.nativeEvent.contentOffset.y;
            drag.current.released = true;
            setSettling(true);
            scheduleIdle();
          }}
          onMomentumScrollEnd={(event) => finish(event.nativeEvent.contentOffset.y)}
          onTouchCancel={() => {
            if (!drag.current) return;
            finish(drag.current.origin * height);
          }}
        >
          {HOME_CARDS.map(({ id }, index) => (
            <View
              key={id}
              testID={`chapter-${id}`}
              style={{ height, minHeight: 0 }}
              accessibilityElementsHidden={index !== active}
              importantForAccessibility={index === active ? 'auto' : 'no-hide-descendants'}
            >
              <ChapterReading id={id} active={index === active} height={height} revision={revisions[id]} session={session} onOverflow={onOverflow}>
                {renderChapter(id)}
              </ChapterReading>
            </View>
          ))}
        </ScrollView>
      </View>
      <View testID="chapter-navigation" style={[styles.navigation, fontScale > 1.5 && styles.stackedNavigation]}>
        {([-1, 1] as const).map((direction) => {
          const unavailable = height <= 0 || settling || (direction === -1 ? active === 0 : active === 4);
          const action = direction === -1 ? 'Previous' : 'Next';
          const destination = names[active + direction];
          return <Pressable
            key={direction}
            testID={direction === -1 ? 'previous-chapter' : 'next-chapter'}
            accessibilityRole="button"
            accessibilityLabel={`${action} chapter${destination ? `, ${destination}` : ''}`}
            accessibilityState={{ disabled: unavailable }}
            disabled={unavailable}
            onPress={() => navigate(direction)}
            style={({ pressed }) => [styles.button, canSwipe && ((direction === -1 && active !== 4) || (direction === 1 && active === 4)) && styles.edgeButton, (overflow || screenReader) && styles.readButton, fontScale > 1.5 && styles.stackedButton, unavailable && (canSwipe ? styles.boundary : styles.disabled), pressed && !unavailable && styles.pressed]}
          >{overflow || screenReader ? <Text style={styles.buttonText}>{action}</Text> : <>
            <View style={[styles.chevron, direction === -1 && styles.up]} />
            <Text style={styles.cue}>{direction === -1 ? active === 4 ? 'LAST CHAPTER · BACK' : 'BACK' : 'SWIPE FOR MORE'}</Text>
          </>}</Pressable>;
        })}
      </View>
      </NativeSafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  viewport: { flex: 1, minHeight: 0 },
  safe: { flex: 1 },
  location: { paddingTop: 22, paddingBottom: 17, alignItems: 'center' },
  position: { position: 'absolute', width: 160, height: 24, color: 'transparent', textAlign: 'center' },
  segments: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm, height: 8 },
  segment: { width: 26, height: 4, backgroundColor: colors.inactive, borderRadius: 4 },
  selected: { width: 31, height: 5 },
  cue: { color: colors.primary, fontSize: 10, fontWeight: '600', letterSpacing: 2, textShadowColor: colors.canvas, textShadowRadius: 4 },
  navigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.md, paddingHorizontal: space.lg, paddingBottom: 4 },
  button: { minWidth: touch, minHeight: touch, gap: 5, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' },
  edgeButton: { position: 'absolute', left: space.lg },
  boundary: { opacity: 0.05 },
  readButton: { flex: 1, padding: 5, borderRadius: radius.control, backgroundColor: colors.surface },
  chevron: { width: 17, height: 17, borderRightWidth: 2, borderBottomWidth: 2, borderColor: colors.primary, transform: [{ rotate: '45deg' }], marginBottom: 3 },
  up: { transform: [{ rotate: '225deg' }] },
  stackedNavigation: { flexDirection: 'column', alignItems: 'stretch' },
  stackedButton: { flex: 0 },
  disabled: { opacity: 0.28 },
  pressed: { backgroundColor: colors.pressed },
  buttonText: { ...type.button, color: colors.secondary, textAlign: 'center', fontWeight: '600' },
});
