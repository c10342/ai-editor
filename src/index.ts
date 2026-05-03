import './styles/index.scss';

export { AiEditor } from './AiEditor';
export { EditorManager, ExtensionManager, EventEmitter, PluginRegistry, I18n } from './core';
export type { Locale, LocaleMessages } from './core';
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
