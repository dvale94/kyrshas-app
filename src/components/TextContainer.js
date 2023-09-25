import { Text, View } from 'react-native';
import { PropTypes } from "prop-types";
import { StyleSheet } from 'react-native';

export function TextContainer (props) {
  return (
    <View style={{...style.textContainer, ...props.style}}>
        <Text style={style.text}>{props.text}</Text>
    </View>
  );
};

TextContainer.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
};

const style = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderRadius: 8,
    display: 'flex',
    padding: 10,
  },
  text: {
    color: '#fff',
  }
});
