import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { CardText } from '../src/home/CardText';
import { ChapterReading } from '../src/home/ChapterReading';
import { mockContentProvider } from '../src/home/content';

test('measured overflow reduces body size, respects the minimum and resets on replacement', async () => {
  const renderReading = (revision: number, text: string) => <ChapterReading id="fact" active height={300} revision={revision} session={mockContentProvider} onOverflow={() => {}}>
    <CardText text={text} />
  </ChapterReading>;
  await render(renderReading(1, 'A short fact.'));
  const reader = screen.getByTestId('reading-fact');
  const original = StyleSheet.flatten(screen.getByText('A short fact.').props.style).fontSize;
  await fireEvent(reader, 'contentSizeChange', 300, 500);
  const fitted = StyleSheet.flatten(screen.getByText('A short fact.').props.style).fontSize;
  expect(fitted).toBeLessThan(original);
  expect(fitted).toBeGreaterThanOrEqual(18);
  await fireEvent(reader, 'contentSizeChange', 300, 1500);
  expect(StyleSheet.flatten(screen.getByText('A short fact.').props.style).fontSize).toBe(18);
  await screen.rerender(renderReading(2, 'Replacement.'));
  expect(StyleSheet.flatten(screen.getByText('Replacement.').props.style).fontSize).toBe(original);
});
