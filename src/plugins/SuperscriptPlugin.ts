import Superscript from '@tiptap/extension-superscript';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createSuperscriptPlugin(): EditorPlugin {
  return {
    name: 'superscript',
    extensions: [Superscript],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.superscript');
      btn.appendChild(getIconElement('superscript'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('superscript'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleSuperscript().run();
          updateState();
        }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
