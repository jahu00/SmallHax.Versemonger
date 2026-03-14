import { useMemo, useCallback } from 'react';
import CodeMirror, { defaultLightThemeOption /*, useCodeMirror*/ } from '@uiw/react-codemirror';
import { EditorView, Decoration, WidgetType, ViewUpdate } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { useMode } from '../../mode-context';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setLyrics } from '../../store/song-slice';
import { SxProps, Theme } from '@mui/material/styles';
//import { basicSetup } from 'codemirror';


function countSyllables(word: string){
    word = word.toLowerCase().replace(/[^a-z]/g,'');
    if (!word) return 0;

    // Step 1: vowel groups
    let matches = word.match(/[aeiouy]+/g);
    let count = matches ? matches.length : 0;

    // Step 2: silent e
    if (word.endsWith('e') && word.length > 1 && !/[aeiouy]e$/.test(word)){
        count -= 1;
    }

    return Math.max(count,1);
}

function countSyllablesInLine(line: string): number | null{
    // If the line contains any [] pair → skip
    if (/\[.*?\]/.test(line)) return null;
    if (line.trim().length === 0) return null;

    const words = line.trim().split(/\s+/);
    let total = 0;
    for (const w of words){
        total += countSyllables(w);
    }
    return total;
}

class SyllableWidget extends WidgetType {
  constructor(private count: number | null) {
    super();
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = "syllable-widget";
    span.textContent = ` ⏱ ${this.count}`;
    /*span.style.color = '#555';
    span.style.fontSize = '0.9rem';
    span.style.marginLeft = '0.4rem';*/
    return span;
  }

  eq(other: WidgetType) {
    return other instanceof SyllableWidget && other.count === this.count;
  }
}

const createDecorations = (state: EditorState) => {
  const deco = [];
  const docStr = state.doc.toString();
  /* 1. Highlight tags */
  const tagRegex = /\[[^\]]+\]/g;
  for (let match; (match = tagRegex.exec(docStr)); ) {
    const { index } = match;
    const to = index + match[0].length;
    deco.push(
      Decoration.mark({
        class: 'cm-tag-highlight',
      }).range(index, to)
    );
  }

  /* 2. Syllable counter per line */
  const lineCount = state.doc.lines;
  for (let lineNo = 1; lineNo <= lineCount; lineNo++) {
    const line = state.doc.line(lineNo);
    const syllCnt = countSyllablesInLine(line.text);
    if (!syllCnt){
      continue;
    }
    deco.push(
      Decoration.widget({
        widget: new SyllableWidget(syllCnt),
        side: 1, // after the line
      }).range(line.to)
    );
  }

  return Decoration.set(deco, true);
};

export interface LyricsEditorProps {
  sx?: SxProps<Theme>;
}

export default function LyricsEditor({sx}: LyricsEditorProps) {
  const { mode } = useMode();
  const decoPlugin = useMemo(
    () => EditorView.decorations.compute(["doc"], (state) => createDecorations(state)),
    []
  );

  const extensions = useMemo(
    () => [decoPlugin],
    [decoPlugin]
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
