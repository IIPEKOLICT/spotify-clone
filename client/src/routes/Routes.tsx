import { FC } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { HomePage, LoginPage } from '../pages';
import { AuthType, RoutePath } from '../constants/enums';

interface IProps {
  isAuth: boolean;
}

export const Routes: FC<IProps> = ({ isAuth }) => {
  const authPath = () => {
    return (
      <Switch>
        <Route path={RoutePath.HOME} element={<HomePage />} />
        <Route path={RoutePath.DEFAULT} element={<HomePage />} />
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
