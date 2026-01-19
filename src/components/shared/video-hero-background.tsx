"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Single IG reel with stitched content - loops seamlessly
const heroVideo = "/videos/hero-clip-4.mp4";

interface VideoHeroBackgroundProps {
  className?: string;
}

export function VideoHeroBackground({ className = "" }: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playAttempts = useRef(0);
  const maxAttempts = 5;

  // Attempt to play video with retries
  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isPlaying || playAttempts.current >= maxAttempts) return;

    playAttempts.current += 1;

    try {
      // Ensure video is muted (required for autoplay on mobile)
      video.muted = true;

      // Try to play
      await video.play();
      setIsPlaying(true);
      setHasError(false);
    } catch (error) {
      console.log(`Video play attempt ${playAttempts.current} failed, retrying...`);

      // Retry after a short delay
      if (playAttempts.current < maxAttempts) {
        setTimeout(attemptPlay, 500);
      } else {
        // After max attempts, show static fallback
        setHasError(true);
      }
    }
  }, [isPlaying]);

  // Set iOS-specific attributes that TypeScript doesn't recognize
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // These attributes help with iOS/Android inline playback
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
    video.setAttribute("x5-video-player-fullscreen", "true");
  }, []);

  // Initialize video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Event handlers
    const handleCanPlay = () => {
      attemptPlay();
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setHasError(false);
    };

    const handleError = () => {
      console.log("Video error, showing fallback");
      setHasError(true);
    };

    const handleStalled = () => {
      // Video stalled, try to resume
      if (!isPlaying) {
        attemptPlay();
      }
    };

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);

    // iOS-specific: try to play on loadeddata
    video.addEventListener("loadeddata", attemptPlay);

    // Initial play attempt after mount
    const initialPlayTimeout = setTimeout(attemptPlay, 100);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("loadeddata", attemptPlay);
      clearTimeout(initialPlayTimeout);
    };
  }, [attemptPlay, isPlaying]);

  // User interaction fallback - play on first touch/click anywhere
  useEffect(() => {
    if (isPlaying) return;

    const handleInteraction = () => {
      attemptPlay();
    };

    // Listen for any user interaction
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true, passive: true });

    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, [attemptPlay, isPlaying]);

  // Intersection Observer - play when visible
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [attemptPlay, isPlaying]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element with all mobile-required attributes */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isPlaying && !hasError ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
        poster="/images/hero-lowrider.jpg"
      >
        {/* Multiple source formats for broader compatibility */}
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback image - shown while loading or on error */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isPlaying && !hasError ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
      />

      {/* Overlay gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/5 via-transparent to-[var(--chrome)]/5" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
