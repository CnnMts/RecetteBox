export const palette = {
  darkRed: '#8D0013',
  brightRed: '#BA212B',
  lightGray: '#D4CFCC',
  cream: '#EDEDE6',
  black: '#000100',
  white: '#FFFFFF',
};

export const theme = {
  light: {
    background: palette.cream,
    surface: palette.white,
    cardBg: palette.lightGray,
    text: palette.black,
    textMuted: '#555555',
    primary: palette.brightRed,
    secondary: palette.darkRed,
    border: palette.lightGray,
    inputBg: palette.white,
  },
  dark: {
    background: palette.black,
    surface: '#121212',
    cardBg: '#1E1E1E',
    text: palette.cream,
    textMuted: palette.lightGray,
    primary: palette.brightRed,
    secondary: palette.darkRed,
    border: '#333333',
    inputBg: '#1E1E1E',
  },
};