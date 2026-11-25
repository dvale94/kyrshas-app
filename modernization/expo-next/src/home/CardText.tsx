import { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { CardId } from './content';
import { chapters, colors, radius, space, touch, type } from './tokens';

export function CardText({ text, author, answer, id = 'fact' }: {
  text: string;
  author?: string;
  answer?: string;
  id?: CardId;
}) {
  const [answerVisible, setAnswerVisible] = useState(false);
  const { height, width, fontScale } = useWindowDimensions();
  const dense = fontScale > 1.4 || text.length > 150 || text.split('\n').length > 4;
  const quote = id === 'quote';
  const size = dense ? 26 : Math.min(40, Math.round(width * (quote ? 0.097 : 0.086)));
  return <View style={styles.composition}>
    <View style={[styles.reading, { marginTop: dense ? 8 : Math.min(48, height * 0.043) }, dense && styles.protected]}>
      {quote && !dense && !/^[“"‘«]/.test(text.trimStart()) && <Text accessible={false} accessibilityElementsHidden style={styles.quoteMark}>“</Text>}
      <Text style={[styles.body, quote && !dense && styles.quote, { fontSize: size, lineHeight: Math.ceil(size * 1.18) }]}>{text}</Text>
      {!!author?.trim() && <Text style={[styles.author, quote && !dense && styles.credit]}>- {author}</Text>}
    </View>
    {!!answer?.trim() && <View style={styles.trivia}>
      {answerVisible && <View style={styles.answer}>
        <Text style={styles.answerLabel}>Answer</Text>
        <Text accessibilityLiveRegion="polite" style={[styles.answerText, answer.length > 140 && styles.longAnswer]}>{answer}</Text>
      </View>}
      <Pressable accessibilityRole="button" accessibilityLabel={answerVisible ? 'Hide Answer' : 'Show Answer'}
        accessibilityState={{ expanded: answerVisible }}
        accessibilityHint={answerVisible ? 'Hide the answer to this question' : 'Reveal the answer to this question'}
        onPress={() => setAnswerVisible((visible) => !visible)} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{answerVisible ? 'Hide Answer' : 'Show Answer'}</Text>
        <Text accessible={false} style={styles.arrow}>{answerVisible ? '⌃' : '›'}</Text>
      </Pressable>
    </View>}
  </View>;
}

const styles = StyleSheet.create({
  composition: { flexGrow: 1 },
  reading: { paddingHorizontal: 13, gap: 18 },
  protected: { backgroundColor: colors.surface, padding: space.lg, borderRadius: radius.status },
  body: { ...type.body, color: colors.primary, textShadowColor: '#100D28', textShadowRadius: 5, textShadowOffset: { width: 0, height: 1 } },
  quote: { fontStyle: 'italic', paddingHorizontal: 8 },
  quoteMark: { ...type.title, position: 'absolute', top: -7, left: -2, color: chapters.quote.accent, fontSize: 33, lineHeight: 38 },
  author: { ...type.secondary, color: colors.secondary },
  credit: { fontSize: 12, lineHeight: 20, letterSpacing: 2.2, textTransform: 'uppercase', textAlign: 'center' },
  trivia: { flexGrow: 1, justifyContent: 'flex-end', gap: 12, paddingTop: space.md, paddingBottom: 5 },
  answer: { backgroundColor: '#281B49F2', borderWidth: 1.5, borderColor: chapters.trivia.accent, shadowColor: '#D47CFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8, borderRadius: radius.status, padding: space.md, gap: 4 },
  answerLabel: { color: chapters.trivia.accent, textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', fontSize: 12, fontWeight: '600' },
  answerText: { ...type.answer, color: colors.primary, fontStyle: 'italic', textAlign: 'center' },
  longAnswer: { textAlign: 'left', fontStyle: 'normal' },
  button: { alignSelf: 'center', flexDirection: 'row', gap: 9, alignItems: 'center', minHeight: touch, minWidth: touch, justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: '#281B49F2', borderWidth: 1.5, borderColor: chapters.trivia.accent, shadowColor: '#E59BFF', shadowOpacity: 0.65, shadowRadius: 5, shadowOffset: { width: 0, height: 0 } },
  buttonText: { ...type.button, flexShrink: 1, color: colors.primary, fontWeight: '600' },
  arrow: { fontSize: 21, color: colors.primary },
  pressed: { backgroundColor: colors.pressed },
});
