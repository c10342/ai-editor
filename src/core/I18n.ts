import zhCN from '@/i18n/zh-CN';
import en from '@/i18n/en';
import zhTW from '@/i18n/zh-TW';

export type Locale = 'zh-CN' | 'en' | 'zh-TW';
export type LocaleMessages = Record<string, string>;

const builtinMessages: Record<Locale, LocaleMessages> = {
  'zh-CN': zhCN,
  'en': en,
  'zh-TW': zhTW,
};

export class I18n {
  private locale: Locale;
  private messages: Record<Locale, LocaleMessages>;

  constructor(locale: Locale = 'zh-CN') {
    this.locale = locale;
    this.messages = { ...builtinMessages };
  }

  setLocale(locale: Locale): void {
    this.locale = locale;
  }

  getLocale(): Locale {
    return this.locale;
  }

  addMessages(locale: Locale, messages: LocaleMessages): void {
    this.messages[locale] = { ...this.messages[locale], ...messages };
  }

  t(key: string, params?: Record<string, string | number>): string {
    const text = this.messages[this.locale]?.[key] || this.messages['zh-CN']?.[key] || key;
    if (!params) return text;
    return Object.entries(params).reduce((result, [k, v]) => result.replace(`{${k}}`, String(v)), text);
  }
}
