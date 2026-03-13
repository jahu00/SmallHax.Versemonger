import { AppBar, Box, Collapse, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import LyricsEditor from "../features/lyrics-editor/lyrics-editor";
import { useState } from "react";
import MainMenu from "../features/main-menu/main-menu";
import SongSettings from "../features/song-settings/song-settings";

export default function Home() {
    const [showOpts, setShowOpts] = useState(false);
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MainMenu showOpts={showOpts} setShowOpts={setShowOpts}/>
            <Collapse in={showOpts} sx={{ flexShrink: 0 }}>
                <Box sx={{ p: 1, backgroundColor: 'background.paper' }}>
                    <SongSettings />
                </Box>
            </Collapse>
            <Box
                component="div"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto scroll',
                    p: 2,
                    padding: 0
                }}
            >
                <LyricsEditor/>
            </Box>
        </Box>
    );
}