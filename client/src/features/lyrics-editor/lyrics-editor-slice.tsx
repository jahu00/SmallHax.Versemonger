import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LyricsEditorState from "./types/lyrics-editor-state";

const initialState: LyricsEditorState = {
  lyrics: "",
  title: ""
};

const name = 'lyrics-editor';

export const lyricsEditorSlice = createSlice({
    name: name,
    initialState,
    reducers: {
        setLyrics: (state, action: PayloadAction<string>) => {
            state.lyrics = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(resetSong, () => initialState)
    }
});

export const resetSong = createAction(`${name}/resetSong`);
export const { setLyrics, setTitle } = lyricsEditorSlice.actions

export default lyricsEditorSlice.reducer;