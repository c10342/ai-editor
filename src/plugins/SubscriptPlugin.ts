import Subscript from '@tiptap/extension-subscript';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createSubscriptPlugin(): EditorPlugin {
  return {
    name: 'subscript',
    extensions: [Subscript],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = '下标';
      btn.appendChild(getIconElement('subscript'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('subscript'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) { editor.chain().focus().toggleSubscript().run(); updateState(); }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
