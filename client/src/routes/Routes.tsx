import { FC } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { HomePage, LoginPage } from '../pages';
import { AuthType, RoutePath } from '../constants/enums';
import { ProfileForm } from '../forms/profile/ProfileForm';

interface IProps {
  isAuth: boolean;
}

export const Routes: FC<IProps> = ({ isAuth }) => {
  const authPath = () => {
    return (
      <Switch>
        <Route path={RoutePath.HOME} element={<HomePage page={"news"} />} />
        <Route path={RoutePath.PROFILE} element={<HomePage page={"profile"} />} />
        <Route path={RoutePath.NEWS} element={<HomePage page={"news"} />} />
        <Route path={RoutePath.MESSENGER} element={<HomePage page={"messenger"} />} />
        <Route path={RoutePath.FRIENDS} element={<HomePage page={"friends"} />} />
        <Route path={RoutePath.PHOTOS} element={<HomePage page={"photos"} />} />
        <Route path={RoutePath.MUSIC} element={<HomePage page={"music"} />} />
        <Route path={RoutePath.VIDEOS} element={<HomePage page={"videos"} />} />
        <Route path={RoutePath.USER} element={<ProfileForm />} />
        <Route path={RoutePath.DEFAULT} element={<HomePage page={"news"} />} />
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
