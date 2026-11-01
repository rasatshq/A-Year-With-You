"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Disc3, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { anniversaryData } from "@/data/anniversary";

export function FloatingMusicPlayer() {
  const { isPlaying, togglePlay, isMuted, toggleMute } = useAudio();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (e.g. 300px)
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Persistent Audio Player" className="fixed bottom-5 right-4 sm:right-6 z-30">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="bg-cream-50/95 backdrop-blur-md border border-blush-200/90 rounded-full shadow-polaroid p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3 transition-all"
      >
        {/* Vinyl / Spinning Disc Icon */}
        <button
          onClick={() => togglePlay()}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-400 text-white flex items-center justify-center shadow-xs hover:bg-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            <Disc3 className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Track Title & Artist */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer pr-1 flex flex-col text-left select-none"
        >
          <span className="font-serif text-xs sm:text-sm font-semibold text-cocoa-900 leading-tight">
            {anniversaryData.music.songTitle}
          </span>
          <span className="font-sans text-[10px] text-brown-500 leading-tight">
            {anniversaryData.music.artist}
          </span>
        </div>

        {/* Volume Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full text-brown-500 hover:text-cocoa-800 hover:bg-cream-200/50 transition-colors focus:outline-none"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </aside>
  );
}
