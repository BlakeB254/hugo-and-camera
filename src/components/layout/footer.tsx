"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail, MapPin } from "lucide-react";
import { siteConfig, navigation, galleryCategories } from "@/lib/constants";
import { PinstripeHorizontal } from "@/components/cultural/pinstripe-border";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      {/* Pinstripe Divider - Chrome gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--gold)] via-[var(--chrome)] to-[var(--gold)]" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-small.png"
                alt="Hugo and His Camera"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Documenting lowrider culture, Latino heritage, and street life through photography and video.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 gold-text">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 gold-text">
              Gallery
            </h3>
            <ul className="space-y-2">
              {galleryCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 gold-text">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--chrome)] transition-colors"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Chicago, IL
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/70">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/50">
              Built with love for the culture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
