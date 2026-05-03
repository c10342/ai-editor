import Placeholder from '@tiptap/extension-placeholder';

export function createPlaceholderPlugin(placeholder?: string) {
  return {
    name: 'placeholder',
    extension: Placeholder.configure({
      placeholder: placeholder || '开始输入内容...',
    }),
  };
}
