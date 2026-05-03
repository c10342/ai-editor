import type { LocaleMessages } from "@/core/I18n";

const zhCN: LocaleMessages = {
  toolbar: {
    bold: "加粗 (Ctrl+B)",
    italic: "斜体 (Ctrl+I)",
    underline: "下划线 (Ctrl+U)",
    strike: "删除线 (Ctrl+Shift+S)",
    code: "行内代码 (Ctrl+E)",
    codeBlock: "代码块 (Ctrl+Alt+C)",
    bulletList: "无序列表",
    orderedList: "有序列表",
    taskList: "任务列表",
    blockquote: "引用",
    horizontalRule: "分割线",
    link: "插入链接 (Ctrl+K)",
    image: "插入图片",
    highlight: "高亮",
    textColor: "文字颜色",
    superscript: "上标",
    subscript: "下标",
    fontFamily: "字体",
    undo: "撤销 (Ctrl+Z)",
    redo: "重做 (Ctrl+Shift+Z)",
    table: "插入表格",
    heading: {
      title: "标题",
      paragraph: "正文",
      level: "标题 {level}",
    },
    textAlign: {
      left: "左对齐",
      center: "居中",
      right: "右对齐",
      justify: "两端对齐",
    },
    color: {
      reset: "重置颜色",
    },
    fontFamilyOptions: {
      default: "默认字体",
      songti: "宋体",
      heiti: "黑体",
      yahei: "微软雅黑",
      kaiti: "楷体",
    },
    tableOptions: {
      insert: "插入表格 (3x3)",
      addColBefore: "添加列（前）",
      addColAfter: "添加列（后）",
      deleteCol: "删除列",
      addRowBefore: "添加行（前）",
      addRowAfter: "添加行（后）",
      deleteRow: "删除行",
      mergeCells: "合并单元格",
      splitCell: "拆分单元格",
      deleteTable: "删除表格",
    },
  },
  link: {
    modal: {
      title: "插入链接",
      urlPlaceholder: "请输入链接地址 (https://...)",
      textPlaceholder: "链接文本（可选）",
      cancel: "取消",
      confirm: "确定",
    },
  },
  image: {
    modal: {
      title: "插入图片",
      urlPlaceholder: "请输入图片地址 (https://...)",
      altPlaceholder: "图片描述 (alt)",
      fileLabel: "或选择本地文件",
      cancel: "取消",
      confirm: "插入",
    },
  },
  placeholder: {
    default: "开始输入内容...",
  },
  status: {
    wordCount: "{words} 字 · {chars} 字符",
  },
};

export default zhCN;
