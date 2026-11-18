import { StyleSheet, View } from 'react-native';
import type { PlaceholderImage } from './fixtures';

export function ImagePlaceholder({ image }: { image: PlaceholderImage }) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={image.label}
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.canvas, { backgroundColor: image.sky }]}
    >
      <View style={[styles.sun, { backgroundColor: image.sun }]} />
      <View style={[styles.land, { backgroundColor: image.land }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: { overflow: 'hidden' },
  sun: { position: 'absolute', top: 28, right: 28, width: 76, height: 76, borderRadius: 38 },
  land: { position: 'absolute', left: -40, right: -40, bottom: -70, height: '65%', borderRadius: 160 },
});
