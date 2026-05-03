import Strike from '@tiptap/extension-strike';
import { getIconElement } from '@/icons';

export function createStrikePlugin() {
  return {
    name: 'strike',
    extension: Strike,
  };
}

export function renderStrikeButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '删除线 (Ctrl+Shift+S)';
  btn.appendChild(getIconElement('strikethrough'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('strike'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleStrike().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
