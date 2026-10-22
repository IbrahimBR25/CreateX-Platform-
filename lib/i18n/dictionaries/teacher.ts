import type { Dictionary, Locale } from "../types";

const fr: Dictionary = {
  // Top Bar
  "teacher.header.title": "Espace Enseignant",
  "teacher.header.teacherName": "M. Karim Mansour (Mathématiques)",
  "teacher.header.sessionInfo": "Séance en cours : 4e Math 1 (Bac) • Salle 14 • Mercredi 08:00 - 10:00",
  "teacher.header.liveBadge": "En direct • 48 min restantes",

  // Left Panel: Roster & Attendance
  "teacher.roster.title": "Appel Numérique & Suivi Diagnostique",
  "teacher.roster.subtitle": "1 clic = Absent • 2 clics = Retard • 3 clics = Présent",
  "teacher.roster.markAllPresent": "Tous Présents (R)",
  "teacher.roster.search": "Filtrer un élève...",
  "teacher.roster.summary": "{present} Présents • {absent} Absents • {late} Retards sur {total} élèves",
  "teacher.roster.addDiagnostic": "Diagnostiquer",
  "teacher.roster.diagnosticDone": "Diagnostic posé",
  "teacher.roster.lateMin": "{count} min",

  // Diagnostic Modal
  "teacher.diag.title": "Diagnostic Pédagogique Rapide",
  "teacher.diag.student": "Élève",
  "teacher.diag.category": "Axe d'observation",
  "teacher.diag.catComprehension": "Compréhension & Notions",
  "teacher.diag.catMethodology": "Méthodologie & Rédaction",
  "teacher.diag.catAttention": "Attention & Concentration",
  "teacher.diag.catHomework": "Devoir non fait",
  "teacher.diag.weakness": "Difficulté / Lacune constatée",
  "teacher.diag.weaknessPlaceholder": "Ex : Blocage sur le calcul des primitives par parties, confusion dans le signe...",
  "teacher.diag.remedy": "Remédiation recommandée (visible parents)",
  "teacher.diag.remedyPlaceholder": "Ex : Refaire exercices d'application 3 et 4 page 118, tutorat pairs...",
  "teacher.diag.privacyNote": "Cette évaluation sera visible aux parents et à la direction (masquée à l'élève).",
  "teacher.diag.save": "Valider le diagnostic",
  "teacher.diag.weaknessRequired": "Veuillez décrire la difficulté ou lacune observée.",

  // Right Panel: Curriculum & Session Tracker
  "teacher.curriculum.title": "Cahier de Texte & Progression",
  "teacher.curriculum.lessonTitle": "Titre de la leçon du jour",
  "teacher.curriculum.progressLabel": "Progression Annuelle Officielle",
  "teacher.curriculum.progressValue": "{percent}% du programme officiel",
  "teacher.curriculum.whereLeftOff": "Où nous nous sommes arrêtés",
  "teacher.curriculum.homework": "Devoirs / Travail préparatoire",
  "teacher.curriculum.saveSession": "Clôturer la séance (60s)",
  "teacher.curriculum.saving": "Enregistrement...",

  // Toasts
  "teacher.toast.allPresent": "Tous les élèves marqués présents",
  "teacher.toast.allPresentDesc": "Appel réinitialisé à 100% de présence.",
  "teacher.toast.diagSaved": "Note diagnostique enregistrée pour {name}",
  "teacher.toast.diagSavedDesc": "Cette évaluation sera visible aux parents et à la direction.",
  "teacher.toast.sessionSaved": "Séance et appel validés en 60 secondes !",
  "teacher.toast.sessionSavedDesc": "4e Math 1 : {present} présents, {absent} absent(s), {late} retard(s). Journal du cours synchronisé.",
};

