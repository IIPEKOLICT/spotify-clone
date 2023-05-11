import { Box } from "@mui/material";
import { AuthForm } from "../../forms/auth/AuthForm";
import styles from "./LoginPage.module.scss";

interface IProps {
    type: string,
};

export const LoginPage: React.FC<IProps> = (props: IProps) => {
    const { type } = props;
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                height: "100%",
                width: "100%",
                textAlign: "center",
            }}
        >
            <Box sx={{ fontSize: { xs: "18px", sm: "24px" }, marginBottom: "40px" }}>
                <span className={styles.title}>{`Что бы продолжить ${type === 'login' ? 'войдите' : 'зарегистрируйтесь'} в YumaSpotify`}</span>
            </Box>
            <AuthForm type={type} />
        </Box>
    );
};