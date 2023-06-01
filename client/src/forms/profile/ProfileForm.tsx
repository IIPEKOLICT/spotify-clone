import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { InputComponent } from '../../common/input/InputComponent';
import Box from '@mui/material/Box';
import { ButtonComponent } from '../../common/button/ButtonComponent';
import styles from './ProfileForm.module.scss';
import { FC, ChangeEvent, useEffect } from 'react';
import { AuthType } from '../../constants/enums';
import { useActions } from '../../hooks/actions';
import { userAPI } from '../../services/UserService';

interface IProps {
  type?: AuthType;
}

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  onSubmit: (value: ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileForm: FC<IProps> = ({ type }) => {
  const { control, handleSubmit } = useForm<Inputs>();
  const [updateUser, { isSuccess, isLoading, data }] = userAPI.useUpdateCurrentUserInfoMutation();
  const { addNotification, addUser } = useActions();

  //   useEffect(() => {
  //     if (success_up || success_in) {
  //       data_in && addUser(data_in);
  //       data_up && addUser(data_up);
  //       addNotification({type: "success", message: "User authorization was successful"});
  //     }
  //   }, [success_in, success_up, addUser, addNotification, data_in, data_up]);

  const onSubmit: SubmitHandler<Inputs> = ({ onSubmit, ...fields }) => updateUser(fields);

  return (
    <Box>
      <form className={styles.form}>
        <Box sx={{ marginY: '18px', width: '100%' }}>
          <Controller
            name="firstName"
            defaultValue=""
            control={control}
            render={({ field }) => <InputComponent label="First name" {...field} />}
          />
        </Box>
        <Box sx={{ marginY: '18px', width: '100%' }}>
          <Controller
            name="lastName"
            defaultValue=""
            control={control}
            render={({ field }) => <InputComponent label="Last name" {...field} />}
          />
        </Box>
        <Box sx={{ marginY: '18px', width: '100%' }}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <InputComponent label="Email" {...field} />}
          />
        </Box>
        <ButtonComponent
          style={{
            height: '44px',
            textTransform: 'uppercase',
            width: { xs: '150px', sm: '200px' },
          }}
          color="green"
          variant="contained"
          name="Save"
          onSubmit={handleSubmit(onSubmit)}
          //   loading={loading}
        />
      </form>
    </Box>
  );
};
