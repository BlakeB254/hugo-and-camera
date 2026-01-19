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
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortraitVideo, setIsPortraitVideo] = useState(true); // Assume portrait for IG reels
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

  // Detect video aspect ratio once loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const isPortrait = video.videoHeight > video.videoWidth;
      setIsPortraitVideo(isPortrait);
    }
  }, []);

  // Attempt to play both videos (main + blur background)
  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    const blurVideo = blurVideoRef.current;
    if (!video || isPlaying) return;

    playAttempts.current += 1;

    try {
      video.muted = true;
      if (blurVideo) blurVideo.muted = true;

      // Play both videos in sync
      await video.play();
      if (blurVideo) {
        blurVideo.currentTime = video.currentTime;
        blurVideo.play().catch(() => {});
      }

      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (error) {
      console.log(`Play attempt ${playAttempts.current} failed`);

      if (playAttempts.current >= maxAttempts) {
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
    const blurVideo = blurVideoRef.current;
    if (!video) return;

    video.muted = true;
    if (blurVideo) blurVideo.muted = true;

    video.play()
      .then(() => {
        if (blurVideo) {
          blurVideo.currentTime = video.currentTime;
          blurVideo.play().catch(() => {});
        }
        setIsPlaying(true);
        setShowPlayButton(false);
      })
      .catch(() => {
        console.log("Manual play failed");
      });
  }, []);

  // Set iOS-specific attributes
  useEffect(() => {
    const video = videoRef.current;
    const blurVideo = blurVideoRef.current;
    if (!video) return;

    const setAttrs = (el: HTMLVideoElement) => {
      el.setAttribute("webkit-playsinline", "true");
      el.setAttribute("playsinline", "true");
      el.setAttribute("x5-playsinline", "true");
      el.setAttribute("x5-video-player-type", "h5");
    };

    setAttrs(video);
    if (blurVideo) setAttrs(blurVideo);
  }, []);

  // Sync blur video with main video
  useEffect(() => {
    const video = videoRef.current;
    const blurVideo = blurVideoRef.current;
    if (!video || !blurVideo) return;

    const syncVideos = () => {
      if (Math.abs(video.currentTime - blurVideo.currentTime) > 0.1) {
        blurVideo.currentTime = video.currentTime;
      }
    };

    video.addEventListener("seeked", syncVideos);
    return () => video.removeEventListener("seeked", syncVideos);
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
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const timeout = setTimeout(attemptPlay, 100);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      clearTimeout(timeout);
    };
  }, [attemptPlay, isMobile, handleLoadedMetadata]);

  // Touch/click anywhere to play (mobile)
  useEffect(() => {
    if (isPlaying || !isMobile) return;

    const handleTouch = () => attemptPlay();

    document.addEventListener("touchstart", handleTouch, { once: true, passive: true });
    return () => document.removeEventListener("touchstart", handleTouch);
  }, [attemptPlay, isPlaying, isMobile]);

  // Determine if we should show the blur background (portrait video on landscape screen)
  const showBlurBackground = isPortraitVideo && !isMobile;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Blurred background video for portrait videos on desktop */}
      {showBlurBackground && (
        <video
          ref={blurVideoRef}
          key={`blur-${videoSrc}`}
          className={`absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-50 transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
      )}

      {/* Main video element */}
      <video
        ref={videoRef}
        key={videoSrc}
        className={`absolute transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        } ${
          // On mobile or landscape video: cover the full area
          // On desktop with portrait video: contain to show full video
          isMobile || !isPortraitVideo
            ? "inset-0 w-full h-full object-cover"
            : "inset-0 w-full h-full object-contain"
        }`}
        src={videoSrc}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        poster="/images/hero-lowrider.jpg"
      />

      {/* Fallback image with proper sizing */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Blur background for fallback image on desktop */}
        {!isMobile && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl brightness-50"
            style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
          />
        )}
        <div
          className={`absolute inset-0 ${
            isMobile ? "bg-cover bg-center" : "bg-contain bg-center bg-no-repeat"
          }`}
          style={{ backgroundImage: "url('/images/hero-lowrider.jpg')" }}
        />
      </div>

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

      {/* Overlay gradients - adjusted for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Side gradients for desktop to blend blur edges */}
      {showBlurBackground && (
        <>
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background/40 to-transparent" />
        </>
      )}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
