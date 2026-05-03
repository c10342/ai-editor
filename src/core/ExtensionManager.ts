import type { EditorPlugin } from '@/types';

export class ExtensionManager {
  private plugins: Map<string, EditorPlugin> = new Map();
  private extensions: any[] = [];

  register(plugin: EditorPlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered. Skipping.`);
      return;
    }
    this.plugins.set(plugin.name, plugin);
    if (plugin.extension) {
      this.extensions.push(plugin.extension);
    }
  }

  unregister(name: string): void {
    const plugin = this.plugins.get(name);
    if (plugin) {
      if (plugin.extension) {
        this.extensions = this.extensions.filter(
          (ext) => ext.name !== plugin.extension!.name
        );
      }
      plugin.onDestroy?.();
      this.plugins.delete(name);
    }
  }

  getExtensions(): any[] {
    return [...this.extensions];
  }

  getPlugin(name: string): EditorPlugin | undefined {
    return this.plugins.get(name);
  }

  getAllPlugins(): EditorPlugin[] {
    return Array.from(this.plugins.values());
  }

  initAll(): void {
    this.plugins.forEach((plugin) => {
      plugin.onInit?.();
    });
  }

  destroyAll(): void {
    this.plugins.forEach((plugin) => {
      plugin.onDestroy?.();
    });
  }
}
