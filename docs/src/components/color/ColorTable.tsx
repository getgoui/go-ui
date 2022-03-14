import React, { useState } from 'react';
import Color from 'color';
import { colorLevels } from './color.constants';
import { ColorPickerBox } from './ColorPickerBox';

type ColorModes = 'hex' | 'rgb' | 'hsl';

export function ColorTable({ colors, onIndividualColorChange, isExtremeColors }) {
  const [valueMode, setValueMode] = useState('hex');

  const colorDisplays = {
    hex: (c: Color) => c.hex(),
    rgb: (c: Color) => c.rgb().round().string(),
    hsl: (c: Color) => c.hsl().round().string(),
    cmyk: (c: Color) => c.cmyk().round().string(),
  };

  return (
    <div className="color-table-wrapper">
      <table className="color-table">
        <thead>
          <tr>
            <th></th>
            {/* levels (only non-extreme colors) */}
            {!isExtremeColors ? <th style={{ maxWidth: '4rem' }}>Levels</th> : null}
            {!isExtremeColors ? (
              <th style={{ maxWidth: '4rem' }}>
                <a href="https://www.w3.org/TR/WCAG20/#relativeluminancedef" target="_blank" rel="noreferrer">
                  Luminosity
                </a>
                <p>(0 = black, 1 = white)</p>
              </th>
            ) : null}
            <th>
              <label htmlFor="valueModeSelect">Value</label>
              <select id="valueModeSelect" onChange={(e) => setValueMode(e.target.value)}>
                <option value="hex">Hex</option>
                <option value="rgb">RGB</option>
                <option value="hsl">HSL</option>
                <option value="cmyk">CMYK</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, i) => {
            return (
              <tr key={`color-box-${i}`}>
                <td>
                  <ColorPickerBox value={color} onChange={(color) => onIndividualColorChange(color, i)}></ColorPickerBox>
                </td>
                {/* levels (only non-extreme colors) */}
                {!isExtremeColors ? (
                  <td
                    style={{
                      backgroundColor: color.hex(),
                      color: color.isDark() ? '#fff' : '#000',
                    }}>
                    {colorLevels[i]}
                  </td>
                ) : null}
                {!isExtremeColors ? <td>{color.luminosity().toFixed(4)}</td> : null}
                <td>{colorDisplays[valueMode](color)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
