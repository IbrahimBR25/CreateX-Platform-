"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Search,
  SlidersHorizontal,
  Download,
  FileSpreadsheet,
  FileText,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Command,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  ShieldAlert,
  Bell,
  Settings,
  X,
  Phone,
  Mail,
  Receipt,
  Eye,
  MoreVertical,
  Filter,
  Sparkles
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SpaceSwitcher } from "@/components/SpaceSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Num } from "@/components/Num";

// --- Types ---
type Branch = "Tous" | "Mathématiques" | "Sciences Exp." | "Économie & Gestion" | "Sciences Informatiques" | "Collège";

type AttendanceStatus = "present" | "late" | "absent";
type FinanceStatus = "paid" | "pending" | "overdue";

interface GradeDetail {
  subject: string;
  coeff: number;
  dc: number; // Devoir de contrôle
  ds: number; // Devoir de synthèse
  average: number;
}

interface Student {
  id: string;
  matricule: string;
  name: string;
  gender: "M" | "F";
  birthDate: string;
  class: string;
  branch: Branch;
  guardian: {
    name: string;
    cin: string;
    phone: string;
    email: string;
  };
  attendance: {
    today: AttendanceStatus;
    lateMinutes?: number;
    totalAbsences: number;
    unjustified: number;
  };
  academic: {
    t1Average: number;
    rank: number;
    totalStudents: number;
    grades: GradeDetail[];
  };
  finance: {
    status: FinanceStatus;
    totalBilledTND: number;
    paidTND: number;
    dueTND: number;
    lastPaymentDate?: string;
    invoiceRef: string;
  };
}

