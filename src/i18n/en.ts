import type { LocaleMessages } from "@/core/I18n";

const en: LocaleMessages = {
  toolbar: {
    bold: "Bold (Ctrl+B)",
    italic: "Italic (Ctrl+I)",
    underline: "Underline (Ctrl+U)",
    strike: "Strikethrough (Ctrl+Shift+S)",
    code: "Inline Code (Ctrl+E)",
    codeBlock: "Code Block (Ctrl+Alt+C)",
    bulletList: "Bullet List",
    orderedList: "Ordered List",
    taskList: "Task List",
    blockquote: "Blockquote",
    horizontalRule: "Horizontal Rule",
    link: "Insert Link (Ctrl+K)",
    image: "Insert Image",
    highlight: "Highlight",
    textColor: "Text Color",
    superscript: "Superscript",
    subscript: "Subscript",
    fontFamily: "Font Family",
    undo: "Undo (Ctrl+Z)",
    redo: "Redo (Ctrl+Shift+Z)",
    table: "Insert Table",
    heading: {
      title: "Heading",
      paragraph: "Paragraph",
      level: "Heading {level}",
    },
    textAlign: {
      left: "Align Left",
      center: "Align Center",
      right: "Align Right",
      justify: "Justify",
    },
    color: {
      reset: "Reset Color",
    },
    fontFamilyOptions: {
      default: "Default Font",
      songti: "SimSun",
      heiti: "SimHei",
      yahei: "Microsoft YaHei",
      kaiti: "KaiTi",
    },
    tableOptions: {
      insert: "Insert Table (3x3)",
      addColBefore: "Add Column Before",
      addColAfter: "Add Column After",
      deleteCol: "Delete Column",
      addRowBefore: "Add Row Before",
      addRowAfter: "Add Row After",
      deleteRow: "Delete Row",
      mergeCells: "Merge Cells",
      splitCell: "Split Cell",
      deleteTable: "Delete Table",
    },
  },
  link: {
    modal: {
      title: "Insert Link",
      urlPlaceholder: "Enter URL (https://...)",
      textPlaceholder: "Link text (optional)",
      cancel: "Cancel",
      confirm: "OK",
    },
  },
  image: {
    modal: {
      title: "Insert Image",
      urlPlaceholder: "Enter image URL (https://...)",
      altPlaceholder: "Image description (alt)",
      fileLabel: "Or choose a local file",
      cancel: "Cancel",
      confirm: "Insert",
    },
  },
  placeholder: {
    default: "Start typing...",
  },
  status: {
    wordCount: "{words} words · {chars} chars",
  },
};

export default en;
