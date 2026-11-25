import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/home/HomeScreen';
import { createContentSource } from './src/home/contentSource';

const source = createContentSource();

export default function App() {
  return <SafeAreaProvider><HomeScreen {...source} /></SafeAreaProvider>;
}
