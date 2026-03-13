import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { ChangeEventHandler, useCallback } from "react";
import { setTitle } from "../lyrics-editor/lyrics-editor-slice";

export default function SongSettings(){
    const dispatch = useAppDispatch();
    const title = useAppSelector(x => x.lyricsEditor.title);
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        dispatch(setTitle(event.target.value));
    }, []);
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
