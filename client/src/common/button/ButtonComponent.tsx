import * as React from "react";
import { LoadingButton } from "@mui/lab";

interface IProps {
    name: string,
    width: string,
    mobileWidth?: string,
    height: string,
    outlined: boolean,
    loading?: boolean,
    black?: boolean,
    onSubmit: () => void,
};

export const ButtonComponent: React.FC<IProps> = (props: IProps) => {
    const { name, onSubmit, width, height, outlined, mobileWidth, loading, black } = props;
    const submitForm = (): void => {
        onSubmit();
    };
    return(
        <LoadingButton
            onClick={submitForm}
            sx={{
                borderRadius: "15px",
                padding: "0",
                boxShadow: "none",
                width: { xs: `${mobileWidth}`, sm: `${width}` },
                height: `${height}`,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "600",
                fontStyle: "normal",
                fontSize: { xs: "14px", sm: "18px" },
            }}
            variant={`${!outlined ? "contained" : "outlined"}`}
            disabled={loading}
            loading={loading}
            color={`${black ? "black" : "green"}`}
        >{name}</LoadingButton>
    );
};