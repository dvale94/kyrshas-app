import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type ComponentRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { CardId, ContentProvider } from './content';
import { ReadingFit } from './ReadingFit';
import { colors, space } from './tokens';

/** Each chapter owns its native reading offset for the entire mounted home session. */
export function ChapterReading({ id, active, height, revision, session, onOverflow, children }: {
  id: CardId;
  active: boolean;
  height: number;
  revision: number;
  session: ContentProvider;
  onOverflow: (id: CardId, overflow: boolean) => void;
  children: ReactNode;
}) {
  const reader = useRef<ComponentRef<typeof ScrollView>>(null);
  const offset = useRef(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const reset = useCallback(() => setScale(1), []);
  // Unknown layout is conservative: a reading swipe must never escape into paging.
  const overflow = contentHeight === null || height <= 0 || contentHeight > height + 1;

  useEffect(() => { onOverflow(id, overflow); }, [id, overflow, onOverflow]);
  useLayoutEffect(() => { reset(); }, [height, revision, session, reset]);
  useLayoutEffect(() => {
    offset.current = 0;
    reader.current?.scrollTo({ y: 0, animated: false });
  }, [revision, session]);
  useLayoutEffect(() => {
    if (contentHeight === null || height <= 0) return;
    const clamped = Math.max(0, Math.min(offset.current, contentHeight - height));
    if (clamped !== offset.current) {
      offset.current = clamped;
      reader.current?.scrollTo({ y: clamped, animated: false });
    }
  }, [contentHeight, height]);

  return (
    <ScrollView
      ref={reader}
      testID={`reading-${id}`}
      style={[styles.reader, overflow && contentHeight !== null && styles.protected]}
      contentContainerStyle={styles.fill}
      contentInsetAdjustmentBehavior="never"
      automaticallyAdjustContentInsets={false}
      scrollEnabled={active && overflow}
      bounces={false}
      scrollsToTop={false}
      showsVerticalScrollIndicator={overflow}
      indicatorStyle="white"
      onContentSizeChange={(_, nextHeight) => {
        setContentHeight(nextHeight);
        if (height > 0 && nextHeight > height + 1) {
          setScale(current => Math.max(0.42, Math.min(current, current * height / nextHeight)));
        }
      }}
      onScroll={(event) => { offset.current = event.nativeEvent.contentOffset.y; }}
      scrollEventThrottle={16}
    >
      <ReadingFit.Provider value={{ scale, reset }}>
        <View style={styles.content}>{children}</View>
      </ReadingFit.Provider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  reader: { flex: 1, minHeight: 0 },
  protected: { backgroundColor: colors.canvas },
  fill: { flexGrow: 1 },
  content: { flexGrow: 1, width: '100%', maxWidth: 568, alignSelf: 'center', paddingHorizontal: space.xl, paddingBottom: space.sm },
});
