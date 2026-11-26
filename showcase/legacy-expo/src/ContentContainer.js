import { useCallback, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextContainer } from './TextContainer';

// Ported from the original ContentContainer; bundled art replaces remote images.
export function ContentContainer(props) {
  const [isrefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try { await props.onRefresh(); } finally { setIsRefreshing(false); }
  }, [props.onRefresh]);
  return (
    <View style={style.contentContainer}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{props.title.toUpperCase()}</Text>
        <Pressable accessibilityLabel={`Refresh ${props.title}`} style={style.pressContainer} onPress={handleRefresh}>
          {!isrefreshing ? <FontAwesome name="refresh" size={24} color="#38761d" /> : <ActivityIndicator color="#38761d" />}
        </Pressable>
      </View>
      <View style={props.image ? style.imageContainer : style.imageContainerAlt}>
        {props.image && <Image testID="legacy-card-image" source={props.image} style={style.image} resizeMode="contain" />}
        <TextContainer author={props.author} answer={props.answer}
          style={props.image ? style.textContainer : style.textContainerAlt} text={props.text} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  contentContainer: { alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, width: '100%' },
  imageContainer: { height: 400, marginBottom: 20, width: '100%' },
  imageContainerAlt: { width: '100%' },
  image: { aspectRatio: 1, borderRadius: 16, width: '100%' },
  textContainer: { bottom: '50%', left: '5%', position: 'absolute', right: '5%' },
  textContainerAlt: { backgroundColor: '#38761d', marginBottom: 20 },
  title: { color: '#38761d', fontWeight: 'bold', fontSize: 24 },
  titleContainer: { justifyContent: 'center', display: 'flex', flexDirection: 'row', width: '100%', position: 'relative' },
  pressContainer: { position: 'absolute', right: 0 }
});
