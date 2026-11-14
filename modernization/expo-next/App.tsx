import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [answerVisible, setAnswerVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      >
        <Text accessibilityRole="header" style={styles.heading}>Kyrsha&apos;s App</Text>
        <Text style={styles.caption}>Offline demo · synthetic content</Text>
        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.title}>A little trivia</Text>
          <Text style={styles.question}>How many sides does a triangle have?</Text>
          {answerVisible && (
            <Text accessibilityLiveRegion="polite" style={styles.answer}>Three sides.</Text>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={answerVisible ? 'Hide Answer' : 'Show Answer'}
            accessibilityState={{ expanded: answerVisible }}
            onPress={() => setAnswerVisible((visible) => !visible)}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>{answerVisible ? 'Hide Answer' : 'Show Answer'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f7ef' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 64 },
  heading: { fontSize: 30, fontWeight: '700', color: '#234b13' },
  caption: { fontSize: 16, color: '#40513a', marginTop: 8, marginBottom: 28 },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 16, gap: 20 },
  title: { fontSize: 22, fontWeight: '600', color: '#234b13' },
  question: { fontSize: 20, lineHeight: 29, color: '#172012' },
  answer: { fontSize: 20, color: '#234b13' },
  button: { backgroundColor: '#38761d', borderRadius: 8, padding: 16, minHeight: 48 },
  pressed: { opacity: 0.8 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
