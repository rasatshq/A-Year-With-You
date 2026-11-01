"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, ZoomIn } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";
import { PhotoLightbox, LightboxPhoto } from "@/components/ui/PhotoLightbox";

export function TimelineSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const lightboxPhotos: LightboxPhoto[] = anniversaryData.timeline.items.map((item) => ({
    src: item.image,
    alt: item.title,
    caption: item.title,
    subcaption: item.caption,
  }));

  const openPhoto = (index: number) => {
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <section id="story" className="py-24 px-4 sm:px-6 relative bg-cream-100/60 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs uppercase tracking-widest font-sans mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Journey</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal tracking-tight mb-4">
          {anniversaryData.timeline.title}
        </h2>
        <p className="font-sans text-sm sm:text-base text-brown-500 max-w-lg mx-auto">
          {anniversaryData.timeline.subtitle}
        </p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Central Vertical Line (hidden on mobile, centered on desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-rose-300/50 -translate-x-1/2" />
        <div className="md:hidden absolute left-6 top-4 bottom-4 w-px bg-rose-300/50" />

        <div className="space-y-16 sm:space-y-24">
          {anniversaryData.timeline.items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Center Node / Dot with Heart */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-cream-50 border-2 border-rose-400 items-center justify-center shadow-sm">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
                </div>

                {/* Mobile Node Dot */}
                <div className="md:hidden absolute left-6 top-6 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-cream-50 border-2 border-rose-400 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                </div>

                {/* Photo Column (Polaroid Frame) */}
                <div className="w-full md:w-1/2 flex justify-center pl-10 md:pl-0">
                  <div
                    onClick={() => openPhoto(index)}
                    className="relative group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo: ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openPhoto(index);
                    }}
                  >
                    {/* Tilt effect */}
                    <div
                      className={`bg-cream-50 p-3.5 pb-6 sm:p-4 sm:pb-8 rounded-2xl shadow-polaroid border border-blush-200/80 transition-all duration-300 group-hover:shadow-polaroid-hover group-hover:-translate-y-1 ${
                        isEven ? "md:rotate-1" : "md:-rotate-1"
                      }`}
                    >
                      <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-xl overflow-hidden bg-cream-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 280px, 320px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-cocoa-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="p-2 rounded-full bg-cocoa-900/50 backdrop-blur-xs">
                            <ZoomIn className="w-5 h-5" />
                          </span>
                        </div>
                      </div>

                      {/* Polaroid caption */}
                      <div className="mt-3 text-center">
                        <p className="font-script text-lg sm:text-xl text-rose-500">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 text-left ${
                    isEven ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <span className="inline-block font-sans text-xs uppercase tracking-widest text-rose-400 font-semibold px-3 py-1 rounded-full bg-blush-200/50 border border-blush-300/40 mb-2">
                    {item.dateLabel}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-cocoa-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-brown-500 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        photos={lightboxPhotos}
        currentIndex={activePhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActivePhotoIdx(idx)}
      />
    </section>
  );
}
