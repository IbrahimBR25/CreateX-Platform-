"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LOCALES } from "@/lib/i18n/types";

/** Two-way FR / AR segmented control. Sets the cookie, <html lang> and <html dir> instantly. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("common.language.label")}
      className={`inline-flex items-center rounded-md border border-hairline bg-surface-subtle p-0.5 ${className}`}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={`min-h-7 rounded px-2.5 text-xs font-semibold transition-colors active:scale-[0.97] ${
              active
                ? "border border-hairline bg-surface text-ink-primary shadow-xs"
                : "border border-transparent text-ink-secondary hover:text-ink-primary"
            }`}
          >
            {t(`common.language.${code}`)}
          </button>
        );
      })}
    </div>
  );
}
