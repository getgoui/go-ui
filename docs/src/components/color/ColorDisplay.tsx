import React from 'react';
import { getDefaultColorValues } from './color.constants';
import ColorPreview from './ColorPreview';
import { useColorMode } from '@docusaurus/theme-common';

export default function ColorDisplay() {
  const colorValues = getDefaultColorValues();

  return (
    <div>
      <h3>Default colors</h3>
      <p>
        The following colours come out of the box.(<em>{`{level}`}</em> goes from 100 to 900)
      </p>
      {Object.entries(colorValues).map(([name, colors]) => {
        const isExtreme = ['lightest', 'darkest'].includes(name);
        return (
          <div key={name} className="margin-bottom--md">
            <div>
              <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
            </div>
            <div>
              <p>
                <em>{isExtreme ? `--go-color-${name}` : `--go-color-${name}-{level}`}</em>
              </p>
            </div>
            <div className="color-box-wrapper" key={name}>
              {colors.map((color, index): JSX.Element => {
                if (!color) {
                  return null;
                }
                const textColor = color.isDark() ? '#fff' : '#000';
                return (
                  <div key={index} className="color-box">
                    <ColorPreview color={color} isSpecial={index === 4}>
                      {isExtreme ? '' : (index + 1) * 100}
                    </ColorPreview>
                    <code style={{ fontSize: '0.8em' }}>{color.hex()}</code>
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
