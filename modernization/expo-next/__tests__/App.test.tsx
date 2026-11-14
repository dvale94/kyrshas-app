import { render, screen, userEvent } from '@testing-library/react-native';
import App from '../App';

test('starts offline with a hidden answer, then reveals and hides it', async () => {
  const network = jest.spyOn(globalThis, 'fetch').mockImplementation(() => {
    throw new Error('The synthetic demo must not access the network');
  });

  try {
    await render(<App />);
    expect(screen.getByText('Offline demo · synthetic content')).toBeTruthy();
    expect(screen.getByText('How many sides does a triangle have?')).toBeTruthy();
    expect(screen.queryByText('Three sides.')).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();

    const user = userEvent.setup();
    await user.press(screen.getByRole('button', { name: 'Show Answer' }));
    expect(screen.getByText('Three sides.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Hide Answer', expanded: true })).toBeTruthy();

    await user.press(screen.getByRole('button', { name: 'Hide Answer' }));
    expect(screen.queryByText('Three sides.')).toBeNull();
    expect(screen.getByRole('button', { name: 'Show Answer', expanded: false })).toBeTruthy();
    expect(network).not.toHaveBeenCalled();
  } finally {
    network.mockRestore();
  }
});
