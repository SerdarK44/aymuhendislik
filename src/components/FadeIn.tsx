"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
}: FadeInProps) {
  const offset = direction === "up" ? 40
               : direction === "left" ? -40
               : direction === "right" ? 40
               : 0;

  const initial = direction === "none"
    ? { opacity: 0, scale: 0.95 }
    : direction === "left" || direction === "right"
      ? { opacity: 0, x: offset }
      : { opacity: 0, y: offset, scale: 0.97 };

  const animate = direction === "none" ? { opacity: 1, scale: 1 }
    : direction === "left" || direction === "right" ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D Tilt Card Wrapper ── */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const spotlightBg = useTransform(
    [x, y],
    ([latestX, latestY]) => 
      `radial-gradient(600px circle at ${((latestX as number) + 0.5) * 100}% ${((latestY as number) + 0.5) * 100}%, rgba(184,146,74,0.1), transparent 60%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
      {/* Spotlight glow following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: spotlightBg,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}