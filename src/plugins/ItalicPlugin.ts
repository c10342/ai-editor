import Italic from "@tiptap/extension-italic";
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createItalicPlugin(): EditorPlugin {
  return {
    name: "italic",
    extensions: [Italic],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.italic");
      btn.appendChild(getIconElement("italic"));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle("is-active", editor.isActive("italic"));
      };

      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleItalic().run();
          updateState();
        }
      });

      editorManager.on("selection-update", updateState);
      editorManager.on("update", updateState);
      return btn;
    },
  };
}