// --- Tunisian High School Realistic Mock Data ---
const MOCK_STUDENTS: Student[] = [
  {
    id: "std-1",
    matricule: "2026-LYC-0142",
    name: "Youssef Chahed",
    gender: "M",
    birthDate: "14/05/2008",
    class: "4e Math 1 (Bac)",
    branch: "Mathématiques",
    guardian: {
      name: "Moncef Chahed",
      cin: "08472911",
      phone: "+216 98 412 890",
      email: "m.chahed@tunet.tn",
    },
    attendance: {
      today: "present",
      totalAbsences: 2,
      unjustified: 0,
    },
    academic: {
      t1Average: 17.85,
      rank: 1,
      totalStudents: 28,
      grades: [
        { subject: "Mathématiques", coeff: 4, dc: 18.5, ds: 18.0, average: 18.17 },
        { subject: "Sciences Physiques", coeff: 4, dc: 17.0, ds: 17.5, average: 17.33 },
        { subject: "Sciences Informatiques", coeff: 1.5, dc: 19.0, ds: 19.5, average: 19.33 },
        { subject: "Philosophie", coeff: 1, dc: 14.0, ds: 15.0, average: 14.67 },
        { subject: "Français", coeff: 1, dc: 16.0, ds: 16.5, average: 16.33 },
        { subject: "Anglais", coeff: 1, dc: 18.0, ds: 17.5, average: 17.67 },
      ],
    },
    finance: {
      status: "paid",
      totalBilledTND: 2850.0,
      paidTND: 2850.0,
      dueTND: 0.0,
      lastPaymentDate: "02/10/2026",
      invoiceRef: "FAC-2026-0042",
    },
  },
  {
    id: "std-2",
    matricule: "2026-LYC-0189",
    name: "Sarra Ben Salem",
    gender: "F",
    birthDate: "22/11/2008",
    class: "4e Sciences Exp. 2",
    branch: "Sciences Exp.",
    guardian: {
      name: "Habib Ben Salem",
      cin: "05193847",
      phone: "+216 24 550 123",
      email: "h.bensalem@topnet.tn",
    },
    attendance: {
      today: "present",
      totalAbsences: 1,
      unjustified: 0,
    },
    academic: {
      t1Average: 16.42,
      rank: 3,
      totalStudents: 31,
      grades: [
        { subject: "Sciences Naturelles (SVT)", coeff: 4, dc: 16.5, ds: 17.0, average: 16.83 },
        { subject: "Sciences Physiques", coeff: 4, dc: 16.0, ds: 16.5, average: 16.33 },
        { subject: "Mathématiques", coeff: 3, dc: 15.0, ds: 16.0, average: 15.67 },
        { subject: "Philosophie", coeff: 1, dc: 13.5, ds: 14.5, average: 14.17 },
        { subject: "Français", coeff: 1, dc: 17.0, ds: 18.0, average: 17.67 },
      ],
    },
    finance: {
      status: "pending",
      totalBilledTND: 2850.0,
      paidTND: 1425.0,
      dueTND: 1425.0,
      lastPaymentDate: "15/09/2026",
      invoiceRef: "FAC-2026-0089",
    },
  },
  {
    id: "std-3",
    matricule: "2026-LYC-0205",
    name: "Aziz Jaziri",
    gender: "M",
    birthDate: "03/02/2009",
    class: "3e Économie & Gestion",
    branch: "Économie & Gestion",
    guardian: {
      name: "Karim Jaziri",
      cin: "04981203",
      phone: "+216 55 901 442",
      email: "karim.jaziri@gnet.tn",
    },
    attendance: {
      today: "late",
      lateMinutes: 15,
      totalAbsences: 6,
      unjustified: 2,
    },
    academic: {
      t1Average: 13.15,
      rank: 12,
      totalStudents: 30,
      grades: [
        { subject: "Économie", coeff: 3.5, dc: 13.0, ds: 14.0, average: 13.67 },
        { subject: "Gestion", coeff: 3.5, dc: 12.5, ds: 13.0, average: 12.83 },
        { subject: "Mathématiques", coeff: 2, dc: 11.0, ds: 12.5, average: 12.0 },
        { subject: "Histoire-Géo", coeff: 1.5, dc: 14.0, ds: 15.0, average: 14.67 },
      ],
    },
    finance: {
      status: "overdue",
      totalBilledTND: 2650.0,
      paidTND: 800.0,
      dueTND: 1850.0,
      lastPaymentDate: "05/09/2026",
      invoiceRef: "FAC-2026-0105",
    },
  },
  {
    id: "std-4",
    matricule: "2026-LYC-0311",
    name: "Nourhene Khemir",
    gender: "F",
    birthDate: "19/08/2008",
    class: "4e Info 1 (Bac)",
    branch: "Sciences Informatiques",
    guardian: {
      name: "Sonia Khemir",
      cin: "07883921",
      phone: "+216 22 119 778",
      email: "sonia.khemir@gmail.com",
    },
    attendance: {
      today: "present",
      totalAbsences: 0,
      unjustified: 0,
    },
    academic: {
      t1Average: 18.25,
      rank: 1,
      totalStudents: 26,
      grades: [
        { subject: "Algorithmique & Prog.", coeff: 3.5, dc: 19.5, ds: 19.0, average: 19.17 },
        { subject: "Bases de Données (TIC)", coeff: 3, dc: 18.5, ds: 19.0, average: 18.83 },
        { subject: "Mathématiques", coeff: 3, dc: 17.5, ds: 18.0, average: 17.83 },
        { subject: "Sciences Physiques", coeff: 2, dc: 16.5, ds: 17.0, average: 16.83 },
      ],
    },
    finance: {
      status: "paid",
      totalBilledTND: 2850.0,
      paidTND: 2850.0,
      dueTND: 0.0,
      lastPaymentDate: "28/09/2026",
      invoiceRef: "FAC-2026-0144",
    },
  },
  {
    id: "std-5",
    matricule: "2026-COL-0082",
    name: "Mohamed Amine Dridi",
    gender: "M",
    birthDate: "11/04/2012",
    class: "9e Année de Base 2",
    branch: "Collège",
    guardian: {
      name: "Adel Dridi",
      cin: "06229104",
      phone: "+216 97 882 301",
      email: "adel.dridi@orange.tn",
    },
    attendance: {
      today: "absent",
      totalAbsences: 4,
      unjustified: 1,
    },
    academic: {
      t1Average: 11.80,
      rank: 19,
      totalStudents: 32,
      grades: [
        { subject: "Mathématiques", coeff: 3, dc: 10.5, ds: 11.5, average: 11.17 },
        { subject: "Arabe", coeff: 3, dc: 12.0, ds: 12.5, average: 12.33 },
        { subject: "Français", coeff: 2.5, dc: 11.0, ds: 12.0, average: 11.67 },
        { subject: "Sciences de la Vie", coeff: 2, dc: 13.0, ds: 12.5, average: 12.67 },
      ],
    },
    finance: {
      status: "pending",
      totalBilledTND: 2400.0,
      paidTND: 1200.0,
      dueTND: 1200.0,
      lastPaymentDate: "10/09/2026",
      invoiceRef: "FAC-2026-0211",
    },
  },
  {
    id: "std-6",
    matricule: "2026-LYC-0094",
    name: "Mariem Louati",
    gender: "F",
    birthDate: "08/10/2009",
    class: "2e Sciences 1",
    branch: "Sciences Exp.",
    guardian: {
      name: "Fatma Louati",
      cin: "05882390",
      phone: "+216 29 330 918",
      email: "fatma.louati@tunisair.com.tn",
    },
    attendance: {
      today: "present",
      totalAbsences: 1,
      unjustified: 0,
    },
    academic: {
      t1Average: 15.60,
      rank: 4,
      totalStudents: 29,
      grades: [
        { subject: "Mathématiques", coeff: 3.5, dc: 15.0, ds: 16.0, average: 15.67 },
        { subject: "Sciences Physiques", coeff: 3.5, dc: 16.0, ds: 16.5, average: 16.33 },
        { subject: "Sciences de la Vie", coeff: 2, dc: 15.5, ds: 15.0, average: 15.17 },
      ],
    },
    finance: {
      status: "paid",
      totalBilledTND: 2650.0,
      paidTND: 2650.0,
      dueTND: 0.0,
      lastPaymentDate: "01/10/2026",
      invoiceRef: "FAC-2026-0094",
    },
  },
  {
    id: "std-7",
    matricule: "2026-LYC-0277",
    name: "Bilel Mansouri",
    gender: "M",
    birthDate: "30/01/2008",
    class: "4e Math 2 (Bac)",
    branch: "Mathématiques",
    guardian: {
      name: "Tarek Mansouri",
      cin: "04128945",
      phone: "+216 93 400 512",
      email: "t.mansouri@planet.tn",
    },
    attendance: {
      today: "present",
      totalAbsences: 3,
      unjustified: 0,
    },
    academic: {
      t1Average: 16.90,
      rank: 2,
      totalStudents: 27,
      grades: [
        { subject: "Mathématiques", coeff: 4, dc: 17.5, ds: 18.0, average: 17.83 },
        { subject: "Sciences Physiques", coeff: 4, dc: 16.0, ds: 17.0, average: 16.67 },
      ],
    },
    finance: {
      status: "paid",
      totalBilledTND: 2850.0,
      paidTND: 2850.0,
      dueTND: 0.0,
      lastPaymentDate: "03/10/2026",
      invoiceRef: "FAC-2026-0277",
    },
  },
  {
    id: "std-8",
    matricule: "2026-COL-0112",
    name: "Emna Bouazizi",
    gender: "F",
    birthDate: "15/09/2013",
    class: "7e Année de Base 1",
    branch: "Collège",
    guardian: {
      name: "Mehdi Bouazizi",
      cin: "09118472",
      phone: "+216 50 771 902",
      email: "mehdi.bouazizi@yahoo.fr",
    },
    attendance: {
      today: "present",
      totalAbsences: 0,
      unjustified: 0,
    },
    academic: {
      t1Average: 16.10,
      rank: 2,
      totalStudents: 34,
      grades: [
        { subject: "Mathématiques", coeff: 3, dc: 16.0, ds: 16.5, average: 16.33 },
        { subject: "Arabe", coeff: 3, dc: 17.0, ds: 16.0, average: 16.33 },
      ],
    },
    finance: {
      status: "overdue",
      totalBilledTND: 2200.0,
      paidTND: 500.0,
      dueTND: 1700.0,
      lastPaymentDate: "01/09/2026",
      invoiceRef: "FAC-2026-0112",
    },
  },
];

