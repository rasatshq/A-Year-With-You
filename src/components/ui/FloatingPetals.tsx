"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  opacity: number;
}

export function FloatingPetals({ count = 12 }: { count?: number }) {
  const prefersReduced = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (prefersReduced) return;

    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 95, // 0 to 95% across screen
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 10,
      size: 14 + Math.random() * 14,
      rotation: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.35,
    }));
    setPetals(generated);
  }, [count, prefersReduced]);

  if (prefersReduced || petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: "-10vh",
            x: `${petal.x}vw`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${petal.x}vw`,
              `${petal.x + 3 * (petal.id % 2 === 0 ? 1 : -1)}vw`,
              `${petal.x - 2 * (petal.id % 2 === 0 ? 1 : -1)}vw`,
              `${petal.x}vw`,
            ],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: petal.size,
            height: petal.size * 1.3,
          }}
        >
          {/* Subtle SVG Rose Petal */}
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full text-rose-400 drop-shadow-sm filter blur-[0.3px]"
            fill="currentColor"
          >
            <path
              d="M15,2 C22,6 28,15 26,26 C24,35 18,38 15,38 C12,38 6,35 4,26 C2,15 8,6 15,2 Z"
              opacity="0.8"
            />
            <path
              d="M15,8 C19,12 21,18 20,25"
              stroke="#FFF"
              strokeWidth="0.8"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
