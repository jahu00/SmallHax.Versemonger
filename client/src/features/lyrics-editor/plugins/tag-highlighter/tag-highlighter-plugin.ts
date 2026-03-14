import { Decoration, EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';

const createDecorations = (state: EditorState) => {
  const deco = [];
  const docStr = state.doc.toString();

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

  return Decoration.set(deco, true);
};

export default function TagHighlightPlugin() {
    return EditorView.decorations.compute(["doc"], (state) => createDecorations(state));
}