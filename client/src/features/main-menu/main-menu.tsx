import { DarkMode, FileDownload, FileUpload, FormatClear, InsertDriveFile, Language, LightMode, MoreVert, TextFormat, Timer, TimerOff } from "@mui/icons-material";
import { AppBar, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useMode } from "../../mode-context";
import YesNoModal from "../../components/yes-no-modal";
import { MouseEventHandler, useCallback, useState } from "react";
import { store, useAppDispatch, useAppSelector } from "../../store/store";
import { resetSong, setLyrics, setTitle } from "../../store/song-slice";
import { downloadFile } from "../../utils/download-file";
import UploadModal from "../../components/upload-modal";
import { setSyllableCounterLanguage, toggleSyllableCounter, toggleTagHighlighter } from "../lyrics-editor/lyrics-editor-slice";
import languages, { languageKeys } from "../lyrics-editor/plugins/syllable-counter/languages";

export interface MainMenuProps {
    showOpts: boolean;
    setShowOpts?: (newValue: boolean) => void
}

export default function MainMenu({showOpts, setShowOpts}: MainMenuProps){
    const { mode, toggle } = useMode();
    const tagHighlighterEnabled = useAppSelector(x => x.lyricsEditor.tagHighlighterEnabled);
    const syllableCounterEnabled = useAppSelector(x => x.lyricsEditor.syllableCounterEnabled);
    const syllableCounterLanguage = useAppSelector(x => x.lyricsEditor.syllableCounterLanguage);
    const [syllableCounterLanguageMenuAnchor, setSyllableCounterLanguageMenuAnchor] = useState<HTMLElement | null>(null);
    const [showNewModal, setShowNewModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const showSyllableCounterLanguageMenu =  Boolean(syllableCounterLanguageMenuAnchor);
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
        const state = store.getState().song;
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
    const handleHighlightClick = useCallback(() => {
        dispatch(toggleTagHighlighter());
    }, [dispatch]);
    const handleSyllableCounterClick = useCallback(() => {
        dispatch(toggleSyllableCounter());
    }, [dispatch]);
    const handleSyllableCounterLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setSyllableCounterLanguageMenuAnchor(event.currentTarget);
    };

    const handleSyllableCounterLanguageClose = useCallback(() => {
        setSyllableCounterLanguageMenuAnchor(null);
    }, [setSyllableCounterLanguageMenuAnchor]);

    const handleSyllableCounterLanguageSelected = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget;
        dispatch(setSyllableCounterLanguage(target.innerText.trim()));
        setSyllableCounterLanguageMenuAnchor(null);
    }, [setSyllableCounterLanguageMenuAnchor, dispatch]);
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
                <Divider orientation="vertical" />
                <Tooltip title="Tag highlight" placement="top">
                    <IconButton color="inherit" aria-label="highlight" onClick={handleHighlightClick}>
                        { tagHighlighterEnabled ? <TextFormat /> : <FormatClear /> }
                    </IconButton>
                </Tooltip>
                <Tooltip title="Syllable counter" placement="top">
                    <IconButton color="inherit" aria-label="highlight" onClick={handleSyllableCounterClick}>
                        { syllableCounterEnabled ? <Timer /> : <TimerOff /> }
                    </IconButton>
                </Tooltip>
                <IconButton
                edge="end"
                color="inherit"
                aria-label="more"
                aria-controls="language-menu"
                aria-haspopup="true"
                onClick={handleSyllableCounterLanguageClick}
                >
                    <Typography variant="caption">{syllableCounterLanguage}</Typography>
                </IconButton>
                <Menu
                    id="toolbar-menu"
                    anchorEl={syllableCounterLanguageMenuAnchor}
                    open={showSyllableCounterLanguageMenu}
                    onClose={handleSyllableCounterLanguageClose}
                    MenuListProps={{ "aria-labelledby": "more-button" }}
                    >
                        {languageKeys.map(x => (<MenuItem key={x} onClick={handleSyllableCounterLanguageSelected}>{x}</MenuItem>))}
                </Menu>
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
