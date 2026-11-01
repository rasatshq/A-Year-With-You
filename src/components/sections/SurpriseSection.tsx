"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Gift } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";

export function SurpriseSection() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <section className="py-24 px-4 sm:px-6 relative bg-cream-100 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Teaser Card */}
        <div className="bg-cream-50 p-8 sm:p-14 rounded-3xl border border-blush-200/80 shadow-polaroid relative overflow-hidden">
          {/* Subtle floral/corner detail */}
          <div className="w-12 h-12 rounded-full bg-blush-200/50 text-rose-400 mx-auto flex items-center justify-center mb-6">
            <Gift className="w-6 h-6" />
          </div>

          <span className="text-xs uppercase tracking-widest text-brown-500 font-sans block mb-2">
            A Final Whisper
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal mb-4">
            {anniversaryData.surprise.initialTitle}
          </h2>

          <p className="font-sans text-sm sm:text-base text-brown-500 max-w-md mx-auto mb-8 leading-relaxed">
            {anniversaryData.surprise.initialSubtitle}
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-3.5 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>{anniversaryData.surprise.buttonText}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Surprise Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-cocoa-900/80 backdrop-blur-md overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="One Last Surprise"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-cream-50 rounded-3xl border border-blush-200 shadow-2xl p-6 sm:p-10 my-8 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-cream-100 text-brown-500 hover:text-cocoa-900 hover:bg-cream-200 transition-colors focus:outline-none"
                aria-label="Close surprise"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pulsing Heart Animation */}
              <div className="w-14 h-14 rounded-full bg-blush-200/80 text-rose-500 mx-auto flex items-center justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-7 h-7 fill-rose-400 text-rose-400" />
                </motion.div>
              </div>

              {/* Revealed Headings */}
              <h3 className="font-serif text-3xl sm:text-4xl text-cocoa-900 font-medium mb-1">
                {anniversaryData.surprise.revealedTitle}
              </h3>

              <p className="font-script text-2xl text-rose-500 mb-6">
                {anniversaryData.surprise.revealedSubtitle}
              </p>

              {/* Photograph Reveal in Polaroid */}
              <div className="relative w-56 sm:w-64 h-64 sm:h-72 mx-auto mb-6 rounded-2xl overflow-hidden shadow-polaroid border-4 border-white bg-cream-200">
                <Image
                  src={anniversaryData.surprise.photo}
                  alt="A Year With You — Special Moment"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>

              {/* Heartfelt Surprise Message */}
              <div className="space-y-4 max-w-lg mx-auto text-cocoa-800 font-sans text-base sm:text-lg leading-relaxed mb-8">
                {anniversaryData.surprise.messageParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === anniversaryData.surprise.messageParagraphs.length - 1
                        ? "font-serif text-xl sm:text-2xl text-rose-500 font-medium italic pt-2"
                        : ""
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Close CTA */}
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full border border-blush-300 bg-cream-100 text-brown-500 hover:bg-cream-200 hover:text-cocoa-800 font-medium text-sm transition-colors focus:outline-none"
              >
                Close & Keep in Heart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
