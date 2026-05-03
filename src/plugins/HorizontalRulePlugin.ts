import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createHorizontalRulePlugin(): EditorPlugin {
  return {
    name: "horizontalRule",
    extensions: [HorizontalRule],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.horizontalRule");
      btn.appendChild(getIconElement("horizontal-rule"));
      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) editor.chain().focus().setHorizontalRule().run();
      });
      return btn;
    },
  };
}
