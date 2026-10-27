"use client";

import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export const GoogleTranslateProvider: React.FC = () => {
  const { language } = useApp();

  // Clear any invasive googtrans cookies that break React 19 synthetic event delegation
  useEffect(() => {
    try {
      const domain = window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      if (domain.includes(".")) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      }
    } catch {
      // ignore
    }
  }, [language]);

  return null;
};
