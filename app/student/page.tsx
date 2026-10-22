"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  CreditCard,
  BookOpen,
  GraduationCap,
  FileText,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Timer,
  ChevronRight,
  Send,
  Plus,
  Trash2,
  ExternalLink,
  Edit3,
  Search,
  ArrowLeft,
  ShieldAlert,
  Award,
  Play,
  Check,
  X,
  HelpCircle
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SpaceSwitcher } from "@/components/SpaceSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Num } from "@/components/Num";

// --- Types ---
interface SubjectGrade {
  subject: string;
  coeff: number;
  grade: number;
  dc: number;
  ds: number;
  rank: number;
}

interface QuizItem {
  id: string;
  title: string;
  subject: string;
  dueTime: string;
  durationMinutes: number;
  totalQuestions: number;
  completed: boolean;
  score?: number;
}

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  updatedAt: string;
  content: string;
}

// Mock Tunisian Bac Student Data (Youssef Chahed - 4e Math 1)
const SUBJECT_GRADES: SubjectGrade[] = [
  { subject: "Mathématiques", coeff: 4, grade: 18.17, dc: 18.5, ds: 18.0, rank: 1 },
  { subject: "Sciences Physiques", coeff: 4, grade: 17.33, dc: 17.0, ds: 17.5, rank: 2 },
  { subject: "Sciences Informatiques", coeff: 1.5, grade: 19.33, dc: 19.0, ds: 19.5, rank: 1 },
  { subject: "Français", coeff: 1, grade: 16.33, dc: 16.0, ds: 16.5, rank: 4 },
  { subject: "Anglais", coeff: 1, grade: 17.67, dc: 18.0, ds: 17.5, rank: 2 },
  { subject: "Philosophie", coeff: 1, grade: 14.67, dc: 14.0, ds: 15.0, rank: 7 },
];

const INITIAL_QUIZZES: QuizItem[] = [
  {
    id: "q1",
    title: "QCM 3 : Calcul Intégral & Primitives",
    subject: "Mathématiques",
    dueTime: "Aujourd'hui à 20:00",
    durationMinutes: 15,
    totalQuestions: 10,
    completed: false,
  },
  {
    id: "q2",
    title: "Mini-Test : Ondes Électromagnétiques",
    subject: "Sciences Physiques",
    dueTime: "Demain à 18:00",
    durationMinutes: 20,
    totalQuestions: 12,
    completed: false,
  },
  {
    id: "q3",
    title: "Quiz 2 : Complexité & Algorithmes Récursifs",
    subject: "Informatique",
    dueTime: "Terminé hier",
    durationMinutes: 15,
    totalQuestions: 10,
    completed: true,
    score: 19.5,
  },
];

const INITIAL_NOTES: NoteItem[] = [
  {
    id: "n1",
    title: "Formules Primitives Usuelles & IPP",
    subject: "Mathématiques",
    updatedAt: "Il y a 2 heures",
    content: `## Intégration par parties (IPP)
Formule de base :
∫ u'(x)v(x) dx = [u(x)v(x)] - ∫ u(x)v'(x) dx

Astuce mnémotechnique ALPES :
- A : Arc-tangente / Arc-sinus
- L : Logarithme (ln)
- P : Polynômes
- E : Exponentielle
- S : Sinus / Cosinus

À revoir avant le devoir de synthèse :
- Démonstration de l'unicité de la primitive s'annulant en x0.
- Exercice 4 page 118 sur les intégrales trigonométriques.`,
  },
  {
    id: "n2",
    title: "Circuit RLC Série : Équation différentielle",
    subject: "Physique",
    updatedAt: "Hier à 16:30",
    content: `Régime libre d'un dipôle RLC série :
uC + uR + uL = 0
d²q/dt² + (R/L)·dq/dt + (1/LC)·q = 0

Trois régimes d'amortissement selon la valeur de la résistance R :
1. Régime pseudo-périodique (R < Rc)
2. Régime critique (R = Rc = 2√(L/C))
3. Régime apériodique (R > Rc)`,
  },
  {
    id: "n3",
    title: "Philosophie : Morale et Devoir chez Kant",
    subject: "Philosophie",
    updatedAt: "12 Oct 2026",
    content: `L'impératif catégorique vs impératif hypothétique.
Agir par devoir vs agir conformément au devoir.
Citation clé : "Agis uniquement d'après la maxime qui fait que tu peux vouloir en même temps qu'elle devienne une loi universelle."`,
  },
];

