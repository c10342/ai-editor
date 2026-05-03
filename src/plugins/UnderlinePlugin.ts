import Underline from '@tiptap/extension-underline';
import { getIconElement } from '@/icons';

export function createUnderlinePlugin() {
  return {
    name: 'underline',
    extension: Underline,
  };
}

export function renderUnderlineButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '下划线 (Ctrl+U)';
  btn.appendChild(getIconElement('underline'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('underline'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleUnderline().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
