import React from 'react';
import Color from 'color';
import CodeBlock from '@theme/CodeBlock';
import ColorLevelsObject from './color.type';
import { centerShade, defaultColors, defaultExtremeColors, totalShades } from './color.constants';
import ColorPreview from './ColorPreview';

function getColorFromKey(key: string, rootStyle: CSSStyleDeclaration): Color | null {
  const colorRgbValue = rootStyle.getPropertyValue(key);
  return colorRgbValue ? Color(`${colorRgbValue.replace(/ /g, '')}`) : null;
}

function getKeysFromName(name: string, isExtreme: boolean = false): string[] {
  if (isExtreme) {
    return [`--go-color-${name}`];
  }
  let results = [];
  for (let i = 0; i < totalShades; i++) {
    results.push(`--go-color-${name}-${(i + 1) * 100}`);
  }
  return results;
}

export default function ColorDisplay() {
  // get css variables from the root DOM element
  const rootStyle = window.getComputedStyle(document.querySelector('html'));

  // get the color token names from constants
  let colorValues = {} as { [key: string]: Color[] };
  Object.keys(defaultColors).forEach((name) => {
    colorValues[name] = getKeysFromName(name).map((key) => getColorFromKey(key, rootStyle));
  });

  Object.keys(defaultExtremeColors).forEach((name) => {
    colorValues[name] = getKeysFromName(name, true).map((key) => getColorFromKey(key, rootStyle));
  });

  return (
    <div>
      <h3>Default colors</h3>
      <p>The following colours come out of the box.</p>
      <p>
        <em>(Click the color box to see usage guide.)</em>
      </p>
      {Object.entries(colorValues).map(([name, colors]) => {
        return (
          <div key={name}>
            <div>
              <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
            </div>
            <div className="color-box-wrapper" key={name}>
              {colors.map((color, index): JSX.Element => {
                if (!color) {
                  return null;
                }
                const textColor = color.isDark() ? '#fff' : '#000';
                return (
                  <div key={index} className="color-box">
                    <ColorPreview text="" color={color} textColor={textColor} isCircle={index === 4} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
