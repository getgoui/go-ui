import Color from 'color';

export const rgb = (r, g, b) => ({ r, g, b });

export const defaultColors = {
  primary: '#083d8c',
  secondary: '#666ea0',
  success: '#42a53b',
  critical: rgb(213, 32, 26),
  neutral: rgb(144, 144, 144),
};

export const defaultExtremeColors = {
  darkest: rgb(0, 0, 0),
  lightest: rgb(255, 255, 255),
};
// get all color keys from combine default colors with extreme colors
export const lightnessInterval = 0.18;
export const totalShades = 9;
export const centerShade = Math.ceil(totalShades / 2);

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

export function getDefaultColorValues() {
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
  return colorValues;
}
