import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { getIconElement } from '@/icons';
import type { EditorPlugin } from '@/types';

export { Table, TableRow, TableCell, TableHeader };

export function createTablePlugin(): EditorPlugin {
  return {
    name: 'table',
    extensions: [
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    renderToolbar(editorManager) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('ae-toolbar__dropdown');

      const trigger = document.createElement('button');
      trigger.classList.add('ae-toolbar__btn');
      trigger.title = editorManager.t('toolbar.table');
      trigger.appendChild(getIconElement('table'));

      const menu = document.createElement('div');
      menu.classList.add('ae-toolbar__dropdown-menu', 'ae-toolbar__dropdown-menu--table');

      const items: Array<{ labelKey: string; icon?: string; action: () => void }> = [
        { labelKey: 'toolbar.table.insert', action: () => { editorManager.getEditor()?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); } },
        { labelKey: 'toolbar.table.addColBefore', icon: 'add-column-before', action: () => { editorManager.getEditor()?.chain().focus().addColumnBefore().run(); } },
        { labelKey: 'toolbar.table.addColAfter', icon: 'add-column-after', action: () => { editorManager.getEditor()?.chain().focus().addColumnAfter().run(); } },
        { labelKey: 'toolbar.table.deleteCol', icon: 'delete-column', action: () => { editorManager.getEditor()?.chain().focus().deleteColumn().run(); } },
        { labelKey: 'toolbar.table.addRowBefore', icon: 'add-row-before', action: () => { editorManager.getEditor()?.chain().focus().addRowBefore().run(); } },
        { labelKey: 'toolbar.table.addRowAfter', icon: 'add-row-after', action: () => { editorManager.getEditor()?.chain().focus().addRowAfter().run(); } },
        { labelKey: 'toolbar.table.deleteRow', icon: 'delete-row', action: () => { editorManager.getEditor()?.chain().focus().deleteRow().run(); } },
        { labelKey: 'toolbar.table.mergeCells', icon: 'merge-cells', action: () => { editorManager.getEditor()?.chain().focus().mergeCells().run(); } },
        { labelKey: 'toolbar.table.splitCell', icon: 'split-cell', action: () => { editorManager.getEditor()?.chain().focus().splitCell().run(); } },
        { labelKey: 'toolbar.table.deleteTable', icon: 'delete-table', action: () => { editorManager.getEditor()?.chain().focus().deleteTable().run(); } },
      ];

      items.forEach(({ labelKey, icon, action }) => {
        const item = document.createElement('div');
        item.classList.add('ae-toolbar__dropdown-item');
        if (icon) item.appendChild(getIconElement(icon));
        const text = document.createElement('span');
        text.textContent = editorManager.t(labelKey);
        item.appendChild(text);
        item.addEventListener('click', () => { action(); menu.classList.remove('is-open'); });
        menu.appendChild(item);
      });

      trigger.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('is-open'); });
      document.addEventListener('click', () => { menu.classList.remove('is-open'); });

      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
      return wrapper;
    },
  };
}
