"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc3,
  Music,
  Info,
  Sparkles,
} from "lucide-react";
import { anniversaryData } from "@/data/anniversary";
import { useAudio } from "@/context/AudioContext";

function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function SongSection() {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    hasError,
    errorMessage,
    isSyntheticPlaying,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
  } = useAudio();

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.target.value));
  };

  return (
    <section id="song" className="py-24 px-4 sm:px-6 relative bg-cream-50/60 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-200/60 border border-blush-300 text-brown-500 text-xs uppercase tracking-widest font-sans mb-3">
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span>Our Soundtrack</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cocoa-900 font-normal tracking-tight mb-4">
            {anniversaryData.music.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-brown-500 max-w-md mx-auto">
            {anniversaryData.music.subtitle}
          </p>
        </div>

        {/* Vintage Turntable / Vinyl Player Card */}
        <div className="relative bg-cream-100 rounded-3xl border border-blush-200 shadow-polaroid p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Vinyl Disc & Album Art (col-span-5) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                {/* Vinyl Record Body with Groove Lines */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    isPlaying
                      ? { repeat: Infinity, duration: 8, ease: "linear" }
                      : { duration: 0.5 }
                  }
                  className="w-full h-full rounded-full bg-[#201A1C] p-2.5 shadow-2xl flex items-center justify-center border-4 border-[#352B2E]"
                >
                  {/* Subtle Vinyl Grooves */}
                  <div className="w-full h-full rounded-full border border-neutral-700/60 flex items-center justify-center">
                    <div className="w-4/5 h-4/5 rounded-full border border-neutral-700/60 flex items-center justify-center">
                      <div className="w-3/5 h-3/5 rounded-full border border-neutral-700/60 flex items-center justify-center">
                        {/* Center Album Art Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blush-200">
                          <Image
                            src={anniversaryData.music.coverArt}
                            alt="Album Art"
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                          {/* Center spindle hole */}
                          <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-cream-100 border border-neutral-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Turntable Stylus / Tone Arm Graphic (desktop accent) */}
                <div className="hidden sm:block absolute -top-4 -right-2 pointer-events-none origin-top-right transition-transform duration-500">
                  <div
                    className={`w-20 h-2 bg-neutral-400 rounded origin-right transform transition-transform duration-500 ${
                      isPlaying ? "rotate-[28deg]" : "rotate-0"
                    }`}
                  />
                  <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white absolute -right-1 -top-1" />
                </div>
              </div>
            </div>

            {/* Track Info & Controls (col-span-7) */}
            <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-2 text-rose-500 font-script text-xl">
                <Sparkles className="w-4 h-4" />
                <span>Our Special Melody</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-cocoa-900 font-semibold mb-1">
                {anniversaryData.music.songTitle}
              </h3>

              <p className="font-sans text-base text-brown-500 mb-6">
                {anniversaryData.music.artist} ·{" "}
                <span className="italic">{anniversaryData.music.album}</span>
              </p>

              {/* Progress Slider */}
              <div className="space-y-1.5 mb-6">
                <input
                  type="range"
                  min={0}
                  max={duration || 263}
                  value={currentTime}
                  onChange={handleSeekChange}
                  aria-label="Seek progress"
                  className="w-full h-1.5 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-rose-400 focus:outline-none"
                />
                <div className="flex justify-between text-xs text-brown-500 font-sans">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 263)}</span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
                {/* Play / Pause Main CTA */}
                <button
                  onClick={() => togglePlay()}
                  className="px-6 py-3 rounded-full bg-rose-400 text-white font-medium shadow-md hover:bg-rose-500 transition-all flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-white" />
                      <span>Pause Song</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                      <span>Play Our Song</span>
                    </>
                  )}
                </button>

                {/* Volume & Mute Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-cream-200 text-brown-500 transition-colors focus:outline-none"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-rose-400" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="w-20 h-1 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-rose-400"
                  />
                </div>
              </div>

              {/* Graceful Feedback Note */}
              {isSyntheticPlaying && (
                <div className="mt-4 p-3 bg-blush-100/70 border border-blush-200 rounded-xl flex items-start gap-2 text-xs text-cocoa-800">
                  <Disc3 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-spin" />
                  <div>
                    <span className="font-semibold">Playing romantic background melody.</span>{" "}
                    To listen to Ed Sheeran&apos;s original &ldquo;Perfect&rdquo;, place{" "}
                    <code className="bg-cream-50 px-1 py-0.5 rounded font-mono text-[11px]">
                      our-song.mp3
                    </code>{" "}
                    inside the <code className="font-mono">public/audio/</code> folder.
                  </div>
                </div>
              )}

              {hasError && !isSyntheticPlaying && (
                <div className="mt-4 p-3 bg-blush-100 border border-blush-300 rounded-xl flex items-start gap-2 text-xs text-brown-500">
                  <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
