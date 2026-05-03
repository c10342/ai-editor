import FontFamily from "@tiptap/extension-font-family";
import type { EditorPlugin } from "@/types";

export function createFontFamilyPlugin(): EditorPlugin {
  return {
    name: "fontFamily",
    extensions: [FontFamily],
    renderToolbar(editorManager) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("ae-toolbar__dropdown");
      const trigger = document.createElement("button");
      trigger.classList.add("ae-toolbar__btn", "ae-toolbar__btn--dropdown");
      trigger.title = editorManager.t("toolbar.fontFamily");
      trigger.innerHTML = `<span class="ae-toolbar__btn-label">${editorManager.t("toolbar.fontFamily.default")}</span>`;
      const menu = document.createElement("div");
      menu.classList.add("ae-toolbar__dropdown-menu");
      const fonts = [
        { labelKey: "toolbar.fontFamily.default", value: "" },
        { labelKey: "toolbar.fontFamily.songti", value: "SimSun, serif" },
        { labelKey: "toolbar.fontFamily.heiti", value: "SimHei, sans-serif" },
        { labelKey: "toolbar.fontFamily.yahei", value: "Microsoft YaHei, sans-serif" },
        { labelKey: "toolbar.fontFamily.kaiti", value: "KaiTi, serif" },
        { label: "Arial", value: "Arial, sans-serif" },
        { label: "Georgia", value: "Georgia, serif" },
        { label: "Times New Roman", value: "Times New Roman, serif" },
        { label: "Courier New", value: "Courier New, monospace" },
      ];
      fonts.forEach((font) => {
        const label = (font as any).labelKey
          ? editorManager.t((font as any).labelKey)
          : (font as any).label;
        const { value } = font;
        const item = document.createElement("div");
        item.classList.add("ae-toolbar__dropdown-item");
        const text = document.createElement("span");
        text.textContent = label;
        text.style.fontFamily = value || "inherit";
        item.appendChild(text);
        item.addEventListener("click", () => {
          const editor = editorManager.getEditor();
          if (editor) {
            if (value) editor.chain().focus().setFontFamily(value).run();
            else editor.chain().focus().unsetFontFamily().run();
          }
          menu.classList.remove("is-open");
          const labelEl = trigger.querySelector(".ae-toolbar__btn-label");
          if (labelEl) labelEl.textContent = label;
        });
        menu.appendChild(item);
      });
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("is-open");
      });
      document.addEventListener("click", () => {
        menu.classList.remove("is-open");
      });
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
      return wrapper;
    },
  };
}
