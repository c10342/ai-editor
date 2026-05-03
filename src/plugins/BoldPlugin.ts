import Bold from '@tiptap/extension-bold';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createBoldPlugin(): EditorPlugin {
  return {
    name: 'bold',
    extensions: [Bold],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.bold');
      btn.appendChild(getIconElement('bold'));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('bold'));
      };

      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleBold().run();
          updateState();
        }
      });

      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
