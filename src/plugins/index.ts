import type { EditorPlugin } from '@/types';

import { createBoldPlugin } from './BoldPlugin';
import { createItalicPlugin } from './ItalicPlugin';
import { createUnderlinePlugin } from './UnderlinePlugin';
import { createStrikePlugin } from './StrikePlugin';
import { createCodePlugin } from './CodePlugin';
import { createCodeBlockPlugin } from './CodeBlockPlugin';
import { createHeadingPlugin } from './HeadingPlugin';
import { createBulletListPlugin } from './BulletListPlugin';
import { createOrderedListPlugin } from './OrderedListPlugin';
import { createTaskListPlugin } from './TaskListPlugin';
import { createBlockquotePlugin } from './BlockquotePlugin';
import { createHorizontalRulePlugin } from './HorizontalRulePlugin';
import { createLinkPlugin } from './LinkPlugin';
import { createImagePlugin } from './ImagePlugin';
import { createTextAlignPlugin } from './TextAlignPlugin';
import { createHighlightPlugin } from './HighlightPlugin';
import { createColorPlugin, createTextColorPlugin } from './ColorPlugin';
import { createSuperscriptPlugin } from './SuperscriptPlugin';
import { createSubscriptPlugin } from './SubscriptPlugin';
import { createTablePlugin, Table, TableRow, TableCell, TableHeader } from './TablePlugin';
import { createFontFamilyPlugin } from './FontFamilyPlugin';
import { createHistoryPlugin } from './HistoryPlugin';
import { createPlaceholderPlugin } from './PlaceholderPlugin';
import {
  createDocumentPlugin,
  createParagraphPlugin,
  createTextPlugin,
  createListItemPlugin,
  createTaskItemPlugin,
  createDropcursorPlugin,
  createGapcursorPlugin,
} from './BasePlugins';

export {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikePlugin,
  createCodePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createBulletListPlugin,
  createOrderedListPlugin,
  createTaskListPlugin,
  createBlockquotePlugin,
  createHorizontalRulePlugin,
  createLinkPlugin,
  createImagePlugin,
  createTextAlignPlugin,
  createHighlightPlugin,
  createColorPlugin,
  createTextColorPlugin,
  createSuperscriptPlugin,
  createSubscriptPlugin,
  createTablePlugin,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  createFontFamilyPlugin,
  createHistoryPlugin,
  createPlaceholderPlugin,
  createDocumentPlugin,
  createParagraphPlugin,
  createTextPlugin,
  createListItemPlugin,
  createTaskItemPlugin,
  createDropcursorPlugin,
  createGapcursorPlugin,
};

export const defaultPlugins: ((options?: any) => EditorPlugin)[] = [
  createDocumentPlugin,
  createParagraphPlugin,
  createTextPlugin,
  createListItemPlugin,
  createTaskItemPlugin,
  createDropcursorPlugin,
  createGapcursorPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikePlugin,
  createCodePlugin,
  createCodeBlockPlugin,
  createHeadingPlugin,
  createBulletListPlugin,
  createOrderedListPlugin,
  createTaskListPlugin,
  createBlockquotePlugin,
  createHorizontalRulePlugin,
  createLinkPlugin,
  createImagePlugin,
  createTextAlignPlugin,
  createHighlightPlugin,
  createColorPlugin,
  createTextColorPlugin,
  createSuperscriptPlugin,
  createSubscriptPlugin,
  createFontFamilyPlugin,
  createHistoryPlugin,
  createTablePlugin,
];
