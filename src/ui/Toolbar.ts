import type { EditorManager } from '@/core';
import {
  renderBoldButton,
  renderItalicButton,
  renderUnderlineButton,
  renderStrikeButton,
  renderCodeButton,
  renderCodeBlockButton,
  renderHeadingDropdown,
  renderBulletListButton,
  renderOrderedListButton,
  renderTaskListButton,
  renderBlockquoteButton,
  renderHorizontalRuleButton,
  renderLinkButton,
  renderImageButton,
  renderTextAlignButtons,
  renderHighlightButton,
  renderTextColorButton,
  renderSuperscriptButton,
  renderSubscriptButton,
  renderTableButton,
  renderFontFamilyDropdown,
  renderUndoButton,
  renderRedoButton,
} from '@/plugins';

export interface ToolbarOptions {
  editorManager: EditorManager;
}

export class Toolbar {
  private editorManager: EditorManager;
  private el: HTMLElement;

  constructor(options: ToolbarOptions) {
    this.editorManager = options.editorManager;
    this.el = document.createElement('div');
    this.el.classList.add('ae-toolbar');
    this.render();
  }

  private render(): void {
    const em = this.editorManager;

    const createDivider = () => {
      const d = document.createElement('div');
      d.classList.add('ae-toolbar__divider');
      return d;
    };

    this.el.appendChild(renderFontFamilyDropdown(this.el, em));
    this.el.appendChild(renderHeadingDropdown(this.el, em));

    this.el.appendChild(createDivider());

    this.el.appendChild(renderBoldButton(this.el, em));
    this.el.appendChild(renderItalicButton(this.el, em));
    this.el.appendChild(renderUnderlineButton(this.el, em));
    this.el.appendChild(renderStrikeButton(this.el, em));
    this.el.appendChild(renderTextColorButton(this.el, em));
    this.el.appendChild(renderHighlightButton(this.el, em));

    this.el.appendChild(createDivider());

    this.el.appendChild(renderSuperscriptButton(this.el, em));
    this.el.appendChild(renderSubscriptButton(this.el, em));
    this.el.appendChild(renderCodeButton(this.el, em));
    this.el.appendChild(renderCodeBlockButton(this.el, em));

    this.el.appendChild(createDivider());

    const alignGroup = renderTextAlignButtons(this.el, em);
    this.el.appendChild(alignGroup);

    this.el.appendChild(createDivider());

    this.el.appendChild(renderBulletListButton(this.el, em));
    this.el.appendChild(renderOrderedListButton(this.el, em));
    this.el.appendChild(renderTaskListButton(this.el, em));
    this.el.appendChild(renderBlockquoteButton(this.el, em));

    this.el.appendChild(createDivider());

    this.el.appendChild(renderLinkButton(this.el, em));
    this.el.appendChild(renderImageButton(this.el, em));
    this.el.appendChild(renderTableButton(this.el, em));
    this.el.appendChild(renderHorizontalRuleButton(this.el, em));

    this.el.appendChild(createDivider());

    this.el.appendChild(renderUndoButton(this.el, em));
    this.el.appendChild(renderRedoButton(this.el, em));
  }

  getElement(): HTMLElement {
    return this.el;
  }

  destroy(): void {
    this.el.remove();
  }
}
