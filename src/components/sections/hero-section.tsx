"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoHeroBackground } from "@/components/shared/video-hero-background";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Video Background */}
      <VideoHeroBackground className="z-0" />

      {/* Content - positioned at bottom to let video breathe */}
      <div className="relative z-10 container mx-auto px-4 pb-24 md:pb-32">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Hugo</span>
            <span className="gold-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]"> & His Camera</span>
          </h1>
        </motion.div>

        {/* Tagline - authentic voice */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Real shots from the culture. Lowriders, car shows, and the people who live it.
        </motion.p>

        {/* Location + CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Location badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-[var(--gold)]/40">
            <MapPin className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-sm font-medium text-white">Chicago</span>
            <span className="text-xs text-white/60">• Travels Worldwide</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="lg"
              className="chrome-gradient text-background hover:glow-gold font-semibold"
            >
              <Link href="/gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                View Work
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link href="/video" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Videos
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
