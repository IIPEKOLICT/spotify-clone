import { FC } from 'react';
import { Box } from '@mui/material';
import { AvatarBlock } from '../ProfileBlocks/Avatar/AvatarBlock';
import { PhotosBlock } from '../ProfileBlocks/Photos/PhotosBlock';
import { FriendsBlock } from '../ProfileBlocks/Friends/FriendsBlock';
import { UploadInput } from '../common/uploadInput/UploadInput';
import { BlockLayout } from '../layouts/BlockLayout';

interface IProps {}

export const ProfileComponent: FC<IProps> = (_) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <BlockLayout style={{ height: '150px', marginBottom: '20px' }}>
        <BlockLayout.Slot name="content">
          <AvatarBlock />
        </BlockLayout.Slot>
      </BlockLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          maxHeight: { xs: '200px', sm: '280px', md: '360px', lg: '420px' },
        }}
      >
        <BlockLayout
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <BlockLayout.Slot name="content">
            <>
              <PhotosBlock />
              <UploadInput text="Upload photo" />
            </>
          </BlockLayout.Slot>
        </BlockLayout>
        <BlockLayout
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '30%',
            maxWidth: '315px',
            minWidth: { xs: '100px', sm: '200px', md: '300px' },
            marginLeft: '20px',
          }}
        >
          <BlockLayout.Slot name="content">
            <FriendsBlock />
          </BlockLayout.Slot>
        </BlockLayout>
      </Box>
    </Box>
  );
};
