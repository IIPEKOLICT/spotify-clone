import { TextField } from "@mui/material";
import { Ref, forwardRef, useState } from "react";
import { PasswordIcon } from "../password/PasswordIcon";

interface IProps {
    label: string,
    onChange: (val: any) => void,
    value: any,
    disabled?: boolean,
};

export const InputComponent = forwardRef<Ref<any>, IProps>((props, ref) => {
    const { label, onChange, value, disabled } = props;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <TextField
            sx={{
                width: "100%",
                background: "white",
                fieldset: { display: "none" },
                borderRadius: "15px",
                ".Mui-focused": {
                    border: "1px solid var(--green-color)",
                    borderRadius: "15px",
                },
                ".MuiInputBase-root": {
                    borderRadius: "15px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "600",
                    fontStyle: "normal",
                    fontSize: { xs: "14px", sm: "18px" },
                },
            }}
            placeholder={label}
            onChange={onChange}
            value={value}
            type={!showPassword ? "text" : "password"}
            autoComplete="on"
            autoFocus={false}
            disabled={disabled}
            InputProps={{
                ...props,
                endAdornment: (
                    label === "Password" && <PasswordIcon isShow={showPassword} changeIsShow={setShowPassword} />
                ),
            }}
        />
    );
});