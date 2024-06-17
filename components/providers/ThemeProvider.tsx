'use client'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme } from '@/lib/theme';

export default function ThemeProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
  );
};
