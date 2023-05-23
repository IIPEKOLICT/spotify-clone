import { useSockets } from './useSockets';
import { useEffect, useState } from 'react';
import { useAppSelector } from './redux';
import { UserModel } from '../types/models';

export const useUserStatus = () => {
  const { userStatusOnUserPage } = useSockets();
  const user = useAppSelector<UserModel>((state) => state.user as UserModel);
  const [status, setStatus] = useState(user.status);

  useEffect(() => {
    userStatusOnUserPage.subscribeOnEditEvent(user.id, ({ value }) => {
      setStatus(() => value);
    });
  }, []);

  return {
    status,
    user,
  };
};
