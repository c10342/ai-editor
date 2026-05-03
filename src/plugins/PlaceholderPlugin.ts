import Placeholder from "@tiptap/extension-placeholder";
import type { I18n } from "@/core/I18n";
import type { EditorPlugin } from "@/types";

export function createPlaceholderPlugin(placeholder?: string, i18n?: I18n): EditorPlugin {
  const text = placeholder || (i18n ? i18n.t("placeholder.default") : "开始输入内容...");
  return {
    name: "placeholder",
    extensions: [Placeholder.configure({ placeholder: text })],
  };
}
