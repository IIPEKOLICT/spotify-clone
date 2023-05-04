import { createTheme, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
    interface CustomPalette {
        green: PaletteColorOptions;
        white: PaletteColorOptions;
        black: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
};
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        green: true;
        white: true;
        black: true;
    }
};
declare module "@mui/material" {
    interface TextFieldPropsColorOverrides {
        green: true;
        white: true;
        black: true;
    }
};

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string, contrastText: string) => augmentColor({ color: { main: mainColor, contrastText: contrastText } });

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
        green: createColor("#06BB64", "#F1F1F1"),
        white: createColor("#F1F1F1", "black"),
        black: createColor("#000000", "#F1F1F1"),
    },
});