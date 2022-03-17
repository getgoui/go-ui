import React, { useState, useRef } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import { centerShade, extremeColorCategories, colorCategories, colorLevels } from './color.constants';
import CodeBlock from '@theme/CodeBlock';
import { ColorTable } from './ColorTable';
import ColorPreview from './ColorPreview';
import { ColorPickerBox } from './ColorPickerBox';

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
  const middleColorIndex = Math.floor(colorLevels.length / 2);

  const targetColor = isExtremeColors ? colors[0] : colors[middleColorIndex];

  // custom colour input
  const colorInput = useRef(null);
  const toggleColorInput = () => {
    if (colorInput.current) {
      colorInput.current.click();
    }
  };

  return (
    <div className="color-swatches">
      <h4 className="text-capitalize">{category}</h4>
      <p>
        <small>
          <code>{`--go-color-${category}${isExtremeColors ? '' : '-{level}'}`}</code>
        </small>
      </p>
      {/* color table */}
      <ColorTable colors={colors} onIndividualColorChange={onIndividualColorChange} isExtremeColors={isExtremeColors} category={category} />
      {!isExtremeColors ? (
        <div className="text--center">
          <div>
            <h4>
              Change key color {colorLevels[middleColorIndex]} to change all {category} colors
            </h4>
            <ColorPickerBox value={targetColor} onChange={(color) => onKeyColorChange(color)}></ColorPickerBox>
          </div>
          <div>
            <label htmlFor={`${category}-lightness-interval`} className="margin-top--md">
              Choose a lightness interval
            </label>
            <input
              type="number"
              step="0.01"
              value={lightnessInterval}
              className="color-input-button"
              onInput={(e) => onLightnessIntervalChange(parseFloat((e.target as HTMLInputElement).value))}
              required
            />
          </div>
        </div>
      ) : null}

      <p>Copy the code below and paste in your stylesheet to override the default color tokens.</p>

      <CodeBlock className="css">{getCode(category, colors, isExtremeColors)}</CodeBlock>
    </div>
  );
};

const getCode = (category: string, colors: Color[], isExtremeColors: boolean): string => {
  let code = `// ${category}\n`;
  colors.forEach((color, i) => {
    const level = colorLevels[i];
    const cssColorName = `--go-token-${category}` + `${isExtremeColors ? '' : '-' + level}`;
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
