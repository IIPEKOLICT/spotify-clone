import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Routes } from './routes';
import { theme } from './constants';
import { authAPI } from './services/AuthService';
import { useActions } from './hooks/actions';
import { MainLayout } from './layouts/MainLayout';
import { useAppSelector } from './hooks/redux';
import { AlertComponent } from './common/alert/AlertComponent';
import { LoaderComponent } from './common/loader/LoaderComponent';
import { useSockets } from './hooks/useSockets';
import { useCancelSession } from './hooks/useCancelSession';

function App() {
  const [refresh, { data, isSuccess, isLoading }] = authAPI.useRefreshTokenMutation();
  const { setUser, addNotification, setAccessToken } = useActions();
  const userInfo = useAppSelector((state) => state.auth.user);
  const notification = useAppSelector((state) => state.notification);
  const [showNotification, setShowNotification] = useState(false);

  useCancelSession();

  const { onDestroy, onInit, logout } = useSockets();

  useEffect(() => {
    return () => onDestroy();
  }, []);

  useEffect(() => {
    if (userInfo?._id) {
      onInit();
    } else {
      logout();
    }
  }, [userInfo]);

  useEffect(() => {
    setAccessToken();
    refresh();
  }, [refresh]);

  useEffect(() => {
    isSuccess && data && setUser(data);
  }, [setUser, data, isSuccess]);
  useEffect(() => {
    setShowNotification(!!(notification?.message && notification?.type));
  }, [notification, addNotification]);
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
      addNotification({ type: '', message: '' });
    }, 3000);
  }, [showNotification, addNotification]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <MainLayout.Slot name="content">
            <Routes isAuth={!!userInfo?._id}></Routes>
          </MainLayout.Slot>
          <MainLayout.Slot name="notification">
            {notification.type && notification.message && (
              <AlertComponent type={notification.type} message={notification.message} />
            )}
          </MainLayout.Slot>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
