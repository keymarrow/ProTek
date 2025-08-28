'use client';

import * as React from 'react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
    },
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: 'var(--font-plus-jakarta)', // Use CSS variable from layout
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
});

theme = responsiveFontSizes(theme);

export default function AppTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
