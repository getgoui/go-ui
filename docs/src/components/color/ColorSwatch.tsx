import React, { useState } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import { centerShade } from './color.constants';

interface ColorSwatchProps {
  colorName: string;
  levels: ColorLevelsObject;
  state: any;
  setState: (state: any) => void;
}

const ColorSwatch = ({ colorName, levels, state, setState }: ColorSwatchProps) => {
  const targetColor = Color(state[colorName]);
  const isExtremeColors = Object.keys(levels).length === 1;
  const cssVarName = `--go-color-${colorName}${isExtremeColors ? '' : '-{level}'}`;

  const handleColorChange = (e) => {
    const color = Color(e.target.value);
    if (!color) {
      return;
    }
    setState({
      ...state,
      [colorName]: color.rgb().object(),
    });
  };

  return (
    <div className="color-swatches">
      <h3>
        <span className="color-category-name">{colorName}</span>
        <code>{cssVarName}</code>
      </h3>

      <div className="row">
        <div className="col">
          <label htmlFor={`${colorName}-input`}>{isExtremeColors ? `Adjust ${colorName}` : `Adjust the center shade level (${centerShade * 100})`}</label>
          <div className="color-input-group">
            <input type="text" id={`${colorName}-input`} value={targetColor.hex()} onChange={handleColorChange} />
            <input id={`${colorName}-input`} type="color" value={targetColor.hex()} onChange={handleColorChange} />
          </div>
        </div>
      </div>
      <table className="color-box-wrapper">
        <thead>
          <tr>
            <th>CSS variable name</th>
            <th>RGB</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(levels).map(([level, color]) => {
            const textColor = color.isDark() ? '#fff' : '#000';
            const cssColorName = `--go-color-${colorName}` + `${isExtremeColors ? '' : '-' + level}`;

            return (
              <tr className="color-box" style={{ backgroundColor: color.rgb().string(), color: textColor }} key={level}>
                <td>
                  <pre className="color-name" rows="1" readOnly>
                    {cssColorName}
                  </pre>
                </td>
                <td>
                  {color
                    .rgb()
                    .array()
                    .map((v) => Math.round(v))
                    .join(', ')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ColorSwatch;
