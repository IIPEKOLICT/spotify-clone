import { ListItemText, TypographyProps } from "@mui/material";

interface IProps {
    text: string,
    color: "white" | "black",
    style: TypographyProps,
};

export const TextComponent: React.FC<IProps> = ({ text, color, style }) => {
    return (
        <ListItemText
            primary={text}
            primaryTypographyProps={{
                ...style,
                fontWeight: "800",
            }}
            sx={{
                ...style,
                color: `${color} !important`
            }}
        />
    );
};