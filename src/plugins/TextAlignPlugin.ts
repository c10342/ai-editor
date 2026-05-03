import TextAlign from '@tiptap/extension-text-align';
import { getIconElement } from '@/icons';

export function createTextAlignPlugin() {
  return {
    name: 'textAlign',
    extension: TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  };
}

export function renderTextAlignButtons(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const group = document.createElement('div');
  group.classList.add('ae-toolbar__group');

  const alignments = [
    { value: 'left', icon: 'text-align-left', title: '左对齐' },
    { value: 'center', icon: 'text-align-center', title: '居中' },
    { value: 'right', icon: 'text-align-right', title: '右对齐' },
    { value: 'justify', icon: 'text-align-justify', title: '两端对齐' },
  ];

  alignments.forEach(({ value, icon, title }) => {
    const btn = document.createElement('button');
    btn.classList.add('ae-toolbar__btn');
    btn.title = title;
    btn.appendChild(getIconElement(icon));

    const updateState = () => {
      const editor = editorManager.getEditor();
      if (editor) {
        btn.classList.toggle(
          'is-active',
          editor.isActive({ textAlign: value })
        );
      }
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
}
