import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongState {
    title: string;
    lyrics: string;
}

const initialState: SongState = {
  lyrics: "",
  title: ""
};

const name = 'song';

export const songSlice = createSlice({
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
export const { setLyrics, setTitle } = songSlice.actions

export default songSlice.reducer;