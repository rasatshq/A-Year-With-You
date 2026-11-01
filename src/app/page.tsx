"use client";

import React, { useState } from "react";
import { AudioProvider } from "@/context/AudioContext";
import { FloatingPetals } from "@/components/ui/FloatingPetals";
import { Navbar } from "@/components/layout/Navbar";
import { OpeningSequence } from "@/components/sections/OpeningSequence";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LetterSection } from "@/components/sections/LetterSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { SongSection } from "@/components/sections/SongSection";
import { SurpriseSection } from "@/components/sections/SurpriseSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { FloatingMusicPlayer } from "@/components/ui/FloatingMusicPlayer";

export default function AnniversaryPage() {
  const [hasOpenedStory, setHasOpenedStory] = useState(false);

  const handleOpenStory = () => {
    setHasOpenedStory(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReplayStory = () => {
    setHasOpenedStory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AudioProvider>
      <main className="min-h-screen bg-cream-100 text-cocoa-800 relative selection:bg-blush-200">
        {/* Ambient Floating Rose Petals */}
        <FloatingPetals count={14} />

        {/* Interactive Opening Sequence Overlay */}
        <OpeningSequence isOpen={hasOpenedStory} onOpen={handleOpenStory} />

        {/* Global Navigation */}
        <Navbar onReplay={handleReplayStory} />

        {/* Main Website Sections */}
        <HeroSection />
        <TimelineSection />
        <GallerySection />
        <LetterSection />
        <ReasonsSection />
        <SongSection />
        <SurpriseSection />
        <ClosingSection onReplay={handleReplayStory} />

        {/* Floating Persistent Audio Player */}
        <FloatingMusicPlayer />
      </main>
    </AudioProvider>
  );
}
