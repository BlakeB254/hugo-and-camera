"use client";

import { useEffect, useRef, useState } from "react";

// Mobile: 3.4MB compressed clip (30s, 480p) for reliable autoplay
// Desktop: Full quality reel (55MB, 1080p)
const mobileVideo = "/videos/hero-mobile.mp4";
const desktopVideo = "/videos/hero-clip-4.mp4";

interface VideoHeroBackgroundProps {
  className?: string;
}

export function VideoHeroBackground({ className = "" }: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Detect device and set appropriate video source on client
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setVideoSrc(isMobile ? mobileVideo : desktopVideo);
  }, []);

  // Don't render video until we know the source
  if (!videoSrc) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element - simple autoplay setup matching chef-jess-demo */}
      <video
        ref={videoRef}
        key={videoSrc}
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
        <source src={videoSrc} type="video/mp4" />
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
