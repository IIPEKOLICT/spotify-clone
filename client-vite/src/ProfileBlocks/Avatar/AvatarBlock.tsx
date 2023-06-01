import { FC } from 'react';
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { TextComponent } from '../../common/text/TextComponent';
import { ButtonComponent } from '../../common/button/ButtonComponent';

interface IProps {}

export const AvatarBlock: FC<IProps> = (props) => {
  const userInfo = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const clickEditProfile = () => {
    navigate(`/profile/${userInfo.id}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px', height: 'calc(100% - 20px)' }}>
      <Box sx={{ display: 'flex', width: '60%' }}>
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <ListItemButton sx={{ padding: '0px' }}>
            <ListItemIcon sx={{ minWidth: '100%' }}>
              <Avatar alt="avatar" src={userInfo?.profilePicture} sx={{ width: 120, height: 120 }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Box sx={{ wordBreak: 'normal', display: 'flex', alignItems: 'center', marginX: '10px' }}>
          <TextComponent
            color="black"
            text={`${userInfo?.firstName} ${userInfo?.lastName}`}
            style={{
              fontSize: { xs: '14px', sm: '18px' },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonComponent
          style={{
            height: '35px',
            textTransform: 'none',
            width: { xs: '100px', sm: '150px' },
          }}
          color="blue"
          name="Edit profile"
          variant="contained"
          onSubmit={clickEditProfile}
        />
      </Box>
    </Box>
  );
};
