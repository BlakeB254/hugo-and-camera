"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoSrc, setVideoSrc] = useState(desktopVideo);
  const playAttempts = useRef(0);
  const maxAttempts = 3;

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

  // Attempt to play video
  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isPlaying) return;

    playAttempts.current += 1;

    try {
      video.muted = true;
      await video.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (error) {
      console.log(`Play attempt ${playAttempts.current} failed`);

      if (playAttempts.current >= maxAttempts) {
        // Show play button as fallback on mobile
        if (isMobile) {
          setShowPlayButton(true);
        }
      } else {
        setTimeout(attemptPlay, 300);
      }
    }
  }, [isPlaying, isMobile]);

  // Manual play handler for play button
  const handleManualPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play()
      .then(() => {
        setIsPlaying(true);
        setShowPlayButton(false);
      })
      .catch(() => {
        // If still failing, video might be blocked entirely
        console.log("Manual play failed");
      });
  }, []);

  // Set iOS-specific attributes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
  }, []);

  // Initialize video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => attemptPlay();
    const handlePlaying = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };
    const handleError = () => {
      if (isMobile) setShowPlayButton(true);
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", attemptPlay);

    // Initial attempt
    const timeout = setTimeout(attemptPlay, 100);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", attemptPlay);
      clearTimeout(timeout);
    };
  }, [attemptPlay, isMobile]);

  // Touch/click anywhere to play (mobile)
  useEffect(() => {
    if (isPlaying || !isMobile) return;

    const handleTouch = () => {
      attemptPlay();
    };

    document.addEventListener("touchstart", handleTouch, { once: true, passive: true });
    return () => document.removeEventListener("touchstart", handleTouch);
  }, [attemptPlay, isPlaying, isMobile]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        key={videoSrc} // Force remount when source changes
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        poster="/images/hero-lowrider.jpg"
      />

      {/* Fallback image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
      />

      {/* Play button for mobile fallback */}
      {showPlayButton && !isPlaying && (
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

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 via-transparent to-[var(--chrome)]/5" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
