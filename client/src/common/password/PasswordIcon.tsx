import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

interface IProps {
    isShow: boolean,
    changeIsShow: (value: boolean) => void,
};

export const PasswordIcon: React.FC<IProps> = ({ isShow, changeIsShow }: IProps) => {
    const [showPassword, setShowPassword] = useState(!isShow);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        changeIsShow(showPassword);
    }, [showPassword, changeIsShow]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return(
        <InputAdornment position="end" sx={{ paddingRight: "20px" }}>
            <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );
};