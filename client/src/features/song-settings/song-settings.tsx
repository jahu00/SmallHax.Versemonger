import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ChangeEventHandler, useCallback } from "react";
import { setTitle } from "../../store/song-slice";

export default function SongSettings(){
    const dispatch = useAppDispatch();
    const title = useAppSelector(x => x.song.title);
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        dispatch(setTitle(event.target.value));
    }, [dispatch]);
    return <>
        <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={handleTitleChange}
                />
    </>;
}
