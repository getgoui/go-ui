import React from 'react';
import Color from 'color';
import './ColorPreview.scss';

export interface ColorPreviewProps {
  color: Color;
  isSpecial?: boolean;
  children?: React.ReactNode;
}
export default function ColorPreview({ color, isSpecial, children }: ColorPreviewProps) {
  const textColor = color.isDark() ? '#fff' : '#000';
  return (
    <span className={`color-preview${isSpecial ? ' special' : ''}`} style={{ backgroundColor: color.rgb().string(), color: textColor }} title={color.hex()}>
      {children}
    </span>
  );
}