const ar: Dictionary = {
  // Top Bar
  "teacher.header.title": "فضاء الأستاذ",
  "teacher.header.teacherName": "الأستاذ كريم منصور (رياضيات)",
  "teacher.header.sessionInfo": "الحصة الجارية : الرابعة رياضيات 1 (باك) • القاعة 14 • الأربعاء 08:00 - 10:00",
  "teacher.header.liveBadge": "مباشر • متبقي 48 دقيقة",

  // Left Panel: Roster & Attendance
  "teacher.roster.title": "المناداة الرقمية والمتابعة التشخيصية",
  "teacher.roster.subtitle": "نقرة واحدة = غائب • نقرتان = متأخر • 3 نقرات = حاضر",
  "teacher.roster.markAllPresent": "الجميع حاضرون (R)",
  "teacher.roster.search": "بحث عن تلميذ...",
  "teacher.roster.summary": "{present} حاضرون • {absent} غائبون • {late} متأخرون من جملة {total} تلميذاً",
  "teacher.roster.addDiagnostic": "تشخيص",
  "teacher.roster.diagnosticDone": "تم التشخيص",
  "teacher.roster.lateMin": "{count} د",

  // Diagnostic Modal
  "teacher.diag.title": "تشخيص بيداغوجي سريع",
  "teacher.diag.student": "التلميذ",
  "teacher.diag.category": "محور الملاحظة",
  "teacher.diag.catComprehension": "الفهم والمفاهيم الأساسية",
  "teacher.diag.catMethodology": "المنهجية والتحرير",
  "teacher.diag.catAttention": "الانتباه والتركيز",
  "teacher.diag.catHomework": "عدم إنجاز الواجب المنزلي",
  "teacher.diag.weakness": "الصعوبة أو الثغرة الملاحظة",
  "teacher.diag.weaknessPlaceholder": "مثال : صعوبة في حساب التكامل بالتجزئة، خلط في الإشارات...",
  "teacher.diag.remedy": "المعالجة المقترحة (مرئية للولي)",
  "teacher.diag.remedyPlaceholder": "مثال : إعادة إنجاز التطبيقات 3 و 4 صفحة 118، جلسة مرافقة...",
  "teacher.diag.privacyNote": "تكون هذه الملاحظة مرئية لولي الأمر والإدارة (محجوبة عن التلميذ).",
  "teacher.diag.save": "تأكيد التشخيص",
  "teacher.diag.weaknessRequired": "يرجى وصف الصعوبة أو النقيصة الملاحظة.",

  // Right Panel: Curriculum & Session Tracker
  "teacher.curriculum.title": "دفتر النصوص وتقدّم البرنامج",
  "teacher.curriculum.lessonTitle": "عنوان درس اليوم",
  "teacher.curriculum.progressLabel": "التقدّم السنوي الرسمي",
  "teacher.curriculum.progressValue": "{percent}% من البرنامج الرسمي",
  "teacher.curriculum.whereLeftOff": "نقطة التوقف في الحصة",
  "teacher.curriculum.homework": "الواجبات والعمل المنزلي المطلوب",
  "teacher.curriculum.saveSession": "تسجيل الحصة (60 ثانية)",
  "teacher.curriculum.saving": "جارٍ الحفظ...",

  // Toasts
  "teacher.toast.allPresent": "تم تسجيل حضور جميع التلاميذ",
  "teacher.toast.allPresentDesc": "تمت إعادة ضبط المناداة بنسبة حضور 100%.",
  "teacher.toast.diagSaved": "تم تسجيل الملاحظة التشخيصية للتلميذ {name}",
  "teacher.toast.diagSavedDesc": "ستكون هذه الملاحظة مرئية للولي والإدارة المدرسية.",
  "teacher.toast.sessionSaved": "تم تسجيل الحصة والمناداة بنجاح!",
  "teacher.toast.sessionSavedDesc": "الرابعة رياضيات 1 : {present} حاضرون، {absent} غائبون، {late} متأخرون. تم تحديث دفتر النصوص.",
};

export const teacher: Record<Locale, Dictionary> = { fr, ar };
