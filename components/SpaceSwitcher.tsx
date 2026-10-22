"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, GraduationCap, LayoutDashboard, Users, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

export type SpaceId = "admin" | "teacher" | "student" | "parent" | "home";

const SPACES: { id: Exclude<SpaceId, "home">; href: string; icon: React.ElementType }[] = [
  { id: "admin", href: "/admin", icon: LayoutDashboard },
  { id: "teacher", href: "/teacher", icon: GraduationCap },
  { id: "student", href: "/student", icon: Users },
  { id: "parent", href: "/parent", icon: CreditCard },
];

export function SpaceSwitcher({ current = "home" }: { current?: SpaceId }) {
  const { t } = useI18n();
  const isHome = current === "home";

  return (
    <nav aria-label={t("common.space.switcherLabel")} className="flex items-center gap-1.5">
      <Link
        href="/"
        title="Tableau de bord SchoolHub / CreateX"
        aria-current={isHome ? "page" : undefined}
        className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition-colors active:scale-[0.98] ${
          isHome
            ? "border-[#BDEAF8] bg-[#DFF4FC] text-[#303747]"
            : "border-[#E7EBF2] bg-white text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
        }`}
      >
        <Sparkles size={14} className={isHome ? "text-[#35B8D5]" : "text-[#8A93A3]"} aria-hidden="true" />
        <span className="hidden lg:inline">Tableau de bord</span>
      </Link>
      {SPACES.map(({ id, href, icon: Icon }) => {
        const active = id === current;
        return (
          <Link
            key={id}
            href={href}
            aria-current={active ? "page" : undefined}
            title={t(`common.space.${id}`)}
            className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition-colors active:scale-[0.98] ${
              active
                ? "border-[#BDEAF8] bg-[#DFF4FC] text-[#303747]"
                : "border-[#E7EBF2] bg-white text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
            }`}
          >
            <Icon size={14} className={active ? "text-[#35B8D5]" : "text-[#8A93A3]"} aria-hidden="true" />
            <span className="hidden lg:inline">{t(`common.space.${id}`)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
