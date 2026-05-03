import Placeholder from '@tiptap/extension-placeholder';
import type { EditorPlugin } from '@/types';

export function createPlaceholderPlugin(placeholder?: string): EditorPlugin {
  return {
    name: 'placeholder',
    extensions: [Placeholder.configure({ placeholder: placeholder || '开始输入内容...' })],
  };
}
