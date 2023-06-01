import { FC, useState } from 'react';
import { Box, List } from '@mui/material';
import { BlockLayout } from '../layouts/BlockLayout';
import { CustomPlayer } from '../player/CustomPlayer';
import { ActiveItem } from '../player/ActiveItem';

interface IProps {};

const tracks = [
  {
    id: 0,
    name: "Mekanın Sahibi",
    artist: "Norm Ender",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
  },
  {
    id: 1,
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
  },
  {
    id: 2,
    name: "Extreme Ways",
    artist: "Moby",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
  },
  {
    id: 3,
    name: "Butterflies",
    artist: "Sia",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
  },
  {
    id: 4,
    name: "The Final Victory",
    artist: "Haggard",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
  },
  {
    id: 5,
    name: "Genius ft. Sia, Diplo, Labrinth",
    artist: "LSD",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
  },
  {
    id: 6,
    name: "The Comeback Kid",
    artist: "Lindi Ortega",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
    url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
  },
  {
    id: 7,
    name: "Overdose",
    artist: "Grandson",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
    url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
  },
  {
    id: 8,
    name: "Rag'n'Bone Man",
    artist: "Human",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
    url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
  }
];

export const MusicComponent: FC<IProps> = (props) => {
  const [idx, setIdx] = useState<null | number>(null);
  return (
    <BlockLayout
      style={{ marginTop: { xs: "0px", sm: idx !== null ? "60px" : "0px" }, marginBottom: { xs: idx !== null ? "60px" : "0px", sm: "0px" } }}
    >
      <BlockLayout.Slot name="content">
        <Box sx={{ display: "flex", flexDirection: "column", paddingX: "20px" }}>
          <List>
            {tracks.map((item) => (
              <ActiveItem key={item.id} item={item} play={(value: number) => setIdx(value)} />
            ))}
          </List>
          {idx !== null &&
            <Box
              sx={{
                width: { xs: "100%", sm: "calc(100% - 260px)" },
                background: "white",
                height: "80px",
                position: "fixed",
                top: { sm: "0px" },
                bottom: { xs: "0px" },
                right: "15px",
                boxShadow: "1px red"
              }}
            >
              <CustomPlayer
                id={idx}
                setId={(value: number) => setIdx(value)}
                style={{
                  position: "fixed",
                  top: { sm: "0px" },
                  bottom: { xs: "0px" },
                  right: "40px",
                }}
              />
            </Box>
          }
        </Box>
      </BlockLayout.Slot>
    </BlockLayout>
  );
};