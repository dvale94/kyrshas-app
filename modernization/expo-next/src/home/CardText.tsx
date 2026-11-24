import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { chapters, colors, radius, space, touch, type } from './tokens';

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
          {answerVisible && <View style={styles.answer}>
            <Text style={styles.answerLabel}>Answer</Text>
            <Text accessibilityLiveRegion="polite" style={styles.answerText}>{answer}</Text>
          </View>}
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
  panel: { width: '100%', backgroundColor: colors.surface, borderRadius: radius.panel, padding: space.xl, gap: space.lg },
  overlay: { backgroundColor: colors.surface },
  body: { ...type.body, color: colors.primary, textAlign: 'left' },
  author: { ...type.secondary, color: colors.secondary, maxWidth: '100%', flexShrink: 1 },
  trivia: { gap: space.lg },
  answer: { backgroundColor: colors.elevated, borderRadius: radius.status, padding: space.lg, gap: space.sm },
  answerLabel: { ...type.label, color: chapters.trivia.accent, fontWeight: '600' },
  answerText: { ...type.answer, color: colors.primary },
  button: { minHeight: touch, minWidth: touch, justifyContent: 'center', padding: space.md, borderRadius: radius.status, backgroundColor: colors.elevated, borderWidth: 1, borderColor: chapters.trivia.accent },
  buttonText: { ...type.button, color: chapters.trivia.accent, fontWeight: '600', textAlign: 'center' },
  pressed: { backgroundColor: colors.pressed },
});
