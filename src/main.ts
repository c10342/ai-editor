import { AiEditor } from ".";

const appEl = document.getElementById('app');
if (appEl) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('ae-app');

  const title = document.createElement('h1');
  title.classList.add('ae-app-title');
  title.textContent = 'AI 富文本编辑器';
  wrapper.appendChild(title);

  const editorContainer = document.createElement('div');
  editorContainer.id = 'editor';
  wrapper.appendChild(editorContainer);

  appEl.appendChild(wrapper);

  const editor = new AiEditor({
    element: editorContainer,
    placeholder: '开始输入内容，体验丰富的编辑功能...',
    autofocus: true,
    content: '<h2>欢迎使用 AI 富文本编辑器</h2><p>这是一个基于 <strong>@tiptap/core</strong> 构建的富文本编辑器，支持以下功能：</p><ul><li><strong>加粗</strong>、<em>斜体</em>、<u>下划线</u>、<s>删除线</s></li><li>多种标题级别（H1-H4）</li><li>有序列表和无序列表</li><li>任务列表</li><li>代码块和行内代码</li><li>引用块</li><li>文字颜色和高亮</li><li>文字对齐（左、中、右、两端）</li><li>链接和图片插入</li><li>表格操作</li><li>上标和下标</li><li>字体选择</li><li>撤销和重做</li></ul><blockquote><p>这是一个引用块的示例，你可以用来突出显示重要内容。</p></blockquote><p>试试选中文字，会出现浮动工具栏 🎉</p>',
  });

  (window as any).__editor__ = editor;
}
