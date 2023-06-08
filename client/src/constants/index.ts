import { createTheme, PaletteColorOptions } from '@mui/material';
import { NavItem, RoutePath } from './enums';

declare module '@mui/material/styles' {
  interface CustomPalette {
    green: PaletteColorOptions;
    white: PaletteColorOptions;
    black: PaletteColorOptions;
    blue: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    green: true;
    white: true;
    black: true;
    blue: true;
  }
}
declare module '@mui/material' {
  interface TextFieldPropsColorOverrides {
    green: true;
    white: true;
    black: true;
    blue: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string, contrastText: string) =>
  augmentColor({ color: { main: mainColor, contrastText: contrastText } });

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 1200,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    green: createColor('#06BB64', '#F1F1F1'),
    white: createColor('#F1F1F1', 'black'),
    black: createColor('#000000', '#F1F1F1'),
    blue: createColor('rgb(100 127 178)', 'white'),
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export const nav_item = [
  { index: 1, name: NavItem.PROFILE, route: RoutePath.PROFILE },
  { index: 2, name: NavItem.NEWS, route: RoutePath.NEWS },
  { index: 3, name: NavItem.MESSENGER, route: RoutePath.MESSENGER },
  { index: 4, name: NavItem.FRIENDS, route: RoutePath.FRIENDS },
  { index: 5, name: NavItem.PHOTOS, route: RoutePath.PHOTOS },
  { index: 6, name: NavItem.MUSIC, route: RoutePath.MUSIC },
  { index: 7, name: NavItem.VIDEOS, route: RoutePath.VIDEOS },
];
