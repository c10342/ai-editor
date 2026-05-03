# AiEditor 开发指南

本文档面向参与 AiEditor 开发的贡献者，涵盖项目架构、设计思想、开发规范和插件开发指引。

## 目录

- [设计思想](#设计思想)
- [项目架构](#项目架构)
- [模块职责](#模块职责)
- [核心流程](#核心流程)
- [开发环境](#开发环境)
- [代码规范](#代码规范)
- [插件开发指引](#插件开发指引)
- [国际化开发](#国际化开发)
- [样式开发](#样式开发)
- [构建与发布](#构建与发布)

---

## 设计思想

### 插件化架构

编辑器的所有功能（加粗、标题、表格、图片等）均以插件形式存在。核心只负责插件注册、生命周期管理和工具栏渲染调度，不包含任何具体的编辑功能逻辑。

**设计原则**：

- **开闭原则**：通过注册新插件扩展功能，无需修改核心代码
- **单一职责**：每个插件独立管理自己的 Tiptap 扩展和 UI 渲染
- **依赖倒置**：插件依赖 `EditorManager` 抽象接口，不直接依赖 Tiptap Editor 实例

### 三级插件优先级

```
内置默认插件 → 全局插件（AiEditor.use） → 局部插件（构造函数 plugins）
```

后注册的同名插件覆盖先注册的，使用者可以灵活替换任何内置功能。

### 实例隔离

`I18n` 等有状态模块跟随编辑器实例创建，多个实例之间完全隔离，互不影响。

---

## 项目架构

```
src/
├── core/                   # 核心层
│   ├── EditorManager.ts    # 编辑器管理器，封装 Tiptap Editor
│   ├── ExtensionManager.ts # 扩展管理器，管理插件注册
│   ├── EventEmitter.ts     # 类型安全的事件系统
│   ├── I18n.ts             # 国际化实例类
│   ├── PluginRegistry.ts   # 全局插件注册中心
│   └── index.ts            # 统一导出
├── plugins/                # 插件层
│   ├── index.ts            # 插件统一导出 + defaultPlugins 列表
│   ├── BasePlugins.ts      # 基础插件（document、paragraph、text 等）
│   ├── BoldPlugin.ts       # 加粗插件
│   ├── HeadingPlugin.ts    # 标题插件
│   ├── MarkdownPlugin.ts   # Markdown 插件
│   ├── TablePlugin.ts      # 表格插件
│   └── ...                 # 其他功能插件
├── ui/                     # UI 层
│   ├── Toolbar.ts          # 工具栏，根据插件动态渲染
│   ├── BubbleMenu.ts       # 浮动菜单
│   └── index.ts
├── icons/                  # 图标系统
│   └── index.ts            # SVG 图标注册与获取
├── i18n/                   # 国际化语言包
│   ├── zh-CN.ts            # 简体中文
│   ├── en.ts               # 英文
│   ├── zh-TW.ts            # 繁体中文
│   └── index.ts            # 导出
├── types/                  # 类型定义
│   └── index.ts            # 所有 TypeScript 类型
├── styles/                 # 样式
│   ├── _variables.scss     # SCSS 变量（仅 $prefix）
│   ├── _mixins.scss        # SCSS 混入
│   ├── index.scss          # 入口 + CSS 自定义属性
│   ├── editor.scss         # 编辑器外壳
│   ├── toolbar.scss        # 工具栏
│   ├── content.scss        # 编辑内容区
│   ├── bubble-menu.scss    # 浮动菜单
│   └── modal.scss          # 弹窗
├── utils/                  # 工具函数
│   ├── dom.ts              # DOM 操作工具
│   └── index.ts
├── AiEditor.ts             # 主入口类
├── index.ts                # 库导出入口
└── main.ts                 # 开发调试入口
```

---

## 模块职责

### core/ — 核心层

| 模块               | 职责                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `EditorManager`    | 封装 Tiptap `Editor`，管理编辑器生命周期，转发 Tiptap 事件为自定义事件，持有 `I18n` 和 `ExtensionManager` 实例 |
| `ExtensionManager` | 管理插件注册/注销，收集所有插件的 Tiptap 扩展供 Editor 初始化使用                                              |
| `EventEmitter`     | 泛型事件系统，提供类型安全的 `on/off/emit`，用于编辑器事件的订阅和发布                                         |
| `I18n`             | 国际化实例类，跟随 `EditorManager` 创建，内置三套语言包，支持运行时添加自定义翻译                              |
| `PluginRegistry`   | 全局插件注册中心（静态类），通过 `AiEditor.use()` 添加影响所有实例的插件                                       |

### plugins/ — 插件层

每个插件文件导出一个工厂函数（如 `createBoldPlugin`），返回 `EditorPlugin` 对象。`index.ts` 汇总所有插件并导出 `defaultPlugins` 列表。

### ui/ — UI 层

`Toolbar` 和 `BubbleMenu` 不包含任何功能逻辑，只负责遍历插件列表调用 `renderToolbar` 并将返回的 DOM 元素插入容器。

### icons/ — 图标系统

基于 `Record<string, string>` 的 SVG 图标注册表，提供 `getIcon`（返回 SVG 字符串）、`getIconElement`（返回 DOM 元素）、`setIcon`（自定义图标）三个 API。

---

## 核心流程

### 初始化流程

```
new AiEditor(options)
  │
  ├─ new EditorManager(options)       # 创建编辑器管理器
  │    ├─ new I18n(lang)              # 创建国际化实例
  │    └─ new ExtensionManager()      # 创建扩展管理器
  │
  ├─ resolvePlugins()                 # 合并插件（默认 → 全局 → 局部）
  │    └─ Map<name, plugin> 去重
  │
  ├─ registerPlugins()                # 将插件注册到 ExtensionManager
  │    └─ 收集所有 extensions
  │
  ├─ new Toolbar({ plugins })         # 创建工具栏
  │    └─ 遍历 plugins 调用 renderToolbar()
  │
  ├─ editorManager.create(content)    # 创建 Tiptap Editor
  │    └─ new Editor({ extensions })  # 用收集的扩展初始化
  │
  └─ setupFocusState / setupWordCount # 绑定事件
```

### 插件解析优先级

```typescript
resolvePlugins(localPlugins, placeholder, pluginOptions):
  1. defaultPlugins.map(factory => factory())    // 内置插件
  2. PluginRegistry.getGlobalPlugins()            // 全局插件
  3. localPlugins                                // 局部插件
  → Map<name, plugin> 后者覆盖前者
```

---

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:5173）
npm run dev

# 构建生产版本
npm run build

# 仅类型检查
npx tsc --noEmit
```

开发时编辑 `src/main.ts` 和 `index.html` 作为调试入口，构建产物在 `dist/` 目录。

---

## 代码规范

### 文件命名

- 插件文件：`PascalCasePlugin.ts`（如 `BoldPlugin.ts`、`TablePlugin.ts`）
- 样式文件：`kebab-case.scss`（如 `toolbar.scss`、`bubble-menu.scss`）
- 核心模块：`PascalCase.ts`（如 `EditorManager.ts`、`EventEmitter.ts`）

### CSS 类名

使用 `ae-` 前缀 + BEM 命名：

```
ae                     # 编辑器根容器
ae-toolbar             # 工具栏
ae-toolbar__btn        # 工具栏按钮
ae-toolbar__btn--dropdown  # 下拉按钮修饰
ae-toolbar__divider    # 分隔线
ae-toolbar__group      # 按钮组
ae-toolbar__dropdown   # 下拉菜单容器
ae-toolbar__dropdown-menu    # 下拉菜单面板
ae-toolbar__dropdown-item    # 下拉菜单项
ae-toolbar__color-picker     # 颜色选择器
ae-toolbar__color-swatch     # 颜色色块
ae-editor__content     # 编辑内容区
ae-status-bar          # 状态栏
ae-bubble-menu         # 浮动菜单
ae-link-modal          # 弹窗
```

状态类（无前缀）：

```
is-active              # 按钮激活态
is-open                # 菜单展开态
is-visible             # 浮动菜单可见
ae--focused            # 编辑器聚焦态
```

### TypeScript

- 所有公共 API 必须有类型导出
- 插件工厂函数参数使用具名 `Options` 接口（如 `HeadingPluginOptions`）
- Tiptap 扩展类型使用 `any` 逃逸（因 Tiptap 的 `Node`/`Mark` 与 `Extension` 类型不兼容）

### 注释

- 不添加代码注释，保持代码自解释
- 复杂逻辑通过变量命名和函数拆分表达意图

---

## 插件开发指引

### EditorPlugin 接口

```typescript
interface EditorPlugin {
  name: string; // 唯一标识
  extensions?: TiptapExtension[]; // Tiptap 扩展列表
  renderToolbar?: (editorManager: any) => HTMLElement | HTMLElement[]; // 工具栏渲染
  onInit?: (editorManager: any) => void; // 初始化回调
  onDestroy?: () => void; // 销毁回调
}
```

### 最小化插件

只需 `name` 和 `extensions`，注册 Tiptap 扩展但不渲染工具栏：

```typescript
// src/plugins/MyMarkPlugin.ts
import MyMark from "tiptap-extension-my-mark";
import type { EditorPlugin } from "@/types";

export function createMyMarkPlugin(): EditorPlugin {
  return {
    name: "myMark",
    extensions: [MyMark],
  };
}
```

### 带工具栏的插件

实现 `renderToolbar` 方法，返回一个或多个 DOM 元素：

```typescript
// src/plugins/RedTextPlugin.ts
import { getIconElement } from "@/icons";
import type { EditorPlugin } from "@/types";

export function createRedTextPlugin(): EditorPlugin {
  return {
    name: "redText",
    extensions: [RedTextExtension],
    renderToolbar(editorManager) {
      const btn = document.createElement("button");
      btn.classList.add("ae-toolbar__btn");
      btn.title = editorManager.t("toolbar.redText");
      btn.appendChild(getIconElement("text-color"));

      const updateState = () => {
        const editor = editorManager.getEditor();
        if (editor) btn.classList.toggle("is-active", editor.isActive("redText"));
      };

      btn.addEventListener("click", () => {
        const editor = editorManager.getEditor();
        if (editor) {
          editor.chain().focus().toggleRedText().run();
          updateState();
        }
      });

      editorManager.on("selection-update", updateState);
      editorManager.on("update", updateState);
      return btn;
    },
  };
}
```

### 带参数的插件

工厂函数接收 `options` 参数，结合 `pluginOptions` 使用：

```typescript
// src/plugins/RedTextPlugin.ts
export interface RedTextPluginOptions {
  color?: string;
}

export function createRedTextPlugin(options?: RedTextPluginOptions): EditorPlugin {
  const color = options?.color || "#ff0000";
  return {
    name: "redText",
    extensions: [RedTextExtension.configure({ color })],
    // ...
  };
}
```

使用者传入参数：

```typescript
new AiEditor({
  element: el,
  pluginOptions: {
    redText: { color: "#e74c3c" },
  },
});
```

### 多扩展插件

一个插件可以注册多个 Tiptap 扩展：

```typescript
export function createTablePlugin(): EditorPlugin {
  return {
    name: "table",
    extensions: [Table.configure({ resizable: true }), TableRow, TableCell, TableHeader],
    renderToolbar(editorManager) {
      /* ... */
    },
  };
}
```

### 注册插件到系统

1. 创建插件文件 `src/plugins/XxxPlugin.ts`
2. 在 `src/plugins/index.ts` 中导入并导出
3. 将工厂函数加入 `defaultPlugins` 数组
4. 如有翻译文本，在三套语言包中添加对应 key

### editorManager API

在 `renderToolbar` 回调中可用的 `editorManager` 方法：

| 方法                    | 返回值             | 说明                    |
| ----------------------- | ------------------ | ----------------------- |
| `getEditor()`           | `Editor \| null`   | 获取 Tiptap Editor 实例 |
| `getExtensionManager()` | `ExtensionManager` | 获取扩展管理器          |
| `getI18n()`             | `I18n`             | 获取国际化实例          |
| `t(key, params?)`       | `string`           | 翻译快捷方法            |
| `on(event, callback)`   | `() => void`       | 监听事件，返回取消函数  |
| `getMarkdown()`         | `string`           | 获取当前内容的 Markdown |
| `setMarkdown(md)`       | `void`             | 设置 Markdown 内容      |

可用事件：

| 事件               | 触发时机       |
| ------------------ | -------------- |
| `update`           | 内容变化       |
| `selection-update` | 选区变化       |
| `focus`            | 编辑器聚焦     |
| `blur`             | 编辑器失焦     |
| `create`           | 编辑器创建完成 |
| `destroy`          | 编辑器销毁     |

---

## 国际化开发

### 语言包结构

语言包使用嵌套对象结构，通过点路径（如 `toolbar.heading.title`）访问。每个语言文件导出一个 `LocaleMessages` 对象：

```typescript
// src/i18n/zh-CN.ts
const zhCN: LocaleMessages = {
  toolbar: {
    bold: "加粗 (Ctrl+B)",
    heading: {
      title: "标题", // t('toolbar.heading.title')
      paragraph: "正文", // t('toolbar.heading.paragraph')
      level: "标题 {level}", // t('toolbar.heading.level', { level: 2 })
    },
    tableOptions: {
      insert: "插入表格 (3x3)",
      deleteCol: "删除列",
    },
  },
  link: {
    modal: {
      title: "插入链接", // t('link.modal.title')
      cancel: "取消",
    },
  },
  status: {
    wordCount: "{words} 字 · {chars} 字符",
  },
};
```

### 点路径解析规则

`editorManager.t('a.b.c')` 会依次查找 `messages.a.b.c`，如果中间路径不存在或最终值不是字符串则回退到 `zh-CN`，仍找不到则返回 key 本身。

### 添加新的翻译 key

1. 在三个语言包中**同时添加**（`src/i18n/zh-CN.ts`、`en.ts`、`zh-TW.ts`）
2. 按功能模块组织嵌套层级：`toolbar`、`link.modal`、`image.modal`、`status`、`placeholder`
3. 如果 key 与已有嵌套对象冲突（如 `toolbar.heading` 既是按钮 title 又是一组子项），将 title 放在子对象的 `title` 字段中（如 `toolbar.heading.title`）
4. 支持插值参数：`'{words} 字 · {chars} 字符'` → `editorManager.t('status.wordCount', { words, chars })`

### 命名规范

| 层级 | 示例                                                 | 说明             |
| ---- | ---------------------------------------------------- | ---------------- |
| 一级 | `toolbar`、`link`、`image`、`status`、`placeholder`  | 功能模块         |
| 二级 | `toolbar.heading`、`link.modal`、`toolbar.textAlign` | 子功能或 UI 组件 |
| 三级 | `toolbar.heading.title`、`link.modal.cancel`         | 具体文本         |

对于同一功能下既有按钮 title 又有子项的场景，使用不同的二级 key 区分：

```
toolbar.heading.title         → 按钮提示 "标题"
toolbar.heading.paragraph     → 下拉项 "正文"
toolbar.heading.level         → 下拉项 "标题 {level}"

toolbar.table                 → 按钮提示 "插入表格"
toolbar.tableOptions.insert   → 下拉项 "插入表格 (3x3)"
toolbar.tableOptions.deleteCol → 下拉项 "删除列"
```

### 翻译规范

- 所有面向用户的文本必须通过 `editorManager.t()` 获取
- 工具栏按钮 `title`、下拉菜单文本、弹窗标题/按钮/占位符、状态栏文本
- 技术性文本（如 CSS 类名、DOM 属性）不翻译
- 英文字体名（Arial、Georgia 等）不需要翻译

---

## 样式开发

### CSS 自定义属性

主题相关样式使用 `--ae-` 前缀的 CSS 自定义属性定义在 `:root` 中，所有样式文件通过 `var(--ae-xxx)` 引用，实现运行时主题切换。

### SCSS 使用

- `_variables.scss` 仅包含 `$prefix: 'ae'`
- `_mixins.scss` 提供常用布局混入（`flex-center`、`flex-between`、`scrollbar`、`no-select`）
- 各样式文件通过 `@import` 引入 variables 和 mixins
- 组件样式使用 `ae-` 前缀 BEM 命名

### 新增样式文件

1. 在 `src/styles/` 下创建 `.scss` 文件
2. 在 `src/styles/index.scss` 中 `@import` 引入
3. 使用 CSS 自定义属性而非 SCSS 变量

---

## 构建与发布

### 构建命令

```bash
npm run build
# 等同于: vite build && tsc -p tsconfig.build.json
```

### 产物结构

```
dist/
├── ai-editor.mjs       # ESM 格式
├── ai-editor.cjs       # CommonJS 格式
├── ai-editor.css       # 样式文件
├── index.d.ts          # 类型声明（由 tsc 生成）
└── ...
```

### 关键配置

- **Vite library mode**：入口 `src/index.ts`，外部化 tiptap 依赖
- **tsconfig.build.json**：单独的 TS 配置用于生成 `.d.ts` 声明文件
- **peerDependencies**：tiptap 相关包作为对等依赖，不打包进产物

### 发布前检查

1. `npm run build` 通过（Vite + tsc 无报错）
2. `npm run dev` 启动后编辑器功能正常
3. 新增的公共 API 已在 `src/index.ts` 中导出
