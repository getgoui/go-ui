import React, { useState } from 'react';
import Color from 'color';
import ColorLevelsObject from './color.type';
import './ColorGenerator.scss';
import ColorSwatch from './ColorSwatch';
import { colorCategories, extremeColorCategories, colorLevels, centerShade, lightnessIntervals, getDefaultColorValues } from './color.constants';
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
  const colorValues = getDefaultColorValues();
  const [colors, setColors] = useState(colorValues);
  const [intervals, setLightnessIntervals] = useState(lightnessIntervals);

  // handle key colour (level 500) change to apply to all levels
  const handleKeyColorChange = (categoryName: string, colorValue: Color) => {
    const lightnessInterval = intervals[categoryName];
    // set middle colour to colorValue
    const middleColorIndex = Math.floor(colorLevels.length / 2);
    let newColorCategory = [];

    newColorCategory[middleColorIndex] = colorValue;

    for (let i = 0; i < colorLevels.length; i++) {
      if (i < middleColorIndex) {
        // 100 - 400
        let lighten = (middleColorIndex - i) * lightnessInterval;
        const color = Color(colorValue).lighten(lighten);
        newColorCategory[i] = color.rgb().object();
      }
      if (i > middleColorIndex) {
        // 600-900
        let darken = (i - middleColorIndex) * lightnessInterval;
        const color = Color(colorValue).darken(darken);
        newColorCategory[i] = color.rgb().object();
      }
    }
    setColors({
      ...colors,
      [categoryName]: newColorCategory,
    });
  };

  // handle lightness interval change to apply to all levels (intervalValue from 0.0 to 1.0)
  const handleLightnessIntervalChange = (categoryName: string, intervalValue: number) => {
    setLightnessIntervals({
      ...intervals,
      [categoryName]: intervalValue,
    });
  };

  // handle individual colour changes
  const handleIndividualColourChange = (categoryName: string, colorValue: Color, index: number) => {
    const targetColorCategory = colors[categoryName];

    let newColorCategoryLevels = [...targetColorCategory];
    newColorCategoryLevels[index] = colorValue;

    setColors({
      ...colors,
      [categoryName]: newColorCategoryLevels,
    });
  };

  return (
    <Swiper slidesPerView={1} loop={true} pagination={true} navigation={true} className="color-generator-slider">
      {/* Normal colors */}
      {colorCategories.map((category) => {
        return (
          <SwiperSlide key={category}>
            <ColorSwatch
              category={category}
              lightnessInterval={intervals[category]}
              onLightnessIntervalChange={(intervalValue) => handleLightnessIntervalChange(category, intervalValue)}
              colors={colors[category]}
              onKeyColorChange={(colorValue) => handleKeyColorChange(category, colorValue)}
              onIndividualColorChange={(colorValue, index) => handleIndividualColourChange(category, colorValue, index)}
            />
          </SwiperSlide>
        );
      })}
      {/* Extreme colors */}
      {extremeColorCategories.map((category) => {
        return (
          <SwiperSlide key={category}>
            <ColorSwatch
              category={category}
              lightnessInterval={intervals[category]}
              onLightnessIntervalChange={(intervalValue) => handleLightnessIntervalChange(category, intervalValue)}
              colors={colors[category]}
              onKeyColorChange={(colorValue) => handleKeyColorChange(category, colorValue)}
              onIndividualColorChange={(colorValue, index) => handleIndividualColourChange(category, colorValue, index)}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ColorGenerator;
