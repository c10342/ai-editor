import type { EditorPlugin } from "@/types";

export class PluginRegistry {
  private static globalPlugins: EditorPlugin[] = [];

  static use(plugin: EditorPlugin): typeof PluginRegistry {
    if (!this.globalPlugins.find((p) => p.name === plugin.name)) {
      this.globalPlugins.push(plugin);
    }
    return this;
  }

  static useAll(plugins: EditorPlugin[]): typeof PluginRegistry {
    plugins.forEach((p) => this.use(p));
    return this;
  }

  static getGlobalPlugins(): EditorPlugin[] {
    return [...this.globalPlugins];
  }

  static remove(name: string): typeof PluginRegistry {
    this.globalPlugins = this.globalPlugins.filter((p) => p.name !== name);
    return this;
  }

  static clear(): void {
    this.globalPlugins = [];
  }
}
