import { FC, useState } from 'react';
import { MuiFileInput } from 'mui-file-input';

interface IProps {
    text: string,
};

export const UploadInput: FC<IProps> = (props) => {
    const { text } = props;
    const file = new File([text], text);
    const [value, setValue] = useState(file);
    const handleChange = (newValue: any) => {
        setValue(newValue);
    };
    return (
        <MuiFileInput
            value={value}
            onChange={handleChange}
            sx={{
                "fieldset": { display: "none" },
                "& span": {
                    height: "35px",
                    color: "white !important",
                    fontWeight: "800",
                    justifyContent: "center",
                },
                width: { xs: "150px", sm: "200px" },
                background: "rgb(100 127 178)",
                borderRadius: "10px",
                paddingX: "10px",
                height: "35px",
            }}
            InputProps={{
                ...props,
                startAdornment: "",
                endAdornment: "",
            }}
        />
    );
};