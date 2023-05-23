import { FC, useState, useRef, useEffect } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { Progress } from './components/Progress';
import { Options } from './components/Options';
import { Avatar } from './components/Avatar';

interface IProps {
    style?: SxProps<Theme>;
    id: number;
    setId: (value: number) => void;
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
const player = new Audio(tracks[0].source);
player.setAttribute('preload', 'metadata');

export const CustomPlayer: FC<IProps> = ({ style, id, setId }) => {
	const [playState, setPlayState] = useState(false);
	const oldIdx = useRef(id)
	useEffect(() => {
		if(playState) {
            player.play();
        }
		else {
            player.pause();
        }
		if (id !== oldIdx.current) {
			player.pause();
			player.src = tracks[id].source;
			player.load();
			player.play();
			setPlayState(true);
			oldIdx.current = id;
		}
			
	});

    return (
        <Box
            sx={{
                ...style,
                height: "60px",
                width: { xs: "calc(100% - 104px)", sm: "calc(100% - 364px)" },
                backgroundColor: "var(--gray-color) !important",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingX: "20px"
            }}
        >
			<Options 
                playState={playState} 
                setPlayState={setPlayState}
                setIdx={setId}
                idx={id}
            />
            <Avatar idx={id} />
            <Progress
                setIdx={setId} 
                idx={id}
                player={player}
            />
		</Box>
    );
};