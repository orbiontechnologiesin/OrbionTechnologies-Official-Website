'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui';

interface CopyButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
}

const SIZE_MAP = {
  sm: 'text-xs h-8 px-3',
  md: 'text-sm h-10 px-4',
};

export function CopyButton({ text, size = 'sm', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [text]);

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleCopy}
      className={`font-mono text-text-muted hover:text-text-primary ${SIZE_MAP[size]} ${className || ''} p-1`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </Button>
  );
}