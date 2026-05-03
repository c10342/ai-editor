import CodeBlock from '@tiptap/extension-code-block';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createCodeBlockPlugin(): EditorPlugin {
  return {
    name: 'codeBlock',
    extensions: [CodeBlock],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = '代码块 (Ctrl+Alt+C)';
      btn.appendChild(getIconElement('code-block'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('codeBlock'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) { editor.chain().focus().toggleCodeBlock().run(); updateState(); }
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}
