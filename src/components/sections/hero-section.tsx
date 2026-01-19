"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { siteConfig } from "@/lib/constants";

// Cities Hugo works in - Chicago is home base
const cities = [
  { name: "Chicago", abbr: "CHI", className: "bg-[var(--gold)]/25 border-[var(--gold)]/60 text-[var(--gold)] shadow-[0_0_20px_rgba(212,175,55,0.4)] neon-pulse", home: true },
  { name: "Los Angeles", abbr: "LA", className: "bg-[var(--chrome)]/10 border-[var(--chrome)]/30 text-[var(--chrome-light)]" },
  { name: "Houston", abbr: "HTX", className: "bg-[var(--chrome)]/10 border-[var(--chrome)]/30 text-[var(--chrome-light)]" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-lowrider.jpg"
          alt="Lowrider at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay gradient - subtle chrome glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/10 via-transparent to-[var(--chrome)]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/images/logo-transparent.png"
            alt="Hugo and His Camera"
            width={500}
            height={400}
            className="mx-auto w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Location Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {cities.map((city, index) => (
            <motion.div
              key={city.abbr}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border ${city.className} ${city.home ? 'scale-110' : ''}`}
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{city.name}</span>
              {city.home && (
                <span className="ml-1 text-xs font-bold uppercase tracking-wider opacity-80">• Home</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="gold-text font-semibold">{siteConfig.tagline}</span>
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground/80 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Chicago&apos;s lowrider culture, Latino heritage, and hood life through the lens.
          Car shows, custom bikes, portraits, and street photography from the Chi to the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Button
            asChild
            size="lg"
            className="chrome-gradient text-background hover:glow-gold px-8 font-semibold"
          >
            <Link href="/gallery">
              View Gallery
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold/10 px-8"
          >
            <Link href="/video" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Watch Videos
            </Link>
          </Button>
        </motion.div>

        {/* Pinstripe Decoration */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <PinstripeHorizontal animated />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
