export type Locale = "fr" | "ar";
export type Direction = "ltr" | "rtl";
export type Dictionary = Record<string, string>;
export type TranslationVars = Record<string, string | number>;

export const LOCALES: readonly Locale[] = ["fr", "ar"];
export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "edutn-locale";

export const DIRECTION: Record<Locale, Direction> = {
  fr: "ltr",
  ar: "rtl",
};

export function isLocale(value: unknown): value is Locale {
  return value === "fr" || value === "ar";
}
