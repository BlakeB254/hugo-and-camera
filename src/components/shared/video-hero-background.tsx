"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

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
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoSrc, setVideoSrc] = useState(desktopVideo);

  // Detect mobile and set appropriate video source
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setVideoSrc(mobile ? mobileVideo : desktopVideo);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle video loaded - check if actually playing
  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  // Handle video playing
  const handlePlaying = () => {
    setIsLoaded(true);
    setShowPlayButton(false);
  };

  // Show play button if video doesn't start within timeout
  useEffect(() => {
    if (!isMobile) return;

    const timeout = setTimeout(() => {
      const video = videoRef.current;
      if (video && video.paused) {
        setShowPlayButton(true);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isMobile, videoSrc]);

  // Manual play handler
  const handleManualPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      await video.play();
      setIsLoaded(true);
      setShowPlayButton(false);
    } catch (error) {
      console.log("Manual play failed:", error);
    }
  };

  // Touch anywhere to trigger play on mobile
  useEffect(() => {
    if (!isMobile || isLoaded) return;

    const handleInteraction = async () => {
      const video = videoRef.current;
      if (video && video.paused) {
        try {
          video.muted = true;
          await video.play();
          setIsLoaded(true);
          setShowPlayButton(false);
        } catch (e) {
          console.log("Touch play failed");
        }
      }
    };

    // Listen for any user interaction
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, [isMobile, isLoaded]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main video element - using source tag like chef-jess-demo */}
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
        onLoadedData={handleLoadedData}
        onPlaying={handlePlaying}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Fallback image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
      />

      {/* Play button for mobile fallback */}
      {showPlayButton && !isLoaded && (
        <button
          onClick={handleManualPlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                     w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/30
                     flex items-center justify-center transition-all hover:scale-110 hover:bg-black/70
                     active:scale-95"
          aria-label="Play video"
        >
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </button>
      )}

      {/* Overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
