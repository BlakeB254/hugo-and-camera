"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Gradient definitions for consistent use across components
const PinstripeGradientDefs = () => (
  <defs>
    {/* Gold to Chrome gradient */}
    <linearGradient id="pinstripe-gold-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="var(--gold)" />
      <stop offset="50%" stopColor="var(--chrome)" />
      <stop offset="100%" stopColor="var(--gold)" />
    </linearGradient>
    {/* Horizontal gold gradient */}
    <linearGradient id="pinstripe-horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="transparent" />
      <stop offset="10%" stopColor="var(--gold-dark)" />
      <stop offset="25%" stopColor="var(--gold)" />
      <stop offset="50%" stopColor="var(--chrome-light)" />
      <stop offset="75%" stopColor="var(--gold)" />
      <stop offset="90%" stopColor="var(--gold-dark)" />
      <stop offset="100%" stopColor="transparent" />
    </linearGradient>
    {/* Chrome gradient */}
    <linearGradient id="pinstripe-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="var(--chrome-light)" />
      <stop offset="50%" stopColor="var(--chrome-dark)" />
      <stop offset="100%" stopColor="var(--chrome-light)" />
    </linearGradient>
    {/* Gold gradient */}
    <linearGradient id="pinstripe-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="var(--gold-dark)" />
      <stop offset="50%" stopColor="var(--gold)" />
      <stop offset="100%" stopColor="var(--gold-dark)" />
    </linearGradient>
  </defs>
);

interface PinstripeBorderProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "gold" | "chrome" | "gradient";
  animated?: boolean;
}

