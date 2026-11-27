import 'react-native-gesture-handler/jestSetup';
import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => ({ FontAwesome: 'FontAwesome' }));
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

test('opens the legacy home when React Native no longer provides InteractionManager', async () => {
  const native = require('react-native');
  const previous = Object.getOwnPropertyDescriptor(native, 'InteractionManager');
  Object.defineProperty(native, 'InteractionManager', {
    configurable: true,
    get() { throw new Error('InteractionManager has been removed from react-native core'); }
  });
  try {
    const App = require('../App').default;
    await render(<App />);
    expect(await screen.findByText('QUOTE')).toBeTruthy();
  } finally {
    if (previous) Object.defineProperty(native, 'InteractionManager', previous);
    else delete native.InteractionManager;
  }
});
