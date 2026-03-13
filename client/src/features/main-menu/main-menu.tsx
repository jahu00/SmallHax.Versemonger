import { DarkMode, FileDownload, FileUpload, InsertDriveFile, LightMode } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useMode } from "../../mode-context";
import YesNoModal from "../../components/yes-no-modal";
import { useCallback, useState } from "react";
import { store, useAppDispatch } from "../../app/store";
import { resetSong } from "../lyrics-editor/lyrics-editor-slice";
import { downloadFile } from "../../app/utils/download-file";

export interface MainMenuProps {
    showOpts: boolean;
    setShowOpts?: (newValue: boolean) => void
}

export default function MainMenu({showOpts, setShowOpts}: MainMenuProps){
    const { mode, toggle } = useMode();
    const [showNewModal, setShowNewModal] = useState(false);
    const dispatch = useAppDispatch();
    const handleNewModalClose = useCallback(() => {
        setShowNewModal(false);
    }, []);
    const handleNewModalYes = useCallback(() => {
        dispatch(resetSong());
        setShowNewModal(false);
    }, []);
    const handleNewClick = useCallback(() => {
        setShowNewModal(true);
    }, []);
    const handleSaveClick = useCallback(() => {
        const state = store.getState().lyricsEditor;
        downloadFile(state.lyrics, state.title + ".txt");
    }, []);
    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton color="inherit" aria-label="new" onClick={handleNewClick}>
                    <InsertDriveFile />
                </IconButton>
                <IconButton color="inherit" aria-label="save" onClick={handleSaveClick}>
                    <FileDownload />
                </IconButton>
                <IconButton color="inherit" aria-label="load">
                    <FileUpload />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit" onClick={toggle} aria-label="theme">
                    {
                        mode === "dark" ? <DarkMode /> : <LightMode/>
                    }
                </IconButton>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => setShowOpts?.(!showOpts)}
                    aria-label="options"
                >
                    <Typography variant="caption">{false ? '▲' : '▼'}</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
        <YesNoModal
            open={showNewModal}
            title="New document"
            content="Do you want to discard all changes and make a new document?"
            onYes={handleNewModalYes}
            onNo={handleNewModalClose}
            onClose={handleNewModalClose} />
    </>;
}