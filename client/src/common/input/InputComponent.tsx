import { Box, TextField, styled } from "@mui/material";
import { Ref, forwardRef, useState } from "react";
import { PasswordIcon } from "../password/PasswordIcon";

interface IProps {
    label: string,
    onChange: (val: any) => void,
    value: any,
    disabled?: boolean,
};

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "height" : "48px",
        "padding": "14px 0px",
        "backgroundColor": "white",
        "borderRadius": "8px",
        "& fieldset": {
            borderColor: `var(--main-color)`,
        },
        "&:hover fieldset": {
            borderColor: `var(--green-color)`,
        },
        "&.Mui-focused fieldset": {
            borderColor: `var(--green-color)`,
        },
    },
});

export const InputComponent = forwardRef<Ref<any>, IProps>((props, ref) => {
    const { label, onChange, value, disabled } = props;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <CssTextField
            sx={{ width: "100%" }}
            placeholder={label}
            size="small"
            onChange={onChange}
            value={value}
            type={!showPassword ? "text" : "password"}
            disabled={disabled}
            autoComplete="on"
            InputProps={{
                ...props,
                endAdornment: (
                    label === "Пароль" && <PasswordIcon isShow={showPassword} changeIsShow={setShowPassword} />
                ),
            }}
        />
    );
});