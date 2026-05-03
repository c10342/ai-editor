import { EditorManager } from "@/core";
import { PluginRegistry } from "@/core/PluginRegistry";
import { Toolbar, BubbleMenu } from "@/ui";
import type { EditorPlugin, EditorOptions } from "@/types";
import { defaultPlugins, createPlaceholderPlugin } from "@/plugins";

export class AiEditor {
  private editorManager: EditorManager;
  private toolbar: Toolbar | null;
  private bubbleMenu: BubbleMenu;
  private container: HTMLElement;
  private wrapper: HTMLElement;
  private statusBar: HTMLElement;
  private wordCountEl: HTMLElement;
  private resolvedPlugins: EditorPlugin[] = [];

  static use(plugin: EditorPlugin): typeof AiEditor {
    PluginRegistry.use(plugin);
    return AiEditor;
  }

  static useAll(plugins: EditorPlugin[]): typeof AiEditor {
    PluginRegistry.useAll(plugins);
    return AiEditor;
  }

  constructor(options: EditorOptions) {
    this.container = options.element;
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("ae");

    this.editorManager = new EditorManager({
      element: this.wrapper,
      content: options.content,
      placeholder: options.placeholder,
      autofocus: options.autofocus,
      editable: options.editable,
      lang: options.lang,
      messages: options.messages,
    });

    this.resolvedPlugins = this.resolvePlugins(
      options.plugins,
      options.placeholder,
      options.pluginOptions,
    );
    this.registerPlugins();

    const toolbarPlugins = this.filterToolbarPlugins(options.toolbar);
    if (toolbarPlugins) {
      this.toolbar = new Toolbar({
        editorManager: this.editorManager,
        plugins: toolbarPlugins,
      });
    } else {
      this.toolbar = null;
    }

    this.bubbleMenu = new BubbleMenu({ editorManager: this.editorManager });

    this.statusBar = document.createElement("div");
    this.statusBar.classList.add("ae-status-bar");
    this.wordCountEl = document.createElement("span");
    this.statusBar.appendChild(this.wordCountEl);

    if (this.toolbar) {
      this.wrapper.insertBefore(this.toolbar.getElement(), this.wrapper.firstChild);
    }
    this.wrapper.appendChild(this.statusBar);
    this.container.appendChild(this.wrapper);
    document.body.appendChild(this.bubbleMenu.getElement());

    this.editorManager.create(options.content);
    this.setupFocusState();
    this.setupWordCount();

    if (this.toolbar) {
      const toolbarEl = this.wrapper.querySelector(".ae-toolbar");
      const editorEl = this.wrapper.querySelector(".ae-editor__content");
      if (toolbarEl && editorEl) {
        this.wrapper.insertBefore(toolbarEl, editorEl);
      }
    }
  }

  private filterToolbarPlugins(toolbar?: string[] | false): EditorPlugin[] | null {
    if (toolbar === false) return null;
    const withToolbar = this.resolvedPlugins.filter((p) => p.renderToolbar);
    if (!toolbar) return withToolbar;
    const set = new Set(toolbar);
    return withToolbar.filter((p) => set.has(p.name));
  }

  private resolvePlugins(
    localPlugins?: EditorPlugin[],
    placeholder?: string,
    pluginOptions?: Record<string, any>,
  ): EditorPlugin[] {
    const globalPlugins = PluginRegistry.getGlobalPlugins();

    let defaults: EditorPlugin[];
    if (pluginOptions && Object.keys(pluginOptions).length > 0) {
      defaults = defaultPlugins.map((factory) => {
        const probe = factory();
        const opts = pluginOptions[probe.name];
        return opts ? factory(opts) : probe;
      });
    } else {
      defaults = defaultPlugins.map((factory) => factory());
    }
    defaults.push(createPlaceholderPlugin(placeholder, this.editorManager.getI18n()));

    const merged = new Map<string, EditorPlugin>();

    for (const plugin of defaults) {
      merged.set(plugin.name, plugin);
    }
    for (const plugin of globalPlugins) {
      merged.set(plugin.name, plugin);
    }
    if (localPlugins) {
      for (const plugin of localPlugins) {
        merged.set(plugin.name, plugin);
      }
    }

    return Array.from(merged.values());
  }

  private registerPlugins(): void {
    const extManager = this.editorManager.getExtensionManager();
    for (const plugin of this.resolvedPlugins) {
      extManager.register(plugin);
    }
  }

  private setupFocusState(): void {
    this.editorManager.on("focus", () => {
      this.wrapper.classList.add("ae--focused");
    });
    this.editorManager.on("blur", () => {
      this.wrapper.classList.remove("ae--focused");
    });
  }

  private setupWordCount(): void {
    const update = () => {
      const text = this.editorManager.getText();
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      this.wordCountEl.textContent = this.editorManager.t("status.wordCount", { words, chars });
    };
    this.editorManager.on("update", update);
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
    this.toolbar?.destroy();
    this.editorManager.destroy();
    this.wrapper.remove();
  }
}
