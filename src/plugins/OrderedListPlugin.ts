import OrderedList from '@tiptap/extension-ordered-list';
import { getIconElement } from '@/icons';

export function createOrderedListPlugin() {
  return {
    name: 'orderedList',
    extension: OrderedList,
  };
}

export function renderOrderedListButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '有序列表';
  btn.appendChild(getIconElement('ordered-list'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('orderedList'));
    }
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
}
