"use client";

import React from "react";
import { Toaster } from "sonner";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function AppToaster() {
  const { dir } = useI18n();

  return (
    <Toaster
      dir={dir}
      theme="light"
      position={dir === "rtl" ? "top-left" : "top-right"}
      toastOptions={{
        style: {
          fontFamily: "'Inter', 'Manrope', sans-serif",
          backgroundColor: "#FFFFFF",
          color: "#303747",
          borderRadius: "12px",
          border: "1px solid #E7EBF2",
          boxShadow: "0 6px 20px -2px rgba(48, 55, 71, 0.08)",
        },
      }}
    />
  );
}