export function PinstripeBorder({
  children,
  className,
  variant = "gold",
  animated = false,
}: PinstripeBorderProps) {
  const gradientId = {
    gold: "pinstripe-gold",
    chrome: "pinstripe-chrome",
    gradient: "pinstripe-gold-chrome",
  }[variant];

  return (
    <div className={cn("relative", className)}>
      {/* Top-Left Corner Flourish */}
      <svg
        className="absolute -top-3 -left-3 w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <PinstripeGradientDefs />
        {/* Outer flourish curve */}
        <motion.path
          d="M4 44 Q4 4 44 4"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Inner flourish curve */}
        <motion.path
          d="M8 40 Q8 8 40 8"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        />
        {/* Decorative curl at corner */}
        <motion.path
          d="M4 44 C4 38 6 34 10 34 C14 34 16 38 16 42"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        {/* Small accent dot */}
        <motion.circle
          cx="10"
          cy="34"
          r="1.5"
          fill="var(--gold)"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>

      {/* Top-Right Corner Flourish */}
      <svg
        className="absolute -top-3 -right-3 w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <PinstripeGradientDefs />
        <motion.path
          d="M44 44 Q44 4 4 4"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.path
          d="M40 40 Q40 8 8 8"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        />
        <motion.path
          d="M44 44 C44 38 42 34 38 34 C34 34 32 38 32 42"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        <motion.circle
          cx="38"
          cy="34"
          r="1.5"
          fill="var(--gold)"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>

      {/* Bottom-Left Corner Flourish */}
      <svg
        className="absolute -bottom-3 -left-3 w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <PinstripeGradientDefs />
        <motion.path
          d="M4 4 Q4 44 44 44"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.path
          d="M8 8 Q8 40 40 40"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        />
        <motion.path
          d="M4 4 C4 10 6 14 10 14 C14 14 16 10 16 6"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        <motion.circle
          cx="10"
          cy="14"
          r="1.5"
          fill="var(--gold)"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>

      {/* Bottom-Right Corner Flourish */}
      <svg
        className="absolute -bottom-3 -right-3 w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <PinstripeGradientDefs />
        <motion.path
          d="M44 4 Q44 44 4 44"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.path
          d="M40 8 Q40 40 8 40"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        />
        <motion.path
          d="M44 4 C44 10 42 14 38 14 C34 14 32 10 32 6"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        <motion.circle
          cx="38"
          cy="14"
          r="1.5"
          fill="var(--gold)"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>

      {/* Border - gold pinstripe effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          border: '2px solid transparent',
          borderImage: 'linear-gradient(135deg, var(--gold), var(--chrome), var(--gold)) 1',
        }}
      />

      {/* Inner border */}
      <div
        className="absolute inset-[4px] pointer-events-none rounded-md"
        style={{
          border: '1px solid transparent',
          borderImage: 'linear-gradient(135deg, var(--gold-dark), var(--chrome-dark), var(--gold-dark)) 1',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}

// Enhanced horizontal pinstripe divider with flowing curves
export function PinstripeHorizontal({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("relative h-10 w-full overflow-hidden", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <PinstripeGradientDefs />

        {/* Center flowing line - main pinstripe */}
        <motion.path
          d="M0 20
             C100 14 150 26 250 20
             C350 14 400 26 500 20
             C600 14 650 26 750 20
             C850 14 900 26 1000 20
             C1100 14 1150 26 1200 20"
          stroke="url(#pinstripe-horizontal)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Upper accent line */}
        <motion.path
          d="M0 14
             C100 20 150 8 250 14
             C350 20 400 8 500 14
             C600 20 650 8 750 14
             C850 20 900 8 1000 14
             C1100 20 1150 8 1200 14"
          stroke="url(#pinstripe-horizontal)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />

        {/* Lower accent line */}
        <motion.path
          d="M0 26
             C100 20 150 32 250 26
             C350 20 400 32 500 26
             C600 20 650 32 750 26
             C850 20 900 32 1000 26
             C1100 20 1150 32 1200 26"
          stroke="url(#pinstripe-horizontal)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />

        {/* Decorative center accent dots */}
        {[200, 400, 600, 800, 1000].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy="20"
            r="2"
            fill="var(--gold)"
            initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

// Decorative swirl/flourish element - Von Dutch style
export function PinstripeSwirl({
  className,
  size = 64,
  variant = "gold",
}: {
  className?: string;
  size?: number;
  variant?: "gold" | "chrome";
}) {
  const gradientId = variant === "gold" ? "pinstripe-gold" : "pinstripe-chrome";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
    >
      <PinstripeGradientDefs />

      {/* Main teardrop/leaf shape */}
      <motion.path
        d="M32 4
           C48 8 56 20 56 32
           C56 44 48 56 32 60
           C16 56 8 44 8 32
           C8 20 16 8 32 4 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Inner decorative curve */}
      <motion.path
        d="M32 12
           C42 16 48 24 48 32
           C48 40 42 48 32 52
           C22 48 16 40 16 32
           C16 24 22 16 32 12 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />

      {/* Center accent */}
      <motion.circle
        cx="32"
        cy="32"
        r="4"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />

      {/* Top flourish */}
      <motion.path
        d="M32 4 C28 0 24 2 26 8"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      />

      {/* Bottom flourish */}
      <motion.path
        d="M32 60 C36 64 40 62 38 56"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      />
    </svg>
  );
}

// Scrollwork flourish - classic filigree pattern
export function PinstripeScrollwork({
  className,
  width = 200,
  height = 40,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 200 40"
      fill="none"
    >
      <PinstripeGradientDefs />

      {/* Left scroll */}
      <motion.path
        d="M10 20
           C10 10 20 5 30 10
           C40 15 35 25 25 25
           C20 25 15 22 15 20"
        stroke="url(#pinstripe-gold-chrome)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Center connecting line */}
      <motion.path
        d="M30 20 C50 15 70 25 100 20 C130 15 150 25 170 20"
        stroke="url(#pinstripe-gold-chrome)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />

      {/* Right scroll (mirrored) */}
      <motion.path
        d="M190 20
           C190 10 180 5 170 10
           C160 15 165 25 175 25
           C180 25 185 22 185 20"
        stroke="url(#pinstripe-gold-chrome)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      {/* Accent dots */}
      <motion.circle
        cx="100"
        cy="20"
        r="3"
        fill="var(--gold)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      />
      <motion.circle
        cx="60"
        cy="18"
        r="1.5"
        fill="var(--chrome)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
      />
      <motion.circle
        cx="140"
        cy="18"
        r="1.5"
        fill="var(--chrome)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
    </svg>
  );
}

// Section divider with decorative flourish
export function PinstripeDivider({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 my-8", className)}>
      {/* Left flourish */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-[var(--chrome)]" />

      {text ? (
        <span className="text-sm font-medium text-[var(--gold)] uppercase tracking-widest">
          {text}
        </span>
      ) : (
        <PinstripeSwirl size={32} variant="gold" />
      )}

      {/* Right flourish */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--gold)] to-[var(--chrome)]" />
    </div>
  );
}
