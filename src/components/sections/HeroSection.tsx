"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";

export function HeroSection() {
  const scrollToStory = () => {
    const el = document.getElementById("story");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-1/4 left-8 -z-10 w-72 h-72 rounded-full bg-blush-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-8 -z-10 w-80 h-80 rounded-full bg-rose-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & Story Hook (lg:col-span-7) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-200/70 border border-blush-300 text-brown-500 text-xs sm:text-sm tracking-widest uppercase font-sans mb-6">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
            <span>{anniversaryData.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-cocoa-900 tracking-tight leading-[1.08] mb-6">
            A Year <br className="hidden sm:inline" />
            <span className="italic font-normal text-rose-400">With You</span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-brown-500 max-w-xl leading-relaxed mb-8">
            {anniversaryData.hero.tagline}
          </p>

          {/* Personal Handwritten Accent */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-script text-2xl sm:text-3xl text-rose-500 transform -rotate-2">
              For Sayang, always
            </span>
            <span className="h-px w-16 bg-rose-300/60 inline-block" />
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToStory}
              className="px-8 py-3.5 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <span>{anniversaryData.hero.cta}</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Featured Hero Photograph in Editorial Polaroid Frame (lg:col-span-5) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group">
            {/* Soft decorative background frame offset */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-blush-200 to-cream-200 -rotate-2 group-hover:rotate-0 transition-transform duration-500 opacity-70 -z-10" />

            {/* Polaroid Container */}
            <div className="bg-cream-50 p-4 sm:p-5 pb-8 sm:pb-10 rounded-2xl shadow-polaroid border border-blush-200/60 max-w-sm sm:max-w-md transition-transform duration-500 hover:-translate-y-1">
              {/* Photo Box */}
              <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-xl overflow-hidden bg-cream-200">
                <Image
                  src={anniversaryData.hero.primaryPhoto}
                  alt="A Year With You — Main Photograph"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="mt-4 px-1 flex items-center justify-between text-cocoa-800">
                <div>
                  <p className="font-serif text-lg font-medium text-cocoa-900">
                    Day 1 to 365
                  </p>
                  <p className="font-script text-base text-rose-500">
                    Our journey together
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-300" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator bounce */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer text-brown-500 hover:text-rose-500 flex flex-col items-center gap-1 opacity-70"
        onClick={scrollToStory}
      >
        <span className="text-[11px] uppercase tracking-widest font-sans">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
