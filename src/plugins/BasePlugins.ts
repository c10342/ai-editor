import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import TaskItem from '@tiptap/extension-task-item';

export function createDocumentPlugin() {
  return { name: 'document', extension: Document };
}

export function createParagraphPlugin() {
  return { name: 'paragraph', extension: Paragraph };
}

export function createTextPlugin() {
  return { name: 'text', extension: Text };
}

export function createListItemPlugin() {
  return { name: 'listItem', extension: ListItem };
}

export function createTaskItemPlugin() {
  return { name: 'taskItem', extension: TaskItem };
}

export function createDropcursorPlugin() {
  return { name: 'dropcursor', extension: Dropcursor };
}

export function createGapcursorPlugin() {
  return { name: 'gapcursor', extension: Gapcursor };
}
