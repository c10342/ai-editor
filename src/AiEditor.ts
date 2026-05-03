import { EditorManager } from '@/core';
import { Toolbar, BubbleMenu } from '@/ui';
import type { EditorOptions } from '@/types';
import {
  createDocumentPlugin,
  createParagraphPlugin,
  createTextPlugin,
  createListItemPlugin,
  createTaskItemPlugin,
  createDropcursorPlugin,
  createGapcursorPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikePlugin,
  createCodePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createBulletListPlugin,
  createOrderedListPlugin,
  createTaskListPlugin,
  createBlockquotePlugin,
  createHorizontalRulePlugin,
  createLinkPlugin,
  createImagePlugin,
  createTextAlignPlugin,
  createHighlightPlugin,
  createColorPlugin,
  createTextColorPlugin,
  createSuperscriptPlugin,
  createSubscriptPlugin,
  createFontFamilyPlugin,
  createHistoryPlugin,
  createPlaceholderPlugin,
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from '@/plugins';

export class AiEditor {
  private editorManager: EditorManager;
  private toolbar: Toolbar;
  private bubbleMenu: BubbleMenu;
  private container: HTMLElement;
  private wrapper: HTMLElement;
  private statusBar: HTMLElement;
  private wordCountEl: HTMLElement;

  constructor(options: EditorOptions) {
    this.container = options.element;
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('ae');

    this.editorManager = new EditorManager({
      element: this.wrapper,
      content: options.content,
      placeholder: options.placeholder,
      autofocus: options.autofocus,
      editable: options.editable,
    });

    this.registerPlugins(options.placeholder);

    this.toolbar = new Toolbar({ editorManager: this.editorManager });
    this.bubbleMenu = new BubbleMenu({ editorManager: this.editorManager });

    this.statusBar = document.createElement('div');
    this.statusBar.classList.add('ae-status-bar');
    this.wordCountEl = document.createElement('span');
    this.statusBar.appendChild(this.wordCountEl);

    this.wrapper.insertBefore(this.toolbar.getElement(), this.wrapper.firstChild);
    this.wrapper.appendChild(this.statusBar);
    this.container.appendChild(this.wrapper);
    document.body.appendChild(this.bubbleMenu.getElement());

    this.editorManager.create(options.content);
    this.setupFocusState();
    this.setupWordCount();

    const toolbarEl = this.wrapper.querySelector('.ae-toolbar');
    const editorEl = this.wrapper.querySelector('.ae-editor__content');
    if (toolbarEl && editorEl) {
      this.wrapper.insertBefore(toolbarEl, editorEl);
    }
  }

  private registerPlugins(placeholder?: string): void {
    const extManager = this.editorManager.getExtensionManager();

    extManager.register(createDocumentPlugin());
    extManager.register(createParagraphPlugin());
    extManager.register(createTextPlugin());
    extManager.register(createListItemPlugin());
    extManager.register(createTaskItemPlugin());
    extManager.register(createDropcursorPlugin());
    extManager.register(createGapcursorPlugin());
    extManager.register(createBoldPlugin());
    extManager.register(createItalicPlugin());
    extManager.register(createUnderlinePlugin());
    extManager.register(createStrikePlugin());
    extManager.register(createCodePlugin());
    extManager.register(createCodeBlockPlugin());
    extManager.register(createHeadingPlugin());
    extManager.register(createBulletListPlugin());
    extManager.register(createOrderedListPlugin());
    extManager.register(createTaskListPlugin());
    extManager.register(createBlockquotePlugin());
    extManager.register(createHorizontalRulePlugin());
    extManager.register(createLinkPlugin());
    extManager.register(createImagePlugin());
    extManager.register(createTextAlignPlugin());
    extManager.register(createHighlightPlugin());
    extManager.register(createColorPlugin());
    extManager.register(createTextColorPlugin());
    extManager.register(createSuperscriptPlugin());
    extManager.register(createSubscriptPlugin());
    extManager.register(createFontFamilyPlugin());
    extManager.register(createHistoryPlugin());
    extManager.register(createPlaceholderPlugin(placeholder));

    extManager.register({
      name: 'table',
      extension: Table.configure({ resizable: true }),
    });
    extManager.register({ name: 'tableRow', extension: TableRow });
    extManager.register({ name: 'tableCell', extension: TableCell });
    extManager.register({ name: 'tableHeader', extension: TableHeader });
  }

  private setupFocusState(): void {
    this.editorManager.on('focus', () => {
      this.wrapper.classList.add('ae--focused');
    });

    this.editorManager.on('blur', () => {
      this.wrapper.classList.remove('ae--focused');
    });
  }

  private setupWordCount(): void {
    const update = () => {
      const text = this.editorManager.getText();
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      this.wordCountEl.textContent = `${words} 字 · ${chars} 字符`;
    };

    this.editorManager.on('update', update);
    update();
  }

  getHTML(): string {
    return this.editorManager.getHTML();
  }

  setHTML(html: string): void {
    this.editorManager.setHTML(html);
  }

  getJSON(): Record<string, any> {
    return this.editorManager.getJSON();
  }

  setJSON(json: Record<string, any>): void {
    this.editorManager.setJSON(json);
  }

  focus(): void {
    this.editorManager.focus();
  }

  destroy(): void {
    this.bubbleMenu.destroy();
    this.toolbar.destroy();
    this.editorManager.destroy();
    this.wrapper.remove();
  }
}
