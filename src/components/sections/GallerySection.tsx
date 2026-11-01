"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, ZoomIn, Heart } from "lucide-react";
import { anniversaryData } from "@/data/anniversary";
import { PhotoLightbox, LightboxPhoto } from "@/components/ui/PhotoLightbox";

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const lightboxPhotos: LightboxPhoto[] = anniversaryData.gallery.items.map((item) => ({
    src: item.image,
    alt: item.caption,
    caption: item.caption,
    subcaption: item.subcaption,
  }));

  const openLightbox = (index: number) => {
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <section id="memories" className="py-24 px-4 sm:px-6 relative bg-cream-50/70">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs uppercase tracking-widest font-sans mb-3">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Our Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal tracking-tight mb-4">
            {anniversaryData.gallery.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-brown-500 max-w-lg mx-auto">
            {anniversaryData.gallery.subtitle}
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {anniversaryData.gallery.items.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Open memory: ${item.caption}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(index);
                }}
              >
                <div className="bg-cream-100 p-3 sm:p-4 pb-6 rounded-2xl border border-blush-200/70 shadow-polaroid hover:shadow-polaroid-hover transition-all duration-300 transform group-hover:-translate-y-1.5">
                  {/* Photo Frame */}
                  <div className="relative w-full h-72 sm:h-80 md:h-84 rounded-xl overflow-hidden bg-cream-200">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient & Zoom Hover Accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                      <span className="text-xs font-sans uppercase tracking-widest bg-cocoa-900/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                        View Photo
                      </span>
                      <span className="p-2 rounded-full bg-rose-400 text-white shadow-sm">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 px-1 flex items-start justify-between">
                    <div>
                      <p className="font-serif text-lg font-medium text-cocoa-900 group-hover:text-rose-500 transition-colors">
                        {item.caption}
                      </p>
                      {item.subcaption && (
                        <p className="font-script text-base text-brown-500 mt-0.5">
                          {item.subcaption}
                        </p>
                      )}
                    </div>
                    <Heart className="w-4 h-4 text-blush-300 group-hover:text-rose-400 group-hover:fill-rose-300 transition-colors mt-1 shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
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
