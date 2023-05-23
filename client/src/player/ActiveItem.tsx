import { FC, useState } from 'react';
import { Box, ListItem, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';
import { BsMusicNote, BsPlay } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { TextComponent } from '../common/text/TextComponent';

interface IItem {
    id: number;
    name: string;
    artist: string;
    cover: string;
    source: string;
    url: string;
    // duration: string;
};

interface IProps {
    item: IItem;
    play: (value: number) => void;
};

const deleteItem = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    console.log("deleteItem");
};

const avatar = (src: string, hover: boolean) => {
    return (
        <ListItemAvatar sx={{ display: "flex", alignItems: "center", position: "relative" }}>
            {hover && hoverIcon()}
            {src ? <Avatar src={src} /> : <BsMusicNote size={30} />}
        </ListItemAvatar>
    );
};
const songInfo = (artistName: string, songName: string) => {
    return (
        <>
            <TextComponent
                color="black"
                text={artistName}
                style={{
                fontSize: { xs: "8px", sm: "12px" },
                }}
            />
            <TextComponent
                color="black"
                text={songName}
                style={{
                fontSize: { xs: "8px", sm: "12px" },
                }}
            />
        </>
    );
};
const durationInfo = (duration: string, hover: boolean) => {
    if (hover) return deleteIcon();
    return (
        <TextComponent
            color="black"
            text={duration}
            style={{
                width: "30px",
                fontSize: { xs: "8px", sm: "12px" },
            }}
        />
    );
};
const deleteIcon = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: "10",
                width: "40px",
                height: "40px",
                right: "0px",
                background: "var(--hover-color)",
                opacity: "0.6",
            }}
        >
            <AiFillDelete size={20} color="black" onClick={(event: React.MouseEvent<SVGElement, MouseEvent>) => deleteItem(event)} />
        </Box>
    );
};
const hoverIcon = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: "10",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--main-color)",
                opacity: "0.6",
            }}
        >
            <BsPlay size={30} color="black" />
        </Box>
    );
};

export const ActiveItem: FC<IProps> = ({ item, play }) => {
    const [hover, setHover] = useState(false);
    return (
        <ListItem
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                marginY: "10px",
                background: "white",
                borderRadius: "20px",
                "&:hover": {
                    background: "var(--hover-color)"
                }
            }}
            onClick={() => play(item.id)}
        >
            <ListItemButton
                sx={{
                    padding: "0",
                    "&:hover": {
                        background: "var(--hover-color)"
                    },
                }}
            >
                <Box sx={{ display: "flex", width: "calc(100% - 30px)" }}>
                    {avatar(item.cover, hover)}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {songInfo(item.artist, item.name)}
                    </Box>
                </Box>
                {durationInfo("3:13", hover)}
            </ListItemButton>
        </ListItem>
    );
};