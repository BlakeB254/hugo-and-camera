"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Instagram, Youtube, Camera, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigation, siteConfig } from "@/lib/constants";
import { CulturalBackgroundPattern, LowriderDivider } from "@/components/cultural/cultural-icons";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 h-32 md:h-36 flex items-center justify-between">
        {/* Logo - larger for legibility */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/images/logo-header.png"
              alt="Hugo and His Camera"
              width={1000}
              height={916}
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-lg"
              priority
              quality={95}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Social + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-[var(--gold)] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-[var(--chrome)] transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-background/95 backdrop-blur-md border-l-2 border-[var(--gold)]/30 p-0 overflow-hidden">
              {/* Cultural background pattern */}
              <CulturalBackgroundPattern variant="gold" density="sparse" className="opacity-30" />

              <div className="flex flex-col h-full relative z-10 p-6">
                {/* Mobile Logo + Tagline */}
                <div className="mb-6 pb-4 border-b border-[var(--gold)]/20">
                  <Image
                    src="/images/logo-small.png"
                    alt="Hugo and His Camera"
                    width={160}
                    height={80}
                    className="h-14 w-auto object-contain mb-3"
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-[var(--gold)]" />
                    <span>Chicago</span>
                    <span className="text-[var(--gold)]">•</span>
                    <span>Worldwide</span>
                  </div>
                </div>

                {/* Mobile Nav Links - Enhanced styling */}
                <nav className="flex flex-col gap-1 flex-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.08, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-3 py-3 px-4 -mx-2 rounded-lg text-lg font-medium text-foreground hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/40 group-hover:bg-[var(--gold)] group-hover:scale-150 transition-all duration-200" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <LowriderDivider className="my-4" variant="gold" />

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--gold)] text-background font-semibold rounded-lg hover:bg-[var(--gold-dark)] transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    Book a Session
                  </Link>
                </motion.div>

                {/* Mobile Social - Enhanced */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 border-t border-[var(--gold)]/20"
                >
                  <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Follow the Journey</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                    <a
                      href={siteConfig.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--chrome)]/10 text-[var(--chrome)] hover:bg-[var(--chrome)]/20 transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                      <span className="text-sm font-medium">YouTube</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
