import Blockquote from '@tiptap/extension-blockquote';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createBlockquotePlugin(): EditorPlugin {
  return {
    name: 'blockquote',
    extensions: [Blockquote],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.blockquote');
      btn.appendChild(getIconElement('quote'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('blockquote'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) { editor.chain().focus().toggleBlockquote().run(); updateState(); }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
