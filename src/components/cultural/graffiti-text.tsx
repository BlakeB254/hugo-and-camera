"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GraffitiTextProps {
  text: string;
  className?: string;
  variant?: "chrome" | "chrome-light" | "gold" | "gradient";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
  animated?: boolean;
  glow?: boolean;
}

export function GraffitiText({
  text,
  className,
  variant = "gradient",
  size = "lg",
  animated = true,
  glow = true,
}: GraffitiTextProps) {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
    hero: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  };

  const variantClasses = {
    chrome: "chrome-text",
    "chrome-light": "text-[var(--chrome-light)]",
    gold: "gold-text",
    gradient: "bg-gradient-to-r from-[var(--gold)] via-[var(--chrome)] to-[var(--gold)] bg-clip-text text-transparent",
  };

  const glowClasses = {
    chrome: "glow-chrome",
    "chrome-light": "",
    gold: "[text-shadow:0_0_10px_rgba(212,175,55,0.8),0_0_20px_rgba(212,175,55,0.6)]",
    gradient: "",
  };

  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  if (!animated) {
    return (
      <span
        className={cn(
          "font-bold tracking-tight",
          sizeClasses[size],
          variantClasses[variant],
          glow && glowClasses[variant],
          className
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={cn(
        "inline-flex font-bold tracking-tight",
        sizeClasses[size],
        glow && glowClasses[variant],
        className
      )}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className={cn(
            variantClasses[variant],
            letter === " " ? "w-[0.25em]" : ""
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Stylized title with outline effect
export function OutlineText({
  text,
  className,
  strokeColor = "#FFD700",
}: {
  text: string;
  className?: string;
  strokeColor?: string;
}) {
  return (
    <span
      className={cn(
        "font-bold text-transparent",
        className
      )}
      style={{
        WebkitTextStroke: `2px ${strokeColor}`,
      }}
    >
      {text}
    </span>
  );
}

// Spray paint reveal effect
export function SprayPaintText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Filter for spray paint effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="spray-paint">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.span
        className="font-bold"
        style={{ filter: "url(#spray-paint)" }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

// Chicano-style Old English text
export function ChicanoText({
  text,
  className,
  animated = true,
}: {
  text: string;
  className?: string;
  animated?: boolean;
}) {
  const textContent = (
    <span
      className={cn(
        "font-bold tracking-wide",
        "bg-gradient-to-b from-chrome-light via-chrome to-chrome-light bg-clip-text text-transparent",
        "[text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]",
        className
      )}
      style={{
        fontFamily: "'Old English Text MT', 'UnifrakturMaguntia', serif",
      }}
    >
      {text}
    </span>
  );

  if (!animated) {
    return textContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {textContent}
    </motion.div>
  );
}
