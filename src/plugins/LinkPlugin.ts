import Link from '@tiptap/extension-link';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createLinkPlugin(): EditorPlugin {
  return {
    name: 'link',
    extensions: [Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
    })],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.link');
      btn.appendChild(getIconElement('link'));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle('is-active', editor.isActive('link'));
      };
      btn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (!editor) return;
        if (editor.isActive('link')) { editor.chain().focus().unsetLink().run(); updateState(); return; }
        showLinkModal(editor, editorManager, updateState);
      });
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      return btn;
    },
  };
}

function showLinkModal(editor: any, em: any, updateState: () => void) {
  const existing = document.querySelector('.ae-link-modal');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.classList.add('ae-link-modal');
  const modal = document.createElement('div');
  modal.classList.add('ae-link-modal__dialog');
  const title = document.createElement('div');
  title.classList.add('ae-link-modal__title');
  title.textContent = em.t('link.modal.title');
  const urlInput = document.createElement('input');
  urlInput.classList.add('ae-link-modal__input');
  urlInput.type = 'url';
  urlInput.placeholder = em.t('link.modal.urlPlaceholder');
  const textInput = document.createElement('input');
  textInput.classList.add('ae-link-modal__input');
  textInput.type = 'text';
  textInput.placeholder = em.t('link.modal.textPlaceholder');
  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, '');
  if (selectedText) textInput.value = selectedText;
  const existingLink = editor.getAttributes('link').href;
  if (existingLink) urlInput.value = existingLink;
  const btnGroup = document.createElement('div');
  btnGroup.classList.add('ae-link-modal__actions');
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--cancel');
  cancelBtn.textContent = em.t('link.modal.cancel');
  cancelBtn.addEventListener('click', () => { overlay.remove(); editor.commands.focus(); });
  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--confirm');
  confirmBtn.textContent = em.t('link.modal.confirm');
  confirmBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      if (selectedText && textInput.value && textInput.value !== selectedText) {
        editor.chain().focus().insertContent({ type: 'text', marks: [{ type: 'link', attrs: { href: url } }], text: textInput.value }).run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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
  urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmBtn.click(); if (e.key === 'Escape') cancelBtn.click(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cancelBtn.click(); });
}
