import React from 'react';
import Color from 'color';
import './ColorPreview.scss';

export default function ColorPreview({ color, textColor, text, isSpecial }: { color: Color; textColor: string; text: string; isSpecial: boolean }) {
  return (
    <button type="button" className={`color-preview${isSpecial ? ' special' : ''}`} style={{ backgroundColor: color.rgb().string(), color: textColor }}>
      <span>{text}</span>
    </button>
  );
}
