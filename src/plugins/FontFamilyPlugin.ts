import FontFamily from '@tiptap/extension-font-family';

export function createFontFamilyPlugin() {
  return {
    name: 'fontFamily',
    extension: FontFamily,
  };
}

export function renderFontFamilyDropdown(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('ae-toolbar__dropdown');

  const trigger = document.createElement('button');
  trigger.classList.add('ae-toolbar__btn', 'ae-toolbar__btn--dropdown');
  trigger.title = '字体';
  trigger.innerHTML = '<span class="ae-toolbar__btn-label">默认字体</span>';

  const menu = document.createElement('div');
  menu.classList.add('ae-toolbar__dropdown-menu');

  const fonts = [
    { label: '默认字体', value: '' },
    { label: '宋体', value: 'SimSun, serif' },
    { label: '黑体', value: 'SimHei, sans-serif' },
    { label: '微软雅黑', value: 'Microsoft YaHei, sans-serif' },
    { label: '楷体', value: 'KaiTi, serif' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
  ];

  fonts.forEach(({ label, value }) => {
    const item = document.createElement('div');
    item.classList.add('ae-toolbar__dropdown-item');
    const text = document.createElement('span');
    text.textContent = label;
    text.style.fontFamily = value || 'inherit';
    item.appendChild(text);

    item.addEventListener('click', () => {
      const editor = editorManager.getEditor();
      if (editor) {
        if (value) {
          editor.chain().focus().setFontFamily(value).run();
        } else {
          editor.chain().focus().unsetFontFamily().run();
        }
      }
      menu.classList.remove('is-open');
      const labelEl = trigger.querySelector('.ae-toolbar__btn-label');
      if (labelEl) labelEl.textContent = label;
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

  wrapper.appendChild(trigger);
  wrapper.appendChild(menu);

  return wrapper;
}
