"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorStars() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Target mouse coordinates
  const mousePos = useRef({ x: -200, y: -200 });
  // Smoothly interpolated glow coordinates
  const glowPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only run on desktop with fine mouse pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant 0ms update for cursor dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Subtle hover detection for links / buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, input, textarea, select, [role='button']");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth RAF loop for soft ambient light (120 FPS, GPU accelerated)
    let animationFrameId: number;
    const lerpFactor = 0.12; // smooth inertia

    const render = () => {
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * lerpFactor;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * lerpFactor;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Soft Ambient Illumination (Subtly lights up the space grid without any borders or blur) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none will-change-transform opacity-60"
        style={{
          transform: `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`,
          background: "radial-gradient(circle, rgba(184,146,74,0.07) 0%, rgba(184,146,74,0.02) 45%, transparent 70%)",
        }}
      />

      {/* 2. Precision Minimalist Dot (Sharp, crisp, NO magnifying glass, NO blur) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 will-change-transform ${
          isClicking
            ? "w-2.5 h-2.5 bg-brand-600 scale-75"
            : isHovering
            ? "w-3 h-3 bg-brand-500 ring-4 ring-brand-500/20 shadow-[0_0_10px_rgba(184,146,74,0.6)]"
            : "w-2 h-2 bg-brand-500 shadow-[0_0_6px_rgba(184,146,74,0.5)]"
        }`}
        style={{
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
