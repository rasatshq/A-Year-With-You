"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
  subcaption?: string;
}

interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop back
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-cocoa-900/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Photo view"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-cream-100/10 text-cream-100 hover:bg-cream-100/20 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous control */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream-100/15 text-cream-100 hover:bg-cream-100/25 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next control */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-cream-100/15 text-cream-100 hover:bg-cream-100/25 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Photo container in polaroid/editorial frame */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center p-3 sm:p-5 bg-cream-50 rounded-2xl shadow-2xl border border-blush-200/50"
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-cream-200/30">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                sizes="(max-width: 768px) 95vw, 85vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Captions and counter */}
            <div className="w-full mt-4 flex items-center justify-between px-2 text-cocoa-800">
              <div>
                {currentPhoto.caption && (
                  <p className="font-serif text-lg sm:text-xl font-medium text-cocoa-900">
                    {currentPhoto.caption}
                  </p>
                )}
                {currentPhoto.subcaption && (
                  <p className="font-script text-base text-brown-500 mt-0.5">
                    {currentPhoto.subcaption}
                  </p>
                )}
              </div>
              <span className="text-xs uppercase tracking-widest text-brown-500 font-sans border border-blush-200 px-2.5 py-1 rounded-full bg-cream-100">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
