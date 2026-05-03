import { Editor, type Content } from '@tiptap/core';
import { EventEmitter } from './EventEmitter';
import { ExtensionManager } from './ExtensionManager';
import { I18n } from './I18n';
import type { EditorOptions, EditorEventType, EditorEventCallback, Locale } from '@/types';

export class EditorManager {
  private editor: Editor | null = null;
  private emitter: EventEmitter;
  private extensionManager: ExtensionManager;
  private i18n: I18n;
  private containerEl: HTMLElement;
  private editorEl: HTMLElement;
  private options: EditorOptions;

  constructor(options: EditorOptions) {
    this.options = options;
    this.emitter = new EventEmitter();
    this.extensionManager = new ExtensionManager();
    this.i18n = new I18n(options.lang || 'zh-CN');
    if (options.messages) {
      for (const [locale, msgs] of Object.entries(options.messages)) {
        this.i18n.addMessages(locale as Locale, msgs);
      }
    }
    this.containerEl = options.element;
    this.editorEl = document.createElement('div');
    this.editorEl.classList.add('ae-editor__content');
  }

  getExtensionManager(): ExtensionManager {
    return this.extensionManager;
  }

  getEditor(): Editor | null {
    return this.editor;
  }

  getI18n(): I18n {
    return this.i18n;
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }

  getContainerElement(): HTMLElement {
    return this.containerEl;
  }

  getEditorElement(): HTMLElement {
    return this.editorEl;
  }

  on<T extends EditorEventType>(event: T, callback: EditorEventCallback<T>): () => void {
    return this.emitter.on(event, callback);
  }

  create(content?: Content): void {
    const extensions = this.extensionManager.getExtensions();

    this.containerEl.appendChild(this.editorEl);

    this.editor = new Editor({
      element: this.editorEl,
      extensions,
      content: content || this.options.content || '',
      editable: this.options.editable !== false,
      autofocus: this.options.autofocus ?? false,
      onUpdate: (props) => {
        this.emitter.emit('update', props);
      },
      onSelectionUpdate: (props) => {
        this.emitter.emit('selection-update', props);
      },
      onFocus: (props) => {
        this.emitter.emit('focus', props);
      },
      onBlur: (props) => {
        this.emitter.emit('blur', props);
      },
      onCreate: (props) => {
        this.extensionManager.initAll();
        this.emitter.emit('create', props);
      },
      onDestroy: (props) => {
        this.emitter.emit('destroy', props);
      },
    });
  }

  destroy(): void {
    this.extensionManager.destroyAll();
    this.editor?.destroy();
    this.editor = null;
    this.emitter.removeAllListeners();
  }

  getHTML(): string {
    return this.editor?.getHTML() || '';
  }

  setHTML(html: string): void {
    this.editor?.commands.setContent(html);
  }

  getText(): string {
    return this.editor?.getText() || '';
  }

  getJSON(): Record<string, any> {
    return this.editor?.getJSON() || {};
  }

  setJSON(json: Record<string, any>): void {
    this.editor?.commands.setContent(json);
  }

  isEmpty(): boolean {
    return this.editor?.isEmpty ?? true;
  }

  focus(): void {
    this.editor?.commands.focus();
  }

  blur(): void {
    this.editor?.commands.blur();
  }
}
