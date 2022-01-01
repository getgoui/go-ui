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
