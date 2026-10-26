"use client";

import React, { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { SupportedLanguage } from "@/lib/translations";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export const GoogleTranslateProvider: React.FC = () => {
  const { language } = useApp();
  const initializedRef = useRef(false);

  useEffect(() => {
    // Define the init function for Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ta,te,bn,mr,gu",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        initializedRef.current = true;
        // Apply existing language preference after init
        if (language && language !== "en") {
          applyLanguage(language);
        }
      }
    };

    // Load Google Translate script if not already present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && !initializedRef.current) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  // Whenever language changes in AppContext, trigger full website translation
  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  const applyLanguage = (targetLang: SupportedLanguage) => {
    try {
      // Set the Google Translate cookie
      const domain = window.location.hostname;
      const cookieValue = `/en/${targetLang}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
      if (domain.includes(".")) {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
      }

      // If switching back to English, reset
      if (targetLang === "en") {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        if (domain.includes(".")) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
        }
      }

      // Try setting the dropdown combo directly
      const changeCombo = () => {
        const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (combo) {
          combo.value = targetLang;
          combo.dispatchEvent(new Event("change", { bubbles: true }));
          return true;
        }
        return false;
      };

      if (!changeCombo()) {
        // Poll for up to 2.5 seconds if combo is not yet loaded into DOM
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (changeCombo() || attempts > 10) {
            clearInterval(interval);
          }
        }, 250);
      }
    } catch (e) {
      console.warn("Language translation trigger error:", e);
    }
  };

  return (
    <div 
      id="google_translate_element" 
      aria-hidden="true" 
      style={{ display: "none", position: "absolute", top: -9999, left: -9999 }} 
    />
  );
};
