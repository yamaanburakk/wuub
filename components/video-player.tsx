"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LangSwitcher } from "@/components/layout/lang-switcher";
import type { Locale } from "@/lib/i18n/config";

type VideoPlayerProps = {
  locale: Locale;
};

export const VideoPlayer = ({ locale }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const leftText = "maymunlara bak";
  const rightText = "s2mle100lesh";
  const centerText = "kutay nasıl olmuş knk";
  const totalScrollRef = useRef(0);
  const lastTouchYRef = useRef(0);
  const MAX_SCROLL = 1500; // Total scroll needed to reach center (in pixels) - desktop
  const MAX_SCROLL_MOBILE = 600; // Total scroll needed to reach center (in pixels) - mobile (faster)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    video.play().catch((err) => {
      console.error("Video play failed:", err);
    });

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Track scroll direction: positive deltaY = scroll down, negative = scroll up
      const scrollDelta = e.deltaY;
      
      // Update total scroll based on direction
      if (scrollDelta > 0) {
        // Scroll down - move texts toward center
        totalScrollRef.current = Math.min(
          totalScrollRef.current + Math.abs(scrollDelta),
          MAX_SCROLL
        );
      } else {
        // Scroll up - move texts away from center
        totalScrollRef.current = Math.max(
          totalScrollRef.current - Math.abs(scrollDelta),
          0
        );
      }
      
      // Calculate progress (0 to 1)
      const progress = totalScrollRef.current / MAX_SCROLL;
      setScrollProgress(progress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.touches.length === 0) return;
      
      const currentY = e.touches[0].clientY;
      const touchDelta = currentY - lastTouchYRef.current;
      lastTouchYRef.current = currentY;
      
      // Detect mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      const maxScroll = isMobile ? MAX_SCROLL_MOBILE : MAX_SCROLL;
      // Increase scroll sensitivity on mobile (multiply by 2.5x)
      const scrollMultiplier = isMobile ? 2.5 : 1;
      
      // Track touch scroll direction: 
      // touchDelta > 0 means finger moved down (scroll down - content moves up)
      // touchDelta < 0 means finger moved up (scroll up - content moves down)
      // For mobile: when user swipes down (scroll down), texts should appear
      if (touchDelta < 0) {
        // Scroll down (finger moved up, content scrolls down) - move texts toward center
        totalScrollRef.current = Math.min(
          totalScrollRef.current + Math.abs(touchDelta) * scrollMultiplier,
          maxScroll
        );
      } else {
        // Scroll up (finger moved down, content scrolls up) - move texts away from center
        totalScrollRef.current = Math.max(
          totalScrollRef.current - Math.abs(touchDelta) * scrollMultiplier,
          0
        );
      }
      
      // Calculate progress (0 to 1)
      const progress = totalScrollRef.current / maxScroll;
      setScrollProgress(progress);
    };

    const handleScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Calculate video opacity based on scroll progress
  // When scrollProgress is 0, opacity is 0.8 (80%)
  // When scrollProgress is 1, opacity is 0.2 (20%)
  const videoOpacity = 0.8 - scrollProgress * 0.6;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Navbar - appears with scroll progress */}
      {scrollProgress > 0 && (
        <header
          className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * -100}%)`,
          }}
        >
          <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
            {/* Left: Wuub Logo */}
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wuub-orange focus-visible:ring-offset-2"
              aria-label="Wuub logo"
            >
              <span className="rounded-full bg-wuub-orange px-2 py-1 text-xs font-bold uppercase text-white">
                Wuub
              </span>
            </Link>

            {/* Right: Language Switcher */}
            <div className="flex items-center [&_label]:text-white [&_select]:border-white/20 [&_select]:bg-white/10 [&_select]:text-white [&_select]:backdrop-blur-sm [&_select]:hover:bg-white/20">
              <LangSwitcher locale={locale} />
            </div>
          </div>
        </header>
      )}

      <video
        ref={videoRef}
        className="h-screen w-full object-cover transition-opacity duration-500"
        style={{ opacity: videoOpacity }}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      >
        <source src="/monkey.mp4" type="video/mp4" />
        Tarayıcınız video oynatmayı desteklemiyor.
      </video>
      
      {/* Left side text */}
      {leftText && scrollProgress > 0 && (
        <div
          className="absolute z-50 transition-all duration-500 ease-out"
          style={{
            pointerEvents: "none",
            top: "30%", // More spacing from center
            left: scrollProgress >= 1 
              ? "50%" 
              : `${-100 + scrollProgress * 150}%`,
            transform: scrollProgress >= 1 
              ? "translate(-50%, -50%)" 
              : "translate(0, -50%)",
            opacity: scrollProgress,
          }}
        >
          <p className="whitespace-nowrap text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] md:text-6xl lg:text-7xl" style={{ fontWeight: 900 }}>
            {leftText}
          </p>
        </div>
      )}

      {/* Right side text */}
      {rightText && scrollProgress > 0 && (
        <div
          className="absolute z-50 transition-all duration-500 ease-out"
          style={{
            pointerEvents: "none",
            top: "70%", // More spacing from center
            right: scrollProgress >= 1 
              ? "auto" 
              : `${-100 + scrollProgress * 150}%`,
            left: scrollProgress >= 1 
              ? "50%" 
              : "auto",
            transform: scrollProgress >= 1 
              ? "translate(-50%, -50%)" 
              : "translate(0, -50%)",
            opacity: scrollProgress,
          }}
        >
          <p className="whitespace-nowrap text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] md:text-6xl lg:text-7xl" style={{ fontWeight: 900 }}>
            {rightText}
          </p>
        </div>
      )}

      {/* Center text */}
      {centerText && scrollProgress > 0 && (
        <div
          className="absolute z-50 transition-all duration-500 ease-out"
          style={{
            pointerEvents: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: scrollProgress,
          }}
        >
          <p className="whitespace-nowrap text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] md:text-6xl lg:text-7xl" style={{ fontWeight: 900 }}>
            {centerText}
          </p>
        </div>
      )}
    </div>
  );
};

