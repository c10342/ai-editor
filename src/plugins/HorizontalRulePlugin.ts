import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { getIconElement } from '@/icons';

export function createHorizontalRulePlugin() {
  return {
    name: 'horizontalRule',
    extension: HorizontalRule,
  };
}

export function renderHorizontalRuleButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '分割线';
  btn.appendChild(getIconElement('horizontal-rule'));

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().setHorizontalRule().run();
    }
  });

  return btn;
}
