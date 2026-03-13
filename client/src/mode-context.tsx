// ModeContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';

const ModeContext = createContext<{
  mode: PaletteMode;
  toggle: () => void;
}>({ mode: 'light', toggle: () => {} });

export interface ModeProviderProps {
    children: ReactNode;
}

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDark ? 'dark' : 'light');
  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));
  return <ModeContext.Provider value={{ mode, toggle }}>{children}</ModeContext.Provider>;
};

export const useMode = () => useContext(ModeContext);