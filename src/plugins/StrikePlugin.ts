import Strike from '@tiptap/extension-strike';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createStrikePlugin(): EditorPlugin {
  return {
    name: 'strike',
    extensions: [Strike],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.strike');
      btn.appendChild(getIconElement('strikethrough'));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('strike'));
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
    },
  };
}
