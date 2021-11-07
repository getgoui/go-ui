import React, { useState } from 'react';
import Color from 'color';
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
    <div className="container-fluid">
      <div className="row">
        {/* Normal colors */}
        {Object.entries(colorObjects).map(([key, levels]) => {
          return (
            <div className="col col--12 col-md-4 col-xl-4" key={key}>
              <ColorSwatch colorName={key} levels={levels} state={baseColors} setState={setBaseColors} />
            </div>
          );
        })}
        {/* Extreme colors */}
        <div className="col col--12 col-md-4 col-xl-4">
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
    </div>
  );
}

export default ColorGenerator;
