import { createContext } from 'react';

/** Shared by one measured chapter reader and its dynamic text. */
export const ReadingFit = createContext({ scale: 1, reset: () => {} });
