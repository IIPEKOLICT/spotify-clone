import { FC } from 'react';
import { Box, IconButton } from '@mui/material';
import { BsPlay } from 'react-icons/bs';
import { AiFillFastBackward, AiFillFastForward, AiOutlinePause } from 'react-icons/ai';

interface IProps {
    playState: any;
    setPlayState: any;
    setIdx: any;
    idx: any;
};

export const Options: FC<IProps> = ({ playState, setPlayState, setIdx, idx }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0",
            }}
        >
            <IconButton
                sx={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { xs: "5px", sm: "10px", md: "15px" },
                }}
                onClick={() => setIdx(idx - 1 < 0 ? idx : idx - 1)}
            >
                <AiFillFastBackward color="black" size={20} />
            </IconButton>
            <IconButton
                sx={{
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { xs: "5px", sm: "10px", md: "15px" },
                }}
                onClick={() => setPlayState(!playState)}
            >
                {playState ? <AiOutlinePause color="black" size={20} /> : <BsPlay color="black" size={20} />}
            </IconButton>
			<IconButton
                sx={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { xs: "5px", sm: "10px", md: "15px" },
                }}
                onClick={() => setIdx((idx + 1) % 9)}
            >
                <AiFillFastForward color="black" size={20} />
            </IconButton>
		</Box>
    );
};