import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { SxProps, Theme } from "@mui/material";

interface IProps {
    name: string,
    variant: "contained" | "outlined",
    loading?: boolean,
    color: "black" | "green" | "blue",
    onSubmit: () => void,
    style: SxProps<Theme>,
};

export const ButtonComponent: React.FC<IProps> = (props) => {
    const { name, onSubmit, loading, color, style, variant } = props;
    const submitForm = (): void => {
        onSubmit();
    };

    return(
        <LoadingButton
            onClick={submitForm}
            sx={{
                ...style,
                borderRadius: "15px",
                padding: "0",
                boxShadow: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
                fontStyle: "normal",
                fontSize: { xs: "14px", sm: "18px" },
            }}
            variant={variant}
            disabled={loading}
            loading={loading}
            color={color}
        >{name}</LoadingButton>
    );
};