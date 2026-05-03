import Italic from '@tiptap/extension-italic';
import { getIconElement } from '@/icons';

export function createItalicPlugin() {
  return {
    name: 'italic',
    extension: Italic,
  };
}

export function renderItalicButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '斜体 (Ctrl+I)';
  btn.appendChild(getIconElement('italic'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('italic'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleItalic().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
