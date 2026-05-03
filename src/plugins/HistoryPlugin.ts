import History from '@tiptap/extension-history';
import { getIconElement } from '@/icons';

export function createHistoryPlugin() {
  return {
    name: 'history',
    extension: History,
  };
}

export function renderUndoButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '撤销 (Ctrl+Z)';
  btn.appendChild(getIconElement('undo'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.disabled = !editor.can().undo();
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().undo().run();
      updateState();
    }
  });

  editorManager.on('update', updateState);
  editorManager.on('selection-update', updateState);

  return btn;
}

export function renderRedoButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '重做 (Ctrl+Shift+Z)';
  btn.appendChild(getIconElement('redo'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.disabled = !editor.can().redo();
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().redo().run();
      updateState();
    }
  });

  editorManager.on('update', updateState);
  editorManager.on('selection-update', updateState);

  return btn;
}
