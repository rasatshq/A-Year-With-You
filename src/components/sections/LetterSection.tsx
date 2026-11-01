"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles, Feather } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";

export function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="letter" className="py-24 px-4 sm:px-6 relative bg-cream-100 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 right-10 -z-10 w-80 h-80 rounded-full bg-blush-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs uppercase tracking-widest font-sans mb-3">
            <Feather className="w-3.5 h-3.5 text-rose-400" />
            <span>Heartfelt Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal tracking-tight mb-4">
            {anniversaryData.letter.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-brown-500 max-w-md mx-auto">
            {anniversaryData.letter.subtitle}
          </p>
        </div>

        {/* Envelope / Letter Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope View */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center p-8 sm:p-12 bg-cream-50 rounded-3xl border border-blush-200 shadow-envelope text-center"
              >
                {/* Envelope Graphic */}
                <div className="relative w-64 h-44 sm:w-72 sm:h-48 bg-[#F3DFDB] rounded-2xl border border-blush-300 shadow-md mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Flap creases */}
                  <div
                    className="absolute inset-0 bg-[#E8C5C4]/70"
                    style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0)" }}
                  />
                  <div
                    className="absolute inset-0 bg-[#DEB4B3]/40"
                    style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }}
                  />

                  {/* Heart Wax Seal */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-rose-400 border-2 border-rose-300 flex items-center justify-center text-white shadow-md">
                    <Heart className="w-6 h-6 fill-white" />
                  </div>

                  <p className="relative z-10 font-script text-xl text-cocoa-800 mt-3">
                    {anniversaryData.letter.envelopeLabel}
                  </p>
                </div>

                <p className="font-serif text-xl sm:text-2xl text-cocoa-900 mb-2">
                  A sealed letter waiting just for you
                </p>
                <p className="font-sans text-sm text-brown-500 max-w-sm mb-6">
                  Take a quiet moment, tap below, and read what is in my heart.
                </p>

                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  <span>{anniversaryData.letter.cta}</span>
                </button>
              </motion.div>
            ) : (
              /* Opened Letter View */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative bg-cream-50 p-6 sm:p-12 md:p-16 rounded-3xl border border-blush-200 shadow-polaroid"
              >
                {/* Vintage Letter Header Ornament */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-blush-200/70">
                  <div className="flex items-center gap-2 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-300" />
                    <span className="font-serif text-sm tracking-widest uppercase text-brown-500">
                      Our 1st Anniversary
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs uppercase tracking-widest text-brown-500 hover:text-rose-500 transition-colors font-sans py-1 px-3 rounded-full hover:bg-cream-200/50"
                  >
                    Fold Letter
                  </button>
                </div>

                {/* Salutation */}
                <div className="mb-6">
                  <h3 className="font-script text-3xl sm:text-4xl text-rose-500">
                    {anniversaryData.letter.salutation}
                  </h3>
                </div>

                {/* Letter Body (Immediate reading, no delay, elegant spacing) */}
                <div className="space-y-4 sm:space-y-5 text-cocoa-900 font-sans text-base sm:text-lg leading-relaxed sm:leading-loose">
                  {anniversaryData.letter.paragraphs.map((p, idx) => (
                    <p key={idx} className="first-letter:text-xl">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Signoff & Signature */}
                <div className="mt-10 pt-6 border-t border-blush-200/50 flex flex-col items-start">
                  <p className="font-serif italic text-base text-brown-500 mb-1">
                    {anniversaryData.letter.signoff}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-rose-500">
                    {anniversaryData.letter.signature}
                  </p>
                </div>

                {/* Watermark detail */}
                <div className="absolute bottom-6 right-8 pointer-events-none opacity-20 text-rose-400">
                  <Sparkles className="w-16 h-16" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
