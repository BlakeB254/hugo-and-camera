"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
  variant?: "gold" | "chrome" | "subtle";
  animated?: boolean;
}

// Aztec-inspired diamond pattern - subtle geometric decoration
export function AztecPattern({ className, variant = "gold", animated = false }: PatternProps) {
  const color = variant === "gold" ? "var(--gold)" : variant === "chrome" ? "var(--chrome)" : "var(--gold-dark)";
  const opacity = variant === "subtle" ? 0.3 : 0.6;

  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Central diamond */}
      <motion.path
        d="M50 10 L70 50 L50 90 L30 50 Z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={opacity}
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Inner diamond */}
      <motion.path
        d="M50 25 L62 50 L50 75 L38 50 Z"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity={opacity * 0.7}
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      {/* Corner accents */}
      <motion.path
        d="M10 10 L20 10 L10 20 Z M90 10 L80 10 L90 20 Z M10 90 L20 90 L10 80 Z M90 90 L80 90 L90 80 Z"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity={opacity * 0.5}
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </svg>
  );
}

// Flowing pinstripe curves - Von Dutch inspired
export function PinstripeFlowPattern({ className, variant = "gold" }: PatternProps) {
  const color = variant === "gold" ? "var(--gold)" : variant === "chrome" ? "var(--chrome)" : "var(--gold-dark)";

  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 200 100"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Main flowing curve */}
      <motion.path
        d="M0 50 C40 30 60 70 100 50 C140 30 160 70 200 50"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity={0.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {/* Parallel accent */}
      <motion.path
        d="M0 45 C40 25 60 65 100 45 C140 25 160 65 200 45"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={0.25}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      />
      <motion.path
        d="M0 55 C40 35 60 75 100 55 C140 35 160 75 200 55"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={0.25}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      />
    </svg>
  );
}

// Corner flourish for frames and borders
export function CornerFlourish({
  className,
  position = "top-left",
  variant = "gold",
  size = 48,
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "gold" | "chrome";
  size?: number;
}) {
  const color = variant === "gold" ? "var(--gold)" : "var(--chrome)";

  const rotations = {
    "top-left": "0",
    "top-right": "90",
    "bottom-right": "180",
    "bottom-left": "270",
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ transform: `rotate(${rotations[position]}deg)` }}
    >
      {/* Main curve */}
      <motion.path
        d="M4 44 Q4 4 44 4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Inner curve */}
      <motion.path
        d="M8 40 Q8 8 40 8"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      {/* Small curl accent */}
      <motion.path
        d="M4 44 C6 38 10 36 14 38"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
    </svg>
  );
}

// Horizontal divider with classic lowrider pinstripe style
export function LowriderDivider({ className, variant = "gold" }: PatternProps) {
  const color = variant === "gold" ? "var(--gold)" : "var(--chrome)";

  return (
    <div className={cn("w-full h-8 relative", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 400 32"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Center diamond */}
        <motion.path
          d="M192 16 L200 8 L208 16 L200 24 Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* Left flowing line */}
        <motion.path
          d="M0 16 C60 12 120 20 180 16"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {/* Right flowing line */}
        <motion.path
          d="M220 16 C280 12 340 20 400 16"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {/* Accent lines */}
        <motion.path
          d="M40 14 L80 14 M320 14 L360 14"
          stroke={color}
          strokeWidth="1"
          opacity={0.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.path
          d="M40 18 L80 18 M320 18 L360 18"
          stroke={color}
          strokeWidth="1"
          opacity={0.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>
    </div>
  );
}

// Subtle background pattern for sections
export function CulturalBackgroundPattern({
  className,
  variant = "gold",
  density = "sparse",
}: {
  className?: string;
  variant?: "gold" | "chrome" | "subtle";
  density?: "sparse" | "medium" | "dense";
}) {
  const color = variant === "gold" ? "var(--gold)" : variant === "chrome" ? "var(--chrome)" : "var(--muted-foreground)";
  const baseOpacity = variant === "subtle" ? 0.03 : 0.05;
  const spacing = density === "sparse" ? 120 : density === "medium" ? 80 : 50;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`cultural-pattern-${variant}-${density}`}
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond shape */}
            <path
              d={`M${spacing/2} ${spacing/4} L${spacing*0.65} ${spacing/2} L${spacing/2} ${spacing*0.75} L${spacing*0.35} ${spacing/2} Z`}
              stroke={color}
              strokeWidth="0.5"
              fill="none"
              opacity={baseOpacity}
            />
            {/* Corner dots */}
            <circle cx={spacing/6} cy={spacing/6} r="1" fill={color} opacity={baseOpacity * 0.8} />
            <circle cx={spacing*5/6} cy={spacing/6} r="1" fill={color} opacity={baseOpacity * 0.8} />
            <circle cx={spacing/6} cy={spacing*5/6} r="1" fill={color} opacity={baseOpacity * 0.8} />
            <circle cx={spacing*5/6} cy={spacing*5/6} r="1" fill={color} opacity={baseOpacity * 0.8} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cultural-pattern-${variant}-${density})`} />
      </svg>
    </div>
  );
}

// Simple decorative element to replace the eye-like shape
export function DiamondAccent({
  className,
  size = 32,
  variant = "gold",
}: {
  className?: string;
  size?: number;
  variant?: "gold" | "chrome";
}) {
  const color = variant === "gold" ? "var(--gold)" : "var(--chrome)";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <motion.path
        d="M16 4 L28 16 L16 28 L4 16 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M16 10 L22 16 L16 22 L10 16 Z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.circle
        cx="16"
        cy="16"
        r="2"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
    </svg>
  );
}
