import { FC, useEffect, createElement, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../../navbar/NavbarComponent';
import { ProfileComponent } from '../../profile/ProfileComponent';
import { NewsComponent } from '../../news/NewsComponent';
import { MessengerComponent } from '../../messenger/MessagerComponent';
import { FriendsComponent } from '../../friends/FriendsComponent';
import { MusicComponent } from '../../music/MusicComponent';
import { VideosComponent } from '../../videos/VideosComponent';
import { PhotosComponent } from '../../photos/PhotosComponent';
import { RoutePath } from '../../constants/enums';

interface IProps {
  route: RoutePath;
}

type ComponentsMatcher = {
  [route in RoutePath]?: ReactElement;
};

const components: ComponentsMatcher = {
  [RoutePath.PROFILE]: <ProfileComponent />,
  [RoutePath.NEWS]: <NewsComponent />,
  [RoutePath.MESSENGER]: <MessengerComponent />,
  [RoutePath.FRIENDS]: <FriendsComponent />,
  [RoutePath.MUSIC]: <MusicComponent />,
  [RoutePath.VIDEOS]: <VideosComponent />,
  [RoutePath.PHOTOS]: <PhotosComponent />,
};

const component = (name: string) =>
  createElement('div', { style: { width: '100%', height: '100%' } }, components[name]);

export const HomePage: FC<IProps> = ({ route }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(route);
  }, [navigate, route]);
  return (
    <NavbarComponent active={route}>
      <NavbarComponent.Slot name="content">{component(route)}</NavbarComponent.Slot>
    </NavbarComponent>
  );
};
