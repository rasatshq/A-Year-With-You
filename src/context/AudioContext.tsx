"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { anniversaryData } from "@/data/anniversary";

interface AudioContextType {
  isPlaying: boolean;
  isLoaded: boolean;
  hasError: boolean;
  errorMessage: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isSyntheticPlaying: boolean;
  togglePlay: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  seek: (seconds: number) => void;
  changeVolume: (val: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isSyntheticPlaying, setIsSyntheticPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio element once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.src = anniversaryData.music.audioSrc;
    audio.preload = "metadata";
    audio.loop = true;
    audio.volume = volume;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 263); // Fallback to ~4:23 typical length for Perfect
      setIsLoaded(true);
      setHasError(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onError = () => {
      // Missing audio file or format error
      setIsLoaded(false);
      setHasError(true);
      setErrorMessage(
        "Audio file not found at " +
          anniversaryData.music.audioSrc +
          ". Place your MP3 file in public/audio/our-song.mp3 to listen."
      );
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.pause();
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, []);

  // Web Audio romantic ambient chime fallback if file is missing
  const playRomanticChimes = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Gentle romantic arpeggio notes (F, A, C, E, G in music scale)
      const notes = [349.23, 440.0, 523.25, 659.25, 783.99, 659.25, 523.25, 440.0];
      let step = 0;

      setIsSyntheticPlaying(true);
      setIsPlaying(true);
      setDuration(263);

      if (synthTimerRef.current) clearInterval(synthTimerRef.current);

      synthTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => (prev >= 263 ? 0 : prev + 1));

        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[step % notes.length];
        step++;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const targetVol = isMuted ? 0 : volume * 0.12;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.3);
      }, 900);
    } catch (e) {
      console.warn("Synthetic audio fallback unavailable", e);
    }
  }, [isMuted, volume]);

  const stopRomanticChimes = useCallback(() => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    setIsSyntheticPlaying(false);
    setIsPlaying(false);
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setHasError(false);
    } catch {
      // If native audio fails (e.g. 404 file not found), trigger gentle ambient chimes
      setHasError(true);
      playRomanticChimes();
    }
  }, [playRomanticChimes]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    stopRomanticChimes();
    setIsPlaying(false);
  }, [stopRomanticChimes]);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, pause, play]);

  const seek = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (audio && !isSyntheticPlaying) {
        audio.currentTime = seconds;
        setCurrentTime(seconds);
      } else {
        setCurrentTime(seconds);
      }
    },
    [isSyntheticPlaying]
  );

  const changeVolume = useCallback(
    (val: number) => {
      const clamped = Math.max(0, Math.min(1, val));
      setVolume(clamped);
      if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : clamped;
      }
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isLoaded,
        hasError,
        errorMessage,
        currentTime,
        duration,
        volume,
        isMuted,
        isSyntheticPlaying,
        togglePlay,
        play,
        pause,
        seek,
        changeVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
