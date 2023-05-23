import { Avatar, Box, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { FC } from 'react';
import { TextComponent } from '../../common/text/TextComponent';

interface IProps {};

const friends = [
    { id: 1, src: "", firstName: "Aliaksandr", lastName: "Koktysh" },
    { id: 2, src: "", firstName: "Oleg", lastName: "Fedorovich" },
    { id: 3, src: "", firstName: "Eugene", lastName: "Lasminski" },
    { id: 4, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 5, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 6, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 7, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 8, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 9, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 10, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 11, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 12, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 13, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 14, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 15, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 16, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 17, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 18, src: "", firstName: "Eugene", lastName: "Shcherbakov" },
    { id: 19, src: "", firstName: "Eugene", lastName: "Shcherbakov" },

];

export const FriendsBlock: FC<IProps> = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "flex-start",
                flexWrap: "wrap",
                paddingY: "20px",
                width: "100%",
                height: "calc(100% - 40px)",
                overflowY: "auto",
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
            {friends.map((friend) => (
                <ListItem key={friend.id} sx={{ width: "80px", height: "80px" }} disablePadding>
                    <ListItemButton sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0px" }}>
                        <ListItemIcon sx={{ justifyContent: "center" }}>
                            <Avatar alt="avatar" src={friend.src} />
                        </ListItemIcon>
                        <TextComponent
                            color="black"
                            text={friend?.firstName}
                            style={{
                                fontSize: { xs: "8px", sm: "12px" },
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </Box>
    );
};