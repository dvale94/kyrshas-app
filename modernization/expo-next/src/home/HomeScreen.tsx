import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChapterPager } from './ChapterPager';
import { ContentCard } from './ContentCard';
import { HOME_CARDS } from './fixtures';
import { mockContentProvider, type ContentProvider } from './content';
import { useHomeContent } from './useHomeContent';
import { colors } from './tokens';

export function HomeScreen({ provider = mockContentProvider, liveLocal = false }: { provider?: ContentProvider; liveLocal?: boolean } = {}) {
  // The source mode remains an accepted prop; presentation no longer displays it.
  void liveLocal;
  const { cards, load } = useHomeContent(provider);
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ChapterPager
        session={provider}
        revisions={Object.fromEntries(HOME_CARDS.map(({ id }) => [id, cards[id].revision])) as Record<keyof typeof cards, number>}
        renderChapter={(id) => <ContentCard card={HOME_CARDS.find((card) => card.id === id)!} state={cards[id]} onLoad={() => load(id)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
});
