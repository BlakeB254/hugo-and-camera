"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrevious, onNext]);

  // Swipe handling for touch devices
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        onNext();
      } else {
        onPrevious();
      }
    },
    [onNext, onPrevious]
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

        {/* Pinstripe decoration - top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-candy-purple via-electric-blue to-cherry-red" />
        {/* Pinstripe decoration - bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cherry-red via-electric-blue to-candy-purple" />

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-foreground hover:text-cherry-red hover:bg-cherry-red/10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-foreground hover:text-candy-purple hover:bg-candy-purple/10"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-foreground hover:text-candy-purple hover:bg-candy-purple/10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Image Container */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 100) {
              handleSwipe(info.offset.x > 0 ? "right" : "left");
            }
          }}
        >
          {/* Image with pinstripe border effect */}
          <div className="relative pinstripe-border">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              width={currentItem.width}
              height={currentItem.height}
              className="max-h-[70vh] w-auto object-contain rounded-lg"
              priority
            />
          </div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 to-transparent rounded-b-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {currentItem.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {currentItem.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {currentItem.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-candy-purple" />
                      {currentItem.location}
                    </span>
                  )}
                  {currentItem.tags && currentItem.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-electric-blue" />
                      {currentItem.tags.slice(0, 3).join(", ")}
                    </span>
                  )}
                </div>
              </div>
              {/* Counter */}
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                <span className="gold-text font-bold">{currentIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{items.length}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full backdrop-blur-sm">
            {items.slice(
              Math.max(0, currentIndex - 3),
              Math.min(items.length, currentIndex + 4)
            ).map((item, index) => {
              const actualIndex = Math.max(0, currentIndex - 3) + index;
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    const direction = actualIndex - currentIndex;
                    if (direction > 0) {
                      for (let i = 0; i < direction; i++) onNext();
                    } else if (direction < 0) {
                      for (let i = 0; i < Math.abs(direction); i++) onPrevious();
                    }
                  }}
                  className={cn(
                    "relative w-10 h-10 rounded-md overflow-hidden transition-all duration-200",
                    actualIndex === currentIndex
                      ? "ring-2 ring-candy-purple scale-110"
                      : "opacity-50 hover:opacity-100"
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
