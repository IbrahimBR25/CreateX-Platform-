"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Users,
  Clock,
  CreditCard,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Save,
  RotateCcw,
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Sparkles,
  Search,
  Check,
  X,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SpaceSwitcher } from "@/components/SpaceSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Num } from "@/components/Num";

// --- Types ---
type AttendanceState = "present" | "absent" | "late";

interface StudentAttendance {
  id: string;
  matricule: string;
  name: string;
  gender: "M" | "F";
  status: AttendanceState;
  lateMinutes?: number;
  diagnosticNote?: {
    category: "Compréhension" | "Méthodologie" | "Attention" | "Devoir non fait";
    weakness: string;
    remedy: string;
    date: string;
  };
}

// 4e Math 1 Classroom Roster
const INITIAL_CLASSROOM: StudentAttendance[] = [
  { id: "s1", matricule: "2026-LYC-0142", name: "Youssef Chahed", gender: "M", status: "present" },
  { id: "s2", matricule: "2026-LYC-0189", name: "Sarra Ben Salem", gender: "F", status: "present" },
  { id: "s3", matricule: "2026-LYC-0205", name: "Aziz Jaziri", gender: "M", status: "present" },
  { id: "s4", matricule: "2026-LYC-0311", name: "Nourhene Khemir", gender: "F", status: "present" },
  { id: "s5", matricule: "2026-LYC-0094", name: "Mariem Louati", gender: "F", status: "present" },
  { id: "s6", matricule: "2026-LYC-0277", name: "Bilel Mansouri", gender: "M", status: "present" },
  { id: "s7", matricule: "2026-LYC-0301", name: "Kenza Trabelsi", gender: "F", status: "present" },
  { id: "s8", matricule: "2026-LYC-0319", name: "Skander Guediche", gender: "M", status: "present" },
  { id: "s9", matricule: "2026-LYC-0344", name: "Sirine Zorgati", gender: "F", status: "present" },
  { id: "s10", matricule: "2026-LYC-0382", name: "Wassim Ben Abdallah", gender: "M", status: "present" },
  { id: "s11", matricule: "2026-LYC-0402", name: "Farah Sellami", gender: "F", status: "present" },
  { id: "s12", matricule: "2026-LYC-0418", name: "Amine Mzoughi", gender: "M", status: "present" },
  { id: "s13", matricule: "2026-LYC-0435", name: "Rania Belhadj", gender: "F", status: "present" },
  { id: "s14", matricule: "2026-LYC-0450", name: "Mohamed Hedi Triki", gender: "M", status: "present" },
  { id: "s15", matricule: "2026-LYC-0466", name: "Molka Dakhli", gender: "F", status: "present" },
  { id: "s16", matricule: "2026-LYC-0482", name: "Ahmed Cherif", gender: "M", status: "present" },
  { id: "s17", matricule: "2026-LYC-0499", name: "Chiraz Rekik", gender: "F", status: "present" },
  { id: "s18", matricule: "2026-LYC-0512", name: "Omar Boukhris", gender: "M", status: "present" },
  { id: "s19", matricule: "2026-LYC-0528", name: "Yasmine Ayari", gender: "F", status: "present" },
  { id: "s20", matricule: "2026-LYC-0544", name: "Mehdi Guellouz", gender: "M", status: "present" },
];

