"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";

export function ClosingSection({ onReplay }: { onReplay?: () => void }) {
  const handleScrollToTop = () => {
    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="closing" className="pt-24 pb-16 px-4 sm:px-6 relative bg-cream-50 overflow-hidden border-t border-blush-200/60">
      {/* Decorative floral/radial gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blush-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Date Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs sm:text-sm tracking-widest uppercase font-sans mb-6">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
          <span>{anniversaryData.closing.subtitle}</span>
        </div>

        {/* Main Title */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cocoa-900 font-light tracking-tight mb-8">
          {anniversaryData.closing.title}
        </h2>

        {/* Closing Photograph in Polaroid with Tilt */}
        <div className="relative mb-10 group">
          <div className="bg-cream-100 p-4 sm:p-5 pb-8 sm:pb-10 rounded-2xl shadow-polaroid border border-blush-200 max-w-sm mx-auto transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
            <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-xl overflow-hidden bg-cream-200">
              <Image
                src={anniversaryData.closing.photo}
                alt="Our First Anniversary"
                fill
                sizes="(max-width: 640px) 260px, 300px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-script text-xl text-rose-500">
                To 365 days of us, and forever more.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <div className="max-w-xl mx-auto space-y-4 text-cocoa-800 font-sans text-base sm:text-lg leading-relaxed mb-8">
          {anniversaryData.closing.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <p className="font-serif text-2xl sm:text-3xl text-rose-500 font-medium pt-2">
            {anniversaryData.closing.closingLove}
          </p>
          <p className="font-script text-3xl sm:text-4xl text-brown-500 pt-1">
            {anniversaryData.closing.signoff}
          </p>
        </div>

        {/* Replay Our Story CTA */}
        <div className="mb-14">
          <button
            onClick={handleScrollToTop}
            className="px-8 py-3.5 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90" />
            <span>{anniversaryData.closing.replayText}</span>
          </button>
        </div>

        {/* Bottom Footer Details */}
        <div className="w-full pt-8 border-t border-blush-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-brown-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="tracking-widest uppercase font-semibold text-cocoa-800">
              {anniversaryData.closing.footerText}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>{anniversaryData.closing.date}</span>
            <span>·</span>
            <span className="font-script text-base text-rose-500">Sayang &amp; You</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
