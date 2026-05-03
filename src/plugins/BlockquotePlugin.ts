import Blockquote from '@tiptap/extension-blockquote';
import { getIconElement } from '@/icons';

export function createBlockquotePlugin() {
  return {
    name: 'blockquote',
    extension: Blockquote,
  };
}

export function renderBlockquoteButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '引用';
  btn.appendChild(getIconElement('quote'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('blockquote'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleBlockquote().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
