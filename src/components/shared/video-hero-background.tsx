"use client";

import { useEffect, useRef, useState } from "react";

// Different video sizes for different devices
// Mobile: 5.2MB clip for reliable autoplay
// Desktop: 55MB full reel for better quality
const mobileVideo = "/videos/hero-clip-2.mp4";
const desktopVideo = "/videos/hero-clip-4.mp4";

interface VideoHeroBackgroundProps {
  className?: string;
}

export function VideoHeroBackground({ className = "" }: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(mobileVideo); // Default to mobile for SSR

  // Detect device and set appropriate video source
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setVideoSrc(isMobile ? mobileVideo : desktopVideo);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element - matching chef-jess-demo pattern exactly */}
      <video
        ref={videoRef}
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
