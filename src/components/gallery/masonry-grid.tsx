"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Lightbox } from "./lightbox";

interface MasonryGridProps {
  items: PortfolioItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function MasonryGrid({
  items,
  columns = 3,
  className,
}: MasonryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || prev === 0) return items.length - 1;
      return prev - 1;
    });
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || prev === items.length - 1) return 0;
      return prev + 1;
    });
  }, [items.length]);

  const columnClasses = {
    2: "columns-1 sm:columns-2",
    3: "columns-1 sm:columns-2 lg:columns-3",
    4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
  };

  return (
    <>
      <div className={cn("gap-4", columnClasses[columns], className)}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="break-inside-avoid mb-4"
          >
            <GalleryCard
              item={item}
              onClick={() => setSelectedIndex(index)}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
}

interface GalleryCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      className="gallery-card group relative block w-full overflow-hidden rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-candy-purple focus:ring-offset-2 focus:ring-offset-background"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container */}
      <div className="relative aspect-auto">
        <Image
          src={item.image}
          alt={item.title}
          width={item.width}
          height={item.height}
          className={cn(
            "w-full h-auto object-cover transition-all duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Chrome shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            initial={{ x: "-200%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Expand icon */}
        <div className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          <Expand className="h-4 w-4 text-foreground" />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-base font-bold text-foreground mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {item.description}
          </p>
          {item.location && (
            <p className="text-xs text-candy-purple mt-1">
              {item.location}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Grid variant with fixed aspect ratios
export function UniformGrid({
  items,
  className,
}: {
  items: PortfolioItem[];
  className?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || prev === 0) return items.length - 1;
      return prev - 1;
    });
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || prev === items.length - 1) return 0;
      return prev + 1;
    });
  }, [items.length]);

  return (
    <>
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        className
      )}>
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setSelectedIndex(index)}
            className="gallery-card group relative aspect-square overflow-hidden rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-candy-purple"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
}
