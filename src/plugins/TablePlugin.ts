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
      trigger.title = '插入表格';
      trigger.appendChild(getIconElement('table'));

      const menu = document.createElement('div');
      menu.classList.add('ae-toolbar__dropdown-menu', 'ae-toolbar__dropdown-menu--table');

      const items: Array<{ label: string; icon?: string; action: () => void }> = [
        { label: '插入表格 (3x3)', action: () => { editorManager.getEditor()?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); } },
        { label: '添加列（前）', icon: 'add-column-before', action: () => { editorManager.getEditor()?.chain().focus().addColumnBefore().run(); } },
        { label: '添加列（后）', icon: 'add-column-after', action: () => { editorManager.getEditor()?.chain().focus().addColumnAfter().run(); } },
        { label: '删除列', icon: 'delete-column', action: () => { editorManager.getEditor()?.chain().focus().deleteColumn().run(); } },
        { label: '添加行（前）', icon: 'add-row-before', action: () => { editorManager.getEditor()?.chain().focus().addRowBefore().run(); } },
        { label: '添加行（后）', icon: 'add-row-after', action: () => { editorManager.getEditor()?.chain().focus().addRowAfter().run(); } },
        { label: '删除行', icon: 'delete-row', action: () => { editorManager.getEditor()?.chain().focus().deleteRow().run(); } },
        { label: '合并单元格', icon: 'merge-cells', action: () => { editorManager.getEditor()?.chain().focus().mergeCells().run(); } },
        { label: '拆分单元格', icon: 'split-cell', action: () => { editorManager.getEditor()?.chain().focus().splitCell().run(); } },
        { label: '删除表格', icon: 'delete-table', action: () => { editorManager.getEditor()?.chain().focus().deleteTable().run(); } },
      ];

      items.forEach(({ label, icon, action }) => {
        const item = document.createElement('div');
        item.classList.add('ae-toolbar__dropdown-item');
        if (icon) item.appendChild(getIconElement(icon));
        const text = document.createElement('span');
        text.textContent = label;
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
