/**
 * single ColorBox to change colour and update color value
 */
import React from 'react';
import Color from 'color';
import ColorPreview from './ColorPreview';
import './ColorBox.scss';

interface ColorBoxProps {
  value: Color;
  onChange: (c: Color) => void;
  children?: React.ReactNode;
}

export const ColorBox = ({ value, onChange, children }: ColorBoxProps) => {
  const handleChange = (e) => {
    const color = Color(e.target.value);
    if (!color) {
      return;
    }
    onChange(color);
  };

  return (
    <label className="color-box">
      <ColorPreview color={value}>{children}</ColorPreview>
      <input className="control" type="color" value={value.hex()} onChange={handleChange} />
    </label>
  );
};
