import { FC } from 'react';
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextComponent } from '../../common/text/TextComponent';
import { ButtonComponent } from '../../common/button/ButtonComponent';
import { useUserStatus } from '../../hooks/useUserStatus';
import { Circle } from '@mui/icons-material';
import { UserStatus } from '@yumasoft-spotify/socket-sdk';
import { useAppSelector } from '../../hooks/redux';
import { UserModel } from '../../types/models';

interface IProps {}

export const AvatarBlock: FC<IProps> = (_) => {
  const user = useAppSelector<UserModel>((state) => state.user as UserModel);
  const { status } = useUserStatus(user);
  const navigate = useNavigate();

  const clickEditProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px', height: 'calc(100% - 20px)' }}>
      <Box sx={{ display: 'flex', width: '60%' }}>
        <ListItem disablePadding sx={{ width: 'auto' }}>
          <ListItemButton sx={{ padding: '0px' }}>
            <ListItemIcon sx={{ minWidth: '100%' }}>
              <Avatar alt="avatar" src={user.profilePicture} sx={{ width: 120, height: 120 }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Box
          sx={{
            wordBreak: 'normal',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginX: '10px',
          }}
        >
          <TextComponent
            color="black"
            text={`${user.firstName} ${user.lastName}`}
            style={{
              height: 'min-content',
              flexGrow: 'initial',
              fontSize: { xs: '14px', sm: '18px' },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Circle
              color={status === UserStatus.ONLINE ? 'success' : 'secondary'}
              fontSize="small"
              sx={{ marginRight: '4px' }}
            ></Circle>
            <TextComponent
              color="grey"
              text={status}
              style={{
                height: 'min-content',
                flexGrow: 'initial',
                fontSize: { xs: '12px', sm: '10px' },
              }}
            />
          </Box>
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
