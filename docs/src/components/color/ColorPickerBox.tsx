/**
 * single ColorPickerBox to change colour and update color value
 */
import React from 'react';
import Color from 'color';
import ColorPreview from './ColorPreview';
import './ColorPickerBox.scss';

interface ColorPickerBoxProps {
  value: Color;
  onChange: (c: Color) => void;
  children?: React.ReactNode;
}

export const ColorPickerBox = ({ value, onChange, children }: ColorPickerBoxProps) => {
  const handleChange = (e) => {
    const color = Color(e.target.value);
    if (!color) {
      return;
    }
    onChange(color);
  };

  return (
    <label className="color-picker-box">
      <ColorPreview color={value}>{children}</ColorPreview>
      <input className="control" type="color" value={value.hex()} onChange={handleChange} />
    </label>
  );
};
