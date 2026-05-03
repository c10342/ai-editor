import TaskList from '@tiptap/extension-task-list';
import { getIconElement } from '@/icons';

export function createTaskListPlugin() {
  return {
    name: 'taskList',
    extension: TaskList,
  };
}

export function renderTaskListButton(
  container: HTMLElement,
  editorManager: any
): HTMLElement {
  const btn = document.createElement('button');
  btn.classList.add('ae-toolbar__btn');
  btn.title = '任务列表';
  btn.appendChild(getIconElement('task-list'));

  const updateState = () => {
    const editor = editorManager.getEditor();
    if (editor) {
      btn.classList.toggle('is-active', editor.isActive('taskList'));
    }
  };

  btn.addEventListener('click', () => {
    const editor = editorManager.getEditor();
    if (editor) {
      editor.chain().focus().toggleTaskList().run();
      updateState();
    }
  });

  editorManager.on('selection-update', updateState);
  editorManager.on('update', updateState);

  return btn;
}
