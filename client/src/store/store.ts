// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import songReducer from './song-slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import lyricsEditorReducer from '../features/lyrics-editor/lyrics-editor-slice';

export const store = configureStore({
  reducer: {
    song: songReducer,
    lyricsEditor: lyricsEditorReducer
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;