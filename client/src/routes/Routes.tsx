import { FC } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { HomePage, LoginPage } from '../pages';
import { AuthType, RoutePath } from '../constants/enums';
import { ProfileForm } from '../forms/profile/ProfileForm';

interface IProps {
  isAuth: boolean;
}

export const Routes: FC<IProps> = ({ isAuth }) => {
  const navRoutes: RoutePath[] = [
    RoutePath.PROFILE,
    RoutePath.NEWS,
    RoutePath.MESSENGER,
    RoutePath.FRIENDS,
    RoutePath.PHOTOS,
    RoutePath.MUSIC,
    RoutePath.VIDEOS,
  ];

  const authPath = () => {
    return (
      <Switch>
        <Route path={RoutePath.HOME} element={<HomePage route={RoutePath.NEWS} />} />
        {navRoutes.map((route: RoutePath, index: number) => (
          <Route key={index.toString()} path={route} element={<HomePage route={route} />} />
        ))}
        <Route path={RoutePath.USER} element={<ProfileForm />} />
        <Route path={RoutePath.DEFAULT} element={<HomePage route={RoutePath.NEWS} />} />
      </Switch>
    );
  };
  const noAuthPath = () => {
    return (
      <Switch>
        <Route path={RoutePath.LOGIN} element={<LoginPage type={AuthType.LOGIN} />} />
        <Route path={RoutePath.REGISTRATION} element={<LoginPage type={AuthType.REGISTRATION} />} />
        <Route path={RoutePath.DEFAULT} element={<LoginPage type={AuthType.LOGIN} />} />
      </Switch>
    );
  };
  return isAuth ? authPath() : noAuthPath();
};
