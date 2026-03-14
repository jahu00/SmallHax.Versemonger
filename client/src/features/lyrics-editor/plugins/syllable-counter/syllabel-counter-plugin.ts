import { Decoration, EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';

import { WidgetType } from "@codemirror/view";
import languages, { countSyllables } from './languages';

export class SyllableWidget extends WidgetType {
  constructor(private count: number | null) {
    super();
  }

  toDOM() {
    const span = document.createElement('span');
    span.className = "syllable-widget";
    span.textContent = ` ⏱ ${this.count}`;
    return span;
  }

  eq(other: WidgetType) {
    return other instanceof SyllableWidget && other.count === this.count;
  }
}

function countSyllablesInLine(line: string, countSyllables: countSyllables): number | null{
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

const createDecorations = (state: EditorState, countSyllables: countSyllables) => {
  const deco = [];
  const docStr = state.doc.toString();

  const lineCount = state.doc.lines;
    for (let lineNo = 1; lineNo <= lineCount; lineNo++) {
      const line = state.doc.line(lineNo);
      const syllCnt = countSyllablesInLine(line.text, countSyllables);
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

export default function SyllableCounterPlugin(language: string) {
    const countSyllables = languages[language];
    return EditorView.decorations.compute(["doc"], (state) => createDecorations(state, countSyllables));
}