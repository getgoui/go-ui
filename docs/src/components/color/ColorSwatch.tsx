import React, { useState, useRef } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import { centerShade, extremeColorCategories, colorCategories, colorLevels } from './color.constants';
import CodeBlock from '@theme/CodeBlock';
import ColorPreview from './ColorPreview';
import { ColorBox } from './ColorBox';

export interface ColorSwatchProps {
  category: string;
  lightnessInterval: string;
  onLightnessIntervalChange: (interval: number) => void;
  colors: Color[];
  onKeyColorChange: (c: Color) => void;
  onIndividualColorChange: (c: Color, index: number) => void;
}

const ColorSwatch = ({ category, lightnessInterval, onLightnessIntervalChange, colors, onKeyColorChange, onIndividualColorChange }: ColorSwatchProps) => {
  const isExtremeColors = extremeColorCategories.includes(category);

  // custom colour input
  const colorInput = useRef(null);
  const toggleColorInput = () => {
    if (colorInput.current) {
      colorInput.current.click();
    }
  };

  console.log({ colors });

  return (
    <div className="color-swatches">
      <h4 className="text-capitalize">{category}</h4>
      <p>
        <small>
          <code>{`--go-color-${category}${isExtremeColors ? '' : '-{level}'}`}</code>
        </small>
      </p>

      <table className="color-table">
        <tbody>
          <tr>
            {colors.map((color, i) => {
              return (
                <td key={i}>
                  <ColorBox value={color} onChange={(color) => onIndividualColorChange(color, i)}></ColorBox>
                </td>
              );
            })}
          </tr>
          <tr>
            {colors.map((color, i) => {
              return <td key={`${category}-${i}-hex`}>{color.hex()}</td>;
            })}
          </tr>
        </tbody>
      </table>

      {/* <div className="text--center">
        <div>
          <label htmlFor={`${colorName}-input`} className="margin-top--md">
            {isExtremeColors
              ? `Click button below to choose a different color for ${colorName}`
              : `Click button below to choose a different color for the center shade (${centerShade * 100})`}
          </label>
          <div className="color-input-group">
            <button type="button" className="color-input-button" onClick={toggleColorInput}>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m4 15.76-1 4A1 1 0 0 0 3.75 21a1 1 0 0 0 .49 0l4-1a1 1 0 0 0 .47-.26L17 11.41l1.29 1.3 1.42-1.42-1.3-1.29L21 7.41a2 2 0 0 0 0-2.82L19.41 3a2 2 0 0 0-2.82 0L14 5.59l-1.3-1.3-1.42 1.42L12.58 7l-8.29 8.29a1 1 0 0 0-.29.47zm1.87.75L14 8.42 15.58 10l-8.09 8.1-2.12.53z" />
              </svg>
              <span className="visually-hidden">Pick a different key colour</span>
            </button>
            <input ref={colorInput} id={`${colorName}-input`} type="color" value={targetColor.hex()} onChange={handleColorChange} />
          </div>
          <p>{targetColor.hex()}</p>
        </div>
        {!isExtremeColors ? (
          <div>
            <label htmlFor={`${colorName}-lightness-interval`} className="margin-top--md">
              Choose a lightness interval
            </label>
            <input
              type="number"
              step="0.01"
              value={lightnessInterval}
              className="color-input-button"
              onInput={(e) => setLightnessInterval(parseFloat((e.target as HTMLInputElement).value))}
            />
          </div>
        ) : null}
      </div> */}

      <p>Copy the code below and paste in your stylesheet to override the default color tokens.</p>

      {/* <CodeBlock className="css">{getCode(colorName, levels, isExtremeColors)}</CodeBlock> */}
    </div>
  );
};

const getCode = (colorName: string, levels: ColorLevelsObject, isExtremeColors: boolean): string => {
  let code = `// ${colorName}\n`;
  Object.entries(levels).forEach(([level, color]) => {
    const cssColorName = `--go-token-${colorName}` + `${isExtremeColors ? '' : '-' + level}`;
    const colorRGB = color
      .rgb()
      .array()
      .map((v) => Math.round(v))
      .join(', ');
    code += `${cssColorName}: ${colorRGB};\n`;
  });

  return code;
};

export default ColorSwatch;
