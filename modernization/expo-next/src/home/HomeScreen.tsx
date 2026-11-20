import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChapterPager } from './ChapterPager';
import { ContentCard } from './ContentCard';
import { HOME_CARDS } from './fixtures';
import { mockContentProvider, type ContentProvider } from './content';
import { useHomeContent } from './useHomeContent';

export function HomeScreen({ provider = mockContentProvider, liveLocal = false }: { provider?: ContentProvider; liveLocal?: boolean } = {}) {
  const { cards, load } = useHomeContent(provider);
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ChapterPager
        session={provider}
        revisions={Object.fromEntries(HOME_CARDS.map(({ id }) => [id, cards[id].revision])) as Record<keyof typeof cards, number>}
        renderChapter={(id) => <>
          {id === 'quote' && <Text accessibilityRole="header" style={styles.title}>Kyrsha&apos;s App</Text>}
          {id === 'quote' && <Text style={styles.caption}>{liveLocal ? 'Live local development · API Ninjas' : 'Offline demo · synthetic content'}</Text>}
          <ContentCard card={HOME_CARDS.find((card) => card.id === id)!} state={cards[id]} onLoad={() => load(id)} />
        </>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#eff3f4' },
  title: { color: '#234b13', fontSize: 22, fontWeight: '700', textAlign: 'center', paddingTop: 8 },
  caption: { color: '#40513a', fontSize: 16, lineHeight: 24, textAlign: 'center', paddingTop: 8 },
});
