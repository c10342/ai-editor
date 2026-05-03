import BulletList from '@tiptap/extension-bullet-list';
import { getIconElement } from '@/icons';

export function createBulletListPlugin() {
  return {
    name: 'bulletList',
    extension: BulletList,
  };
}

export function renderBulletListButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '无序列表';
  btn.appendChild(getIconElement('bullet-list'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('bulletList'));
    }
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
}
