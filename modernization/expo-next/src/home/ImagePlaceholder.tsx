import { StyleSheet, View } from 'react-native';
import type { PlaceholderImage } from './fixtures';
import { colors, chapters } from './tokens';

export function ImagePlaceholder({ image }: { image: PlaceholderImage }) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={image.label}
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.canvas]}
    >
      <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.sun, { backgroundColor: chapters.quote.accent }]} />
      <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[styles.land, { backgroundColor: colors.elevated }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: { overflow: 'hidden', backgroundColor: colors.canvas },
  sun: { position: 'absolute', top: 28, right: 28, width: 76, height: 76, borderRadius: 38 },
  land: { position: 'absolute', left: -40, right: -40, bottom: -70, height: '65%', borderRadius: 160 },
});
