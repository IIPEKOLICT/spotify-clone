import { Alert } from "@mui/material";

interface IProps {
    type: "error" | "success",
    message: string,
};

export const AlertComponent: React.FC<IProps> = (props) => {
    const { type, message } = props;
    return (
        <Alert sx={{ borderRadius: "0", width: "40%" }} variant="filled" severity={type}>{message}</Alert>
    );
};