import { useForm, SubmitHandler, Controller  } from "react-hook-form";
import { InputComponent } from "../../common/input/InputComponent";
import Box from "@mui/material/Box";
import { ButtonComponent } from "../../common/button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import { authAPI } from "../../services/AuthServices";
import { useEffect } from "react";

interface IProps {
    type?: string,
};
type Inputs = {
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    onSubmit: (value: React.ChangeEvent<HTMLInputElement>) => void,
};

export const AuthForm: React.FC<IProps> = ({ type }: IProps) => {
    const { control, handleSubmit } = useForm<Inputs>();

    const [signIn, { data: data_in, isSuccess: success_in, isLoading: loading_in }] = authAPI.useSignInMutation();
    const [signUp, { data: data_up, isSuccess: success_up, isLoading: loading_up }] = authAPI.useSignUpMutation();

    const onSubmit: SubmitHandler<Inputs> = (data) => signIn(data);
    const onSubmitRegistration: SubmitHandler<Inputs> = (data) => signUp(data);

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
                    <>
                        <Box sx={{ marginY: "18px", width: "100%", }}>
                            <Controller
                                name="firstname"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <InputComponent label="First name" {...field} />}
                            />
                        </Box>
                        <Box sx={{ marginY: "18px", width: "100%", }}>
                            <Controller
                                name="lastname"
                                defaultValue=""
                                control={control}
                                render={({ field }) => <InputComponent label="Last name" {...field} />}
                            />
                        </Box>
                    </>
                }
                <Box sx={{ marginY: "18px", width: "100%" }}>
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ field }) => <InputComponent label="Email" {...field} />}
                    />
                </Box>
                <Box sx={{ marginTop: "18px", marginBottom: "70px", width: "100%" }}>
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ field }) => <InputComponent label="Password" {...field} />}
                    />
                </Box>
                <ButtonComponent
                    outlined={false}
                    width={`${type === 'login' ? '200px' : '290px'}`}
                    mobileWidth={`${type === 'login' ? '150px' : '240px'}`}
                    height="44px"
                    name={`${type === 'login' ? 'Login' : 'Registration'}`}
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
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "15px", width: { xs: "70%", sm: "300px" } }}>
                    <ButtonComponent
                        outlined={true}
                        width="100%"
                        mobileWidth="100%"
                        height="44px"
                        name={`${type === 'login' ? 'Registration' : 'Login'}`}
                        black={true}
                        onSubmit={clickRedirect}
                        loading={loading_in || loading_up}
                    />
                </Box>
            </Box>
        </Box>
    );
};