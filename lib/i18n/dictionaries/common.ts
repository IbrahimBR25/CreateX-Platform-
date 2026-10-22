import type { Dictionary, Locale } from "../types";

// Shared strings used across spaces. Each space owns its own dictionary file;
// only put a key here when two or more spaces genuinely share it.
const fr: Dictionary = {
  "common.appName": "EduTN School OS",
  "common.space.admin": "Administration",
  "common.space.teacher": "Enseignant",
  "common.space.student": "Élève",
  "common.space.parent": "Parent",
  "common.space.switcherLabel": "Changer d'espace (navigation de démonstration)",
  "common.language.label": "Langue",
  "common.language.fr": "Français",
  "common.language.ar": "العربية",
  "common.action.cancel": "Annuler",
  "common.action.close": "Fermer",
  "common.action.save": "Enregistrer",
  "common.action.send": "Envoyer",
  "common.action.search": "Rechercher",
  "common.action.confirm": "Confirmer",
  "common.status.present": "Présent",
  "common.status.absent": "Absent",
  "common.status.late": "Retard",
  "common.status.paid": "Soldé",
  "common.status.pending": "En attente",
  "common.status.overdue": "Impayé",
  "common.unit.tnd": "TND",
  "common.unit.outOf20": "/ 20",
};

const ar: Dictionary = {
  "common.appName": "EduTN School OS",
  "common.space.admin": "الإدارة",
  "common.space.teacher": "الأستاذ",
  "common.space.student": "التلميذ",
  "common.space.parent": "الولي",
  "common.space.switcherLabel": "تغيير الفضاء (تنقّل تجريبي)",
  "common.language.label": "اللغة",
  "common.language.fr": "Français",
  "common.language.ar": "العربية",
  "common.action.cancel": "إلغاء",
  "common.action.close": "إغلاق",
  "common.action.save": "حفظ",
  "common.action.send": "إرسال",
  "common.action.search": "بحث",
  "common.action.confirm": "تأكيد",
  "common.status.present": "حاضر",
  "common.status.absent": "غائب",
  "common.status.late": "متأخر",
  "common.status.paid": "مدفوع",
  "common.status.pending": "قيد الانتظار",
  "common.status.overdue": "متأخر السداد",
  "common.unit.tnd": "د.ت",
  "common.unit.outOf20": "/ 20",
};

export const common: Record<Locale, Dictionary> = { fr, ar };
