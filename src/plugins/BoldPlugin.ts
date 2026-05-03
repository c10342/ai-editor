import Bold from '@tiptap/extension-bold';
import type { EditorPlugin, ToolbarItem } from '@/types';
import { getIconElement } from '@/icons';

export function createBoldPlugin(): EditorPlugin {
  const toolbarItems: ToolbarItem[] = [
    {
      id: 'bold',
      type: 'button',
      icon: 'bold',
      tooltip: '加粗 (Ctrl+B)',
      active: () => false,
      action: () => {},
    },
  ];

  return {
    name: 'bold',
    extension: Bold,
    toolbarItems,
    onInit() {
      toolbarItems[0].active = () => false;
      toolbarItems[0].action = () => {};
    },
  };
}

export function renderBoldButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '加粗 (Ctrl+B)';
  btn.appendChild(getIconElement('bold'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('bold'));
    }
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
}
