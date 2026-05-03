import zhCN from "@/i18n/zh-CN";
import en from "@/i18n/en";
import zhTW from "@/i18n/zh-TW";

export type Locale = "zh-CN" | "en" | "zh-TW";

export type LocaleMessages = Record<string, any>;

const builtinMessages: Record<Locale, LocaleMessages> = {
  "zh-CN": zhCN,
  en: en,
  "zh-TW": zhTW,
};

function getByPath(obj: LocaleMessages, path: string): string | undefined {
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[key];
  }
  return typeof current === "string" ? current : undefined;
}

function deepMerge(target: LocaleMessages, source: LocaleMessages): LocaleMessages {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export class I18n {
  private locale: Locale;
  private messages: Record<Locale, LocaleMessages>;

  constructor(locale: Locale = "zh-CN") {
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
    this.messages[locale] = deepMerge(this.messages[locale] || {}, messages);
  }

  t(key: string, params?: Record<string, string | number>): string {
    const text =
      getByPath(this.messages[this.locale], key) || getByPath(this.messages["zh-CN"], key) || key;
    if (!params) return text;
    return Object.entries(params).reduce(
      (result, [k, v]) => result.replace(`{${k}}`, String(v)),
      text,
    );
  }
}
