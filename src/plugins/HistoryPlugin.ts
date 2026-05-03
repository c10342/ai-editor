import History from '@tiptap/extension-history';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createHistoryPlugin(): EditorPlugin {
  return {
    name: 'history',
    extensions: [History],
    renderToolbar(editorManager) {
      const group = document.createElement('div');
      group.classList.add('ae-toolbar__group');
      const undoBtn = document.createElement('button');
      undoBtn.classList.add('ae-toolbar__btn');
      undoBtn.title = '撤销 (Ctrl+Z)';
      undoBtn.appendChild(getIconElement('undo'));
      const updateUndoState = () => {
        const editor = editorManager.getEditor();
        if (editor) undoBtn.disabled = !editor.can().undo();
      };
      undoBtn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) { editor.chain().focus().undo().run(); updateUndoState(); }
      });
      const redoBtn = document.createElement('button');
      redoBtn.classList.add('ae-toolbar__btn');
      redoBtn.title = '重做 (Ctrl+Shift+Z)';
      redoBtn.appendChild(getIconElement('redo'));
      const updateRedoState = () => {
        const editor = editorManager.getEditor();
        if (editor) redoBtn.disabled = !editor.can().redo();
      };
      redoBtn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) { editor.chain().focus().redo().run(); updateRedoState(); }
      });
      editorManager.on('update', () => { updateUndoState(); updateRedoState(); });
      editorManager.on('selection-update', () => { updateUndoState(); updateRedoState(); });
      group.appendChild(undoBtn);
      group.appendChild(redoBtn);
      return group;
    },
  };
}
