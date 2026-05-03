import { Markdown } from "tiptap-markdown";
import type { EditorPlugin } from "@/types";

export function createMarkdownPlugin(options?: Record<string, any>): EditorPlugin {
  return {
    name: "markdown",
    extensions: [
      Markdown.configure({
        html: true,
        tightLists: true,
        tightListClass: "is-tight",
        bulletListMarker: "-",
        linkify: true,
        breaks: false,
        transformPastedText: true,
        transformCopiedText: true,
        ...options,
      }),
    ],
  };
}
