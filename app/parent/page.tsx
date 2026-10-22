"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CreditCard,
  Calendar,
  Clock,
  GraduationCap,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Users,
  ShieldCheck,
  Download,
  Send,
  UploadCloud,
  FileCheck,
  Stethoscope,
  Sparkles,
  Phone,
  Receipt,
  X,
  Check
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SpaceSwitcher } from "@/components/SpaceSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Num } from "@/components/Num";

// --- Types ---
type ChildId = "child-1" | "child-2";

interface ChildProfile {
  id: ChildId;
  name: string;
  nameAr: string;
  avatar: string;
  level: string;
  levelAr: string;
  schoolType: string;
  schoolTypeAr: string;
  class: string;
  classAr: string;
  attendance: {
    today: "present" | "absent" | "late";
    arrivalTime?: string;
    arrivalTimeAr?: string;
    alertMessage?: string;
    alertMessageAr?: string;
    unjustifiedCount: number;
    totalAbsences: number;
  };
  academics: {
    t1Average: number;
    rank: string;
    rankAr: string;
    recentGrades: {
      subject: string;
      subjectAr: string;
      score: number;
      max: number;
      type: string;
      typeAr: string;
      date: string;
      dateAr: string;
    }[];
    diagnosticFeedback: {
      teacher: string;
      teacherAr: string;
      subject: string;
      subjectAr: string;
      category: string;
      categoryAr: string;
      weakness: string;
      weaknessAr: string;
      remedy: string;
      remedyAr: string;
      date: string;
      dateAr: string;
    };
  };
  tuition: {
    totalBilledTND: number;
    paidTND: number;
    remainingTND: number;
    percentPaid: number;
    nextDueDate?: string;
    nextDueDateAr?: string;
    invoiceRef: string;
    status: "paid" | "partial" | "overdue";
  };
}

