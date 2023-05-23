import { FC, useState, useContext, createContext } from 'react';
import { Box } from '@mui/material';

interface IProps {
    setIdx: any;
    idx: any;
    player: any;
};

const userOptions = createContext({
	shuffle: false,
	repeat: false,
});

export const Progress: FC<IProps> = ({ setIdx, idx, player }) => {
    const [currLength, setCurrLength] = useState(0);
	const [length, setLength] = useState(0);
	const options = useContext(userOptions);
	const progressBar: any = document.getElementById("progressBar");
	
	const updateProgress = (e: any) => {
		const offset = e.target.getBoundingClientRect().left;
		const newOffSet = e.clientX;
		const newWidth = newOffSet - offset;
        if (progressBar) {
            progressBar.style.width = newWidth + "px";
        }
        const secPerPx = length / 280
        player.currentTime = secPerPx * newWidth
	};
	
	setInterval(() => {
		setLength(Math.ceil(player.duration));
		setCurrLength(Math.ceil(player.currentTime));
		const secPerPx = Math.ceil(player.duration) / 280;
		const newWidth = player.currentTime / secPerPx;
        if (progressBar) {
            progressBar.style.width = newWidth + "px";
        }
		if (player.currentTime === player.duration) {
            if(options.shuffle === true) {
                setIdx((parseInt(String(Math.random() * 1000))) % 9);
            }
            else if (options.repeat === true) {
                player.play();
            }
            else {
                setIdx((idx + 1) % 9);
            }
		}
	}, 1000);

    const formatTime = (s: any) => {
        return Number.isNaN(s) ? '0:00' : (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    };

    return (
        <Box
            sx={{
                margin: "5px 0",
                width: "50%",
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <p>{formatTime(currLength)}</p>
            <Box
                sx={{
                width: "70%",
                height: "7px",
                backgroundColor: "#d9d9d9",
                borderRadius: "10px",
                }}
                onClick={(e) => updateProgress(e)}
            >
                <Box
                    sx={{
                        width: "0px",
                        height: "7px",
                        borderRadius: "10px",
                        backgroundColor: "#63ADD0",
                    }}
                    key="progressBar"
                    id="progressBar"
                ></Box>
            </Box>
            <p>{formatTime(length)}</p>
        </Box>
    );
};