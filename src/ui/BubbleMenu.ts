import type { EditorManager } from '@/core';
import {
  renderBoldButton,
  renderItalicButton,
  renderUnderlineButton,
  renderStrikeButton,
  renderCodeButton,
  renderLinkButton,
} from '@/plugins';

export interface BubbleMenuOptions {
  editorManager: EditorManager;
}

export class BubbleMenu {
  private editorManager: EditorManager;
  private el: HTMLElement;
  private isVisible: boolean = false;

  constructor(options: BubbleMenuOptions) {
    this.editorManager = options.editorManager;
    this.el = document.createElement('div');
    this.el.classList.add('ae-bubble-menu');
    this.render();
    this.setupEvents();
  }

  private render(): void {
    const em = this.editorManager;
    this.el.appendChild(renderBoldButton(this.el, em));
    this.el.appendChild(renderItalicButton(this.el, em));
    this.el.appendChild(renderUnderlineButton(this.el, em));
    this.el.appendChild(renderStrikeButton(this.el, em));
    this.el.appendChild(renderCodeButton(this.el, em));
    this.el.appendChild(renderLinkButton(this.el, em));
  }

  private setupEvents(): void {
    this.editorManager.on('selection-update', () => {
      this.updateVisibility();
    });

    this.editorManager.on('blur', () => {
      this.hide();
    });

    this.editorManager.on('focus', () => {
      this.updateVisibility();
    });
  }

  private updateVisibility(): void {
    const editor = this.editorManager.getEditor();
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');

    if (text.length > 0) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    if (this.isVisible) return;
    this.isVisible = true;
    this.el.classList.add('is-visible');

    const editor = this.editorManager.getEditor();
    if (!editor) return;

    const { from } = editor.state.selection;
    const coords = editor.view.coordsAtPos(from);

    this.el.style.top = `${coords.bottom + 8}px`;
    this.el.style.left = `${coords.left}px`;
  }

  private hide(): void {
    this.isVisible = false;
    this.el.classList.remove('is-visible');
  }

  getElement(): HTMLElement {
    return this.el;
  }

  destroy(): void {
    this.el.remove();
  }
}
