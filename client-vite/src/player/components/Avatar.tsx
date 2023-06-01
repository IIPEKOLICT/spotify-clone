import { FC } from 'react';
import { ImageListItem, Typography, Box } from '@mui/material';
import styles from './Avatar.module.scss';

interface IProps {
    idx: any;
};

const tracks = [
    {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
        url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
        favorited: false
    },
    {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
        url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
        favorited: true
    },
    {
        name: "Extreme Ways",
        artist: "Moby",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
        url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
        favorited: false
    },
    {
        name: "Butterflies",
        artist: "Sia",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
        url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
        favorited: false
    },
    {
        name: "The Final Victory",
        artist: "Haggard",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
        url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
        favorited: true
    },
    {
        name: "Genius ft. Sia, Diplo, Labrinth",
        artist: "LSD",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
        url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
        favorited: false
    },
    {
        name: "The Comeback Kid",
        artist: "Lindi Ortega",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
        url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
        favorited: true
    },
    {
        name: "Overdose",
        artist: "Grandson",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
        url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
        favorited: false
    },
    {
        name: "Rag'n'Bone Man",
        artist: "Human",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
        url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
        favorited: false
    }
];

export const Avatar: FC<IProps> = ({ idx }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: { xs: "70%", sm: "30%" }
            }}
        >
            <ImageListItem
                sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                }}  
            >
                <img src={tracks[idx]?.cover} alt={tracks[idx]?.cover} className={styles.avatar}/>
            </ImageListItem>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        width: "100%",
                        textAlign: "start",
                    }}
                >{tracks[idx].artist}</Typography>
                <Typography
                    sx={{
                        fontWeight: "800",
                        width: "100%",
                        textAlign: "start",
                    }}
                >{tracks[idx].name}</Typography>
            </Box>
		</Box>
    );
};