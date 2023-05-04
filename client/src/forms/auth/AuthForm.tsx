import { useForm, SubmitHandler, Controller  } from "react-hook-form";
import { InputComponent } from "../../common/input/InputComponent";
import Box from "@mui/material/Box";
import { ButtonComponent } from "../../common/button/ButtonComponent";

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

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const onSubmitRegistration: SubmitHandler<Inputs> = (data) => console.log(data);

    return(
        <Box sx={{ width: "45%" }}>
            <form>
                {type !== "login" &&
                    <Box sx={{ marginY: "18px", width: "100%" }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <InputComponent label="Имя пользователя" {...field} />}
                        />
                    </Box>
                }
                <Box sx={{ marginY: "18px", width: "100%" }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <InputComponent label="Электронная почта" {...field} />}
                    />
                </Box>
                <Box sx={{ marginTop: "18px", marginBottom: "70px", width: "100%" }}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <InputComponent label="Пароль" {...field} />}
                    />
                </Box>
                {type === "login"
                    ?
                        <ButtonComponent
                            outlined={false}
                            onSubmit={handleSubmit(onSubmit)}
                            width="200px"
                            mobileWidth="200px"
                            height="44px"
                            mobileHeight="44px"
                            name="Войти"
                        />
                    : 
                        <ButtonComponent
                            outlined={false}
                            onSubmit={handleSubmit(onSubmitRegistration)}
                            width="292px"
                            mobileWidth="292px"
                            height="44px"
                            mobileHeight="44px"
                            name="Зарегистрироваться"
                        />
                }
            </form>
        </Box>
    );
};