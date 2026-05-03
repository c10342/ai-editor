import Code from '@tiptap/extension-code';
import { getIconElement } from '@/icons';

export function createCodePlugin() {
  return {
    name: 'code',
    extension: Code,
  };
}

export function renderCodeButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '行内代码 (Ctrl+E)';
  btn.appendChild(getIconElement('code'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('code'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleCode().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
