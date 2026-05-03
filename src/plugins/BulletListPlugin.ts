import BulletList from '@tiptap/extension-bullet-list';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createBulletListPlugin(): EditorPlugin {
  return {
    name: 'bulletList',
    extensions: [BulletList],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.bulletList');
      btn.appendChild(getIconElement('bullet-list'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('bulletList'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleBulletList().run();
          updateState();
        }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
