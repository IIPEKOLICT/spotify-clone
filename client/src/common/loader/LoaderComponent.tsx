import { CircularProgress } from "@mui/material";

interface IProps {};

export const LoaderComponent: React.FC<IProps> = (props) => {
    return (
        <CircularProgress
            disableShrink
            thickness={8}
            sx={{
                width: { xs: "40px", sm: "80px !important" },
                height: { xs: "40px", sm: "80px !important" }
            }}
        />
    );
};