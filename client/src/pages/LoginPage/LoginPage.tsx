import { AuthForm } from "../../forms/auth/AuthForm";

interface IProps {
    type: string,
};

export const LoginPage: React.FC<IProps> = (props: IProps) => {
    const { type } = props;
    return(
        <AuthForm type={type} />
    );
};