import type { Extension } from '@tiptap/core';

export type TiptapExtension = Extension;

export type Locale = 'zh-CN' | 'en' | 'zh-TW';

export type ToolbarItemType =
  | 'button'
  | 'dropdown'
  | 'color-picker'
  | 'divider'
  | 'spacer'
  | 'group';

export interface ToolbarItem {
  id: string;
  type: ToolbarItemType;
  label?: string;
  icon?: string;
  tooltip?: string;
  active?: () => boolean;
  disabled?: () => boolean;
  action?: () => void;
  children?: ToolbarItem[];
  className?: string;
}

export interface ToolbarGroup {
  id: string;
  items: ToolbarItem[];
}

export type ToolbarRenderFn = (
  editorManager: any
) => HTMLElement | HTMLElement[];

export interface EditorPlugin {
  name: string;
  extensions?: (TiptapExtension | any)[];
  renderToolbar?: ToolbarRenderFn;
  onInit?: (editorManager: any) => void;
  onDestroy?: () => void;
}

export interface EditorOptions {
  element: HTMLElement;
  content?: string;
  placeholder?: string;
  autofocus?: boolean;
  editable?: boolean;
  plugins?: EditorPlugin[];
  toolbar?: string[] | false;
  pluginOptions?: Record<string, any>;
  lang?: Locale;
  messages?: Record<Locale, Record<string, string>>;
}

export interface EditorEventMap {
  'update': { editor: any };
  'selection-update': { editor: any };
  'focus': { editor: any };
  'blur': { editor: any };
  'create': { editor: any };
  'destroy': { editor: any };
}

export type EditorEventType = keyof EditorEventMap;

export type EditorEventCallback<T extends EditorEventType> = (
  payload: EditorEventMap[T]
) => void;

export interface FontOption {
  label: string;
  value: string;
}

export interface ColorOption {
  label: string;
  value: string;
}

export interface HeadingOption {
  level: number;
  label: string;
}

export interface ModalOptions {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
