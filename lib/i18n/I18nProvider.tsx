"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { dictionaries } from "./dictionaries";
import {
  DIRECTION,
  LOCALE_COOKIE,
  type Direction,
  type Locale,
  type TranslationVars,
} from "./types";

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  t: (key: string, vars?: TranslationVars) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const warned = new Set<string>();

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  );
}

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = DIRECTION[locale];
    document.documentElement.style.colorScheme = "only light";
    if (!document.querySelector('meta[name="darkreader-lock"]')) {
      const meta = document.createElement("meta");
      meta.name = "darkreader-lock";
      meta.content = "true";
      document.head.appendChild(meta);
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = DIRECTION[next];
  }, []);

  const t = useCallback(
    (key: string, vars?: TranslationVars) => {
      const value = dictionaries[locale][key] ?? dictionaries.fr[key];
      if (value === undefined) {
        if (process.env.NODE_ENV !== "production" && !warned.has(key)) {
          warned.add(key);
          console.warn(`[i18n] missing key: ${key}`);
        }
        return key;
      }
      return interpolate(value, vars);
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dir: DIRECTION[locale], t, setLocale }),
    [locale, t, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
