import Color from 'color';

export const rgb = (r, g, b) => ({ r, g, b });

export const colorCategories = ['primary', 'secondary', 'success', 'critical', 'neutral'];
export const colorLevels = [100, 200, 300, 400, 500, 600, 700, 800, 900];
export const extremeColorCategories = ['darkest', 'lightest'];
// get all color keys from combine default colors with extreme colors
export const lightnessIntervals = {
  primary: 0.2,
  secondary: 0.2,
  success: 0.2,
  critical: 0.2,
  neutral: 0.2,
};
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
  colorLevels.forEach((level) => {
    results.push(`--go-color-${name}-${level}`);
  });
  return results;
}

export function getDefaultColorValues() {
  // get css variables from the root DOM element
  const rootStyle = window.getComputedStyle(document.querySelector('html'));

  // get the color token names from constants
  let colorValues = {} as { [key: string]: Color[] };
  colorCategories.forEach((name) => {
    colorValues[name] = getKeysFromName(name).map((key) => getColorFromKey(key, rootStyle));
  });
  extremeColorCategories.forEach((name) => {
    colorValues[name] = getKeysFromName(name, true).map((key) => getColorFromKey(key, rootStyle));
  });
  return colorValues;
}
