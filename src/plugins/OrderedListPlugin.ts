import OrderedList from '@tiptap/extension-ordered-list';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createOrderedListPlugin(): EditorPlugin {
  return {
    name: 'orderedList',
    extensions: [OrderedList],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.orderedList');
      btn.appendChild(getIconElement('ordered-list'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('orderedList'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleOrderedList().run();
          updateState();
        }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
