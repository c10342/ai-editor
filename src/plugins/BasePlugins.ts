import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import TaskItem from "@tiptap/extension-task-item";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import type { EditorPlugin } from "@/types";

export function createDocumentPlugin(): EditorPlugin {
  return { name: "document", extensions: [Document] };
}
export function createParagraphPlugin(): EditorPlugin {
  return { name: "paragraph", extensions: [Paragraph] };
}
export function createTextPlugin(): EditorPlugin {
  return { name: "text", extensions: [Text] };
}
export function createListItemPlugin(): EditorPlugin {
  return { name: "listItem", extensions: [ListItem] };
}
export function createTaskItemPlugin(): EditorPlugin {
  return { name: "taskItem", extensions: [TaskItem] };
}
export function createDropcursorPlugin(): EditorPlugin {
  return { name: "dropcursor", extensions: [Dropcursor] };
}
export function createGapcursorPlugin(): EditorPlugin {
  return { name: "gapcursor", extensions: [Gapcursor] };
}
