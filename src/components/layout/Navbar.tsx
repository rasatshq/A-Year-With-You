"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music, Disc3, Heart, RotateCcw } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Our Story", href: "#story" },
  { label: "Memories", href: "#memories" },
  { label: "A Letter", href: "#letter" },
  { label: "For You", href: "#reasons" },
];

export function Navbar({ onReplay }: { onReplay?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const { isPlaying, togglePlay } = useAudio();

  // Scroll detection and active section tracker
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["hero", "story", "memories", "letter", "reasons", "song", "closing"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-100/90 backdrop-blur-md shadow-soft py-3 border-b border-blush-200/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="group flex items-center gap-2 text-cocoa-800 hover:text-rose-500 transition-colors"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-300 transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide">
            A Year With You
          </span>
          <span className="hidden sm:inline font-script text-base text-rose-400 font-normal ml-1">
            · Sayang
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-cocoa-900 font-semibold"
                    : "text-brown-500 hover:text-cocoa-800 hover:bg-cream-200/40"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-blush-200/70 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Music Quick Toggle & Replay) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePlay()}
            title={isPlaying ? "Pause music" : "Play our song"}
            aria-label={isPlaying ? "Pause music" : "Play our song"}
            className={`p-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs font-medium ${
              isPlaying
                ? "bg-rose-400 text-white border-rose-400 shadow-sm"
                : "bg-cream-50/80 text-brown-500 border-blush-200 hover:bg-cream-100 hover:text-cocoa-800"
            }`}
          >
            {isPlaying ? (
              <Disc3 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Music className="w-4 h-4" />
            )}
            <span className="hidden sm:inline pr-1">
              {isPlaying ? "Playing" : "Our Song"}
            </span>
          </button>

          {onReplay && (
            <button
              onClick={onReplay}
              title="Replay opening sequence"
              aria-label="Replay opening sequence"
              className="p-2 rounded-full border border-blush-200 bg-cream-50/80 text-brown-500 hover:text-cocoa-800 hover:bg-cream-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-cocoa-800 hover:bg-cream-200/50 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream-50 border-b border-blush-200/60 shadow-lg px-6 py-4 overflow-hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-2 px-3 rounded-lg text-base font-medium text-cocoa-800 hover:bg-cream-200/50 hover:text-rose-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {onReplay && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplay();
                  }}
                  className="flex items-center gap-2 text-left py-2 px-3 rounded-lg text-sm text-brown-500 hover:bg-cream-200/50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Replay Opening Experience</span>
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
