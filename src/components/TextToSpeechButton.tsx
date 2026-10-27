"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

interface TextToSpeechButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({
  text,
  label = "Listen",
  className = "",
  size = "sm"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any other playing utterance
      const cleanText = text.replace(/[*_#`]/g, " ").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = "en-IN"; // Prefer Indian English accent if available

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleTogglePlay}
      className={`inline-flex items-center gap-1.5 rounded-md transition-all font-sans font-medium ${
        isPlaying 
          ? "bg-amber-100 text-[#8A5B0B] border border-amber-300 animate-pulse" 
          : "bg-white hover:bg-[#F2EFEB] text-[#0A2540] border border-[#E2DED6]"
      } ${
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs font-semibold"
      } ${className}`}
      title={isPlaying ? "Stop listening" : "Listen via Text to Speech"}
      aria-label={isPlaying ? "Stop audio" : "Listen to text aloud"}
    >
      {isPlaying ? (
        <>
          <VolumeX className="h-3.5 w-3.5 text-[#8A5B0B]" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5 text-[#0F3854]" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
