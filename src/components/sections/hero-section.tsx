"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoHeroBackground } from "@/components/shared/video-hero-background";

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden -mt-32 md:-mt-36 h-[100dvh]"
    >
      {/* Video Background */}
      <VideoHeroBackground className="z-0" />

      {/* Content - positioned at bottom with safe spacing for all devices */}
      <div className="relative z-10 container mx-auto px-4 pb-16 sm:pb-12 md:pb-16 lg:pb-20">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-3 sm:mb-4 md:mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Hugo</span>
            <span className="gold-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]"> & His Camera</span>
          </h1>
        </motion.div>

        {/* Tagline - authentic voice */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Real shots from the culture. Lowriders, car shows, and the people who live it.
        </motion.p>

        {/* Location + CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Location badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-sm border border-[var(--gold)]/40">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--gold)]" />
            <span className="text-xs sm:text-sm font-medium text-white">Chicago</span>
            <span className="text-[10px] sm:text-xs text-white/60">• Travels Worldwide</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              size="default"
              className="chrome-gradient text-background hover:glow-gold font-semibold text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 lg:h-11 px-3 sm:px-4 md:px-6"
            >
              <Link href="/gallery" className="flex items-center gap-1.5 sm:gap-2">
                <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                View Work
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="default"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 lg:h-11 px-3 sm:px-4 md:px-6"
            >
              <Link href="/video" className="flex items-center gap-1.5 sm:gap-2">
                <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                Videos
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - only show on larger screens */}
      <motion.div
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