// Mock Tunisian Parent Data (M. Habib Ben Salem with 2 children in Prep and High School)
const CHILDREN_DATA: Record<ChildId, ChildProfile> = {
  "child-1": {
    id: "child-1",
    name: "Yassine Ben Salem",
    nameAr: "ياسين بن سالم",
    avatar: "YB",
    level: "8e Année de Base 2",
    levelAr: "السنة 8 أساسي 2",
    schoolType: "Collège",
    schoolTypeAr: "المدرسة الإعدادية",
    class: "8e B2",
    classAr: "8 أساسي 2",
    attendance: {
      today: "absent",
      alertMessage: "Absence non justifiée ce matin à 08h00 • Séance d'Arabe (Mme Mansouri)",
      alertMessageAr: "تسجيل غياب غير مبرر هذا الصباح على الساعة 08:00 • حصة العربية (الأستاذة المنصوري)",
      unjustifiedCount: 1,
      totalAbsences: 3,
    },
    academics: {
      t1Average: 14.20,
      rank: "7e sur 32 élèves",
      rankAr: "المرتبة 7 من 32 تلميذاً",
      recentGrades: [
        { subject: "Mathématiques", subjectAr: "الرياضيات", score: 13.5, max: 20, type: "Devoir de Contrôle 1", typeAr: "فرض مراقبة عدد 1", date: "Hier", dateAr: "أمس" },
        { subject: "Sciences Naturelles", subjectAr: "علوم الحياة والأرض", score: 16.0, max: 20, type: "TP Noté", typeAr: "أشغال تطبيقية", date: "12 Oct", dateAr: "12 أكتوبر" },
        { subject: "Français", subjectAr: "الفرنسية", score: 14.0, max: 20, type: "Devoir de Contrôle 1", typeAr: "فرض مراقبة عدد 1", date: "10 Oct", dateAr: "10 أكتوبر" },
      ],
      diagnosticFeedback: {
        teacher: "Mme Dorsaf Trabelsi",
        teacherAr: "الأستاذة درصاف الطرابلسي",
        subject: "Mathématiques",
        subjectAr: "الرياضيات",
        category: "Compréhension & Méthode",
        categoryAr: "الفهم والمنهجية",
        weakness: "Difficultés persistantes sur la factorisation et le calcul littéral.",
        weaknessAr: "صعوبات متواصلة في تفكيك العبارات الجبرية والحساب الحرفي.",
        remedy: "Refaire les exercices 3 et 4 de la fiche d'octobre. Séance de soutien recommandée jeudi après-midi.",
        remedyAr: "إعادة حل التمرينين 3 و4 من بطاقة أكتوبر. يُوصى بحضور حصة الدعم بعد ظهر يوم الخميس.",
        date: "14 Octobre 2026",
        dateAr: "14 أكتوبر 2026",
      },
    },
    tuition: {
      totalBilledTND: 2400.0,
      paidTND: 1600.0,
      remainingTND: 800.0,
      percentPaid: 66.7,
      nextDueDate: "15 Novembre 2026",
      nextDueDateAr: "15 نوفمبر 2026",
      invoiceRef: "FAC-COL-2026-0078",
      status: "partial",
    },
  },
  "child-2": {
    id: "child-2",
    name: "Sarra Ben Salem",
    nameAr: "سارة بن سالم",
    avatar: "SB",
    level: "2e Année Sciences 1",
    levelAr: "السنة 2 علوم 1",
    schoolType: "Lycée",
    schoolTypeAr: "المعهد الثانوي",
    class: "2e Sc 1",
    classAr: "2 علوم 1",
    attendance: {
      today: "present",
      arrivalTime: "07:54 (À l'heure)",
      arrivalTimeAr: "07:54 (في الوقت المحدد)",
      unjustifiedCount: 0,
      totalAbsences: 1,
    },
    academics: {
      t1Average: 16.42,
      rank: "3e sur 31 élèves",
      rankAr: "المرتبة 3 من 31 تلميذاً",
      recentGrades: [
        { subject: "Sciences Naturelles", subjectAr: "علوم الحياة والأرض", score: 17.0, max: 20, type: "Devoir de Contrôle 1", typeAr: "فرض مراقبة عدد 1", date: "Ce matin", dateAr: "هذا الصباح" },
        { subject: "Sciences Physiques", subjectAr: "العلوم الفيزيائية", score: 16.5, max: 20, type: "Devoir de Contrôle 1", typeAr: "فرض مراقبة عدد 1", date: "Hier", dateAr: "أمس" },
        { subject: "Mathématiques", subjectAr: "الرياضيات", score: 15.5, max: 20, type: "Devoir de Contrôle 1", typeAr: "فرض مراقبة عدد 1", date: "11 Oct", dateAr: "11 أكتوبر" },
      ],
      diagnosticFeedback: {
        teacher: "M. Karim Mansour",
        teacherAr: "الأستاذ كريم منصور",
        subject: "Sciences Physiques",
        subjectAr: "العلوم الفيزيائية",
        category: "Excellence & Rigueur",
        categoryAr: "التميز والدقة",
        weakness: "Léger manque de temps lors de la résolution du problème d'électrostatique.",
        weaknessAr: "نقص طفيف في إدارة الوقت أثناء حل مسألة الكهرباء الساكنة.",
        remedy: "Automatiser la rédaction des théorèmes fondamentaux pour gagner en vitesse.",
        remedyAr: "التعود على الصياغة السريعة للنظريات الأساسية لكسب الوقت.",
        date: "13 Octobre 2026",
        dateAr: "13 أكتوبر 2026",
      },
    },
    tuition: {
      totalBilledTND: 2850.0,
      paidTND: 2850.0,
      remainingTND: 0.0,
      percentPaid: 100,
      invoiceRef: "FAC-LYC-2026-0189",
      status: "paid",
    },
  },
};

