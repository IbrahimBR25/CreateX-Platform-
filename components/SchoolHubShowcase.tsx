"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Bell,
  Calendar,
  BookOpen,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Search,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  CheckSquare,
  Award,
  Clock,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const STUDENTS_LIST = [
  {
    name: "Sarah Mansouri",
    email: "s.mansouri@createx-edu.tn",
    id: "2026-01-001",
    classe: "10A • Sciences",
    dob: "18/04/2010",
    phone: "+216 98 101 010",
    address: "101 Av. Habib Bourguiba, Tunis",
    status: "Payé",
    avatarBg: "bg-teal-100 text-teal-800",
    initials: "SM",
  },
  {
    name: "Youssef Ben Ali",
    email: "y.benali@createx-edu.tn",
    id: "2026-02-002",
    classe: "12B • Math",
    dob: "22/07/2008",
    phone: "+216 22 405 112",
    address: "24 Rue du Lac Léman, Les Berges",
    status: "Payé",
    avatarBg: "bg-indigo-100 text-indigo-800",
    initials: "YB",
    selected: true,
  },
  {
    name: "Lina Gharbi",
    email: "l.gharbi@createx-edu.tn",
    id: "2026-03-003",
    classe: "9B • Collège",
    dob: "29/09/2011",
    phone: "+216 55 890 231",
    address: "15 Rue Ibn Khaldoun, Ennasr",
    status: "En retard",
    avatarBg: "bg-amber-100 text-amber-800",
    initials: "LG",
  },
  {
    name: "Mehdi Trabelsi",
    email: "m.trabelsi@createx-edu.tn",
    id: "2026-01-004",
    classe: "11A • Éco",
    dob: "03/11/2009",
    phone: "+216 97 312 440",
    address: "404 Av. Mohammed V, Tunis",
    status: "Payé",
    avatarBg: "bg-sky-100 text-sky-800",
    initials: "MT",
  },
  {
    name: "Inès Khelil",
    email: "i.khelil@createx-edu.tn",
    id: "2026-02-005",
    classe: "8B • Collège",
    dob: "19/01/2012",
    phone: "+216 29 654 118",
    address: "82 Rue des Jasmins, La Marsa",
    status: "Payé",
    avatarBg: "bg-rose-100 text-rose-800",
    initials: "IK",
  },
  {
    name: "Adam Chahed",
    email: "a.chahed@createx-edu.tn",
    id: "2026-03-006",
    classe: "9C • Collège",
    dob: "05/06/2011",
    phone: "+216 50 119 874",
    address: "19 Av. de Carthage, Sfax",
    status: "En retard",
    avatarBg: "bg-purple-100 text-purple-800",
    initials: "AC",
  },
  {
    name: "Nour Jaziri",
    email: "n.jaziri@createx-edu.tn",
    id: "2026-01-007",
    classe: "7C • Primaire",
    dob: "20/02/2013",
    phone: "+216 98 772 301",
    address: "707 Résidence Ennour, Sousse",
    status: "Payé",
    avatarBg: "bg-emerald-100 text-emerald-800",
    initials: "NJ",
  },
];

const NOTICES = [
  {
    title: "Rentrée & Assemblée Générale des Parents !",
    author: "Par la Directrice Linda Adora",
    date: "15 Avril 2026",
    views: "1.2K",
    badgeBg: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-sky-100 text-sky-700",
    excerpt:
      "Alors que nous entamons ce nouveau trimestre académique, nous sommes ravis d'accueillir les familles lors de la rencontre parents-enseignants ce vendredi à 16h00.",
  },
  {
    title: "Calendrier des Sélections Sportives & Clubs",
    author: "Par Coach Karim Mansour",
    date: "12 Avril 2026",
    views: "890",
    badgeBg: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-100 text-amber-700",
    excerpt:
      "Préparez-vous à représenter l'école ! Les inscriptions aux clubs de robotique, théâtre, football et natation sont désormais ouvertes sur le portail.",
  },
  {
    title: "Extension des Horaires de la Bibliothèque & Soutien",
    author: "Par Mme Salma Khelil • Pédagogie",
    date: "10 Avril 2026",
    views: "640",
    badgeBg: "bg-teal-100 text-teal-800",
    iconBg: "bg-teal-100 text-teal-700",
    excerpt:
      "Pour accompagner la préparation des examens trimestriels, la médiathèque et les séances de tutorat resteront ouvertes jusqu'à 18h30.",
  },
];