export default function StudentSpacePage() {
  const { t, locale, dir } = useI18n();

  // --- Timer Countdown State ---
  const [secondsRemaining, setSecondsRemaining] = useState(38 * 60 + 24);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? "0" : ""}${s}s`;
  };

  // --- Quizzes State ---
  const [quizzes, setQuizzes] = useState<QuizItem[]>(INITIAL_QUIZZES);
  const [activeQuizModal, setActiveQuizModal] = useState<QuizItem | null>(null);

  // --- Notes State ---
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("n1");
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  // --- Messaging Drawer State ---
  const [messageDrawerOpen, setMessageDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("M. Karim Mansour (Mathématiques)");
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "student" | "teacher"; text: string; time: string }[]>([
    {
      sender: "teacher",
      text: "Bonjour Youssef, pour l'exercice 4 page 118, n'hésite pas à poser le changement de variable t = cos(x) comme vu ce matin.",
      time: "Hier 14:15",
    },
    {
      sender: "student",
      text: "Merci Monsieur, c'est très clair ! Est-ce que le théorème de la bijection sera au programme du DC1 ?",
      time: "Hier 16:40",
    },
    {
      sender: "teacher",
      text: "Oui absolument, avec l'étude des branches infinies.",
      time: "Hier 17:02",
    },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      sender: "student" as const,
      text: messageText,
      time: "À l'instant",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setMessageText("");

    toast.success(t("student.drawer.sentToast"), {
      description: t("student.drawer.sentToastDesc"),
    });
  };

  const handleCompleteQuiz = () => {
    if (!activeQuizModal) return;
    setQuizzes((prev) =>
      prev.map((q) => (q.id === activeQuizModal.id ? { ...q, completed: true, score: 18.5 } : q))
    );
    toast.success(t("student.quizzes.completed"), {
      description: t("student.quizzes.score", { score: 18.5 }),
    });
    setActiveQuizModal(null);
  };

  const completedQuizzesCount = quizzes.filter((q) => q.completed).length;
  const quizProgressPercent = Math.round((completedQuizzesCount / quizzes.length) * 100);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-ink-primary font-sans antialiased">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ========================================================================= */}
        {/* TOP BAR & MULTI-SPACE SWITCHER                                            */}
        {/* ========================================================================= */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-surface px-4 z-20">
          <div className="flex items-center gap-3">
            <SpaceSwitcher current="student" />
            <LanguageSwitcher />

            <div className="h-4 w-px bg-hairline" />

            <Link href="/" title="Retour à l'accueil CreateX" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow-xs">
                YC
              </span>
              <div>
                <h1 className="text-xs font-bold text-ink-primary">
                  {t("student.header.studentName")} • <span className="text-brand font-semibold">{t("student.header.class")}</span>
                </h1>
                <p className="text-[11px] text-ink-muted">
                  Matricule : <Num value="2026-LYC-0142" /> • 2026-2027 (T1)
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMessageDrawerOpen(true)}
              className="flex h-8 items-center gap-1.5 rounded bg-brand px-3 text-xs font-semibold text-white hover:bg-brand-hover shadow-sm transition-all active:scale-[0.98]"
            >
              <MessageSquare size={13} />
              <span className="hidden sm:inline">{t("student.drawer.trigger")}</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* ASYMMETRIC BENTO GRID (--density 4)                                       */}
        {/* ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-7xl mx-auto w-full">
          {/* TOP ROW: Asymmetric 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* ------------------------------------------------------------------- */}
            {/* 1. HERO BENTO CARD: Live Now / Next Class (7 Cols)                  */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-hairline bg-surface p-5 shadow-hairline relative overflow-hidden group">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {t("student.hero.liveNow")}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-ink-secondary bg-surface-subtle px-2.5 py-1 rounded border border-hairline">
                  <Timer size={13} className="text-brand shrink-0" />
                  <Num value={formatTimer(secondsRemaining)} />
                </div>
              </div>

              {/* Class & Subject Details */}
              <div className="py-4 space-y-1.5">
                <span className="text-xs font-semibold text-ink-muted">
                  Séance en cours (08:00 - 10:00)
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ink-primary">
                  {t("student.hero.subject")} : {t("student.hero.syllabus")}
                </h2>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-ink-secondary">
                  <span className="flex items-center gap-1.5 font-medium">
                    <GraduationCap size={14} className="text-brand shrink-0" />
                    {t("student.hero.teacher")}
                  </span>
                  <span className="text-ink-muted">•</span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-800">
                    <BookOpen size={14} className="text-brand shrink-0" />
                    {t("student.hero.room")}
                  </span>
                </div>
              </div>

              {/* Next Class Teaser Footer */}
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs bg-canvas/40 -mx-5 -mb-5 p-4 rounded-b-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink-muted text-[11px] uppercase">
                    Cours suivant :
                  </span>
                  <span className="font-medium text-ink-primary">
                    Mathématiques (10:15 - 12:15)
                  </span>
                </div>
                <span className="text-xs text-brand font-semibold">Salle 14</span>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* 2. INTERACTIVE ACTIVE QUIZZES BENTO CARD (5 Cols)                   */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-lg border border-hairline bg-surface p-5 shadow-hairline">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    {t("student.quizzes.title")}
                  </span>
                </div>
                <span className="text-xs font-bold text-brand">
                  <Num value={`${completedQuizzesCount}/${quizzes.length}`} /> validés
                </span>
              </div>

              {/* Concentric / Radial Progress Indicator */}
              <div className="py-3 flex items-center gap-4">
                {/* SVG Progress Ring */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-brand transition-all duration-500 ease-out"
                      strokeDasharray={`${quizProgressPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-ink-primary">
                    <Num value={`${quizProgressPercent}%`} />
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-ink-primary">
                    {t("student.quizzes.subtitle")}
                  </h3>
                  <p className="text-[11px] text-ink-muted leading-tight">
                    Complétez vos devoirs interactifs avant la date limite pour consolider la note de contrôle.
                  </p>
                </div>
              </div>

              {/* Quiz Items List */}
              <div className="space-y-2">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between rounded border border-hairline p-2 hover:bg-canvas/50 transition-colors"
                  >
                    <div className="overflow-hidden pe-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-ink-primary truncate">
                          {quiz.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-ink-muted">
                        {quiz.subject} • {quiz.dueTime}
                      </span>
                    </div>

                    {quiz.completed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                        <CheckCircle2 size={11} className="text-emerald-600" />
                        <Num value={`${quiz.score}/20`} />
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveQuizModal(quiz)}
                        className="flex items-center gap-1 rounded bg-brand px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-hover active:scale-[0.98] transition-all shadow-2xs"
                      >
                        <Play size={10} />
                        <span>{t("student.quizzes.start")}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Split-Pane Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* ------------------------------------------------------------------- */}
            {/* 3. SUBJECT AVERAGES & COEFFICIENTS CARD (5 Cols)                    */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-lg border border-hairline bg-surface p-5 shadow-hairline">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  {t("student.grades.title")}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-brand bg-brand-subtle border border-brand-border">
                  <Award size={12} />
                  {t("student.grades.subtitle")}
                </span>
              </div>

              {/* Overall GPA Hero Display */}
              <div className="py-3 flex items-baseline justify-between border-b border-hairline bg-surface-subtle -mx-5 px-5">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted block">
                    {t("student.grades.generalAverage")}
                  </span>
                  <span className="text-3xl font-bold text-brand">
                    <Num value="17.85" />
                  </span>
                  <span className="text-xs text-ink-muted"><Num value="/ 20.00" /></span>
                </div>
                <div className="text-end">
                  <span className="text-xs font-semibold text-emerald-700 block">Mention Très Bien</span>
                  <span className="text-[11px] text-ink-muted">Total Coeffs : <Num value="12.5" /></span>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="divide-y divide-hairline text-xs py-1">
                {SUBJECT_GRADES.map((sg) => (
                  <div key={sg.subject} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] text-ink-muted border border-hairline">
                        coef <Num value={sg.coeff} />
                      </span>
                      <span className="font-medium text-ink-primary">{sg.subject}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-ink-muted">
                        DC: <Num value={sg.dc.toFixed(1)} /> • DS: <Num value={sg.ds.toFixed(1)} />
                      </span>
                      <span className="font-bold text-sm text-ink-primary">
                        <Num value={sg.grade.toFixed(2)} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* 4. SPLIT-PANE PERSONAL STUDY NOTEBOOK (7 Cols)                      */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col rounded-lg border border-hairline bg-surface shadow-hairline overflow-hidden">
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3 bg-surface">
                <div className="flex items-center gap-2">
                  <Edit3 size={15} className="text-brand shrink-0" />
                  <h3 className="text-xs font-bold text-ink-primary">
                    {t("student.notebook.title")}
                  </h3>
                </div>
                <span className="text-[10px] text-ink-muted">
                  {t("student.notebook.subtitle")}
                </span>
              </div>

              {/* Split-Pane: Note Selector (Left) & Note Editor (Right) */}
              <div className="flex flex-1 min-h-[320px]">
                {/* Note Selector Sidebar */}
                <div className="w-1/3 border-e border-hairline bg-canvas/60 overflow-y-auto divide-y divide-hairline">
                  {notes.map((n) => {
                    const isSelected = n.id === selectedNoteId;
                    return (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNoteId(n.id)}
                        className={`w-full text-start p-3 transition-colors ${
                          isSelected
                            ? "bg-surface border-s-2 border-s-brand text-ink-primary"
                            : "hover:bg-canvas text-ink-secondary"
                        }`}
                      >
                        <span className="block text-xs font-bold truncate">{n.title}</span>
                        <div className="flex items-center justify-between text-[10px] text-ink-muted mt-1">
                          <span>{n.subject}</span>
                          <span><Num value={n.updatedAt} /></span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Note Active Editor */}
                <div className="flex-1 p-4 flex flex-col justify-between bg-surface">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotes((prev) =>
                          prev.map((n) => (n.id === selectedNote.id ? { ...n, title: val } : n))
                        );
                      }}
                      className="w-full font-bold text-sm text-ink-primary border-b border-transparent hover:border-hairline focus:border-brand focus:outline-hidden pb-1"
                    />

                    <textarea
                      rows={10}
                      value={selectedNote.content}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotes((prev) =>
                          prev.map((n) => (n.id === selectedNote.id ? { ...n, content: val } : n))
                        );
                      }}
                      className="w-full text-xs font-mono text-ink-secondary leading-relaxed bg-transparent focus:outline-hidden resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-hairline text-[10px] text-ink-muted">
                    <span><Num value={selectedNote.content.length} /> caractères</span>
                    <span className="text-emerald-700 font-medium">✓ {t("student.notebook.noteSaved")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* DIRECT 'MESSAGE TEACHER' SLIDE-OVER DRAWER (Moderated)                    */}
      {/* ========================================================================= */}
      {messageDrawerOpen && (
        <div
          className={`fixed inset-0 z-50 flex ${dir === "rtl" ? "justify-start" : "justify-end"} bg-slate-900/20 backdrop-blur-xs transition-opacity select-none`}
          onClick={() => setMessageDrawerOpen(false)}
        >
          <div
            className={`flex h-full w-full max-w-md flex-col bg-surface shadow-dialog border-s border-hairline animate-in ${dir === "rtl" ? "slide-in-from-left" : "slide-in-from-right"} duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-hairline px-4 bg-surface">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold text-xs">
                  KM
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-primary">{selectedTeacher}</h3>
                  <span className="text-[10px] text-brand font-medium">Enseignant Principal</span>
                </div>
              </div>
              <button
                onClick={() => setMessageDrawerOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-canvas hover:text-ink-primary"
              >
                <X size={16} />
              </button>
            </div>

            {/* Moderation Disclosure Alert */}
            <div className="bg-amber-50 border-b border-amber-200 p-3 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldAlert size={15} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Supervision Administrative :</strong> Conformément aux règles de protection des élèves, toutes les conversations sont archivées et consultables par la direction.
              </div>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === "student" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      msg.sender === "student"
                        ? "bg-brand text-white"
                        : "bg-surface-subtle text-ink-primary border border-hairline"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-ink-muted mt-1 px-1">
                    <Num value={msg.time} />
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="border-t border-hairline p-3 bg-surface space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("student.drawer.placeholder")}
                  className="flex-1 rounded border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex h-8 w-8 items-center justify-center rounded bg-brand text-white hover:bg-brand-hover shadow-2xs transition-colors"
                >
                  <Send size={13} />
                </button>
              </div>
              <span className="text-[10px] text-ink-muted block text-center">
                Appuyez sur Entrée pour envoyer
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE QUIZ MODAL                                                    */}
      {/* ========================================================================= */}
      {activeQuizModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 select-none"
          onClick={() => setActiveQuizModal(null)}
        >
          <div
            className="flex w-full max-w-lg flex-col rounded-lg border border-hairline bg-surface shadow-dialog overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 items-center justify-between border-b border-hairline px-4 bg-surface">
              <div>
                <h3 className="text-xs font-bold text-ink-primary">{activeQuizModal.title}</h3>
                <span className="text-[10px] text-ink-muted">
                  {activeQuizModal.subject} • <Num value={`${activeQuizModal.durationMinutes} minutes`} />
                </span>
              </div>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:bg-canvas"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4 space-y-4 text-xs">
              <div className="rounded border border-hairline bg-surface-subtle p-3 space-y-2">
                <span className="font-semibold text-ink-primary">
                  Question 1 / <Num value={activeQuizModal.totalQuestions} /> :
                </span>
                <p className="text-ink-secondary leading-relaxed font-mono">
                  Quelle est la primitive sur ℝ de la fonction f(x) = 2x · e^(x²) ?
                </p>
              </div>

              <div className="space-y-2">
                {[
                  "F(x) = e^(x²) + C",
                  "F(x) = 2 · e^(x²) + C",
                  "F(x) = (x²) · e^(x) + C",
                  "F(x) = e^(2x) + C",
                ].map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2.5 rounded border border-hairline p-2.5 hover:bg-canvas cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="quiz-answer"
                      defaultChecked={i === 0}
                      className="text-brand focus:ring-brand"
                    />
                    <span className="font-mono text-xs">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-hairline bg-surface-subtle px-4 py-2.5">
              <span className="text-[11px] text-ink-muted">Chronomètre : <Num value="14:32" /></span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="rounded border border-hairline bg-surface px-3 py-1.5 text-xs text-ink-secondary hover:bg-canvas"
                >
                  {t("common.action.cancel")}
                </button>
                <button
                  onClick={handleCompleteQuiz}
                  className="flex items-center gap-1.5 rounded bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover shadow-2xs"
                >
                  <Check size={13} />
                  <span>Soumettre le QCM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
