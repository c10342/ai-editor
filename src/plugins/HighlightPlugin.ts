import Highlight from '@tiptap/extension-highlight';
import { getIconElement } from '@/icons';

export function createHighlightPlugin() {
  return {
    name: 'highlight',
    extension: Highlight.configure({
      multicolor: true,
    }),
  };
}

export function renderHighlightButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('ae-toolbar__color-picker');

  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '高亮';
  btn.appendChild(getIconElement('highlight'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('highlight'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleHighlight().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  wrapper.appendChild(btn);
  return wrapper;
}
