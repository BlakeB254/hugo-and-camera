"use client";

import { useState } from "react";

// Single video for all devices
const heroVideo = "/videos/hero-clip-4.mp4";

interface VideoHeroBackgroundProps {
  className?: string;
}

export function VideoHeroBackground({ className = "" }: VideoHeroBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element - simple autoplay setup */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-lowrider.jpg"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Fallback poster image (shows until video loads) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
      />

      {/* Overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
