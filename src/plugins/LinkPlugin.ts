import Link from '@tiptap/extension-link';
import { getIconElement } from '@/icons';

export function createLinkPlugin() {
  return {
    name: 'link',
    extension: Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
  };
}

export function renderLinkButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '插入链接 (Ctrl+K)';
  btn.appendChild(getIconElement('link'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('link'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (!editor) return;

    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      updateState();
      return;
    }

    showLinkModal(editor, editorManager, updateState);
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}

function showLinkModal(editor: any, editorManager: any, updateState: () => void) {
  const existing = document.querySelector('.ae-link-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.classList.add('ae-link-modal');

  const modal = document.createElement('div');
  modal.classList.add('ae-link-modal__dialog');

  const title = document.createElement('div');
  title.classList.add('ae-link-modal__title');
  title.textContent = '插入链接';

  const urlInput = document.createElement('input');
  urlInput.classList.add('ae-link-modal__input');
  urlInput.type = 'url';
  urlInput.placeholder = '请输入链接地址 (https://...)';

  const textInput = document.createElement('input');
  textInput.classList.add('ae-link-modal__input');
  textInput.type = 'text';
  textInput.placeholder = '链接文本（可选）';

  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, '');
  if (selectedText) {
    textInput.value = selectedText;
  }

  const existingLink = editor.getAttributes('link').href;
  if (existingLink) {
    urlInput.value = existingLink;
  }

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('ae-link-modal__actions');

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--cancel');
  cancelBtn.textContent = '取消';
  cancelBtn.addEventListener('click', () => {
    overlay.remove();
    editor.commands.focus();
  });

  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--confirm');
  confirmBtn.textContent = '确定';
  confirmBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      if (selectedText && textInput.value && textInput.value !== selectedText) {
        editor.chain().focus()
          .insertContent({
            type: 'text',
            marks: [{ type: 'link', attrs: { href: url } }],
            text: textInput.value,
          })
          .run();
      } else {
        editor.chain().focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      }
    }
    overlay.remove();
    editor.commands.focus();
    updateState();
  });

  btnGroup.appendChild(cancelBtn);
  btnGroup.appendChild(confirmBtn);

  modal.appendChild(title);
  modal.appendChild(urlInput);
  modal.appendChild(textInput);
  modal.appendChild(btnGroup);
  overlay.appendChild(modal);

  document.body.appendChild(overlay);
  urlInput.focus();

  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirmBtn.click();
    if (e.key === 'Escape') cancelBtn.click();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cancelBtn.click();
  });
}
