export const rgb = (r, g, b) => ({ r, g, b });

export const defaultColors = {
  primary: rgb(66, 23, 166),
  secondary: rgb(24, 160, 142),
  success: rgb(90, 135, 92),
  error: rgb(209, 65, 46),
  neutral: rgb(102, 102, 102),
};

export const defaultExtremeColors = {
  darkest: rgb(0, 0, 0),
  lightest: rgb(255, 255, 255),
};
// get all color keys from combine default colors with extreme colors
export const lightnessInterval = 0.15;
export const totalShades = 9;
export const centerShade = Math.ceil(totalShades / 2);
