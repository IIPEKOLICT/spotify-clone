import { FC, useEffect, useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface IProps {};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
];

export const PhotosBlock: FC<IProps> = (props) => {
  const [cols, setCols] = useState(3);
  const getCols = () => {
    const fullWidth = document.getElementById("root")?.clientWidth;
    if (fullWidth && fullWidth >= 2000) return setCols(6);
    if (fullWidth && fullWidth >= 1500) return setCols(5);
    if (fullWidth && fullWidth >= 1000) return setCols(4);
    if (fullWidth && fullWidth >= 800) return setCols(3);
    return setCols(3);
  };
  useEffect(() => {
    getCols();
  }, []);
  return (
      <ImageList
        cols={cols}
        sx={{
          height: "calc(100% - 35px)",
          margin: "10px",
          '&::-webkit-scrollbar': {
            width: '15px',
          },
          '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c5d2ea !important',
              borderRadius: '0 15px 15px 0',
              border: '3px solid #e6edf2',
          },
          '&::-webkit-scrollbar-track': {
              borderRadius: '0 15px 15px 0',
          },
          '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#5a74ac !important',
          },
        }}
      >
          <PhotoProvider>
              {itemData.map((photo) => (
                  <PhotoView key={photo.img} src={photo.img}>
                      <ImageListItem>
                          <img
                              src={photo.img}
                              srcSet={photo.img}
                              alt={photo.title}
                              loading="lazy"
                          />
                      </ImageListItem>
                  </PhotoView>
              ))}
          </PhotoProvider>
      </ImageList>
  );
};