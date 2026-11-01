'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui';
import { useTheme } from '@/components/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="font-mono text-xs h-8 w-8 p-1"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}