import TaskList from "@tiptap/extension-task-list";
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createTaskListPlugin(): EditorPlugin {
  return {
    name: "taskList",
    extensions: [TaskList],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.taskList");
      btn.appendChild(getIconElement("task-list"));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle("is-active", editor.isActive("taskList"));
      };
      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleTaskList().run();
          updateState();
        }
      });
      editorManager.on("selection-update", updateState);
      editorManager.on("update", updateState);
      return btn;
    },
  };
}
