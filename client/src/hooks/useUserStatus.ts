import { useSockets } from './useSockets';
import { useEffect, useState } from 'react';
import { UserModel } from '../types/models';

export const useUserStatus = (user: UserModel) => {
  const { userStatusOnUserPage } = useSockets();
  const [status, setStatus] = useState(user.status);

  useEffect(() => {
    userStatusOnUserPage.subscribeOnEditEvent(user._id, ({ value }) => {
      setStatus(() => value);
    });
  }, []);

  return {
    status,
  };
};
