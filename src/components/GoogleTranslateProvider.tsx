"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { SupportedLanguage } from "@/lib/translations";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: unknown;
          },
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

// Global safety patch for React 18/19 DOM reconciliation with Google Translate font tags
if (typeof window !== "undefined" && typeof Node !== "undefined" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

export const GoogleTranslateProvider: React.FC = () => {
  const { language } = useApp();
  const initializedRef = useRef(false);

  const applyLanguage = useCallback((targetLang: SupportedLanguage) => {
    try {
      const domain = window.location.hostname;

      if (targetLang === "en") {
        // Clear all googtrans cookies
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        if (domain.includes(".")) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
        }

        // Reset the select combo if present
        const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (combo && combo.value !== "en") {
          combo.value = "en";
          combo.dispatchEvent(new Event("change", { bubbles: true }));
        }

        // If page has translated font elements, reload to cleanly restore original text
        if (document.documentElement.classList.contains("translated-ltr") || document.querySelector("font")) {
          window.location.reload();
        }
        return;
      }

      // Set cookie for non-English target languages
      const cookieValue = `/en/${targetLang}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
      if (domain.includes(".")) {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
      }

      const triggerCombo = () => {
        const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (combo) {
          if (combo.value !== targetLang) {
            combo.value = targetLang;
            combo.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        }
        return false;
      };

      if (!triggerCombo()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (triggerCombo() || attempts > 20) {
            clearInterval(interval);
          }
        }, 200);
      }
    } catch (e) {
      console.warn("Language translation trigger error:", e);
    }
  }, []);

  useEffect(() => {
    // Define the global Google Translate init callback
    window.googleTranslateElementInit = () => {
      try {
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
          if (language && language !== "en") {
            applyLanguage(language);
          }
        }
      } catch (err) {
        console.warn("Google Translate initialization error:", err);
      }
    };

    // Load Google Translate script if not already present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && !initializedRef.current) {
      window.googleTranslateElementInit?.();
    }
  }, [language, applyLanguage]);

  // Whenever language changes in AppContext, trigger full website translation
  useEffect(() => {
    applyLanguage(language);
  }, [language, applyLanguage]);

  return (
    <div 
      id="google_translate_element" 
      aria-hidden="true" 
      style={{ display: "none", position: "absolute", top: -9999, left: -9999 }} 
    />
  );
};
