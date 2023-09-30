import { Image } from '@rneui/themed';
import { PropTypes } from "prop-types";
import { StyleSheet, Text, View } from 'react-native';

import { TextContainer } from './TextContainer';

export function ContentContainer (props) {
  return (
    <View style={style.contentContainer}>
      <Text style={style.title}>{props.title.toUpperCase()}</Text>
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
  }
});
