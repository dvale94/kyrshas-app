import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useHomeScreen } from './useHomescreen';
import { ContentContainer } from './ContentContainer';

// Ported from the original home screen; the safe-area import matches the target SDK.
const Item = ({ image, text, title, onRefresh, author, answer }) => (
  <View style={style.itemView}>
    <ContentContainer author={author} answer={answer} image={image} text={text} title={title} onRefresh={onRefresh} />
  </View>
);

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { data } = useHomeScreen();
  useEffect(() => {
    if (data.length) SplashScreen.hideAsync();
  }, [data]);
  return (
    <SafeAreaView style={style.safeAreaView}>
      <FlatList data={data} showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Item {...item} />} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  itemView: { borderBottomColor: '#38761d', borderBottomWidth: 2, paddingBottom: 20 },
  safeAreaView: { backgroundColor: '#eff3f4', margin: 10 }
});
