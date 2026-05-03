import TextAlign from '@tiptap/extension-text-align';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createTextAlignPlugin(): EditorPlugin {
  return {
    name: 'textAlign',
    extensions: [TextAlign.configure({ types: ['heading', 'paragraph'] })],
    renderToolbar(editorManager) {
      const group = document.createElement('div');
      group.classList.add('ae-toolbar__group');
      const alignments = [
        { value: 'left', icon: 'text-align-left', titleKey: 'toolbar.textAlign.left' },
        { value: 'center', icon: 'text-align-center', titleKey: 'toolbar.textAlign.center' },
        { value: 'right', icon: 'text-align-right', titleKey: 'toolbar.textAlign.right' },
        { value: 'justify', icon: 'text-align-justify', titleKey: 'toolbar.textAlign.justify' },
      ];
      alignments.forEach(({ value, icon, titleKey }) => {
        const btn = document.createElement('button');
        btn.classList.add('ae-toolbar__btn');
        btn.title = editorManager.t(titleKey);
        btn.appendChild(getIconElement(icon));
        const updateState = () => {
          const editor = editorManager.getEditor();
          if (editor) btn.classList.toggle('is-active', editor.isActive({ textAlign: value }));
        };
        btn.addEventListener('click', () => {
          const editor = editorManager.getEditor();
          if (editor) {
            editor.chain().focus().setTextAlign(value).run();
            updateState();
          }
        });
        editorManager.on('selection-update', updateState);
        editorManager.on('update', updateState);
        group.appendChild(btn);
      });
      return group;
    },
  };
}
