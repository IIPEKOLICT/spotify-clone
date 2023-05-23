import { FC, useEffect, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../../navbar/NavbarComponent';
import { ProfileComponent } from '../../profile/ProfileComponent';
import { NewsComponent } from '../../news/NewsComponent';
import { MessengerComponent } from '../../messenger/MessagerComponent';
import { FriendsComponent } from '../../friends/FriendsComponent';
import { MusicComponent } from '../../music/MusicComponent';
import { VideosComponent } from '../../videos/VideosComponent';
import { PhotosComponent } from '../../photos/PhotosComponent';

interface IProps {
  page: string,
};

const components: any = {
  "profile": <ProfileComponent />,
  "news": <NewsComponent />,
  "messenger": <MessengerComponent />,
  "friends": <FriendsComponent />,
  "music": <MusicComponent />,
  "videos": <VideosComponent />,
  "photos": <PhotosComponent />,
};

const component = (name: string) => createElement(
  "div",
  { style: { width: "100%", height: "100%" } },
  components[name],
);

export const HomePage: FC<IProps> = ({ page }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${page}`);
  }, [navigate, page]);
  return (
    <NavbarComponent active={page}>
      <NavbarComponent.Slot name="content">
        {component(page)}
      </NavbarComponent.Slot>
    </NavbarComponent>
  );
};
