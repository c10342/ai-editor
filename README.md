# AiEditor

基于 [Tiptap](https://tiptap.dev/) 的富文本编辑器，采用 TypeScript + Vite 构建，组件化、模块化、插件化架构，支持国际化。

## 安装

```bash
npm install ai-editor
```

## 快速开始

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/ai-editor/dist/ai-editor.css" />
  </head>
  <body>
    <div id="editor"></div>
    <script type="module">
      import { AiEditor } from "ai-editor";

      const editor = new AiEditor({
        element: document.getElementById("editor"),
        content: "<p>Hello World</p>",
      });
    </script>
  </body>
</html>
```

## 框架集成

### Vue 3

```vue
<template>
  <div ref="editorRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { AiEditor } from "ai-editor";
import "ai-editor/style.css";

const editorRef = ref<HTMLElement>();
let editor: AiEditor | null = null;

onMounted(() => {
  editor = new AiEditor({
    element: editorRef.value!,
    content: "<p>Hello Vue 3</p>",
    lang: "zh-CN",
    placeholder: "请输入内容...",
  });
});

onBeforeUnmount(() => {
  editor?.destroy();
  editor = null;
});

defineExpose({
  getHTML: () => editor?.getHTML(),
  setHTML: (html: string) => editor?.setHTML(html),
  getJSON: () => editor?.getJSON(),
});
</script>
```

#### 双向数据绑定

通过 `v-model` 实现编辑器内容与父组件的双向同步：

```vue
<!-- Editor.vue -->
<template>
  <div ref="editorRef"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { AiEditor } from "ai-editor";
import "ai-editor/style.css";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const editorRef = ref<HTMLElement>();
let editor: AiEditor | null = null;
let isInternalUpdate = false;

onMounted(() => {
  editor = new AiEditor({
    element: editorRef.value!,
    content: props.modelValue,
  });

  editor.editorManager.on("update", () => {
    isInternalUpdate = true;
    emit("update:modelValue", editor!.getHTML());
    isInternalUpdate = false;
  });
});

watch(
  () => props.modelValue,
  (val) => {
    if (!isInternalUpdate && editor && val !== editor.getHTML()) {
      editor.setHTML(val);
    }
  },
);

onBeforeUnmount(() => {
  editor?.destroy();
  editor = null;
});
</script>
```

父组件使用：

```vue
<template>
  <Editor v-model="content" />
  <pre>{{ content }}</pre>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "./Editor.vue";

const content = ref("<p>初始内容</p>");
</script>
```

### React

```tsx
import { useRef, useEffect } from "react";
import { AiEditor } from "ai-editor";
import "ai-editor/style.css";

interface EditorProps {
  content?: string;
  lang?: "zh-CN" | "en" | "zh-TW";
  onChange?: (html: string) => void;
}

export default function Editor({ content, lang, onChange }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<AiEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const editor = new AiEditor({
      element: containerRef.current,
      content: content || "",
      lang: lang || "zh-CN",
    });
    editorRef.current = editor;

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}
```

## 配置项

### EditorOptions

| 参数            | 类型                                     | 默认值    | 说明                               |
| --------------- | ---------------------------------------- | --------- | ---------------------------------- |
| `element`       | `HTMLElement`                            | -         | **必填**，编辑器挂载的 DOM 容器    |
| `content`       | `string`                                 | `''`      | 初始内容（HTML 或 Markdown）       |
| `contentType`   | `'html' \| 'markdown'`                   | `'html'`  | 初始内容的格式                     |
| `placeholder`   | `string`                                 | -         | 占位提示文本                       |
| `autofocus`     | `boolean`                                | `false`   | 是否自动聚焦                       |
| `editable`      | `boolean`                                | `true`    | 是否可编辑                         |
| `lang`          | `'zh-CN' \| 'en' \| 'zh-TW'`             | `'zh-CN'` | 界面语言                           |
| `toolbar`       | `string[] \| false`                      | 全部展示  | 工具栏按钮配置，`false` 隐藏工具栏 |
| `plugins`       | `EditorPlugin[]`                         | 内置插件  | 局部注册的自定义插件               |
| `pluginOptions` | `Record<string, any>`                    | -         | 传递给插件工厂函数的参数           |
| `messages`      | `Record<Locale, Record<string, string>>` | -         | 自定义语言包，覆盖默认翻译         |

## 工具栏配置

### 按需展示

通过 `toolbar` 指定要展示的插件名称列表：

```typescript
new AiEditor({
  element: el,
  toolbar: ["bold", "italic", "underline", "heading", "link", "image"],
});
```

### 隐藏工具栏

```typescript
new AiEditor({
  element: el,
  toolbar: false,
});
```

### 内置插件名称列表

| 名称             | 说明      |
| ---------------- | --------- |
| `bold`           | 加粗      |
| `italic`         | 斜体      |
| `underline`      | 下划线    |
| `strike`         | 删除线    |
| `code`           | 行内代码  |
| `codeBlock`      | 代码块    |
| `heading`        | 标题      |
| `bulletList`     | 无序列表  |
| `orderedList`    | 有序列表  |
| `taskList`       | 任务列表  |
| `blockquote`     | 引用      |
| `horizontalRule` | 分割线    |
| `link`           | 链接      |
| `image`          | 图片      |
| `textAlign`      | 对齐方式  |
| `highlight`      | 高亮      |
| `textColor`      | 文字颜色  |
| `superscript`    | 上标      |
| `subscript`      | 下标      |
| `fontFamily`     | 字体      |
| `history`        | 撤销/重做 |
| `table`          | 表格      |
| `markdown`       | Markdown  |

## Markdown 支持

编辑器内置 Markdown 支持，可以直接使用 Markdown 格式作为初始内容，也可以随时获取和设置 Markdown 内容。

### 初始内容为 Markdown

```typescript
new AiEditor({
  element: el,
  content: "# Hello\n\nThis is **markdown** content",
  contentType: "markdown",
});
```

### 获取和设置 Markdown

```typescript
const editor = new AiEditor({ element: el });

// 获取当前内容的 Markdown 表示
const md = editor.getMarkdown();

// 用 Markdown 设置编辑器内容
editor.setMarkdown("# New Title\n\nSome **bold** text");
```

### 粘贴和复制

开启 Markdown 插件后，粘贴 Markdown 文本会自动解析为富文本，复制编辑器内容时会输出 Markdown 格式。

### 自定义 Markdown 配置

通过 `pluginOptions` 调整 Markdown 插件行为：

```typescript
new AiEditor({
  element: el,
  pluginOptions: {
    markdown: {
      html: false, // 禁止内嵌 HTML
      tightLists: false, // 禁用紧凑列表
      breaks: true, // 换行符转为 <br>
      linkify: false, // 禁用自动链接识别
      transformPastedText: false, // 粘贴时不转换 Markdown
      transformCopiedText: false, // 复制时不输出 Markdown
    },
  },
});
```

## 国际化

支持简体中文（`zh-CN`）、英文（`en`）、繁体中文（`zh-TW`）三种语言。

### 切换语言

```typescript
new AiEditor({
  element: el,
  lang: "en",
});
```

### 自定义翻译

通过 `messages` 覆盖默认翻译：

```typescript
new AiEditor({
  element: el,
  lang: "en",
  messages: {
    en: {
      "toolbar.bold": "Make Bold",
      "placeholder.default": "Type something...",
    },
    "zh-CN": {
      "status.wordCount": "{words} 字 | {chars} 字符",
    },
  },
});
```

## 插件系统

### 插件优先级

```
内置默认插件 → 全局插件 → 局部插件（后注册覆盖先注册）
```

### EditorPlugin 接口

```typescript
interface EditorPlugin {
  name: string;
  extensions?: TiptapExtension[];
  renderToolbar?: (editorManager: any) => HTMLElement | HTMLElement[];
  onInit?: (editorManager: any) => void;
  onDestroy?: () => void;
}
```

### 全局注册

影响所有编辑器实例：

```typescript
import { AiEditor, type EditorPlugin } from "ai-editor";

AiEditor.use({
  name: "my-plugin",
  extensions: [MyExtension],
  renderToolbar(editorManager) {
    const btn = document.createElement("button");
    btn.textContent = "自定义";
    btn.addEventListener("click", () => {
      /* ... */
    });
    return btn;
  },
});

const editor = new AiEditor({ element: el });
```

### 局部注册

只影响当前实例：

```typescript
new AiEditor({
  element: el,
  plugins: [
    {
      name: "my-plugin",
      extensions: [MyExtension],
      renderToolbar(editorManager) {
        const btn = document.createElement("button");
        btn.textContent = "自定义";
        return btn;
      },
    },
  ],
});
```

### 插件参数传递

通过 `pluginOptions` 向插件工厂函数传参：

```typescript
new AiEditor({
  element: el,
  pluginOptions: {
    heading: { levels: [1, 2, 3] },
    placeholder: { placeholder: "请输入正文..." },
  },
});
```

## API

### 编辑器方法

```typescript
const editor = new AiEditor({ element: el });

editor.getHTML(): string;
editor.setHTML(html: string): void;
editor.getJSON(): Record<string, any>;
editor.setJSON(json: Record<string, any>): void;
editor.getMarkdown(): string;
editor.setMarkdown(markdown: string): void;
editor.focus(): void;
editor.destroy(): void;
```

### 主题定制

编辑器使用 CSS 自定义属性，可通过修改 `:root` 变量实现主题切换：

```css
:root {
  --ae-primary: #3b82f6;
  --ae-bg: #ffffff;
  --ae-text: #1f2937;
  --ae-border: #e5e7eb;
  --ae-toolbar-bg: #f9fafb;
  --ae-btn-hover-bg: #f3f4f6;
  --ae-btn-active-bg: #e0e7ff;
  --ae-btn-active-color: #3b82f6;
}
```

完整变量列表参见 `dist/ai-editor.css` 中的 `:root` 定义。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 类型检查
npx tsc --noEmit
```

## 依赖

- [@tiptap/core](https://tiptap.dev/) — 编辑器核心
- 30+ tiptap 扩展（bold、italic、heading、table 等）
- [tiptap-markdown](https://github.com/aguingand/tiptap-markdown) — Markdown 解析与序列化

## License

MIT
