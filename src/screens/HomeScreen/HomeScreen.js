import { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useHomeScreen } from './useHomescreen';

import { ContentContainer } from '../../components/ContentContainer';

const Item = ({image, text, title, onRefresh, author, answer}) => (
  <View style={style.itemView}>
    <ContentContainer
      author={author}
      answer={answer}
      image={image}
      text={text}
      title={title}
      onRefresh={onRefresh}
    />
  </View>
);

SplashScreen.preventAutoHideAsync();

export default function HomeScreen () {
  const { data } = useHomeScreen();

  useEffect(() => {
    async function handleSplashScreen() {
      if (data.length) {
        await SplashScreen.hideAsync();
      }
    }
    handleSplashScreen();
  }, [data]);

  return (
    <SafeAreaView style={style.safeAreaView}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => 
          <Item
            image={item.image}
            text={item.text}
            title={item.title}
            onRefresh={item?.onRefresh}
            author={item?.author}
            answer={item?.answer}
          />
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  itemView: {
    borderBottomColor: '#38761d',
    borderBottomWidth: 2,
    paddingBottom: 20
  },
  safeAreaView: {
    backgroundColor: '#eff3f4',
    margin: 10,
  }
});