export default function ParentSpacePage() {
  const { t, locale, dir } = useI18n();
  const [activeChildId, setActiveChildId] = useState<ChildId>("child-1");
  const [activeTab, setActiveTab] = useState<"overview" | "grades" | "tuition" | "messages">("overview");

  // Modals state
  const [justifyModalOpen, setJustifyModalOpen] = useState(false);
  const [justifyReason, setJustifyReason] = useState("medical");
  const [justifyNote, setJustifyNote] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [messageTeacherOpen, setMessageTeacherOpen] = useState(false);
  const [parentMessage, setParentMessage] = useState("");

  const activeChild = CHILDREN_DATA[activeChildId];
  const isAr = locale === "ar";
  const childName = isAr ? activeChild.nameAr : activeChild.name;
  const childLevel = isAr ? activeChild.levelAr : activeChild.level;
  const childSchoolType = isAr ? activeChild.schoolTypeAr : activeChild.schoolType;
  const childClass = isAr ? activeChild.classAr : activeChild.class;
  const childRank = isAr ? activeChild.academics.rankAr : activeChild.academics.rank;
  const childAlertMessage = isAr ? activeChild.attendance.alertMessageAr : activeChild.attendance.alertMessage;
  const childArrivalTime = isAr ? activeChild.attendance.arrivalTimeAr : activeChild.attendance.arrivalTime;
  const childDueDate = isAr ? activeChild.tuition.nextDueDateAr : activeChild.tuition.nextDueDate;

  const teacherName = isAr ? activeChild.academics.diagnosticFeedback.teacherAr : activeChild.academics.diagnosticFeedback.teacher;
  const teacherSubject = isAr ? activeChild.academics.diagnosticFeedback.subjectAr : activeChild.academics.diagnosticFeedback.subject;
  const teacherCategory = isAr ? activeChild.academics.diagnosticFeedback.categoryAr : activeChild.academics.diagnosticFeedback.category;
  const teacherWeakness = isAr ? activeChild.academics.diagnosticFeedback.weaknessAr : activeChild.academics.diagnosticFeedback.weakness;
  const teacherRemedy = isAr ? activeChild.academics.diagnosticFeedback.remedyAr : activeChild.academics.diagnosticFeedback.remedy;
  const teacherDate = isAr ? activeChild.academics.diagnosticFeedback.dateAr : activeChild.academics.diagnosticFeedback.date;

  const handleSendJustification = () => {
    const reasonText =
      justifyReason === "medical"
        ? t("parent.modal.medical")
        : justifyReason === "family"
        ? t("parent.modal.family")
        : t("parent.modal.transport");

    toast.success(t("parent.modal.successToast"), {
      description: t("parent.modal.successToastDesc", { reason: reasonText }),
    });
    setJustifyModalOpen(false);
    setJustifyNote("");
  };

  const handleSimulatePayment = () => {
    toast.success(t("parent.payment.successToast"), {
      description: t("parent.payment.successToastDesc", {
        amount: (activeChild.tuition.remainingTND + 1.0).toFixed(3),
      }),
    });
    setPaymentModalOpen(false);
  };

  const handleSendMessageToTeacher = () => {
    if (!parentMessage.trim()) return;
    toast.success(t("parent.message.sentToast", { teacher: teacherName }), {
      description: t("parent.message.sentToastDesc"),
    });
    setMessageTeacherOpen(false);
    setParentMessage("");
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-canvas text-ink-primary font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. DESKTOP WRAPPER TOP NAVIGATION BAR (All Spaces Switcher)               */}
      {/* ========================================================================= */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-surface px-4 z-20">
        <div className="flex items-center gap-3">
          <SpaceSwitcher current="parent" />
          <LanguageSwitcher />

          <div className="h-4 w-px bg-hairline" />

          <Link href="/" title="Retour à l'accueil CreateX" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow-xs">
              HB
            </span>
            <div>
              <h1 className="text-xs font-bold text-ink-primary">
                {t("parent.header.title")}
              </h1>
              <p className="text-[11px] text-ink-muted">
                {t("parent.header.subtitle", { count: 2 })}
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck size={13} className="text-emerald-600" />
            {t("parent.header.verifiedBadge")}
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE-FIRST FINTECH CONTAINER (Optimized for 390px-430px Viewports)   */}
      {/* ========================================================================= */}
      <div className="flex-1 flex justify-center py-0 md:py-6 overflow-y-auto">
        <div className="w-full max-w-[430px] flex flex-col bg-surface md:rounded-2xl md:border md:border-hairline md:shadow-dialog min-h-[calc(100vh-3.5rem)] md:min-h-[820px] relative overflow-hidden">
          
          {/* ======================================================================= */}
          {/* STICKY TOP HEADER: 1-Tap Child Switcher Pill (Apple Segmented Style)     */}
          {/* ======================================================================= */}
          <div className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-hairline p-3 select-none">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                {t("parent.child.switcherLabel")}
              </span>
              <span className="text-[10px] font-mono font-medium text-brand">
                {childSchoolType}
              </span>
            </div>

            {/* Segmented Control Pill */}
            <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 border border-hairline/80 gap-1">
              <button
                type="button"
                onClick={() => setActiveChildId("child-1")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 px-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                  activeChildId === "child-1"
                    ? "bg-surface text-ink-primary shadow-xs border border-hairline"
                    : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold">
                  YB
                </span>
                <div className="truncate text-start leading-tight">
                  <div className="truncate">{isAr ? "ياسين" : "Yassine"}</div>
                  <div className="text-[10px] font-normal text-ink-muted">
                    {isAr ? "8 أساسي (إعدادي)" : "8e Base (Collège)"}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveChildId("child-2")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 px-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                  activeChildId === "child-2"
                    ? "bg-surface text-ink-primary shadow-xs border border-hairline"
                    : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800">
                  SB
                </span>
                <div className="truncate text-start leading-tight">
                  <div className="truncate">{isAr ? "سارة" : "Sarra"}</div>
                  <div className="text-[10px] font-normal text-ink-muted">
                    {isAr ? "2 علوم 1 (معهد)" : "2e Sc 1 (Lycée)"}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* THUMB-FRIENDLY VERTICAL FEED                                            */}
          {/* ======================================================================= */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
            
            {/* --------------------------------------------------------------------- */}
            {/* CARD 1: TODAY'S ATTENDANCE STATUS                                     */}
            {/* --------------------------------------------------------------------- */}
            {activeChild.attendance.today === "absent" ? (
              /* Urgent Absent Alert Banner */
              <div className="rounded-xl border border-rose-300 bg-rose-50/80 p-4 shadow-hairline space-y-3 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-200 text-rose-700">
                      <AlertCircle size={16} />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-rose-900">
                        {t("parent.attendance.alertTitle")}
                      </h3>
                      <span className="text-[10px] font-mono text-rose-700">
                        {childLevel}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 border border-rose-300">
                    {t("parent.attendance.unjustified")}
                  </span>
                </div>

                <p className="text-xs text-rose-800 leading-relaxed font-medium">
                  {childAlertMessage}
                </p>

                <div className="pt-1 flex items-center justify-between border-t border-rose-200/80 text-[11px]">
                  <span className="text-rose-700">
                    {t("parent.attendance.totalAbsences", { count: activeChild.attendance.totalAbsences })}
                  </span>
                  <button
                    onClick={() => setJustifyModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg bg-rose-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-800 active:scale-[0.97] transition-all shadow-xs"
                  >
                    <UploadCloud size={13} />
                    <span>{t("parent.attendance.justifyAction")}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Present Status Card */
              <div className="rounded-xl border border-hairline bg-surface p-4 shadow-hairline space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 size={16} />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-ink-primary">
                        {t("parent.attendance.presentTitle")}
                      </h3>
                      <p className="text-[11px] text-ink-muted">
                        {childArrivalTime}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t("parent.attendance.inClassBadge")}
                  </span>
                </div>

                <div className="rounded-lg bg-surface-subtle p-2.5 border border-hairline flex items-center justify-between text-xs">
                  <span className="text-ink-secondary">{t("parent.attendance.totalSummary")}</span>
                  <span className="font-semibold text-ink-primary">
                    {t("parent.attendance.justifiedCount", { count: activeChild.attendance.totalAbsences })}
                  </span>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* CARD 2: LATEST GRADES & TEACHER DIAGNOSTIC FEEDBACK                   */}
            {/* --------------------------------------------------------------------- */}
            <div className="rounded-xl border border-hairline bg-surface p-4 shadow-hairline space-y-3">
              {/* Header with Average */}
              <div className="flex items-center justify-between pb-2 border-b border-hairline">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                    {t("parent.grades.title")}
                  </span>
                  <span className="text-xs font-semibold text-ink-primary">
                    {t("parent.grades.rank", { rank: childRank })}
                  </span>
                </div>

                <div className="text-end">
                  <span className="font-mono text-2xl font-bold text-brand tabular-nums">
                    <Num value={activeChild.academics.t1Average.toFixed(2)} />
                  </span>
                  <span className="font-mono text-[10px] text-ink-muted"> {t("common.unit.outOf20")}</span>
                </div>
              </div>

              {/* Recent Grades Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-ink-secondary block">
                  {t("parent.grades.recentGradesLabel")}
                </span>
                <div className="space-y-1">
                  {activeChild.academics.recentGrades.map((g, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-surface-subtle p-2 text-xs border border-hairline"
                    >
                      <div>
                        <span className="font-bold text-ink-primary block">
                          {isAr ? g.subjectAr : g.subject}
                        </span>
                        <span className="text-[10px] text-ink-muted font-mono">
                          {isAr ? g.typeAr : g.type} • {isAr ? g.dateAr : g.date}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm text-ink-primary tabular-nums">
                        <Num value={g.score.toFixed(1)} /> / <Num value={g.max} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidential Diagnostic Feedback from Teacher */}
              <div className="rounded-lg border border-brand-border bg-brand-subtle/70 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
                    <Stethoscope size={13} />
                    <span>{t("parent.grades.diagnosticAlert")}</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted">
                    {teacherDate}
                  </span>
                </div>

                <div className="text-xs text-ink-secondary space-y-1">
                  <p>
                    <strong className="text-ink-primary">
                      {teacherName} ({teacherSubject}) :
                    </strong>{" "}
                    {teacherWeakness}
                  </p>
                  <p className="rounded bg-surface p-2 border border-hairline text-[11px] text-ink-primary italic">
                    {t("parent.grades.remedyPrefix")} {teacherRemedy}
                  </p>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* CARD 3: TUITION FEE & FINTECH INSTALLMENT PROGRESS BAR                  */}
            {/* --------------------------------------------------------------------- */}
            <div className="rounded-xl border border-hairline bg-surface p-4 shadow-hairline space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-hairline">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                    {t("parent.tuition.title")}
                  </span>
                  <span className="text-xs font-mono text-ink-muted">
                    {t("parent.tuition.invoiceRef", { ref: activeChild.tuition.invoiceRef })}
                  </span>
                </div>

                {activeChild.tuition.status === "paid" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={11} className="text-emerald-600" />
                    {t("parent.tuition.paidFullBadge")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                    <Clock size={11} className="text-amber-600" />
                    {t("parent.tuition.partialBadge")}
                  </span>
                )}
              </div>

              {/* Progress Numbers */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-ink-muted block">{t("parent.tuition.paid")}</span>
                  <span className="font-mono text-lg font-bold text-status-present-text tabular-nums">
                    <Num value={activeChild.tuition.paidTND.toFixed(3)} />{" "}
                    <span className="text-xs font-sans font-normal text-ink-muted">{t("common.unit.tnd")}</span>
                  </span>
                </div>

                <div className="text-end">
                  <span className="text-[10px] text-ink-muted block">{t("parent.tuition.remaining")}</span>
                  <span className="font-mono text-lg font-bold text-ink-primary tabular-nums">
                    <Num value={activeChild.tuition.remainingTND.toFixed(3)} />{" "}
                    <span className="text-xs font-sans font-normal text-ink-muted">{t("common.unit.tnd")}</span>
                  </span>
                </div>
              </div>

              {/* Visual Apple/Fintech Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-hairline">
                  <div
                    className="h-full bg-brand transition-all duration-500 ease-out"
                    style={{ width: `${activeChild.tuition.percentPaid}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted">
                  <span>{t("parent.tuition.paidPercent", { percent: activeChild.tuition.percentPaid })}</span>
                  {childDueDate && (
                    <span>{t("parent.tuition.nextDue", { date: childDueDate })}</span>
                  )}
                </div>
              </div>

              {/* Actions Button */}
              <div className="flex gap-2 pt-1">
                {activeChild.tuition.remainingTND > 0 ? (
                  <button
                    onClick={() => setPaymentModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand-hover active:scale-[0.98] transition-all shadow-xs"
                  >
                    <CreditCard size={14} />
                    <span>
                      {t("parent.tuition.payAction", {
                        amount: activeChild.tuition.remainingTND.toFixed(3),
                      })}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => toast.success(t("parent.tuition.receiptToast"))}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-hairline bg-surface py-2 text-xs font-semibold text-ink-primary hover:bg-canvas transition-colors"
                  >
                    <Receipt size={14} className="text-brand" />
                    <span>{t("parent.tuition.receiptAction")}</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* 3. FLOATING BOTTOM NAVIGATION BAR (Apple Glassmorphism with 4 Tabs)     */}
          {/* ======================================================================= */}
          <div className="absolute bottom-3 inset-x-3 z-30 select-none">
            <nav className="flex items-center justify-around rounded-2xl bg-surface/95 backdrop-blur-md border border-hairline shadow-dialog py-2 px-1">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-[0.94] ${
                  activeTab === "overview" ? "text-brand font-bold" : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                <FileText size={18} />
                <span className="text-[10px] tracking-tight">{t("parent.tab.overview")}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("grades");
                  toast.info(`${t("parent.tab.grades")} : ${childName}`);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-[0.94] ${
                  activeTab === "grades" ? "text-brand font-bold" : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                <GraduationCap size={18} />
                <span className="text-[10px] tracking-tight">{t("parent.tab.grades")}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("tuition");
                  toast.info(`${t("parent.tab.tuition")} : ${activeChild.tuition.invoiceRef}`);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-[0.94] ${
                  activeTab === "tuition" ? "text-brand font-bold" : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                <CreditCard size={18} />
                <span className="text-[10px] tracking-tight">{t("parent.tab.tuition")}</span>
              </button>

              <button
                type="button"
                onClick={() => setMessageTeacherOpen(true)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-[0.94] ${
                  activeTab === "messages" ? "text-brand font-bold" : "text-ink-muted hover:text-ink-secondary"
                }`}
              >
                <MessageSquare size={18} />
                <span className="text-[10px] tracking-tight">{t("parent.tab.messages")}</span>
              </button>
            </nav>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABSENCE JUSTIFICATION MODAL / DRAWER                                     */}
      {/* ========================================================================= */}
      {justifyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/30 backdrop-blur-xs p-0 sm:p-4 select-none"
          onClick={() => setJustifyModalOpen(false)}
        >
          <div
            className="flex w-full max-w-md flex-col rounded-t-2xl sm:rounded-2xl border border-hairline bg-surface shadow-dialog overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 items-center justify-between border-b border-hairline px-4 bg-surface">
              <h3 className="text-xs font-bold text-ink-primary">
                {t("parent.modal.justifyTitle", { name: childName })}
              </h3>
              <button
                onClick={() => setJustifyModalOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:bg-canvas"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("parent.modal.reasonLabel")}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "medical", label: t("parent.modal.medical") },
                    { id: "family", label: t("parent.modal.family") },
                    { id: "transport", label: t("parent.modal.transport") },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setJustifyReason(item.id)}
                      className={`rounded-lg py-2 px-1 text-center text-xs font-medium transition-colors border ${
                        justifyReason === item.id
                          ? "bg-brand text-white border-brand font-bold"
                          : "bg-surface-subtle text-ink-secondary border-hairline hover:bg-slate-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("parent.modal.commentLabel")}
                </label>
                <textarea
                  rows={3}
                  value={justifyNote}
                  onChange={(e) => setJustifyNote(e.target.value)}
                  placeholder={t("parent.modal.commentPlaceholder")}
                  className="w-full rounded-lg border border-hairline bg-canvas p-2 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
                />
              </div>

              {/* Upload Mock Box */}
              <div className="rounded-lg border-2 border-dashed border-hairline p-3 text-center bg-canvas/60 space-y-1 cursor-pointer hover:border-brand transition-colors">
                <UploadCloud size={20} className="mx-auto text-brand" />
                <span className="text-xs font-semibold text-ink-primary block">
                  {t("parent.modal.uploadLabel")}
                </span>
                <span className="text-[10px] text-ink-muted block">
                  {t("parent.modal.uploadHint")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-hairline bg-surface-subtle px-4 py-2.5">
              <button
                type="button"
                onClick={() => setJustifyModalOpen(false)}
                className="rounded-lg border border-hairline bg-surface px-3 py-1.5 text-xs text-ink-secondary hover:bg-canvas"
              >
                {t("common.action.cancel")}
              </button>
              <button
                type="button"
                onClick={handleSendJustification}
                className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover shadow-xs"
              >
                <Check size={13} />
                <span>{t("parent.modal.submit")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ONLINE PAYMENT MODAL (Tunisian Fintech Gateway Simulation)                */}
      {/* ========================================================================= */}
      {paymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 select-none"
          onClick={() => setPaymentModalOpen(false)}
        >
          <div
            className="flex w-full max-w-sm flex-col rounded-2xl border border-hairline bg-surface shadow-dialog overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 items-center justify-between border-b border-hairline px-4 bg-surface">
              <h3 className="text-xs font-bold text-ink-primary">
                {t("parent.payment.modalTitle")}
              </h3>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded text-ink-muted hover:bg-canvas"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-4 space-y-3.5 text-xs">
              <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-emerald-800 block">
                    {t("parent.payment.amountDue", { name: childName })}
                  </span>
                  <span className="font-mono text-xl font-bold text-emerald-900 tabular-nums">
                    <Num value={activeChild.tuition.remainingTND.toFixed(3)} /> {t("common.unit.tnd")}
                  </span>
                </div>
                <CreditCard size={24} className="text-brand" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-ink-secondary block">
                  {t("parent.payment.methodsLabel")}
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold text-center">
                  <div className="rounded-lg border border-hairline p-2 bg-surface-subtle">
                    {t("parent.payment.cib")}
                  </div>
                  <div className="rounded-lg border border-hairline p-2 bg-surface-subtle">
                    {t("parent.payment.edinar")}
                  </div>
                  <div className="rounded-lg border border-hairline p-2 bg-surface-subtle">
                    {t("parent.payment.flouci")}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-surface-subtle p-2.5 border border-hairline text-[11px] text-ink-secondary space-y-1">
                <div className="flex justify-between">
                  <span>{t("parent.payment.tuitionFee")}</span>
                  <span className="font-mono font-medium">
                    <Num value={activeChild.tuition.remainingTND.toFixed(3)} /> {t("common.unit.tnd")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("parent.payment.fiscalStamp")}</span>
                  <span className="font-mono font-medium">
                    <Num value="1.000" /> {t("common.unit.tnd")}
                  </span>
                </div>
                <div className="flex justify-between border-t border-hairline pt-1 font-bold text-ink-primary">
                  <span>{t("parent.payment.totalDebited")}</span>
                  <span className="font-mono text-brand">
                    <Num value={(activeChild.tuition.remainingTND + 1.0).toFixed(3)} /> {t("common.unit.tnd")}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={handleSimulatePayment}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand-hover active:scale-[0.98] transition-all shadow-xs"
              >
                <Check size={14} />
                <span>
                  {t("parent.payment.confirmPay", {
                    amount: (activeChild.tuition.remainingTND + 1.0).toFixed(3),
                  })}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MESSAGE TEACHER DRAWER                                                    */}
      {/* ========================================================================= */}
      {messageTeacherOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-xs transition-opacity select-none"
          onClick={() => setMessageTeacherOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-md flex-col bg-surface shadow-dialog border-s border-hairline animate-in slide-in-from-end duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-hairline px-4 bg-surface">
              <div>
                <h3 className="text-xs font-bold text-ink-primary">
                  {t("parent.message.modalTitle")}
                </h3>
                <span className="text-[10px] text-ink-muted">
                  {t("parent.message.studentConcerned", { name: childName, class: childClass })}
                </span>
              </div>
              <button
                onClick={() => setMessageTeacherOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-canvas"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 flex-1 space-y-3 text-xs overflow-y-auto">
              <div className="rounded-lg bg-surface-subtle p-3 border border-hairline space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                  {t("parent.message.recipient")}
                </span>
                <span className="font-semibold text-ink-primary block">
                  {teacherName}
                </span>
                <span className="text-[11px] text-ink-muted font-mono">
                  {t("parent.message.subjectLabel", { subject: teacherSubject })}
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-ink-secondary">
                  {t("parent.message.label")}
                </label>
                <textarea
                  rows={5}
                  value={parentMessage}
                  onChange={(e) => setParentMessage(e.target.value)}
                  placeholder={t("parent.message.placeholder")}
                  className="w-full rounded-lg border border-hairline bg-canvas p-2.5 text-xs text-ink-primary focus:border-brand focus:outline-hidden"
                />
              </div>

              <div className="rounded-lg bg-emerald-50 p-2.5 border border-emerald-200 text-[10px] text-emerald-800">
                {t("parent.message.securityNotice")}
              </div>
            </div>

            <div className="border-t border-hairline p-3 bg-surface">
              <button
                onClick={handleSendMessageToTeacher}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand-hover shadow-xs active:scale-[0.98] transition-all"
              >
                <Send size={13} />
                <span>{t("parent.message.send")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
