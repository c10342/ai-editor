import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export function createColorPlugin(): EditorPlugin {
  return { name: 'textStyle', extensions: [TextStyle] };
}

export function createTextColorPlugin(): EditorPlugin {
  return {
    name: 'textColor',
    extensions: [Color],
    renderToolbar(editorManager) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('ae-toolbar__color-picker');
      const btn = document.createElement('button');
      btn.classList.add('ae-toolbar__btn');
      btn.title = editorManager.t('toolbar.textColor');
      btn.appendChild(getIconElement('text-color'));
      const colorBar = document.createElement('div');
      colorBar.classList.add('ae-toolbar__color-bar');
      const popover = document.createElement('div');
      popover.classList.add('ae-toolbar__color-popover');
      const colors = [
        '#000000',
        '#434343',
        '#666666',
        '#999999',
        '#cccccc',
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
        '#14b8a6',
        '#6366f1',
        '#a855f7',
        '#dc2626',
        '#ea580c',
        '#ca8a04',
        '#16a34a',
        '#2563eb',
      ];
      colors.forEach((color) => {
        const swatch = document.createElement('button');
        swatch.classList.add('ae-toolbar__color-swatch');
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', () => {
          const editor = editorManager.getEditor();
          if (editor) editor.chain().focus().setColor(color).run();
          popover.classList.remove('is-open');
          colorBar.style.backgroundColor = color;
        });
        popover.appendChild(swatch);
      });
      const resetBtn = document.createElement('button');
      resetBtn.classList.add('ae-toolbar__color-reset');
      resetBtn.textContent = editorManager.t('toolbar.color.reset');
      resetBtn.addEventListener('click', () => {
        const editor = editorManager.getEditor();
        if (editor) editor.chain().focus().unsetColor().run();
        popover.classList.remove('is-open');
        colorBar.style.backgroundColor = '';
      });
      popover.appendChild(resetBtn);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.toggle('is-open');
      });
      document.addEventListener('click', () => {
        popover.classList.remove('is-open');
      });
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) {
          const color = editor.getAttributes('textStyle').color;
          colorBar.style.backgroundColor = color || '';
        }
      };
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      wrapper.appendChild(btn);
      wrapper.appendChild(colorBar);
      wrapper.appendChild(popover);
      return wrapper;
    },
  };
}
