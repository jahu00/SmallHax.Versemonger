import { useMemo, useCallback } from 'react';
import CodeMirror, { defaultLightThemeOption /*, useCodeMirror*/ } from '@uiw/react-codemirror';
import { EditorView, Decoration, ViewUpdate } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { useMode } from '../../mode-context';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setLyrics } from '../../store/song-slice';
import { SxProps, Theme } from '@mui/material/styles';
import TagHighlightPlugin from './plugins/tag-highlighter/tag-highlighter-plugin';
import SyllableCounterPlugin from './plugins/syllable-counter/syllabel-counter-plugin';
//import { basicSetup } from 'codemirror';

export interface LyricsEditorProps {
  sx?: SxProps<Theme>;
}

export default function LyricsEditor({sx}: LyricsEditorProps) {
  const { mode } = useMode();

  const tagHighlighterEnabled = useAppSelector(x => x.lyricsEditor.tagHighlighterEnabled);
  const syllableCounterEnabled = useAppSelector(x => x.lyricsEditor.syllableCounterEnabled);
  const syllableCounterLanguage = useAppSelector(x => x.lyricsEditor.syllableCounterLanguage);

  const tagHighlightPlugin = useMemo(() => TagHighlightPlugin(), []);

  const syllableCounterPlugin = useMemo(
    () => SyllableCounterPlugin(syllableCounterLanguage),
    [syllableCounterLanguage]
  );

  const extensions = useMemo(
    () => {
      let newExtensions: Extension[] = [];
      if (tagHighlighterEnabled && tagHighlightPlugin){
        newExtensions.push(tagHighlightPlugin);
      }
      if (syllableCounterEnabled && syllableCounterPlugin){
        newExtensions.push(syllableCounterPlugin);
      }
      return newExtensions;
    },
    [tagHighlighterEnabled, TagHighlightPlugin, syllableCounterEnabled, syllableCounterPlugin]
  );

  //const mountRef = useRef<HTMLDivElement | null>(null);
  //const viewRef = useRef<EditorView | null>(null);

  const dispatch = useAppDispatch();
  const lyrics = useAppSelector(x => x.song.lyrics);
  //const [value, setValue] = React.useState("");
  const onChange = useCallback((val: string, _viewUpdate: ViewUpdate) => {
    //setValue(val);
    dispatch(setLyrics(val));
  }, [dispatch]);

  /*const { setContainer } = useCodeMirror({
    container: mountRef.current,
    extensions: [basicSetup, decoPlugin],
    value: "",
    onCreateEditor: (view) => { viewRef.current = view }
  });

  return <div ref={(node) => { node && setContainer(node) } } sx={[...(Array.isArray(sx) ? sx : [sx]]}/>;*/

  return <CodeMirror
    value={lyrics}
    theme={mode === "dark" ? darcula : defaultLightThemeOption}
    height="200px"
    extensions={extensions}
    onChange={onChange}
    />;

}
