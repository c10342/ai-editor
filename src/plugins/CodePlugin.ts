import Code from '@tiptap/extension-code';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createCodePlugin(): EditorPlugin {
  return {
    name: 'code',
    extensions: [Code],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.code');
      btn.appendChild(getIconElement('code'));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('code'));
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
    },
  };
}
