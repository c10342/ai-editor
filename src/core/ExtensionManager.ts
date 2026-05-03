import type { EditorPlugin } from '@/types';

export class ExtensionManager {
  private plugins: Map<string, EditorPlugin> = new Map();
  private extensions: any[] = [];

  register(plugin: EditorPlugin): void {
    if (this.plugins.has(plugin.name)) {
      return;
    }
    this.plugins.set(plugin.name, plugin);
    if (plugin.extensions) {
      this.extensions.push(...plugin.extensions);
    }
  }

  unregister(name: string): void {
    this.plugins.delete(name);
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
      plugin.onInit?.(null as any);
    });
  }

  destroyAll(): void {
    this.plugins.forEach((plugin) => {
      plugin.onDestroy?.();
    });
  }
}
