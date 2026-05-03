import type { EditorManager } from '@/core';
import type { EditorPlugin } from '@/types';

export interface ToolbarOptions {
  editorManager: EditorManager;
  plugins: EditorPlugin[];
}

export class Toolbar {
  private editorManager: EditorManager;
  private plugins: EditorPlugin[];
  private el: HTMLElement;

  constructor(options: ToolbarOptions) {
    this.editorManager = options.editorManager;
    this.plugins = options.plugins;
    this.el = document.createElement('div');
    this.el.classList.add('ae-toolbar');
    this.render();
  }

  private render(): void {
    const em = this.editorManager;

    for (const plugin of this.plugins) {
      if (plugin.renderToolbar) {
        try {
          const elements = plugin.renderToolbar(em);
          if (Array.isArray(elements)) {
            elements.forEach((el) => this.el.appendChild(el));
          } else {
            this.el.appendChild(elements);
          }
          this.appendDivider();
        } catch (e) {
          console.warn(`Plugin "${plugin.name}" renderToolbar failed:`, e);
        }
      }
    }

    if (this.el.lastElementChild?.classList.contains('ae-toolbar__divider')) {
      this.el.lastElementChild.remove();
    }
  }

  private appendDivider(): void {
    const d = document.createElement('div');
    d.classList.add('ae-toolbar__divider');
    this.el.appendChild(d);
  }

  getElement(): HTMLElement {
    return this.el;
  }

  destroy(): void {
    this.el.remove();
  }
}
