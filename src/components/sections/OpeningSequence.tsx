"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, ArrowRight } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";
import { useAudio } from "@/context/AudioContext";

interface OpeningSequenceProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function OpeningSequence({ isOpen, onOpen }: OpeningSequenceProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const { play, isPlaying } = useAudio();

  const handleOpenClick = () => {
    setIsOpening(true);
    // After envelope opens, show music prompt modal briefly or transition out
    setTimeout(() => {
      setShowMusicPrompt(true);
    }, 1100);
  };

  const handleCompleteSequence = (enableAudio: boolean) => {
    if (enableAudio && !isPlaying) {
      play();
    }
    setShowMusicPrompt(false);
    onOpen();
  };

  if (isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream-100 px-4 py-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Opening Gift"
    >
      {/* Decorative Botanical Corner Accents */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-40 text-rose-400">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,90 Q40,40 90,10" />
          <path d="M35,65 Q50,55 45,40 Q40,45 35,65" fill="currentColor" opacity="0.3" />
          <path d="M65,35 Q80,25 75,10 Q70,15 65,35" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none opacity-40 text-rose-400 rotate-180">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,90 Q40,40 90,10" />
          <path d="M35,65 Q50,55 45,40 Q40,45 35,65" fill="currentColor" opacity="0.3" />
          <path d="M65,35 Q80,25 75,10 Q70,15 65,35" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-md w-full mx-auto text-center flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {!showMusicPrompt ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-rose-300/40 text-brown-500 text-xs font-medium uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>{anniversaryData.opening.badge}</span>
              </motion.div>

              {/* Headings */}
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl sm:text-5xl font-normal text-cocoa-900 tracking-tight mb-3"
              >
                {anniversaryData.opening.heading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-sans text-sm sm:text-base text-brown-500 max-w-xs mb-8"
              >
                {anniversaryData.opening.subheading}
              </motion.p>

              {/* Interactive Envelope Graphic */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={isOpening ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                className="relative w-64 h-48 sm:w-72 sm:h-52 my-2 perspective-1000 cursor-pointer group"
                onClick={!isOpening ? handleOpenClick : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isOpening) {
                    handleOpenClick();
                  }
                }}
                aria-label="Click to open envelope"
              >
                {/* Envelope Base Shadow */}
                <div className="absolute inset-x-4 bottom-0 h-6 bg-cocoa-800/10 blur-xl rounded-full" />

                {/* Envelope Body */}
                <div className="absolute inset-0 bg-[#F4E3DF] rounded-xl border border-blush-300 shadow-envelope overflow-hidden">
                  {/* Decorative stamp in top right corner */}
                  <div className="absolute top-3 right-3 w-10 h-12 border-2 border-dashed border-rose-400/70 bg-cream-50 rounded flex flex-col items-center justify-center p-1 text-[9px] font-serif text-brown-500 shadow-xs">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-300 mb-0.5" />
                    <span>OCT 2</span>
                  </div>

                  {/* Envelope internal letter peek */}
                  <motion.div
                    initial={{ y: 20 }}
                    animate={isOpening ? { y: -45, opacity: 1 } : { y: 20, opacity: 0.7 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-x-4 top-4 h-36 bg-cream-50 rounded-t-lg border-t border-x border-blush-200 p-4 shadow-sm text-left flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-16 bg-rose-300/40 rounded-full" />
                      <div className="h-1 w-full bg-cream-300/60 rounded-full" />
                      <div className="h-1 w-4/5 bg-cream-300/60 rounded-full" />
                    </div>
                    <p className="font-script text-rose-500 text-lg">
                      To My Beloved Sayang...
                    </p>
                  </motion.div>

                  {/* Envelope Front Fold Triangles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Left & Right paper creases */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#E8CFCD] to-transparent opacity-80"
                      style={{
                        clipPath: "polygon(0% 100%, 50% 50%, 100% 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#DFBDBE] to-transparent opacity-40"
                      style={{
                        clipPath: "polygon(0% 0%, 50% 50%, 0% 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-l from-[#DFBDBE] to-transparent opacity-40"
                      style={{
                        clipPath: "polygon(100% 0%, 50% 50%, 100% 100%)",
                      }}
                    />
                  </div>

                  {/* Envelope Flap (Triangular Top) with 3D Flip */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 10 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                    className="absolute top-0 inset-x-0 h-24 bg-[#E8CFCD] border-b border-blush-300 flex items-center justify-center transform-style-3d"
                  >
                    {/* Wax Seal with Heart */}
                    <motion.div
                      animate={isOpening ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full bg-rose-400 border-2 border-rose-300 shadow-md flex items-center justify-center text-white"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Action CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <button
                  onClick={handleOpenClick}
                  disabled={isOpening}
                  className="px-7 py-3 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:opacity-75"
                >
                  <span>{isOpening ? "Opening for you..." : anniversaryData.opening.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            /* Music Prompt Modal (Step 5 of User Experience) */
            <motion.div
              key="music-prompt-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-cream-50 p-6 sm:p-8 rounded-2xl border border-blush-200 shadow-polaroid flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-blush-200/70 text-rose-500 flex items-center justify-center mb-4">
                <Volume2 className="w-6 h-6 animate-pulse" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-cocoa-900 mb-2">
                Would you like music?
              </h2>

              <p className="font-sans text-sm text-brown-500 mb-6 max-w-xs leading-relaxed">
                We have a special song prepared: &ldquo;{anniversaryData.music.songTitle}&rdquo; by {anniversaryData.music.artist}. Play it in the background as you read?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  onClick={() => handleCompleteSequence(true)}
                  className="flex-1 px-5 py-2.5 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  Yes, Play Music
                </button>
                <button
                  onClick={() => handleCompleteSequence(false)}
                  className="flex-1 px-5 py-2.5 rounded-full border border-blush-300 bg-cream-100 text-brown-500 font-medium hover:bg-cream-200 hover:text-cocoa-800 transition-colors focus:outline-none"
                >
                  Continue in Silence
                </button>
              </div>

              <p className="font-script text-xs text-rose-400 mt-4">
                You can toggle audio anytime via the top player
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
