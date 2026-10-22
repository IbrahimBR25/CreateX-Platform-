import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { AppToaster } from "@/components/AppToaster";

export const metadata: Metadata = {
  title: "CreateX | Plateforme de Gestion Scolaire Tout-en-Un",
  description:
    "Plateforme SaaS moderne pour la gestion administrative, pédagogique, financière et la communication parents des écoles privées.",
  other: {
    "darkreader-lock": "true",
    "color-scheme": "only light",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4F6FA",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      data-theme="light"
      style={{ colorScheme: "only light", backgroundColor: "#F4F6FA", color: "#303747" }}
      className="scroll-smooth bg-[#F4F6FA] text-[#303747]"
    >
      <head>
        <meta name="darkreader-lock" content="true" />
        <meta name="color-scheme" content="only light" />
      </head>
      <body
        style={{ backgroundColor: "#F4F6FA", color: "#303747", colorScheme: "only light" }}
        className="antialiased bg-[#F4F6FA] text-[#303747] selection:bg-[#DFF4FC] selection:text-[#303747]"
      >
        <I18nProvider initialLocale="fr">
          {children}
          <AppToaster />
        </I18nProvider>
      </body>
    </html>
  );
}
