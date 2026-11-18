import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ContentCard } from './ContentCard';
import { HOME_CARDS } from './fixtures';
import { mockContentProvider, type ContentProvider } from './content';
import { useHomeContent } from './useHomeContent';

export function HomeScreen({ provider = mockContentProvider }: { provider?: ContentProvider } = {}) {
  const { cards, load } = useHomeContent(provider);
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        testID="home-feed"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>Kyrsha&apos;s App</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.caption}>Offline demo · synthetic content</Text>
          {HOME_CARDS.map((card) => (
            <ContentCard key={card.id} card={card} state={cards[card.id]} onLoad={() => load(card.id)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#38761d' },
  header: { backgroundColor: '#38761d', paddingHorizontal: 16, paddingVertical: 14 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  content: { backgroundColor: '#eff3f4', paddingHorizontal: 10, paddingBottom: 24 },
  caption: { color: '#40513a', fontSize: 16, lineHeight: 24, textAlign: 'center', paddingTop: 16 },
});
