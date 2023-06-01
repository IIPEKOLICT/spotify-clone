import { ListItemText, TypographyProps } from '@mui/material';
import { FC } from 'react';

interface IProps {
  text: string;
  color: 'white' | 'black' | 'grey' | 'gray';
  style: TypographyProps;
}

export const TextComponent: FC<IProps> = ({ text, color, style }) => {
  return (
    <ListItemText
      primary={text}
      primaryTypographyProps={{
        ...style,
        fontWeight: '800',
      }}
      sx={{
        ...style,
        color: `${color} !important`,
      }}
    />
  );
};
