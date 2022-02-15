import React from 'react';
import Color from 'color';
import './ColorPreview.scss';

export default function ColorPreview({ color, textColor, text, isSpecial }) {
  return (
    <div className={`color-preview${isSpecial ? ' special' : ''}`} style={{ backgroundColor: color.rgb().string(), color: textColor }} title={color.hex()}>
      <span>{text}</span>
    </div>
  );
}
