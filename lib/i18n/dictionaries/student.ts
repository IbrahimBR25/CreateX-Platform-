import type { Dictionary, Locale } from "../types";

const fr: Dictionary = {
  // Top Bar
  "student.header.title": "Espace Élève",
  "student.header.studentName": "Youssef Chahed",
  "student.header.class": "4e Année Mathématiques 1 (Bac 2027)",

  // Hero: Live / Next Class
  "student.hero.liveNow": "Séance Suivante",
  "student.hero.subject": "Sciences Physiques",
  "student.hero.teacher": "M. Tarek Ben Amor",
  "student.hero.room": "Salle 08 • Labo Physique",
  "student.hero.startsIn": "Début dans",
  "student.hero.countdown": "18 min 42 s",
  "student.hero.syllabus": "Optique ondulatoire & Interférences",
  "student.hero.viewDocs": "Voir les documents du cours",

  // Bento: Active Quizzes
  "student.quizzes.title": "Évaluations & Mini-Tests Actifs",
  "student.quizzes.subtitle": "Préparation continue aux devoirs surveillés",
  "student.quizzes.questions": "{count} questions",
  "student.quizzes.duration": "{count} min",
  "student.quizzes.start": "Passer le test",
  "student.quizzes.completed": "Terminé",
  "student.quizzes.score": "Note : {score}/20",

  // Bento: Subject Averages & Coefficients
  "student.grades.title": "Moyennes & Coefficients (Trimestre 1)",
  "student.grades.subtitle": "Classement provisoire : 1er sur 28 élèves",
  "student.grades.generalAverage": "Moyenne Générale Estimée",
  "student.grades.subject": "Matière",
  "student.grades.coeff": "Coeff.",
  "student.grades.dc": "DC",
  "student.grades.ds": "DS",
  "student.grades.avg": "Moyenne",
  "student.grades.rank": "Rang",

  // Bento: Personal Study Notebook
  "student.notebook.title": "Cahier d'Étude & Mémos Personnels",
  "student.notebook.subtitle": "Fiches de révision et synthèse de formules",
  "student.notebook.newNote": "Nouvelle fiche",
  "student.notebook.saveNote": "Enregistrer",
  "student.notebook.noteSaved": "Fiche de cours enregistrée !",
  "student.notebook.titlePlaceholder": "Titre de la fiche...",
  "student.notebook.contentPlaceholder": "Notes, théorèmes clés, astuces méthodologiques...",

  // Drawer: Ask Teacher
  "student.drawer.trigger": "Poser une question à un prof",
  "student.drawer.title": "Messagerie Pédagogique",
  "student.drawer.subtitle": "Posez vos questions directement à vos enseignants",
  "student.drawer.selectTeacher": "Choisir le destinataire",
  "student.drawer.messageLabel": "Votre question ou demande d'éclaircissement",
  "student.drawer.placeholder": "Expliquez précisément votre blocage ou le numéro d'exercice...",
  "student.drawer.send": "Envoyer le message",
  "student.drawer.sentToast": "Message transmis à l'enseignant",
  "student.drawer.sentToastDesc": "Une notification a été envoyée. Réponse habituelle sous 24h.",
};

const ar: Dictionary = {
  // Top Bar
  "student.header.title": "فضاء التلميذ",
  "student.header.studentName": "يوسف الشاهد",
  "student.header.class": "السنة الرابعة رياضيات 1 (باكالوريا 2027)",

  // Hero: Live / Next Class
  "student.hero.liveNow": "الحصة القادمة",
  "student.hero.subject": "العلوم الفيزيائية",
  "student.hero.teacher": "الأستاذ طارق بن عمر",
  "student.hero.room": "القاعة 08 • مخبر الفيزياء",
  "student.hero.startsIn": "البداية بعد",
  "student.hero.countdown": "18 د و 42 ث",
  "student.hero.syllabus": "البصريات الموجية والتداخل",
  "student.hero.viewDocs": "الاطلاع على وثائق الدرس",

  // Bento: Active Quizzes
  "student.quizzes.title": "الاختبارات والتقييمات التفاعلية",
  "student.quizzes.subtitle": "استعداد مستمر ومباشر لفروض المراقبة والتأليفية",
  "student.quizzes.questions": "{count} أسئلة",
  "student.quizzes.duration": "{count} د",
  "student.quizzes.start": "بدء الاختبار",
  "student.quizzes.completed": "مكتمل",
  "student.quizzes.score": "العدد : {score}/20",

  // Bento: Subject Averages & Coefficients
  "student.grades.title": "المعدلات والضوارب (الثلاثي 1)",
  "student.grades.subtitle": "الرتبة المؤقتة : الأول من 28 تلميذاً",
  "student.grades.generalAverage": "المعدل العام التقديري",
  "student.grades.subject": "المادة",
  "student.grades.coeff": "الضارب",
  "student.grades.dc": "ف.م",
  "student.grades.ds": "ف.ت",
  "student.grades.avg": "المعدل",
  "student.grades.rank": "الرتبة",

  // Bento: Personal Study Notebook
  "student.notebook.title": "دفتر المراجعة والتلخيص الشخصي",
  "student.notebook.subtitle": "جذاذات القوانين ومذكرات استيعاب الدروس",
  "student.notebook.newNote": "بطاقة جديدة",
  "student.notebook.saveNote": "حفظ",
  "student.notebook.noteSaved": "تم حفظ جذاذة المراجعة بنجاح!",
  "student.notebook.titlePlaceholder": "عنوان البطاقة...",
  "student.notebook.contentPlaceholder": "القواعد، المبرهنات الأساسية، الملاحظات المنهجية...",

  // Drawer: Ask Teacher
  "student.drawer.trigger": "طرح سؤال على أستاذ",
  "student.drawer.title": "المراسلة البيداغوجية",
  "student.drawer.subtitle": "اطرح استفساراتك مباشرة على إطارك التدريسي",
  "student.drawer.selectTeacher": "اختيار الأستاذ المتلقي",
  "student.drawer.messageLabel": "سؤالك أو طلب التوضيح",
  "student.drawer.placeholder": "اشرح بدقة النقطة غير المفهومة أو رقم التمرين المعني...",
  "student.drawer.send": "إرسال السؤال",
  "student.drawer.sentToast": "تم إرسال السؤال إلى الأستاذ بنجاح",
  "student.drawer.sentToastDesc": "تم إشعار الأستاذ. تتم الإجابة عادة خلال 24 ساعة.",
};

export const student: Record<Locale, Dictionary> = { fr, ar };
