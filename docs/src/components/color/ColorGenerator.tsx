import React, { useState } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import './ColorGenerator.scss';
import ColorSwatch from './ColorSwatch';
import { rgb, defaultColors, defaultExtremeColors, centerShade, lightnessInterval, getDefaultColorValues } from './color.constants';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function ColorGenerator() {
  // const colorValues = getDefaultColorValues();
  const [baseColors, setBaseColors] = useState(defaultColors);
  const [extremeColors, setExtremeColors] = useState(defaultExtremeColors);
  const [interval, setLightnessInterval] = useState(lightnessInterval);
  let colorObjects = {} as { [key: string]: ColorLevelsObject };

  Object.entries(baseColors).forEach(([key, rgb]) => {
    if (!colorObjects[key]) {
      colorObjects[key] = {};
    }
    const baseColor = Color(rgb);
    // lighter colors
    for (let i = centerShade - 1; i > 0; i--) {
      const n = centerShade - i;
      const lighten = i * interval;
      const color = baseColor.lighten(lighten);
      // console.log(`${key}-${n * 100}`, color);
      colorObjects[key][`${n * 100}`] = color;
    }

    colorObjects[key][`${centerShade * 100}`] = baseColor;

    // darker colors
    for (let i = 0; i < centerShade; i++) {
      const n = centerShade + i;
      const darken = i * interval;
      const color = baseColor.darken(darken);
      // console.log(`${key}-${n * 100}`, color);
      colorObjects[key][`${n * 100}`] = color;
    }
  });

  return (
    <Swiper slidesPerView={1} loop={true} pagination={true} navigation={true} className="color-generator-slider">
      {/* Normal colors */}
      {Object.entries(colorObjects).map(([key, levels]) => {
        return (
          <SwiperSlide key={key}>
            <ColorSwatch
              colorName={key}
              levels={levels}
              state={baseColors}
              setState={setBaseColors}
              lightnessInterval={interval}
              setLightnessInterval={setLightnessInterval}
            />
          </SwiperSlide>
        );
      })}
      {/* Extreme colors */}
      {Object.entries(extremeColors).map(([key, rgb]) => {
        const color = Color(rgb);
        return (
          <SwiperSlide key={key}>
            <ColorSwatch
              colorName={key}
              levels={{ '': color }}
              state={extremeColors}
              setState={setExtremeColors}
              lightnessInterval={interval}
              setLightnessInterval={setLightnessInterval}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ColorGenerator;
