import { Box } from '@mui/material';
import { AuthForm } from '../../forms/auth/AuthForm';
import styles from './LoginPage.module.scss';
import { AuthType } from '../../constants/enums';
import { FC } from 'react';

interface IProps {
  type: AuthType;
}

export const LoginPage: FC<IProps> = (props) => {
  const { type } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Box sx={{ fontSize: { xs: '18px', sm: '24px' }, marginBottom: '40px', paddingX: "20px" }}>
        <span className={styles.title}>
          Что бы продолжить {type === AuthType.LOGIN ? 'войдите' : 'зарегистрируйтесь'} в YumaSpotify
        </span>
      </Box>
      <AuthForm type={type} />
    </Box>
  );
};
