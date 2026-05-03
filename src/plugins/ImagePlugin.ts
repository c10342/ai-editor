import Image from '@tiptap/extension-image';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createImagePlugin(): EditorPlugin {
  return {
    name: 'image',
    extensions: [Image.configure({ inline: false, allowBase64: true })],
    renderToolbar(editorManager) {
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.image');
      btn.appendChild(getIconElement('image'));
      btn.addEventListener('click', () => showImageModal(editorManager));
      return btn;
    },
  };
}

function showImageModal(editorManager: any) {
  const existing = document.querySelector('.ae-link-modal');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.classList.add('ae-link-modal');
  const modal = document.createElement('div');
  modal.classList.add('ae-link-modal__dialog');
  const title = document.createElement('div');
  title.classList.add('ae-link-modal__title');
  title.textContent = editorManager.t('image.modal.title');
  const urlInput = document.createElement('input');
  urlInput.classList.add('ae-link-modal__input');
  urlInput.type = 'url';
  urlInput.placeholder = editorManager.t('image.modal.urlPlaceholder');
  const altInput = document.createElement('input');
  altInput.classList.add('ae-link-modal__input');
  altInput.type = 'text';
  altInput.placeholder = editorManager.t('image.modal.altPlaceholder');
  const fileLabel = document.createElement('label');
  fileLabel.classList.add('ae-link-modal__file-label');
  fileLabel.textContent = editorManager.t('image.modal.fileLabel');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  fileLabel.appendChild(fileInput);
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (file) { const reader = new FileReader(); reader.onload = () => { urlInput.value = reader.result as string; }; reader.readAsDataURL(file); }
  });
  const btnGroup = document.createElement('div');
  btnGroup.classList.add('ae-link-modal__actions');
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--cancel');
  cancelBtn.textContent = editorManager.t('image.modal.cancel');
  cancelBtn.addEventListener('click', () => { overlay.remove(); });
  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('ae-link-modal__btn', 'ae-link-modal__btn--confirm');
  confirmBtn.textContent = editorManager.t('image.modal.confirm');
  confirmBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    const alt = altInput.value.trim();
    if (url) { const editor = editorManager.getEditor(); if (editor) editor.chain().focus().setImage({ src: url, alt }).run(); }
    overlay.remove();
  });
  btnGroup.appendChild(cancelBtn);
  btnGroup.appendChild(confirmBtn);
  modal.appendChild(title);
  modal.appendChild(urlInput);
  modal.appendChild(altInput);
  modal.appendChild(fileLabel);
  modal.appendChild(btnGroup);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  urlInput.focus();
  urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmBtn.click(); if (e.key === 'Escape') cancelBtn.click(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cancelBtn.click(); });
}
