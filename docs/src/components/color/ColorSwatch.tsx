import React, { useState, useRef } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import { centerShade } from './color.constants';
import CodeBlock from '@theme/CodeBlock';
import ColorPreview from './ColorPreview';

interface ColorSwatchProps {
  colorName: string;
  levels: ColorLevelsObject;
  state: any;
  setState: (state: any) => void;
}

const ColorSwatch = ({ colorName, levels, state, setState }: ColorSwatchProps) => {
  const colorInput = useRef(null);

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

  const toggleColorInput = () => {
    if (colorInput.current) {
      colorInput.current.click();
    }
  };

  return (
    <div className="color-swatches">
      <h4 className="text-capitalize">{colorName}</h4>
      <p>
        <small>
          <code>{cssVarName}</code>
        </small>
      </p>

      <div className="color-box-wrapper">
        {Object.entries(levels).map(([level, color]) => {
          const textColor = color.isDark() ? '#fff' : '#000';
          return (
            <div className="color-box" key={level}>
              <ColorPreview color={color} textColor={textColor} text={level} />
            </div>
          );
        })}
      </div>

      <div className="row text--center">
        <div className="col">
          <label htmlFor={`${colorName}-input`} className="margin-top--md">
            {isExtremeColors
              ? `Click button below to choose a different color for ${colorName}`
              : `Click button below to choose a different color for the center shade (${centerShade * 100})`}
          </label>
          <div className="color-input-group">
            <button type="button" className="color-input-button" onClick={toggleColorInput}>
              {targetColor.hex()}
            </button>
            <input ref={colorInput} id={`${colorName}-input`} type="color" value={targetColor.hex()} onChange={handleColorChange} />
          </div>
        </div>
      </div>

      <p>Copy the code below and paste in your stylesheet to override the default color tokens.</p>

      <CodeBlock className="css">{getCode(colorName, levels, isExtremeColors)}</CodeBlock>
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
