import { useCallback, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { TextContainer } from './TextContainer';

export function ContentContainer (props) {
  const [isrefreshing, setIsRefreshing]= useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => { setImageFailed(false); }, [props.image?.revision]);
  const hasImage = Boolean(props.image && !imageFailed);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await props.onRefresh()
    setIsRefreshing(false);
  },[]);

  return (
    <View style={style.contentContainer}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{props.title.toUpperCase()}</Text>
        <Pressable style={style.pressContainer} onPress={handleRefresh}>
          {!isrefreshing ? (
            <FontAwesome name='refresh' size={24} color='#38761d' />
          ):(
            <ActivityIndicator color='#38761d'/>
          )}
        </Pressable>
      </View>
      <View style={hasImage ? style.imageContainer : style.imageContainerAlt}>
        {hasImage && <Image testID='legacy-card-image' key={props.image.revision} source={props.image.source} style={style.image} resizeMode='contain' onError={() => setImageFailed(true)} />}
        <TextContainer
          author={props.author}
          answer={props.answer}
          style={hasImage ? style.textContainer : style.textContainerAlt}
          text={props.text}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
    width: '100%'
  },
  imageContainer: {
    height: 400,
    marginBottom: 20,
    width: '100%'
  },
  imageContainerAlt: {
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    objectFit: 'contain',
    
  },
  textContainer: {
    bottom: '50%',
    left: '5%',
    position: 'absolute',
    right: '5%',
  },
  textContainerAlt: {
    backgroundColor: '#38761d',
    marginBottom: 20,
  },
  title: {
    color: '#38761d',
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  pressContainer: {
    position: 'absolute',
    right: 0
  }
});
