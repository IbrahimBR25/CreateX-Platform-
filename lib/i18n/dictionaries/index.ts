import type { Dictionary, Locale } from "../types";
import { common } from "./common";
import { admin } from "./admin";
import { teacher } from "./teacher";
import { student } from "./student";
import { parent } from "./parent";

const merge = (locale: Locale): Dictionary => ({
  ...common[locale],
  ...admin[locale],
  ...teacher[locale],
  ...student[locale],
  ...parent[locale],
});

export const dictionaries: Record<Locale, Dictionary> = {
  fr: merge("fr"),
  ar: merge("ar"),
};
