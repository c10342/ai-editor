import Highlight from "@tiptap/extension-highlight";
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createHighlightPlugin(): EditorPlugin {
  return {
    name: "highlight",
    extensions: [Highlight.configure({ multicolor: true })],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.highlight");
      btn.appendChild(getIconElement("highlight"));
      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle("is-active", editor.isActive("highlight"));
      };
      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleHighlight().run();
          updateState();
        }
      });
      editorManager.on("selection-update", updateState);
      editorManager.on("update", updateState);
      return btn;
    },
  };
}
