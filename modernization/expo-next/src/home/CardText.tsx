import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function CardText({ text, author, answer, overlay = false }: {
  text: string;
  author?: string;
  answer?: string;
  overlay?: boolean;
}) {
  const [answerVisible, setAnswerVisible] = useState(false);
  return (
    <View style={[styles.panel, overlay && styles.overlay]}>
      <Text style={styles.body}>{text}</Text>
      {!!author?.trim() && <Text style={styles.author}>- {author}</Text>}
      {!!answer?.trim() && (
        <View style={styles.trivia}>
          {answerVisible && <Text accessibilityLiveRegion="polite" style={styles.body}>{answer}</Text>}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={answerVisible ? 'Hide Answer' : 'Show Answer'}
            accessibilityState={{ expanded: answerVisible }}
            accessibilityHint={answerVisible ? 'Hide the answer to this question' : 'Reveal the answer to this question'}
            onPress={() => setAnswerVisible((visible) => !visible)}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>{answerVisible ? 'Hide Answer' : 'Show Answer'}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { width: '100%', backgroundColor: '#38761d', borderRadius: 8, padding: 18, gap: 12 },
  overlay: { backgroundColor: 'rgba(20, 35, 24, 0.88)' },
  body: { color: '#fff', fontSize: 18, lineHeight: 27, textAlign: 'center' },
  author: { color: '#fff', fontSize: 16, lineHeight: 24, alignSelf: 'flex-end', maxWidth: '100%', flexShrink: 1, textAlign: 'right' },
  trivia: { gap: 12 },
  button: { minHeight: 48, minWidth: 48, justifyContent: 'center', padding: 12, borderRadius: 6, backgroundColor: '#234b13' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  pressed: { opacity: 0.8 },
});
