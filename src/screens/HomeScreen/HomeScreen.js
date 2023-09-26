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
  <View>
    <ContentContainer
      image={image}
      text={text}
      title={title}
    />
    <Divider color='#38761d' width={2}/>
  </View>
);

export default function HomeScreen () {
  const {data} = useHomeScreen();

  return (
    <SafeAreaView style={style.view}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item image={item.image} text={item.text} title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    view: {
      backgroundColor: '#eff3f4',
      margin: 10,
    }
});
