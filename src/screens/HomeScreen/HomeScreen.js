import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { Divider } from '@rneui/themed';

import { useHomeScreen } from './useHomescreen';

import { ContentContainer } from '../../components/ContentContainer';

const Item = ({image, text, title}) => (
  <View style={style.itemView}>
    <ContentContainer
      image={image}
      text={text}
      title={title}
    />
  </View>
);

export default function HomeScreen () {
  const {data} = useHomeScreen();

  return (
    <SafeAreaView style={style.safeAreaView}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Item image={item.image} text={item.text} title={item.title} />}
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
