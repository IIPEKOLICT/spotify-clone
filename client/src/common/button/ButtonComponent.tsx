import * as React from "react";
import styles from "./ButtonComponent.module.scss";
import { LoadingButton } from "@mui/lab";

interface IProps {
    name: string,
    width: string,
    mobileWidth?: string,
    mobileHeight?: string,
    height: string,
    outlined: boolean,
    loading?: boolean,
    color?: boolean,
    // type: string,
    onSubmit: (value: React.ChangeEvent<HTMLInputElement>) => void,
};

export const ButtonComponent: React.FC<IProps> = (props: IProps) => {
    const { name, onSubmit, width, height, outlined, mobileWidth, mobileHeight, loading, color } = props;
    const click = (e: any) => {
        onSubmit(e);
    };
    const getColor = () => {
        return !color ? "var(--green-color) !important" : "white !important";
    };
    return(
        <LoadingButton
            onClick={click}
            sx={{
                borderRadius: "8px",
                color: `${!outlined ? "white !important" : getColor()}`,
                boxShadow: "none",
                width: { xs: `${mobileWidth}`, sm: `${width}` },
                height: { xs: `${mobileHeight}`, sm: `${height}` },
                textTransform: `${color && "none !important"}`
            }}
            className={styles.button}
            variant={`${!outlined ? "contained" : "outlined"}`}
            disabled={loading}
            loading={loading}
        >{name}</LoadingButton>
    );
};