export default function AdminCockpitPage() {
  const { t, locale, dir } = useI18n();

  // --- States ---
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch>("Tous");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(MOCK_STUDENTS[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const branchLabels: Record<Branch, string> = {
    "Tous": t("admin.branch.all"),
    "Mathématiques": t("admin.branch.math"),
    "Sciences Exp.": t("admin.branch.sciences"),
    "Économie & Gestion": t("admin.branch.eco"),
    "Sciences Informatiques": t("admin.branch.info"),
    "Collège": t("admin.branch.college"),
  };

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
        return;
      }

      // [ or Ctrl+B to toggle sidebar
      if ((e.key === "[" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b")) {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
        return;
      }

      // Escape to close drawers/spotlight
      if (e.key === "Escape") {
        if (spotlightOpen) setSpotlightOpen(false);
        if (drawerOpen) setDrawerOpen(false);
        return;
      }

      // j/k navigation when not in an input
      if (!["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName) && !spotlightOpen) {
        if (e.key === "j") {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredStudents.length - 1));
        } else if (e.key === "k") {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
          if (filteredStudents[selectedIndex]) {
            setSelectedStudent(filteredStudents[selectedIndex]);
            setDrawerOpen(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spotlightOpen, drawerOpen, selectedIndex]);

  // --- Filtering ---
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((std) => {
      const matchBranch = selectedBranch === "Tous" || std.branch === selectedBranch;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "present" && std.attendance.today === "present") ||
        (statusFilter === "absent" && std.attendance.today === "absent") ||
        (statusFilter === "late" && std.attendance.today === "late") ||
        (statusFilter === "paid" && std.finance.status === "paid") ||
        (statusFilter === "overdue" && std.finance.status === "overdue");
      const matchSearch =
        searchFilter.trim() === "" ||
        std.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        std.matricule.toLowerCase().includes(searchFilter.toLowerCase()) ||
        std.class.toLowerCase().includes(searchFilter.toLowerCase()) ||
        std.guardian.phone.includes(searchFilter);

      return matchBranch && matchStatus && matchSearch;
    });
  }, [selectedBranch, statusFilter, searchFilter]);

  // --- Spotlight Search Results ---
  const spotlightResults = useMemo(() => {
    if (!spotlightQuery.trim()) return [];
    const q = spotlightQuery.toLowerCase();
    const students = MOCK_STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.matricule.toLowerCase().includes(q) ||
        s.class.toLowerCase().includes(q)
    ).map((s) => ({
      type: t("admin.spotlight.typeStudent"),
      title: s.name,
      subtitle: `${s.matricule} • ${s.class}`,
      data: s,
    }));

    const teachers = [
      { name: "M. Karim Mansour", subject: "Mathématiques", role: "Coordonnateur Bac" },
      { name: "Mme Leila Bouazizi", subject: "SVT", role: "Prof. Principal 4e Sc." },
      { name: "M. Tarek Ben Youssef", subject: "Informatique", role: "Lab TIC" },
    ]
      .filter((t) => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))
      .map((tch) => ({
        type: t("admin.spotlight.typeTeacher"),
        title: tch.name,
        subtitle: `${tch.subject} (${tch.role})`,
        data: null,
      }));

    const invoices = MOCK_STUDENTS.filter(
      (s) =>
        s.finance.invoiceRef.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q)
    ).map((s) => ({
      type: t("admin.spotlight.typeInvoice"),
      title: `${s.finance.invoiceRef} - ${s.name}`,
      subtitle: `${s.finance.paidTND.toFixed(3)} TND / ${s.finance.totalBilledTND.toFixed(3)} TND`,
      data: s,
    }));

    return [...students, ...teachers, ...invoices];
  }, [spotlightQuery, t]);

  // --- CSV Export Handler ---
  const exportToCSV = () => {
    const headers = [
      "Matricule",
      "Élève",
      "Classe",
      "Filière",
      "Présence Aujourd'hui",
      "Moyenne T1",
      "Rang",
      "Statut Finance",
      "Montant Réglé (TND)",
      "Montant Dû (TND)",
      "Tuteur",
      "Téléphone Tuteur",
    ];

    const rows = filteredStudents.map((s) => [
      s.matricule,
      `"${s.name}"`,
      `"${s.class}"`,
      `"${s.branch}"`,
      s.attendance.today,
      s.academic.t1Average.toFixed(2),
      `${s.academic.rank}/${s.academic.totalStudents}`,
      s.finance.status,
      s.finance.paidTND.toFixed(3),
      s.finance.dueTND.toFixed(3),
      `"${s.guardian.name}"`,
      `"${s.guardian.phone}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EduTN_Export_Eleves_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-ink-primary font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. COLLAPSIBLE LEFT SIDEBAR (Linear Style with Keyboard Shortcuts)        */}
      {/* ========================================================================= */}
      <aside
        className={`relative flex flex-col border-e border-hairline bg-surface transition-all duration-200 ease-in-out select-none z-30 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* School Tenant Branding */}
        <div className="flex h-14 items-center justify-between border-b border-hairline px-3.5">
          {!sidebarCollapsed ? (
            <Link href="/" title="Retour à l'accueil CreateX" className="flex items-center gap-2.5 overflow-hidden hover:opacity-85 transition-opacity">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand text-white font-bold text-sm tracking-tight shadow-sm">
                LP
              </div>
              <div className="flex flex-col truncate">
                <span className="truncate text-xs font-bold uppercase tracking-wider text-ink-primary">
                  {t("admin.school.name")}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-present-dot"></span>
                  {t("admin.school.trimester")}
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/" title="Retour à l'accueil CreateX" className="mx-auto flex h-8 w-8 items-center justify-center rounded bg-brand text-white font-bold text-sm hover:opacity-85 transition-opacity">
              LP
            </Link>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={t("admin.sidebar.toggle")}
            className="flex h-7 w-7 items-center justify-center rounded border border-hairline text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            {sidebarCollapsed
              ? dir === "rtl" ? <ChevronLeft size={14} /> : <ChevronRight size={14} />
              : dir === "rtl" ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            {!sidebarCollapsed ? t("admin.sidebar.title") : "•••"}
          </div>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-semibold bg-brand-subtle text-brand border border-brand-border"
          >
            <LayoutDashboard size={16} className="shrink-0 text-brand" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.cockpit")}</span>}
            {!sidebarCollapsed && <kbd className="text-[9px]">G D</kbd>}
          </button>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <Users size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.students")}</span>}
            {!sidebarCollapsed && (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                <Num value={482} />
              </span>
            )}
          </button>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <GraduationCap size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.teachers")}</span>}
            {!sidebarCollapsed && (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                <Num value={42} />
              </span>
            )}
          </button>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <Calendar size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.timetable")}</span>}
          </button>

          <div className="pt-2 px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            {!sidebarCollapsed ? t("admin.sidebar.pedagogyFinance") : "•••"}
          </div>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <Clock size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.attendance")}</span>}
            {!sidebarCollapsed && (
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
                <Num value="98.4%" />
              </span>
            )}
          </button>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <CreditCard size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.tuition")}</span>}
            {!sidebarCollapsed && (
              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200">
                <Num value="74.2%" />
              </span>
            )}
          </button>

          <button
            className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
          >
            <ShieldAlert size={16} className="shrink-0 text-ink-muted" />
            {!sidebarCollapsed && <span className="flex-1 text-start truncate">{t("admin.sidebar.moderation")}</span>}
            {!sidebarCollapsed && (
              <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                <Num value={3} />
              </span>
            )}
          </button>
        </div>

        {/* Sidebar Footer: User Profile & Keyboard Hints */}
        <div className="border-t border-hairline p-2.5 bg-surface-subtle">
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                  ST
                </div>
                <div className="flex flex-col truncate">
                  <span className="truncate text-xs font-semibold text-ink-primary">
                    Mme Sonia Trabelsi
                  </span>
                  <span className="truncate text-[10px] text-ink-muted">{t("admin.sidebar.userRole")}</span>
                </div>
              </div>
              <Settings size={14} className="text-ink-muted hover:text-ink-primary cursor-pointer shrink-0" />
            </div>
          ) : (
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
              ST
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN COCKPIT VIEWPORT                                                    */}
      {/* ========================================================================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* --- Global Top Bar (Spotlight Search Trigger + Context Controls) --- */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-surface px-4 z-20">
          {/* Spotlight Search Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSpotlightOpen(true)}
              className="flex h-8 w-80 items-center justify-between rounded border border-hairline bg-canvas px-2.5 text-xs text-ink-muted hover:border-slate-300 hover:text-ink-secondary transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search size={14} className="text-ink-muted shrink-0" />
                <span>{t("admin.search.placeholder")}</span>
              </div>
              <kbd className="flex items-center gap-0.5 font-mono text-[10px]">
                <span>⌘</span>K
              </kbd>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-ink-muted">
              <span>{t("admin.search.shortcuts")}</span>
              <kbd>J</kbd>/<kbd>K</kbd> {t("admin.search.shortcutLine")}
              <kbd>↵</kbd> {t("admin.search.shortcutDossier")}
              <kbd>[</kbd> {t("admin.search.shortcutSidebar")}
            </div>
          </div>

          {/* Quick Actions & Space Switcher */}
          <div className="flex items-center gap-2">
            <SpaceSwitcher current="admin" />
            <LanguageSwitcher />

            <button
              onClick={() => {
                setSelectedStudent(MOCK_STUDENTS[0]);
                setDrawerOpen(true);
              }}
              className="flex h-8 items-center gap-1.5 rounded bg-brand px-3 text-xs font-semibold text-white hover:bg-brand-hover shadow-sm transition-colors"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">{t("admin.action.newEnrollment")}</span>
            </button>

            <button
              title={t("admin.action.notifications")}
              className="relative flex h-8 w-8 items-center justify-center rounded border border-hairline text-ink-secondary hover:bg-canvas transition-colors"
            >
              <Bell size={14} />
              <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-status-absent-dot"></span>
            </button>
          </div>
        </header>

        {/* --- Scrollable Body Area --- */}
        <main className="flex-1 overflow-y-auto">
          {/* ========================================================================= */}
          {/* 2. TOP ROW OF 4 KPI METRIC CARDS (JetBrains Mono Tabular Hairline Strip)  */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-hairline bg-surface divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-hairline">
            {/* KPI 1: Taux de Présence */}
            <div className="p-3.5 hover:bg-canvas/50 transition-colors">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-medium">{t("admin.kpi.attendance.title")}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-present-text bg-status-present-bg px-1.5 py-0.2 rounded border border-status-present-border">
                  <TrendingUp size={11} /> {t("admin.kpi.attendance.trend")}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-ink-primary">
                  <Num value="98.4%" />
                </span>
                <span className="text-xs text-ink-muted">{t("admin.kpi.attendance.subtitle")}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-secondary">
                <Num value={474} /> {t("common.status.present")} / <Num value={482} /> {t("admin.sidebar.students")}
              </p>
            </div>

            {/* KPI 2: Effectif Total Actif */}
            <div className="p-3.5 hover:bg-canvas/50 transition-colors">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-medium">{t("admin.kpi.enrollment.title")}</span>
                <span className="text-[11px] text-ink-muted">{t("admin.kpi.enrollment.subtitle")}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-ink-primary">
                  <Num value={482} />
                </span>
                <span className="text-xs text-ink-muted">{t("admin.kpi.enrollment.badge")}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-secondary">
                <Num value={198} /> {t("admin.branch.college")} •{" "}
                <Num value={284} /> Lycée
              </p>
            </div>

            {/* KPI 3: Moyenne Trimestre 1 */}
            <div className="p-3.5 hover:bg-canvas/50 transition-colors">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-medium">{t("admin.kpi.average.title")}</span>
                <span className="text-[11px] text-brand font-medium">{t("admin.kpi.average.badge")}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-ink-primary">
                  <Num value="14.82" />
                </span>
                <span className="text-xs text-ink-muted"><Num value={t("common.unit.outOf20")} /></span>
              </div>
              <p className="mt-1 text-[11px] text-ink-secondary">
                {t("admin.kpi.average.subtitle")}
              </p>
            </div>

            {/* KPI 4: Recouvrement des Frais */}
            <div className="p-3.5 hover:bg-canvas/50 transition-colors">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1">
                <span className="font-medium">{t("admin.kpi.tuition.title")}</span>
                <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  <Num value="74.2%" />
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-ink-primary">
                  <Num value="418,250.000" />
                </span>
                <span className="text-xs text-ink-muted">{t("common.unit.tnd")}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-secondary">
                {t("admin.kpi.tuition.subtitle")}
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. HIGH-DENSITY STUDENT & FINANCE DATA GRID (--density 8)                 */}
          {/* ========================================================================= */}
          <div className="p-4 space-y-3">
            {/* Filter Toolbar & Branch Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface p-2.5 rounded border border-hairline">
              {/* Branch Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {(
                  [
                    "Tous",
                    "Mathématiques",
                    "Sciences Exp.",
                    "Économie & Gestion",
                    "Sciences Informatiques",
                    "Collège",
                  ] as Branch[]
                ).map((branch) => {
                  const count =
                    branch === "Tous"
                      ? MOCK_STUDENTS.length
                      : MOCK_STUDENTS.filter((s) => s.branch === branch).length;
                  const active = selectedBranch === branch;
                  return (
                    <button
                      key={branch}
                      onClick={() => setSelectedBranch(branch)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all whitespace-nowrap ${
                        active
                          ? "bg-brand text-white shadow-xs"
                          : "bg-surface-subtle text-ink-secondary hover:bg-slate-200 hover:text-ink-primary border border-hairline"
                      }`}
                    >
                      <span>{branchLabels[branch]}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          active ? "bg-emerald-800 text-white" : "bg-white text-ink-muted border border-hairline"
                        }`}
                      >
                        <Num value={count} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Status Selector + Search + Export Actions */}
              <div className="flex items-center gap-2">
                {/* Inline Search */}
                <div className="relative">
                  <Search size={13} className="absolute start-2.5 top-2.5 text-ink-muted" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t("admin.search.inlinePlaceholder")}
                    className="h-8 w-44 rounded border border-hairline bg-canvas ps-8 pe-2 text-xs text-ink-primary placeholder:text-ink-muted focus:border-brand focus:outline-hidden"
                  />
                </div>

                {/* Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-8 rounded border border-hairline bg-surface px-2.5 text-xs text-ink-secondary focus:border-brand focus:outline-hidden"
                >
                  <option value="all">{t("admin.filter.all")}</option>
                  <option value="present">{t("admin.filter.present")}</option>
                  <option value="late">{t("admin.filter.late")}</option>
                  <option value="absent">{t("admin.filter.absent")}</option>
                  <option value="paid">{t("admin.filter.paid")}</option>
                  <option value="overdue">{t("admin.filter.overdue")}</option>
                </select>

                {/* Export Buttons */}
                <button
                  onClick={exportToCSV}
                  title={t("admin.action.exportCsv")}
                  className="flex h-8 items-center gap-1.5 rounded border border-hairline bg-surface px-2.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
                >
                  <FileSpreadsheet size={14} className="text-emerald-700" />
                  <span className="hidden sm:inline">CSV</span>
                </button>

                <button
                  onClick={() => window.print()}
                  title={t("admin.action.exportPdf")}
                  className="flex h-8 items-center gap-1.5 rounded border border-hairline bg-surface px-2.5 text-xs font-medium text-ink-secondary hover:bg-canvas hover:text-ink-primary transition-colors"
                >
                  <FileText size={14} className="text-slate-700" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>
            </div>

            {/* High-Density Data Grid Container */}
            <div className="rounded border border-hairline bg-surface overflow-hidden shadow-xs">
              <div className="max-h-[calc(100vh-270px)] overflow-y-auto">
                <table className="w-full text-start border-collapse">
                  {/* Sticky Header */}
                  <thead className="sticky top-0 z-10 bg-surface-subtle border-b border-hairline text-[11px] font-semibold uppercase tracking-wider text-ink-muted select-none">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-brand focus:ring-brand"
                        />
                      </th>
                      <th className="py-2 px-3">Matricule</th>
                      <th className="py-2 px-3">{t("admin.table.student")}</th>
                      <th className="py-2 px-3">{t("admin.table.class")}</th>
                      <th className="py-2 px-3 text-center">{t("admin.table.attendance")}</th>
                      <th className="py-2 px-3 text-end">{t("admin.table.average")}</th>
                      <th className="py-2 px-3 text-center">{t("admin.table.tuition")}</th>
                      <th className="py-2 px-3 text-end">Réglé / Dû</th>
                      <th className="py-2 px-3 text-center w-16">{t("admin.table.actions")}</th>
                    </tr>
                  </thead>

                  {/* Dense Table Body (--density 8: py-1.5 px-3) */}
                  <tbody className="divide-y divide-hairline text-xs">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((std, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <tr
                            key={std.id}
                            onClick={() => {
                              setSelectedIndex(idx);
                              setSelectedStudent(std);
                              setDrawerOpen(true);
                            }}
                            className={`group cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-emerald-50/70 text-ink-primary border-s-2 border-s-brand"
                                : "hover:bg-canvas text-ink-secondary hover:text-ink-primary"
                            }`}
                          >
                            {/* Checkbox */}
                            <td
                              className="py-1.5 px-3 text-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-brand focus:ring-brand"
                              />
                            </td>

                            {/* Matricule */}
                            <td className="py-1.5 px-3 text-ink-muted">
                              <Num value={std.matricule} />
                            </td>

                            {/* Élève */}
                            <td className="py-1.5 px-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700 border border-hairline">
                                  {std.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="font-semibold text-ink-primary group-hover:text-brand transition-colors">
                                  {std.name}
                                </span>
                              </div>
                            </td>

                            {/* Classe & Filière */}
                            <td className="py-1.5 px-3">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-ink-primary">{std.class}</span>
                                <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] text-ink-muted border border-hairline">
                                  {branchLabels[std.branch] ?? std.branch}
                                </span>
                              </div>
                            </td>

                            {/* Présence Inline Status Badge */}
                            <td className="py-1.5 px-3 text-center">
                              {std.attendance.today === "present" && (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-status-present-bg text-status-present-text border border-status-present-border">
                                  <span className="h-1.5 w-1.5 rounded-full bg-status-present-dot"></span>
                                  {t("common.status.present")}
                                </span>
                              )}
                              {std.attendance.today === "late" && (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-status-pending-bg text-status-pending-text border border-status-pending-border">
                                  <span className="h-1.5 w-1.5 rounded-full bg-status-pending-dot"></span>
                                  {t("common.status.late")} (<Num value={`${std.attendance.lateMinutes}m`} />)
                                </span>
                              )}
                              {std.attendance.today === "absent" && (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-status-absent-bg text-status-absent-text border border-status-absent-border">
                                  <span className="h-1.5 w-1.5 rounded-full bg-status-absent-dot"></span>
                                  {t("common.status.absent")}
                                </span>
                              )}
                            </td>

                            {/* Moyenne T1 */}
                            <td className="py-1.5 px-3 text-end">
                              <span
                                className={`text-sm font-bold ${
                                  std.academic.t1Average >= 16
                                    ? "text-emerald-700"
                                    : std.academic.t1Average < 10
                                    ? "text-rose-600"
                                    : "text-ink-primary"
                                }`}
                              >
                                <Num value={std.academic.t1Average.toFixed(2)} />
                              </span>
                              <span className="text-[10px] text-ink-muted"> / 20</span>
                            </td>

                            {/* Statut Écolage */}
                            <td className="py-1.5 px-3 text-center">
                              {std.finance.status === "paid" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <CheckCircle2 size={11} className="text-emerald-600" />
                                  {t("common.status.paid")}
                                </span>
                              )}
                              {std.finance.status === "pending" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                                  <Clock size={11} className="text-amber-600" />
                                  {t("common.status.pending")}
                                </span>
                              )}
                              {std.finance.status === "overdue" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
                                  <AlertCircle size={11} className="text-rose-600" />
                                  {t("common.status.overdue")}
                                </span>
                              )}
                            </td>

                            {/* Montant Réglé / Dû */}
                            <td className="py-1.5 px-3 text-end text-xs">
                              <span className="font-semibold text-ink-primary">
                                <Num value={std.finance.paidTND.toFixed(3)} />
                              </span>
                              {std.finance.dueTND > 0 && (
                                <span className="block text-[10px] font-semibold text-rose-600">
                                  +<Num value={std.finance.dueTND.toFixed(3)} />
                                </span>
                              )}
                            </td>

                            {/* Action Eye */}
                            <td className="py-1.5 px-3 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStudent(std);
                                  setDrawerOpen(true);
                                }}
                                className="flex h-6 w-6 mx-auto items-center justify-center rounded text-ink-muted hover:bg-slate-200 hover:text-ink-primary transition-colors"
                              >
                                <Eye size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-ink-muted text-xs">
                          {t("admin.spotlight.noResults")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Grid Footer Bar */}
              <div className="flex items-center justify-between border-t border-hairline bg-surface-subtle px-3 py-2 text-xs text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span>
                    {t("admin.table.showing", { count: filteredStudents.length, total: MOCK_STUDENTS.length })}
                  </span>
                  <span className="text-ink-muted">•</span>
                  <span className="text-ink-muted text-[11px]">
                    Navigation clavier active (<kbd>J</kbd>/<kbd>K</kbd>)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-ink-muted">Page 1 de 1</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. SIDE-DRAWER INSPECTOR (Student & Finance Dossier)                       */}
      {/* ========================================================================= */}
      {drawerOpen && selectedStudent && (
        <div className={`fixed inset-0 z-50 flex ${dir === "rtl" ? "justify-start" : "justify-end"} bg-slate-900/20 backdrop-blur-xs transition-opacity`}>
          <div
            className={`flex h-full w-full max-w-lg flex-col bg-surface shadow-dialog border-s border-hairline animate-in ${dir === "rtl" ? "slide-in-from-left" : "slide-in-from-right"} duration-200 select-none`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex h-14 items-center justify-between border-b border-hairline px-4 bg-surface">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-subtle text-brand font-bold text-xs border border-brand-border">
                  {selectedStudent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink-primary">{selectedStudent.name}</h3>
                  <p className="text-[11px] text-ink-muted">
                    <Num value={selectedStudent.matricule} /> • {selectedStudent.class}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-canvas text-ink-muted hover:text-ink-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {/* Guardian & Contact Card */}
              <div className="rounded border border-hairline p-3 bg-surface-subtle space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                  {t("admin.drawer.guardianDetails")}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink-primary">{selectedStudent.guardian.name}</span>
                  <span className="text-[11px] text-ink-muted">
                    {t("admin.drawer.cin")} : <Num value={selectedStudent.guardian.cin} />
                  </span>
                </div>
                <div className="flex items-center gap-4 text-ink-secondary pt-1 border-t border-hairline">
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} className="text-brand shrink-0" />
                    <Num value={selectedStudent.guardian.phone} />
                  </span>
                  <span className="flex items-center gap-1.5 truncate">
                    <Mail size={12} className="text-brand shrink-0" />
                    {selectedStudent.guardian.email}
                  </span>
                </div>
              </div>

              {/* Academic Performance (Tunisian Coefficients & Grades) */}
              <div className="rounded border border-hairline bg-surface p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    {t("admin.drawer.academicReport")}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-ink-muted">{t("admin.drawer.avg")} :</span>
                    <span className="font-bold text-base text-brand">
                      <Num value={selectedStudent.academic.t1Average.toFixed(2)} />
                    </span>
                    <span className="text-[10px] text-ink-muted">/ 20</span>
                  </div>
                </div>

                {/* Gradebook Table */}
                <table className="w-full text-start border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-hairline text-ink-muted">
                      <th className="py-1">{t("admin.drawer.subject")}</th>
                      <th className="py-1 text-center">{t("admin.drawer.coeff")}</th>
                      <th className="py-1 text-end">{t("admin.drawer.dc")}</th>
                      <th className="py-1 text-end">{t("admin.drawer.ds")}</th>
                      <th className="py-1 text-end">{t("admin.drawer.avg")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {selectedStudent.academic.grades.map((g) => (
                      <tr key={g.subject}>
                        <td className="py-1 font-medium text-ink-primary">{g.subject}</td>
                        <td className="py-1 text-center text-ink-muted"><Num value={g.coeff} /></td>
                        <td className="py-1 text-end text-ink-secondary"><Num value={g.dc.toFixed(1)} /></td>
                        <td className="py-1 text-end text-ink-secondary"><Num value={g.ds.toFixed(1)} /></td>
                        <td className="py-1 text-end font-semibold text-ink-primary">
                          <Num value={g.average.toFixed(2)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Ledger (TND Millimes & Invoicing) */}
              <div className="rounded border border-hairline bg-surface p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                    {t("admin.drawer.financialLedger")}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    {t("admin.drawer.receiptRef")} : <Num value={selectedStudent.finance.invoiceRef} />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="rounded bg-canvas p-2 border border-hairline">
                    <span className="text-[10px] text-ink-muted block">{t("admin.drawer.totalBilled")}</span>
                    <span className="text-sm font-bold text-ink-primary">
                      <Num value={selectedStudent.finance.totalBilledTND.toFixed(3)} />{" "}
                      <span className="text-[10px] font-sans font-normal text-ink-muted">{t("common.unit.tnd")}</span>
                    </span>
                  </div>

                  <div className="rounded bg-canvas p-2 border border-hairline">
                    <span className="text-[10px] text-ink-muted block">{t("admin.drawer.paid")}</span>
                    <span className="text-sm font-bold text-status-present-text">
                      <Num value={selectedStudent.finance.paidTND.toFixed(3)} />{" "}
                      <span className="text-[10px] font-sans font-normal text-ink-muted">{t("common.unit.tnd")}</span>
                    </span>
                  </div>
                </div>

                {selectedStudent.finance.dueTND > 0 && (
                  <div className="rounded bg-rose-50 p-2.5 border border-rose-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-rose-800 block">{t("admin.drawer.balance")}</span>
                      <span className="text-[10px] text-rose-600">Date limite dépassée</span>
                    </div>
                    <span className="text-sm font-bold text-rose-700">
                      <Num value={selectedStudent.finance.dueTND.toFixed(3)} /> {t("common.unit.tnd")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Actions Footer */}
            <div className="flex items-center justify-between border-t border-hairline p-3 bg-surface-subtle">
              <button
                onClick={() => alert(`Téléchargement du bulletin officiel T1 pour ${selectedStudent.name}...`)}
                className="flex items-center gap-1.5 rounded border border-hairline bg-surface px-3 py-1.5 text-xs font-semibold text-ink-primary hover:bg-canvas transition-colors"
              >
                <FileText size={13} />
                <span>{t("admin.drawer.bulletinAction")}</span>
              </button>

              <button
                onClick={() => alert(`Génération du reçu de caisse ${selectedStudent.finance.invoiceRef}...`)}
                className="flex items-center gap-1.5 rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover transition-colors shadow-xs"
              >
                <Receipt size={13} />
                <span>{t("admin.drawer.receiptAction")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. GLOBAL SPOTLIGHT MODAL (Cmd+K / Ctrl+K)                                */}
      {/* ========================================================================= */}
      {spotlightOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/30 backdrop-blur-xs transition-opacity"
          onClick={() => setSpotlightOpen(false)}
        >
          <div
            className="flex w-full max-w-xl flex-col rounded-lg border border-hairline bg-surface shadow-dialog overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="flex h-12 items-center gap-3 border-b border-hairline px-3.5 bg-surface">
              <Search size={16} className="text-brand shrink-0" />
              <input
                autoFocus
                type="text"
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                placeholder={t("admin.search.placeholder")}
                className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-hidden"
              />
              <kbd className="text-[10px]">ESC</kbd>
            </div>

            {/* Results or Presets */}
            <div className="max-h-80 overflow-y-auto p-2 text-xs">
              {spotlightResults.length > 0 ? (
                <div className="space-y-1">
                  {spotlightResults.map((res, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (res.data) {
                          setSelectedStudent(res.data);
                          setDrawerOpen(true);
                        }
                        setSpotlightOpen(false);
                      }}
                      className="flex items-center justify-between rounded px-2.5 py-2 hover:bg-brand-subtle hover:text-brand cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 border border-hairline group-hover:border-brand-border">
                          {res.type}
                        </span>
                        <div>
                          <div className="font-semibold text-ink-primary group-hover:text-brand">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-ink-muted">
                            <Num value={res.subtitle} />
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight size={13} className="text-ink-muted group-hover:text-brand" />
                    </div>
                  ))}
                </div>
              ) : spotlightQuery.trim() !== "" ? (
                <div className="py-8 text-center text-ink-muted text-xs">
                  {t("admin.spotlight.noResults")} &ldquo;{spotlightQuery}&rdquo;
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted block">
                    {t("admin.spotlight.title")}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedBranch("Mathématiques");
                        setSpotlightOpen(false);
                      }}
                      className="flex items-center justify-between rounded border border-hairline p-2 text-start hover:bg-canvas transition-colors"
                    >
                      <span className="font-medium text-ink-primary">{branchLabels["Mathématiques"]}</span>
                      <kbd>4e Math</kbd>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBranch("Sciences Informatiques");
                        setSpotlightOpen(false);
                      }}
                      className="flex items-center justify-between rounded border border-hairline p-2 text-start hover:bg-canvas transition-colors"
                    >
                      <span className="font-medium text-ink-primary">{branchLabels["Sciences Informatiques"]}</span>
                      <kbd>TIC</kbd>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("overdue");
                        setSpotlightOpen(false);
                      }}
                      className="flex items-center justify-between rounded border border-hairline p-2 text-start hover:bg-canvas transition-colors"
                    >
                      <span className="font-medium text-rose-700">{t("admin.filter.overdue")}</span>
                      <kbd className="bg-rose-50 text-rose-700 border-rose-200">Alert</kbd>
                    </button>
                    <button
                      onClick={() => {
                        exportToCSV();
                        setSpotlightOpen(false);
                      }}
                      className="flex items-center justify-between rounded border border-hairline p-2 text-start hover:bg-canvas transition-colors"
                    >
                      <span className="font-medium text-emerald-800">{t("admin.action.exportCsv")}</span>
                      <kbd className="bg-emerald-50 text-emerald-700 border-emerald-200">Excel</kbd>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Spotlight Footer */}
            <div className="flex items-center justify-between border-t border-hairline bg-surface-subtle px-3 py-1.5 text-[11px] text-ink-muted">
              <span>{t("admin.spotlight.hint")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
