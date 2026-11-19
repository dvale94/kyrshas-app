import { HomeScreen } from './src/home/HomeScreen';
import { createContentSource } from './src/home/contentSource';

const source = createContentSource();

export default function App() {
  return <HomeScreen {...source} />;
}
