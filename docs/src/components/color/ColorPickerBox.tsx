/**
 * single ColorPickerBox to change colour and update color value
 */
import React from 'react';
import Color from 'color';
import ColorPreview from './ColorPreview';
import uniqueId from 'lodash.uniqueid';
import './ColorPickerBox.scss';
import { useRef } from 'react';

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

  const id = useRef(uniqueId('color-picker-box-'));

  return (
    <div className="color-picker-box-group">
      <label className="color-picker-box">
        Pick a color
        <input className="control" type="color" value={value.hex()} onChange={handleChange} />
        <ColorPreview color={value}>{children}</ColorPreview>
      </label>
      <div className="divider"></div>
      <div className="input">
        <label htmlFor={id.current}>Input hex code</label>
        <input type="text" id={id.current} className="control" defaultValue={value.hex()} onBlur={handleChange} />
      </div>
    </div>
  );
};
