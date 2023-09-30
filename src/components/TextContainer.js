import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { PropTypes } from "prop-types";
import { StyleSheet } from 'react-native';

export function TextContainer (props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleSwitch = () => setShowAnswer(previousState => !previousState);

  return (
    <View style={{...style.textContainer, ...props.style}}>
        <Text style={style.text}>
          {props.text}
        </Text>
        {props.author && 
          <Text style={style.textAuthor}>
            - {props.author}
          </Text>
        }
        {props.answer && 
          <View style={style.triviaContainer}>
            <Text style={style.text}>
              {showAnswer ? `- ${props.answer} -` : ''}
            </Text>
            <Pressable style={style.triviaButton} onPress={toggleSwitch}>
              <Text style={style.text}>Show Answer:</Text>
            </Pressable>
          </View>
        }
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
  },
  textAuthor: {
    alignSelf: 'flex-end',
    color: '#fff',
  },
  triviaContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 10
  },
  triviaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'green',
  }
});
