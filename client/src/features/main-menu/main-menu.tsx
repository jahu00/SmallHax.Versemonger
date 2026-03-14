import { DarkMode, FileDownload, FileUpload, InsertDriveFile, LightMode } from "@mui/icons-material";
import { AppBar, Box, Divider, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useMode } from "../../mode-context";
import YesNoModal from "../../components/yes-no-modal";
import { useCallback, useState } from "react";
import { store, useAppDispatch } from "../../app/store";
import { resetSong, setLyrics, setTitle } from "../lyrics-editor/lyrics-editor-slice";
import { downloadFile } from "../../utils/download-file";
import UploadModal from "../../components/upload-modal";

export interface MainMenuProps {
    showOpts: boolean;
    setShowOpts?: (newValue: boolean) => void
}

export default function MainMenu({showOpts, setShowOpts}: MainMenuProps){
    const { mode, toggle } = useMode();
    const [showNewModal, setShowNewModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const dispatch = useAppDispatch();
    const handleNewModalClose = useCallback(() => {
        setShowNewModal(false);
    }, []);
    const handleNewModalYes = useCallback(() => {
        dispatch(resetSong());
        setShowNewModal(false);
    }, [dispatch]);
    const handleNewClick = useCallback(() => {
        setShowNewModal(true);
    }, []);
    const handleExportClick = useCallback(() => {
        const state = store.getState().lyricsEditor;
        downloadFile(state.lyrics, state.title + ".txt");
    }, []);
    const handleImportModalClose = useCallback(() => {
        setShowImportModal(false);
    }, [])
    const handleImportClick = useCallback(() => {
        setShowImportModal(true);
    }, []);
    const handleImportModalUpload = useCallback(async (file: File) => {
        const text = await file.text();
        const title = file.name.replace(/.txt$/gmi, "");
        dispatch(setTitle(title));
        dispatch(setLyrics(text));
    }, [dispatch]);
    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Tooltip title="New" placement="top">
                    <IconButton color="inherit" aria-label="new" onClick={handleNewClick}>
                        <InsertDriveFile />
                    </IconButton>
                </Tooltip>
                <Divider orientation="vertical" />
                <Tooltip title="Download" placement="top">
                    <IconButton color="inherit" aria-label="download" onClick={handleExportClick}>
                        <FileDownload />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Upload" placement="top">
                    <IconButton color="inherit" aria-label="upload" onClick={handleImportClick}>
                        <FileUpload />
                    </IconButton>
                </Tooltip>
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
        <UploadModal
            open={showImportModal}
            onClose={handleImportModalClose}
            onUpload={handleImportModalUpload}
            />
    </>;
}
