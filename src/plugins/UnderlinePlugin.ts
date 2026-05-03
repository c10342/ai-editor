import Underline from "@tiptap/extension-underline";
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createUnderlinePlugin(): EditorPlugin {
  return {
    name: "underline",
    extensions: [Underline],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.underline");
      btn.appendChild(getIconElement("underline"));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle("is-active", editor.isActive("underline"));
      };

      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleUnderline().run();
          updateState();
        }
      });

      editorManager.on("selection-update", updateState);
      editorManager.on("update", updateState);
      return btn;
    },
  };
}
