import { useState } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import type { CardId } from './content';
import { colors } from './tokens';

export const artwork: Record<CardId, ImageSourcePropType> = {
  quote: require('../../assets/afterglow/quote.jpg'),
  trivia: require('../../assets/afterglow/trivia.jpg'),
  fact: require('../../assets/afterglow/fact.jpg'),
  'dad joke': require('../../assets/afterglow/dad-joke.jpg'),
  'bucket list item': require('../../assets/afterglow/bucket-list.jpg'),
};

export function ChapterScene({ id }: { id: CardId }) {
  const [failed, setFailed] = useState(false);
  return <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.canvas}>
    {!failed && <Image testID={`scene-${id}`} accessible={false} source={artwork[id]} resizeMode="cover" onError={() => setFailed(true)} style={styles.image} />}
  </View>;
}

const styles = StyleSheet.create({
  canvas: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.canvas },
  image: { width: '100%', height: '100%' },
});
