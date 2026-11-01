"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Smile,
  Coffee,
  HeartHandshake,
  Compass,
  ShieldCheck,
  Sun,
  Music,
  Flame,
  Feather,
  Heart,
  Infinity as InfinityIcon,
  RotateCw,
} from "lucide-react";
import { anniversaryData } from "@/data/anniversary";
import { ReasonItem } from "@/types/anniversary";

// Dynamic Lucide icon mapper
const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Feather: <Feather className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Infinity: <InfinityIcon className="w-5 h-5" />,
};

function ReasonCard({ item }: { item: ReasonItem }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div
      className="perspective-1000 h-64 sm:h-72 cursor-pointer group"
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isFlipped}
      aria-label={`${item.number}: ${item.title}. Press Enter or click to flip card.`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-cream-50 rounded-2xl border border-blush-200/80 p-6 flex flex-col justify-between shadow-soft hover:shadow-polaroid hover:border-rose-300/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-serif text-3xl font-light text-rose-400">
              {item.number}
            </span>
            <div className="w-10 h-10 rounded-full bg-blush-100 text-rose-500 flex items-center justify-center shadow-xs">
              {item.icon ? iconMap[item.icon] : <Heart className="w-5 h-5" />}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-widest text-brown-500 font-sans block mb-1">
              Reason {item.number}
            </span>
            <h3 className="font-serif text-2xl font-medium text-cocoa-900 group-hover:text-rose-500 transition-colors">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-blush-200/50 text-brown-500">
            <span className="text-xs font-sans tracking-wide">Tap to discover</span>
            <RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blush-200/90 to-cream-100 rounded-2xl border border-rose-300/70 p-6 flex flex-col justify-between shadow-polaroid text-cocoa-900">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-semibold text-cocoa-800">
              {item.title}
            </span>
            <span className="font-serif text-xl text-rose-500 font-light">
              #{item.number}
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base leading-relaxed text-cocoa-900 my-auto">
            &ldquo;{item.description}&rdquo;
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-rose-300/40 text-brown-500">
            <span className="font-script text-base text-rose-500">With all my love</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReasonsSection() {
  return (
    <section id="reasons" className="py-24 px-4 sm:px-6 relative bg-cream-100/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs uppercase tracking-widest font-sans mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
            <span>Twelve Months · Twelve Reasons</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal tracking-tight mb-4">
            {anniversaryData.reasons.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-brown-500 max-w-lg mx-auto">
            {anniversaryData.reasons.subtitle}
          </p>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {anniversaryData.reasons.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            >
              <ReasonCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
