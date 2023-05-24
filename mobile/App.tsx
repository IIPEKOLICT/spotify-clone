import {NavigationContainer} from '@react-navigation/native';
import { Router } from './router';
import { authAPI } from './services/AuthServices';
import { useEffect } from 'react';
import { useActions } from './hooks/actions';
import { useAppSelector } from './hooks/redux';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

function App() {
  const [refresh, { data, isSuccess, isLoading }] = authAPI.useRefreshTokenMutation();
  const { addUser, addNotification } = useActions();
  const userInfo = useAppSelector((state) => state.user);
  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    isSuccess && data && addUser(data);
  }, [addUser, data, isSuccess]);
  return (
      <NavigationContainer>
        <Router isAuth={!!userInfo?.id} />
      </NavigationContainer>
  );
};

export default function Wrapper() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