export default function TeacherWorkspacePage() {
  const { t, locale, dir } = useI18n();

  // --- States ---
  const [students, setStudents] = useState<StudentAttendance[]>(INITIAL_CLASSROOM);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDiagnosticStudent, setActiveDiagnosticStudent] = useState<StudentAttendance | null>(null);

  // Diagnostic form state
  const [diagCategory, setDiagCategory] = useState<"Compréhension" | "Méthodologie" | "Attention" | "Devoir non fait">("Compréhension");
  const [diagWeakness, setDiagWeakness] = useState("");
  const [diagRemedy, setDiagRemedy] = useState("");

  // Curriculum tracker state
  const [lessonTitle, setLessonTitle] = useState("Chapitre 4 : Calcul Intégral & Primitives usuelles");
  const [curriculumProgress, setCurriculumProgress] = useState(42);
  const [whereLeftOff, setWhereLeftOff] = useState("Démonstration théorème 3 (intégration par parties) terminée. Exercice 4 page 118 à corriger.");
  const [homework, setHomework] = useState("Exercices 5 et 6 page 119 pour la séance de vendredi.");
  const [isSaving, setIsSaving] = useState(false);

  // --- Attendance Cycle: Present -> Absent -> Late -> Present ---
  const toggleAttendance = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        if (s.status === "present") {
          return { ...s, status: "absent" };
        } else if (s.status === "absent") {
          return { ...s, status: "late", lateMinutes: 10 };
        } else {
          return { ...s, status: "present", lateMinutes: undefined };
        }
      })
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "present", lateMinutes: undefined })));
    toast.success(t("teacher.toast.allPresent"), {
      description: t("teacher.toast.allPresentDesc"),
    });
  };

  // --- Diagnostic Note Handlers ---
  const openDiagnostic = (student: StudentAttendance, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDiagnosticStudent(student);
    if (student.diagnosticNote) {
      setDiagCategory(student.diagnosticNote.category);
      setDiagWeakness(student.diagnosticNote.weakness);
      setDiagRemedy(student.diagnosticNote.remedy);
    } else {
      setDiagCategory("Compréhension");
      setDiagWeakness("");
      setDiagRemedy("");
    }
  };

  const saveDiagnostic = () => {
    if (!activeDiagnosticStudent) return;
    if (!diagWeakness.trim()) {
      toast.error(t("teacher.diag.weaknessRequired"));
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== activeDiagnosticStudent.id) return s;
        return {
          ...s,
          diagnosticNote: {
            category: diagCategory,
            weakness: diagWeakness,
            remedy: diagRemedy,
            date: "Aujourd'hui",
          },
        };
      })
    );

    toast.success(t("teacher.toast.diagSaved", { name: activeDiagnosticStudent.name }), {
      description: t("teacher.toast.diagSavedDesc"),
    });
    setActiveDiagnosticStudent(null);
  };

  // --- Save Session & Attendance (Sonner toast trigger) ---
  const handleSaveSession = () => {
    setIsSaving(true);

    const presentCount = students.filter((s) => s.status === "present").length;
    const absentCount = students.filter((s) => s.status === "absent").length;
    const lateCount = students.filter((s) => s.status === "late").length;

    setTimeout(() => {
      setIsSaving(false);
      toast.success(t("teacher.toast.sessionSaved"), {
        description: t("teacher.toast.sessionSavedDesc", {
          present: presentCount,
          absent: absentCount,
          late: lateCount,
        }),
        duration: 4000,
      });
    }, 400);
  };

  // --- Filtering ---
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.matricule.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const present = students.filter((s) => s.status === "present").length;
    const absent = students.filter((s) => s.status === "absent").length;
    const late = students.filter((s) => s.status === "late").length;
    return { present, absent, late, total: students.length };
  }, [students]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-ink-primary font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP UTILITY BAR (Context & Space Switcher)                             */}
      {/* ========================================================================= */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-surface px-4 z-20">
          <div className="flex items-center gap-3">
            <SpaceSwitcher current="teacher" />
            <LanguageSwitcher />

            <div className="h-4 w-px bg-hairline" />

            <Link href="/" title="Retour à l'accueil CreateX" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-brand text-white font-bold text-xs">
                M
              </span>
              <div>
                <h1 className="text-xs font-bold text-ink-primary">
                  {t("teacher.header.title")} • {t("teacher.header.teacherName")}
                </h1>
                <p className="text-[11px] text-ink-muted">
                  {t("teacher.header.sessionInfo")}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t("teacher.header.liveBadge")}
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. SPLIT-SCREEN WORKSPACE (70% Left Roster / 30% Right Curriculum Tracker)*/}
        {/* ========================================================================= */}
        <div className="flex flex-1 overflow-hidden">
          {/* ======================================================================= */}
          {/* LEFT PANEL (70% width): Instant Attendance & Diagnostic Grid            */}
          {/* ======================================================================= */}
          <section className="flex flex-col flex-1 lg:w-[70%] border-e border-hairline bg-canvas overflow-hidden">
            {/* Roster Controls & Stats Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-hairline bg-surface px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-ink-primary">{t("teacher.roster.title")} :</span>
                  <span className="text-xs font-bold text-slate-800">
                    <Num value={stats.total} /> élèves
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <Num value={stats.present} /> {t("common.status.present")}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                    <Num value={stats.absent} /> {t("common.status.absent")}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    <Num value={stats.late} /> {t("common.status.late")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute start-2.5 top-2 text-ink-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("teacher.roster.search")}
                    className="h-7 w-36 rounded border border-hairline bg-canvas ps-7 pe-2 text-xs text-ink-primary placeholder:text-ink-muted focus:border-brand focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={markAllPresent}
                  title={t("teacher.roster.markAllPresent")}
                  className="flex h-7 items-center gap-1 rounded border border-hairline bg-surface px-2 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">{t("teacher.roster.markAllPresent")}</span>
                </button>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="flex items-center justify-between bg-surface-subtle border-b border-hairline px-4 py-1.5 text-[11px] text-ink-muted">
              <span>
                💡 <strong>60s :</strong> {t("teacher.roster.subtitle")}
              </span>
              <span>{t("teacher.roster.addDiagnostic")}</span>
            </div>

            {/* Responsive Student Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {filteredStudents.map((std) => {
                  const isPresent = std.status === "present";
                  const isAbsent = std.status === "absent";
                  const isLate = std.status === "late";

                  return (
                    <div
                      key={std.id}
                      onClick={() => toggleAttendance(std.id)}
                      className={`group relative flex items-center justify-between rounded border p-2.5 select-none cursor-pointer transition-all duration-150 active:scale-[0.98] ${
                        isPresent
                          ? "bg-surface border-hairline hover:border-emerald-300 hover:shadow-hairline"
                          : isAbsent
                          ? "bg-rose-50/70 border-rose-300 shadow-hairline"
                          : "bg-amber-50/70 border-amber-300 shadow-hairline"
                      }`}
                      style={{
                        transition: "transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease-out, border-color 150ms ease-out",
                      }}
                    >
                      {/* Left: Avatar & Identity */}
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            isPresent
                              ? "bg-emerald-100 text-emerald-800"
                              : isAbsent
                              ? "bg-rose-200 text-rose-900"
                              : "bg-amber-200 text-amber-900"
                          }`}
                        >
                          {std.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div className="truncate">
                          <h4 className="text-xs font-semibold text-ink-primary truncate group-hover:text-brand transition-colors">
                            {std.name}
                          </h4>
                          <span className="text-[10px] text-ink-muted">
                            <Num value={std.matricule} />
                          </span>
                        </div>
                      </div>

                      {/* Right: Attendance Toggle Badge + Diagnostic Note Trigger */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Attendance State Indicator */}
                        {isPresent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            {t("common.status.present")}
                          </span>
                        )}
                        {isAbsent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            <XCircle size={11} className="text-rose-600" />
                            {t("common.status.absent")}
                          </span>
                        )}
                        {isLate && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <AlertCircle size={11} className="text-amber-600" />
                            {t("common.status.late")} (<Num value={`${std.lateMinutes}m`} />)
                          </span>
                        )}

                        {/* Diagnostic Icon Popover Trigger */}
                        <button
                          onClick={(e) => openDiagnostic(std, e)}
                          title={
                            std.diagnosticNote
                              ? `${t("teacher.roster.diagnosticDone")}: ${std.diagnosticNote.weakness}`
                              : t("teacher.roster.addDiagnostic")
                          }
                          className={`flex h-7 w-7 items-center justify-center rounded transition-all ${
                            std.diagnosticNote
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "text-ink-muted hover:bg-slate-200 hover:text-ink-primary"
                          }`}
                        >
                          <Stethoscope size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* RIGHT PANEL (30% width): Session & Curriculum Tracker                   */}
          {/* ======================================================================= */}
          <aside className="hidden lg:flex flex-col w-[30%] bg-surface border-hairline overflow-y-auto p-4 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                {t("teacher.curriculum.title")}
              </span>
              <h2 className="text-sm font-bold text-ink-primary">
                {t("teacher.curriculum.progressLabel")}
              </h2>
            </div>

            {/* Lesson Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-secondary">
                {t("teacher.curriculum.lessonTitle")}
              </label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="ex: Calcul Intégral..."
                className="w-full rounded border border-hairline bg-canvas p-2 text-xs font-medium text-ink-primary focus:border-brand focus:outline-hidden"
              />
            </div>

            {/* Curriculum Progress Slider */}
            <div className="rounded border border-hairline bg-surface-subtle p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink-primary">{t("teacher.curriculum.progressLabel")}</span>
                <span className="font-bold text-brand text-sm">
                  <Num value={`${curriculumProgress}%`} />
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-brand transition-all duration-300"
                  style={{ width: `${curriculumProgress}%` }}
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={curriculumProgress}
                onChange={(e) => setCurriculumProgress(Number(e.target.value))}
                className="w-full accent-brand cursor-pointer"
              />
              <span className="text-[10px] text-ink-muted block">
                {t("teacher.curriculum.progressValue", { percent: curriculumProgress })}
              </span>
            </div>

            {/* "Where we left off" Notes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-ink-secondary">
                  {t("teacher.curriculum.whereLeftOff")}
                </label>
                <span className="text-[10px] text-ink-muted">Prochaine séance</span>
              </div>
              <textarea
                rows={3}
                value={whereLeftOff}
                onChange={(e) => setWhereLeftOff(e.target.value)}
                placeholder="Notez les exercices en cours ou les théorèmes abordés..."
                className="w-full rounded border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden leading-relaxed"
              />
            </div>

            {/* Homework Assignment */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-secondary">
                {t("teacher.curriculum.homework")}
              </label>
              <textarea
                rows={2}
                value={homework}
                onChange={(e) => setHomework(e.target.value)}
                placeholder="Consignes données à la classe..."
                className="w-full rounded border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
              />
            </div>

            {/* Save Button (60s action triggering Sonner toast) */}
            <div className="pt-2">
              <button
                onClick={handleSaveSession}
                disabled={isSaving}
                className="flex w-full items-center justify-center gap-2 rounded bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand-hover shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
              >
                <Save size={14} />
                <span>
                  {isSaving ? t("teacher.curriculum.saving") : t("teacher.curriculum.saveSession")}
                </span>
              </button>
              <p className="mt-1.5 text-center text-[10px] text-ink-muted">
                Synchronise instantanément l&apos;appel avec la vie scolaire et les parents.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INLINE POPUP / MODAL: DIAGNOSTIC NOTE (Weakness / Remedy)              */}
      {/* ========================================================================= */}
      {activeDiagnosticStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 select-none"
          onClick={() => setActiveDiagnosticStudent(null)}
        >
          <div
            className="flex w-full max-w-md flex-col rounded-lg border border-hairline bg-surface shadow-dialog overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            style={{
              transformOrigin: "center",
              transition: "transform 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Popover Header */}
            <div className="flex h-12 items-center justify-between border-b border-hairline px-4 bg-surface">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-subtle text-brand">
                  <Stethoscope size={13} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-primary">
                    {t("teacher.diag.title")} : {activeDiagnosticStudent.name}
                  </h3>
                  <p className="text-[10px] text-ink-muted">
                    <Num value={activeDiagnosticStudent.matricule} /> • 4e Math 1
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDiagnosticStudent(null)}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:bg-canvas hover:text-ink-primary transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Popover Form */}
            <div className="p-4 space-y-3 text-xs">
              {/* Category Pills */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("teacher.diag.category")}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      { key: "Compréhension", label: t("teacher.diag.catComprehension") },
                      { key: "Méthodologie", label: t("teacher.diag.catMethodology") },
                      { key: "Attention", label: t("teacher.diag.catAttention") },
                      { key: "Devoir non fait", label: t("teacher.diag.catHomework") },
                    ] as const
                  ).map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDiagCategory(key)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        diagCategory === key
                          ? "bg-brand text-white shadow-xs"
                          : "bg-surface-subtle text-ink-secondary hover:bg-slate-200 border border-hairline"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weakness textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("teacher.diag.weakness")}
                </label>
                <textarea
                  rows={2}
                  value={diagWeakness}
                  onChange={(e) => setDiagWeakness(e.target.value)}
                  placeholder={t("teacher.diag.weaknessPlaceholder")}
                  className="w-full rounded border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
                />
              </div>

              {/* Remedy textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("teacher.diag.remedy")}
                </label>
                <textarea
                  rows={2}
                  value={diagRemedy}
                  onChange={(e) => setDiagRemedy(e.target.value)}
                  placeholder={t("teacher.diag.remedyPlaceholder")}
                  className="w-full rounded border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="rounded bg-amber-50 p-2 border border-amber-200 text-[10px] text-amber-800 flex items-start gap-1.5">
                <AlertTriangle size={13} className="shrink-0 text-amber-600 mt-0.5" />
                <span>
                  {t("teacher.diag.privacyNote")}
                </span>
              </div>
            </div>

            {/* Popover Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-hairline bg-surface-subtle px-4 py-2.5">
              <button
                type="button"
                onClick={() => setActiveDiagnosticStudent(null)}
                className="rounded border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas transition-colors"
              >
                {t("common.action.cancel")}
              </button>
              <button
                type="button"
                onClick={saveDiagnostic}
                className="flex items-center gap-1.5 rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover shadow-xs transition-colors"
              >
                <Check size={13} />
                <span>{t("teacher.diag.save")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
