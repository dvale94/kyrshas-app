import { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { ApiProvider } from '../api/ApiProvider';

import { ContentContainer } from '../components/ContentContainer';

export default function HomeScreen () {
  const [image, setImage] = useState();
  const [joke, setJoke] = useState();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    ApiProvider.getJoke()
      .then((response) => {
        setJoke(response.joke);
      });

    ApiProvider.getBackgroundImage()
      .then(async (response) => {
        setImage(response.toString());
      });
  },[])

  if (joke && image) SplashScreen.hideAsync(); 

  return (
    <SafeAreaView>
      <View style={style.view}>
        <ContentContainer
          image={image}
          text={joke}
        />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    view: {
      alignItems: 'center',
      backgroundColor: '#eff3f4',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: 8,
      width: '100%',
    }
});
