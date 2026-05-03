import './styles/index.scss';

export { AiEditor } from './AiEditor';
export { EditorManager, ExtensionManager, EventEmitter, PluginRegistry } from './core';
export { Toolbar, BubbleMenu } from './ui';
export { getIcon, setIcon, getIconElement } from './icons';

export type {
  EditorPlugin,
  EditorOptions,
  EditorEventType,
  EditorEventCallback,
  ToolbarItem,
  ToolbarGroup,
  ToolbarRenderFn,
} from './types';

export * from './plugins';