export function SchoolHubShowcase() {
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = STUDENTS_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.classe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative mt-16">
      {/* Decorative soft background aura inspired by the attached reference image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#DCE6FF]/70 via-[#E8EDFF]/60 to-[#CCFBF1]/50 blur-xl"
      />

      <div className="relative rounded-[2rem] border border-white/80 bg-[#EEF2FF]/75 p-4 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8">
        {/* Top bar explaining the multi-view showcase */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F2942] px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              Aperçu 360° de l&apos;Interface CreateX
            </span>
            <span className="text-xs font-medium text-slate-600 sm:text-sm">
              Trois vues synchronisées en temps réel : Pilotage Direction, Répertoire Élèves &amp; Portail d&apos;Annonces
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            Données synchronisées en direct
          </div>
        </div>

        {/* 12-Column Asymmetric Multi-Screen Grid matching the uploaded image */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* ============================================================
              LEFT LARGE SCREEN (7 cols): MAIN DASHBOARD (Tableau de bord)
          ============================================================ */}
          <div className="xl:col-span-7 flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl sm:p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* Left Sidebar inside Main Screen */}
              <div className="hidden lg:col-span-3 lg:flex lg:flex-col lg:justify-between border-r border-slate-100 pr-3">
                <div>
                  {/* Brand Logo */}
                  <div className="mb-6 flex items-center gap-2 px-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F2942] text-teal-400 shadow-sm">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-extrabold tracking-tight text-[#0F2942]">
                      CreateX
                    </span>
                  </div>

                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    MENU
                  </p>
                  <ul className="space-y-1 text-xs font-medium text-slate-600">
                    <li className="flex items-center gap-2.5 rounded-xl bg-sky-100/90 px-3 py-2 font-bold text-[#0F2942]">
                      <LayoutDashboard className="h-3.5 w-3.5 text-teal-600" />
                      Tableau de bord
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                      Enseignants
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      Élèves
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Présences
                    </li>
                    <li className="flex items-center justify-between rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <span className="flex items-center gap-2.5">
                        <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                        Finances
                      </span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <Bell className="h-3.5 w-3.5 text-slate-400" />
                      Annonces
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Calendrier
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      Ressources
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 hover:bg-slate-50">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      Messages
                    </li>
                  </ul>

                  <p className="mt-5 mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    AUTRE
                  </p>
                  <ul className="space-y-1 text-xs font-medium text-slate-500">
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      Profil
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5">
                      <Settings className="h-3.5 w-3.5 text-slate-400" />
                      Paramètres
                    </li>
                    <li className="flex items-center gap-2.5 rounded-xl px-3 py-1.5">
                      <LogOut className="h-3.5 w-3.5 text-slate-400" />
                      Déconnexion
                    </li>
                  </ul>
                </div>

                {/* Bottom Gradient CTA Card from Reference Image */}
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-sky-400 via-teal-500 to-[#0F2942] p-3.5 text-white shadow-md">
                  <p className="text-xs font-bold leading-snug">
                    Pilotez toute votre école en un clic
                  </p>
                  <p className="mt-1 text-[10px] text-sky-100">
                    Application Web &amp; Mobile synchronisée
                  </p>
                  <a
                    href="#planifier-reunion"
                    className="mt-3 block w-full rounded-full bg-white py-1.5 text-center text-[10px] font-bold text-[#0F2942] shadow-sm transition hover:bg-teal-50"
                  >
                    Demander une démo
                  </a>
                </div>
              </div>

              {/* Main Content Area of Left Screen */}
              <div className="lg:col-span-9 space-y-4">
                {/* Top Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-xs text-slate-400">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    <span>Rechercher un élève, un enseignant, une facture...</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <Bell className="h-3.5 w-3.5" />
                      <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </span>
                    <div className="flex items-center gap-2 pl-1">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-[#0F2942] leading-none">
                          Linda Adora
                        </p>
                        <p className="text-[10px] text-slate-400">Directrice</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2942] text-xs font-bold text-teal-300 ring-2 ring-teal-500/20">
                        LA
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Pastel Metric Cards Row + Right Calendar Strip */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  {/* Left 8 cols: 4 KPI cards + Charts */}
                  <div className="md:col-span-8 space-y-4">
                    {/* 4 Pastel Cards */}
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {/* Card 1: Students */}
                      <div className="rounded-2xl bg-[#DCE6FF] p-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                            <TrendingUp className="h-2.5 w-2.5" /> 15%
                          </span>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <p className="mt-2.5 text-lg font-extrabold text-[#0F2942] tabular-nums">
                          482
                        </p>
                        <p className="text-[11px] font-medium text-slate-600">Élèves</p>
                      </div>

                      {/* Card 2: Teachers */}
                      <div className="rounded-2xl bg-[#FDE68A] p-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                            <TrendingUp className="h-2.5 w-2.5" /> 3%
                          </span>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-600" />
                        </div>
                        <p className="mt-2.5 text-lg font-extrabold text-[#0F2942] tabular-nums">
                          48
                        </p>
                        <p className="text-[11px] font-medium text-slate-700">Enseignants</p>
                      </div>

                      {/* Card 3: Late Payments Alert */}
                      <div className="rounded-2xl bg-[#FFE4E6] p-3 ring-1 ring-rose-200">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                            <TrendingDown className="h-2.5 w-2.5" /> Alerte
                          </span>
                          <MoreHorizontal className="h-3.5 w-3.5 text-rose-400" />
                        </div>
                        <p className="mt-2.5 text-lg font-extrabold text-rose-700 tabular-nums">
                          12
                        </p>
                        <p className="text-[11px] font-semibold text-rose-700">
                          Retards paiement
                        </p>
                      </div>

                      {/* Card 4: Taux de Réussite / Distinctions */}
                      <div className="rounded-2xl bg-[#CCFBF1] p-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                            <TrendingUp className="h-2.5 w-2.5" /> 5%
                          </span>
                          <MoreHorizontal className="h-3.5 w-3.5 text-teal-700" />
                        </div>
                        <p className="mt-2.5 text-lg font-extrabold text-[#0F2942] tabular-nums">
                          95,8%
                        </p>
                        <p className="text-[11px] font-medium text-teal-900">Réussite</p>
                      </div>
                    </div>

                    {/* Middle Charts Row: Students Donut + Weekly Attendance Bars */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                      {/* Donut Card (5 cols) */}
                      <div className="sm:col-span-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#0F2942]">Élèves &amp; Équipe</p>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="relative mx-auto my-3 flex h-28 w-28 items-center justify-center">
                          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#E2E8F0"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#38BDF8"
                              strokeWidth="8"
                              strokeDasharray="251.2"
                              strokeDashoffset="20"
                              strokeLinecap="round"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="28"
                              fill="none"
                              stroke="#FEF3C7"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="28"
                              fill="none"
                              stroke="#FBBF24"
                              strokeWidth="8"
                              strokeDasharray="175.8"
                              strokeDashoffset="14"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-extrabold text-[#0F2942]">92%</span>
                            <span className="text-[9px] font-medium text-slate-500">Présence</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-center pt-1 border-t border-slate-200/60">
                          <div>
                            <div className="flex items-center justify-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-sky-400" />
                              <span className="text-[11px] font-bold text-[#0F2942]">482</span>
                            </div>
                            <p className="text-[9px] text-slate-400">Élèves (92%)</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-amber-400" />
                              <span className="text-[11px] font-bold text-[#0F2942]">48</span>
                            </div>
                            <p className="text-[9px] text-slate-400">Professeurs (96%)</p>
                          </div>
                        </div>
                      </div>

                      {/* Attendance Bar Chart Card (7 cols) */}
                      <div className="sm:col-span-7 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p className="text-xs font-bold text-[#0F2942]">Présences</p>
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center gap-0.5 rounded-md bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600 shadow-2xs">
                              Hebdo <ChevronDown className="h-2.5 w-2.5" />
                            </span>
                            <span className="inline-flex items-center gap-0.5 rounded-md bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600 shadow-2xs">
                              Tous niveaux <ChevronDown className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-amber-300" /> Total Présents
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-sky-300" /> Enseignants
                          </span>
                        </div>

                        {/* Bar columns */}
                        <div className="mt-4 flex h-28 items-end justify-between gap-2 px-2 pt-4">
                          {[
                            { day: "Lun", p: "72%", t: "64%" },
                            { day: "Mar", p: "84%", t: "76%" },
                            { day: "Mer", p: "95%", t: "88%", highlight: true },
                            { day: "Jeu", p: "80%", t: "85%" },
                            { day: "Ven", p: "78%", t: "70%" },
                          ].map((bar) => (
                            <div
                              key={bar.day}
                              className="relative flex flex-1 flex-col items-center gap-1.5 h-full justify-end"
                            >
                              {bar.highlight && (
                                <div className="absolute -top-3 z-10 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-[#0F2942] shadow-md ring-1 ring-slate-100">
                                  95%
                                </div>
                              )}
                              <div className="flex w-full items-end justify-center gap-1 h-full">
                                <div
                                  style={{ height: bar.p }}
                                  className="w-2.5 rounded-full bg-[#FDE047]"
                                />
                                <div
                                  style={{ height: bar.t }}
                                  className="w-2.5 rounded-full bg-[#7DD3FC]"
                                />
                              </div>
                              <span className="text-[9px] font-medium text-slate-400">
                                {bar.day}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Earnings & Financial Area Chart */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#0F2942]">
                          Trésorerie &amp; Frais de Scolarité
                        </p>
                        <div className="flex items-center gap-3 text-[9px] font-medium text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-sky-400" /> Encaissements
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-indigo-300" /> Dépenses &amp; Paie
                          </span>
                        </div>
                      </div>
                      <div className="relative mt-2 h-24 w-full">
                        <svg viewBox="0 0 400 90" className="h-full w-full overflow-visible">
                          <defs>
                            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,65 C40,40 70,55 110,35 C150,15 190,45 230,22 C270,5 310,30 350,18 C375,12 390,25 400,20 L400,85 L0,85 Z"
                            fill="url(#incomeGrad)"
                          />
                          <path
                            d="M0,65 C40,40 70,55 110,35 C150,15 190,45 230,22 C270,5 310,30 350,18 C375,12 390,25 400,20"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M0,72 C45,60 80,68 120,52 C160,38 200,58 240,42 C280,28 320,50 360,38 C380,32 392,40 400,35"
                            fill="none"
                            stroke="#A5B4FC"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                          />
                          <circle cx="230" cy="22" r="4" fill="#0F2942" stroke="#fff" strokeWidth="2" />
                        </svg>
                        <div className="absolute top-1 left-[52%] rounded-lg bg-white/95 px-2.5 py-1 text-[9px] shadow-md ring-1 ring-slate-200">
                          <p className="font-bold text-[#0F2942]">184 500 DT reçus</p>
                          <p className="text-slate-500">Paie auto : 64 200 DT</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 cols inside Main Dashboard: Calendar + Agenda + Messages */}
                  <div className="md:col-span-4 space-y-3">
                    {/* Calendar Strip */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                      <p className="text-center text-xs font-bold text-[#0F2942]">
                        Avril 2026
                      </p>
                      <div className="mt-2.5 grid grid-cols-7 gap-1 text-center">
                        {[
                          { d: "Dim", n: 19 },
                          { d: "Lun", n: 20 },
                          { d: "Mar", n: 21 },
                          { d: "Mer", n: 22 },
                          { d: "Jeu", n: 23 },
                          { d: "Ven", n: 24 },
                          { d: "Sam", n: 25 },
                        ].map((item) => {
                          const active = selectedDay === item.n;
                          return (
                            <button
                              key={item.n}
                              type="button"
                              onClick={() => setSelectedDay(item.n)}
                              className={`flex flex-col items-center rounded-xl py-1.5 text-[10px] transition ${
                                active
                                  ? "bg-sky-200/90 font-extrabold text-[#0F2942] shadow-2xs"
                                  : "text-slate-500 hover:bg-white"
                              }`}
                            >
                              <span className="text-[8px] opacity-75">{item.d}</span>
                              <span className="mt-0.5 text-xs font-bold">{item.n}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Agenda */}
                      <div className="mt-3.5 border-t border-slate-200/70 pt-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0F2942]">Agenda</span>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 rounded-xl bg-[#EDE9FE] p-2">
                            <span className="text-[9px] font-bold text-indigo-900 tabular-nums">
                              08:00
                            </span>
                            <div className="border-l-2 border-indigo-400 pl-2">
                              <p className="text-[8px] text-indigo-700">Tous les niveaux</p>
                              <p className="text-[10px] font-bold text-[#0F2942]">
                                Appel &amp; Annonces Matinales
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl bg-[#FEF3C7] p-2">
                            <span className="text-[9px] font-bold text-amber-900 tabular-nums">
                              10:00
                            </span>
                            <div className="border-l-2 border-amber-400 pl-2">
                              <p className="text-[8px] text-amber-800">Classes 3e–4e</p>
                              <p className="text-[10px] font-bold text-[#0F2942]">
                                Révision Mathématiques
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl bg-[#E0F2FE] p-2">
                            <span className="text-[9px] font-bold text-sky-900 tabular-nums">
                              14:30
                            </span>
                            <div className="border-l-2 border-sky-400 pl-2">
                              <p className="text-[8px] text-sky-800">Laboratoire 2</p>
                              <p className="text-[10px] font-bold text-[#0F2942]">
                                Expérience Sciences &amp; Quiz
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages Parent/Staff */}
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F2942]">Messages Parents</span>
                        <span className="text-[9px] font-semibold text-teal-600">Tout voir</span>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[9px] font-bold text-teal-800">
                            DR
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="truncate text-[10px] font-bold text-[#0F2942]">
                                Dr. Leila Mansouri
                              </p>
                              <span className="text-[8px] text-slate-400">09:00</span>
                            </div>
                            <p className="truncate text-[9px] text-slate-500">
                              Confirmation de présence pour la sortie scolaire du 15 avril.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] font-bold text-amber-800">
                            HM
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="truncate text-[10px] font-bold text-[#0F2942]">
                                M. Hichem Gharbi
                              </p>
                              <span className="text-[8px] text-slate-400">10:15</span>
                            </div>
                            <p className="truncate text-[9px] text-slate-500">
                              Virement des frais de scolarité T3 effectué ce matin.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN (5 cols): 2 STACKED SCREENS FROM ATTACHED IMAGE
              Top: Liste de tous les élèves (Student Directory Table)
              Bottom: Tableau d'affichage (Notice Board)
          ============================================================ */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            {/* TOP RIGHT SCREEN: All Students List */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-100 text-[#0F2942]">
                    <Users className="h-3.5 w-3.5 text-teal-600" />
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0F2942] sm:text-sm">
                    Liste Générale des Élèves &amp; Scolarité
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px]">
                  <Search className="h-3 w-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer par nom ou classe..."
                    className="w-32 bg-transparent text-[#0F2942] placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-2 pr-2">Nom de l&apos;élève</th>
                      <th className="py-2 px-2">Matricule</th>
                      <th className="py-2 px-2">Classe</th>
                      <th className="py-2 px-2">Téléphone Parent</th>
                      <th className="py-2 pl-2 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px]">
                    {filteredStudents.map((st) => (
                      <tr
                        key={st.id}
                        className={`transition hover:bg-slate-50/90 ${
                          st.selected ? "bg-indigo-50/60" : ""
                        }`}
                      >
                        <td className="py-2 pr-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${st.avatarBg}`}
                            >
                              {st.initials}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-bold text-[#0F2942]">{st.name}</p>
                              <p className="truncate text-[8px] text-slate-400">{st.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-2 font-mono text-[9px] text-slate-600 tabular-nums">
                          {st.id}
                        </td>
                        <td className="py-2 px-2 font-semibold text-slate-700">{st.classe}</td>
                        <td className="py-2 px-2 text-slate-500 tabular-nums">{st.phone}</td>
                        <td className="py-2 pl-2 text-right">
                          {st.status === "Payé" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                              <CheckCircle2 className="h-2.5 w-2.5" /> Payé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 ring-1 ring-rose-200">
                              <AlertCircle className="h-2.5 w-2.5" /> En retard
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[10px] text-slate-400">
                <span>Affichage de {filteredStudents.length} sur 482 élèves</span>
                <span className="font-semibold text-[#0F2942]">Page 1 sur 12</span>
              </div>
            </div>

            {/* BOTTOM RIGHT SCREEN: Notice Board (Tableau d'affichage) */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-amber-800">
                    <Bell className="h-3.5 w-3.5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0F2942] sm:text-sm">
                    Tableau d&apos;Affichage &amp; Communications École-Parents
                  </h4>
                </div>
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700">
                  Diffusion instantanée
                </span>
              </div>

              <div className="space-y-3">
                {NOTICES.map((notice) => (
                  <div
                    key={notice.title}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition hover:border-teal-200 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-xs ${notice.iconBg}`}
                        >
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#0F2942]">{notice.title}</h5>
                          <p className="text-[9px] text-slate-500">{notice.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[9px] font-semibold text-sky-700">
                          {notice.date}
                        </span>
                        <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                          <Eye className="h-2.5 w-2.5" /> {notice.views}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
                      {notice.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
