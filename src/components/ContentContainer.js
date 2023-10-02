import { useCallback, useState } from 'react';
import { Image, Icon } from '@rneui/themed';
import { PropTypes } from "prop-types";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { TextContainer } from './TextContainer';

export function ContentContainer (props) {
  const [isrefreshing, setIsRefreshing]= useState(false);

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
            <Icon
              name='refresh'
              type='font-awesome'
              color='#38761d'
            />
          ):(
            <ActivityIndicator color='#38761d'/>
          )}
        </Pressable>
      </View>
      <View style={props.image ? style.imageContainer : style.imageContainerAlt}>
        {props.image && <Image
          containerStyle={style.image}
          src={`data:image/jpeg;base64,${props.image}`}
        />}
        <TextContainer
          author={props.author}
          answer={props.answer}
          style={props.image ? style.textContainer : style.textContainerAlt}
          text={props.text}
        />
      </View>
    </View>
  );
};

ContentContainer.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
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
