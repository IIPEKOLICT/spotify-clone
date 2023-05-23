import { FC } from 'react';
import ReactAudioPlayer from 'react-audio-player';

interface IProps {
    file: string,
};

export const MusicPlayer: FC<IProps> = ({ file }) => {
    return (
        <ReactAudioPlayer
            src={file}
            controls
            style={{
                margin: "20px",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                width: "calc(100% - 40px)",
                color: "var(--main-background)"
            }}
        />
    );
};