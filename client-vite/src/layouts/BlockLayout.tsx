import { Box, SxProps, Theme } from '@mui/material';
import { Children } from 'react';

const Slot: React.FC<{
    name: "content";
    children: React.ReactElement;
}> = () => null;
interface IProps {
    children: React.ReactElement;
    style?: SxProps<Theme>,
};

export const BlockLayout = (props: IProps) => {
    const { children, style } = props;
    const childrenArray = Children.toArray(children) as unknown as React.ReactElement[];
    const content = childrenArray.find(child => child?.props?.name === "content");
    return (
        <Box
            sx={{
                ...style,
                background: "var(--gray-color)",
                borderRadius: "20px",
            }}
        >
            <slot name="content">
                {content?.props?.children}
            </slot>
        </Box>
    );
};

BlockLayout.Slot = Slot;