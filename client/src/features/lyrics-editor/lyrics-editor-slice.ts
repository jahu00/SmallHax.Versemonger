import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LyricsEditorState {
    tagHighlighterEnabled: boolean;
    syllableCounterEnabled: boolean;
    syllableCounterLanguage: string;
}

const initialState: LyricsEditorState = {
  tagHighlighterEnabled: true,
  syllableCounterEnabled: true,
  syllableCounterLanguage: "EN"
};

const name = 'lyrics-editor';

export const lyricsEditorSlice = createSlice({
    name: name,
    initialState,
    reducers: {
        setTagHighlighterEnabled: (state, action: PayloadAction<boolean>) => {
            state.tagHighlighterEnabled = action.payload;
        },
        toggleTagHighlighter: (state) => {
            state.tagHighlighterEnabled = !state.tagHighlighterEnabled;
        },
        setSyllableCounterEnabled: (state, action: PayloadAction<boolean>) => {
            state.syllableCounterEnabled = action.payload;
        },
        toggleSyllableCounter: (state) => {
            state.syllableCounterEnabled = !state.syllableCounterEnabled;
        },
        setSyllableCounterLanguage: (state, action: PayloadAction<string>) => {
            state.syllableCounterLanguage = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(resetLyricsEditor, () => initialState)
    }
});

export const resetLyricsEditor = createAction(`${name}/resetLyricsEditor`);
export const {
    setTagHighlighterEnabled,
    toggleTagHighlighter,
    setSyllableCounterEnabled,
    toggleSyllableCounter,
    setSyllableCounterLanguage
} = lyricsEditorSlice.actions

export default lyricsEditorSlice.reducer;