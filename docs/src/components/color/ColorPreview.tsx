import React from 'react';
import Color from 'color';
import './ColorPreview.scss';

export default function ColorPreview({ color, textColor, text, isSpecial, onClick }) {
  return (
    <button type="button" className={`color-preview${isSpecial ? ' special' : ''}`} style={{ backgroundColor: color.rgb().string(), color: textColor }} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}
