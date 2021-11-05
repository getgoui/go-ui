/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Color from 'color';
import CodeBlock from '@theme/CodeBlock';
import ColorLevelsObject from './color.type';
import './ColorGenerator.scss';
import ColorSwatch from './ColorSwatch';
import { rgb, defaultColors, defaultExtremeColors, centerShade, lightnessInterval } from './color.constants';

function ColorGenerator() {
  const [baseColors, setBaseColors] = useState(defaultColors);
  const [extremeColors, setExtremeColors] = useState(defaultExtremeColors);
  let colorObjects = {} as { [key: string]: ColorLevelsObject };

  Object.entries(baseColors).forEach(([key, rgb]) => {
    if (!colorObjects[key]) {
      colorObjects[key] = {};
    }
    const baseColor = Color(rgb);
    // lighter colors
    for (let i = centerShade - 1; i > 0; i--) {
      const n = centerShade - i;
      const lighten = i * lightnessInterval;
      const color = baseColor.lighten(lighten);
      // console.log(`${key}-${n * 100}`, color);
      colorObjects[key][`${n * 100}`] = color;
    }

    colorObjects[key][`${centerShade * 100}`] = baseColor;

    // darker colors
    for (let i = 0; i < centerShade; i++) {
      const n = centerShade + i;
      const darken = i * lightnessInterval;
      const color = baseColor.darken(darken);
      // console.log(`${key}-${n * 100}`, color);
      colorObjects[key][`${n * 100}`] = color;
    }
  });

  return (
    <div className="container">
      <div className="row">
        {/* Normal colors */}
        {Object.entries(colorObjects).map(([key, levels]) => {
          return (
            <div className="col col--12" key={key}>
              <ColorSwatch colorName={key} levels={levels} state={baseColors} setState={setBaseColors} />
            </div>
          );
        })}
        {/* Extreme colors */}
        <div className="col col--12">
          {Object.entries(extremeColors).map(([key, rgb]) => {
            const color = Color(rgb);
            return (
              <div key={key}>
                <ColorSwatch colorName={key} levels={{ '': color }} state={extremeColors} setState={setExtremeColors} />
              </div>
            );
          })}
        </div>
      </div>
      <CodeBlock className="css">
        {Object.entries(colorObjects).map(([key, levels]) => {
          let code = `// ${key}\n`;
          Object.entries(levels).forEach(([level, color]) => {
            code += `--go-color-${key}-${level}: ${color
              .rgb()
              .array()
              .map((val) => parseInt(val))
              .join(', ')};\n`;
          });
          return code;
        })}
      </CodeBlock>
    </div>
  );
}

export default ColorGenerator;
