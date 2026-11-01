'use client';

import React from 'react';

interface InitialAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function InitialAvatar({ name, size = 'md', className }: InitialAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-orbion-indigo/10 border border-orbion-indigo/30 text-orbion-indigo font-mono font-semibold ${SIZE_MAP[size]} ${className || ''}`}
    >
      {initials}
    </div>
  );
}