import { useForm, SubmitHandler, Controller  } from "react-hook-form";
import { InputComponent } from "../../common/input/InputComponent";
import Box from "@mui/material/Box";
import { ButtonComponent } from "../../common/button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.scss";

interface IProps {
    type?: string,
};
type Inputs = {
    name: string,
    password: string,
    email: string,
    onSubmit: (value: React.ChangeEvent<HTMLInputElement>) => void,
};

export const AuthForm: React.FC<IProps> = ({ type }: IProps) => {
    const { control, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log("login", data);
    const onSubmitRegistration: SubmitHandler<Inputs> = (data) => console.log("registaration", data);

    const navigate = useNavigate();

    const clickRedirect = () => {
        switch (type) {
            case "login":
                return navigate("/registration");
            case "registration":
                return navigate("/login");
            default:
                return;
        }
    };

    return(
        <Box sx={{ width: { xs: "90%", sm: "40%" } }}>
            <form className={styles.form}>
                {type !== "login" &&
                    <Box sx={{ marginY: "18px", width: "100%", }}>
                        <Controller
                            name="name"
                            defaultValue=""
                            control={control}
                            render={({ field }) => <InputComponent label="Имя пользователя" {...field} />}
                        />
                    </Box>
                }
                <Box sx={{ marginY: "18px", width: "100%" }}>
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ field }) => <InputComponent label="Электронная почта" {...field} />}
                    />
                </Box>
                <Box sx={{ marginTop: "18px", marginBottom: "70px", width: "100%" }}>
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ field }) => <InputComponent label="Пароль" {...field} />}
                    />
                </Box>
                <ButtonComponent
                    outlined={false}
                    width={`${type === 'login' ? '200px' : '290px'}`}
                    mobileWidth={`${type === 'login' ? '150px' : '200px'}`}
                    height="44px"
                    name={`${type === 'login' ? 'Войти' : 'Зарегистрироваться'}`}
                    onSubmit={handleSubmit(type === "login" ? onSubmit : onSubmitRegistration)}
                />
            </form>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: { xs: "12px", sm: "18px" },
                    marginTop: "20px",
                }}
            >
                <hr className={styles.hr} />
                <span className={styles.text}>
                    {`${type === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}`}
                </span>
                <Box sx={{ marginTop: "15px", width: "100%" }}>
                    <ButtonComponent
                        outlined={true}
                        width="100%"
                        height="44px"
                        name={`${type === 'login' ? 'Зарегистрируйтесь' : 'Войдите'}`}
                        black={true}
                        onSubmit={clickRedirect}
                    />
                </Box>
            </Box>
        </Box>
    );
};