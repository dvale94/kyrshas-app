import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChapterPager } from './ChapterPager';
import { ContentCard } from './ContentCard';
import { HOME_CARDS } from './fixtures';
import { mockContentProvider, type ContentProvider } from './content';
import { useHomeContent } from './useHomeContent';
import { colors } from './tokens';

export function HomeScreen({ provider = mockContentProvider, liveLocal = false }: { provider?: ContentProvider; liveLocal?: boolean } = {}) {
  const { cards, load } = useHomeContent(provider);
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ChapterPager
        session={provider}
        revisions={Object.fromEntries(HOME_CARDS.map(({ id }) => [id, cards[id].revision])) as Record<keyof typeof cards, number>}
        renderChapter={(id) => <>
          <ContentCard card={HOME_CARDS.find((card) => card.id === id)!} state={cards[id]} onLoad={() => load(id)} />
          {id === 'quote' && <View style={styles.identity}>
            <Text accessibilityRole="header" style={styles.caption}>Kyrsha&apos;s App</Text>
            <Text style={styles.caption}>{liveLocal ? 'Live local development · API Ninjas' : 'Offline demo · synthetic content'}</Text>
          </View>}
        </>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  identity: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', columnGap: 7, backgroundColor: '#101028B3', borderRadius: 8, paddingHorizontal: 6 },
  caption: { fontSize: 11, lineHeight: 16, color: colors.secondary },
});
