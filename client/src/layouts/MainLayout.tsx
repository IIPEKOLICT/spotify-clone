import { Box } from '@mui/material';
import { Children } from 'react';

const Slot: React.FC<{
    name: "content" | "notification";
    children: React.ReactElement | "" | Element | undefined;
}> = () => null;
interface IProps {
    children: Array<React.ReactElement>;
};

export const MainLayout = (props: IProps) => {
    const { children } = props;
    const childrenArray = Children.toArray(children) as unknown as React.ReactElement[];
    const content = childrenArray.find(child => child?.props?.name === "content");
    const notification = childrenArray.find(child => child?.props?.name === "notification");
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ height: "100%", position: "relative", zIndex: "99" }}>
                <slot name="content">
                    {content?.props?.children}
                </slot>
            </Box>
            <Box sx={{ position: "fixed", bottom: "0", zIndex: "100", width: "100%" }}>
                <slot name="notification">
                    {notification?.props?.children}
                </slot>
            </Box>
        </Box>
    );
};

MainLayout.Slot = Slot;