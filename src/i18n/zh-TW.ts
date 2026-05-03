import type { LocaleMessages } from "@/core/I18n";

const zhTW: LocaleMessages = {
  toolbar: {
    bold: "粗體 (Ctrl+B)",
    italic: "斜體 (Ctrl+I)",
    underline: "底線 (Ctrl+U)",
    strike: "刪除線 (Ctrl+Shift+S)",
    code: "行內程式碼 (Ctrl+E)",
    codeBlock: "程式碼區塊 (Ctrl+Alt+C)",
    bulletList: "無序清單",
    orderedList: "有序清單",
    taskList: "任務清單",
    blockquote: "引用",
    horizontalRule: "分隔線",
    link: "插入連結 (Ctrl+K)",
    image: "插入圖片",
    highlight: "螢光標記",
    textColor: "文字顏色",
    superscript: "上標",
    subscript: "下標",
    fontFamily: "字型",
    undo: "復原 (Ctrl+Z)",
    redo: "重做 (Ctrl+Shift+Z)",
    table: "插入表格",
    heading: {
      title: "標題",
      paragraph: "正文",
      level: "標題 {level}",
    },
    textAlign: {
      left: "靠左對齊",
      center: "置中",
      right: "靠右對齊",
      justify: "左右對齊",
    },
    color: {
      reset: "重設顏色",
    },
    fontFamilyOptions: {
      default: "預設字型",
      songti: "宋體",
      heiti: "黑體",
      yahei: "微軟雅黑",
      kaiti: "楷體",
    },
    tableOptions: {
      insert: "插入表格 (3x3)",
      addColBefore: "在前方插入欄",
      addColAfter: "在後方插入欄",
      deleteCol: "刪除欄",
      addRowBefore: "在前方插入列",
      addRowAfter: "在後方插入列",
      deleteRow: "刪除列",
      mergeCells: "合併儲存格",
      splitCell: "分割儲存格",
      deleteTable: "刪除表格",
    },
  },
  link: {
    modal: {
      title: "插入連結",
      urlPlaceholder: "請輸入連結位址 (https://...)",
      textPlaceholder: "連結文字（選填）",
      cancel: "取消",
      confirm: "確定",
    },
  },
  image: {
    modal: {
      title: "插入圖片",
      urlPlaceholder: "請輸入圖片位址 (https://...)",
      altPlaceholder: "圖片描述 (alt)",
      fileLabel: "或選擇本機檔案",
      cancel: "取消",
      confirm: "插入",
    },
  },
  placeholder: {
    default: "開始輸入內容...",
  },
  status: {
    wordCount: "{words} 字 · {chars} 字元",
  },
};

export default zhTW;
