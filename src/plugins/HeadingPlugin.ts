import Heading, { Level } from '@tiptap/extension-heading';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export interface HeadingPluginOptions {
  levels?: Level[];
}

export function createHeadingPlugin(options?: HeadingPluginOptions): EditorPlugin {
  const levels = options?.levels || [1, 2, 3, 4, 5, 6];

  return {
    name: 'heading',
    extensions: [Heading.configure({ levels })],
    renderToolbar(editorManager) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('ae-toolbar__dropdown');
      const trigger = document.createElement('button');
      trigger.classList.add('ae-toolbar__btn', 'ae-toolbar__btn--dropdown');
      trigger.title = editorManager.t('toolbar.heading');
      trigger.innerHTML = `<span class="ae-toolbar__btn-label">${editorManager.t('toolbar.heading.paragraph')}</span>`;
      trigger.appendChild(getIconElement('chevronDown'));
      const menu = document.createElement('div');
      menu.classList.add('ae-toolbar__dropdown-menu');
      const headings: Array<{
        level: number;
        labelKey: string;
        tag: string;
        params?: Record<string, number>;
      }> = [
        { level: 0, labelKey: 'toolbar.heading.paragraph', tag: 'p' },
        ...levels.map((l) => ({
          level: l,
          labelKey: 'toolbar.heading.level',
          tag: `h${l}`,
          params: { level: l },
        })),
      ];
      headings.forEach(({ level, labelKey, tag, params }) => {
        const item = document.createElement('div');
        item.classList.add('ae-toolbar__dropdown-item');
        const inner = document.createElement(tag);
        inner.textContent = editorManager.t(labelKey, params);
        inner.classList.add('ae-toolbar__dropdown-item-text');
        item.appendChild(inner);
        item.addEventListener('click', () => {
          const editor = editorManager.getEditor();
          if (editor) {
            if (level === 0) editor.chain().focus().setParagraph().run();
            else
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                .run();
            menu.classList.remove('is-open');
            updateState();
          }
        });
        menu.appendChild(item);
      });
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('is-open');
      });
      document.addEventListener('click', () => {
        menu.classList.remove('is-open');
      });
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (!editor) return;
        let currentLabel = editorManager.t('toolbar.heading.paragraph');
        for (const l of levels) {
          if (editor.isActive('heading', { level: l })) {
            currentLabel = editorManager.t('toolbar.heading.level', { level: l });
            break;
          }
        }
        const labelEl = trigger.querySelector('.ae-toolbar__btn-label');
        if (labelEl) labelEl.textContent = currentLabel;
      };
      editorManager.on('selection-update', updateState);
      editorManager.on('update', updateState);
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
      return wrapper;
    },
  };
}
