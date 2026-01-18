"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { InstagramMedia, categorizeMedia, extractLocationFromCaption } from "@/lib/instagram";
import { siteConfig } from "@/lib/constants";

interface InstagramFeedProps {
  media: InstagramMedia[];
  title?: string;
  showFollowButton?: boolean;
  columns?: 2 | 3 | 4;
}

export function InstagramFeed({
  media,
  title = "LATEST FROM INSTAGRAM",
  showFollowButton = true,
  columns = 4,
}: InstagramFeedProps) {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Instagram className="h-8 w-8 text-[var(--gold)]" />
            <GraffitiText
              text={title}
              variant="gradient"
              size="lg"
              animated={false}
            />
            <p className="text-muted-foreground">
              @hugoandhiscamera
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className={`grid ${columnClasses[columns]} gap-3 md:gap-4`}>
          {media.map((item, index) => (
            <InstagramCard key={item.id} media={item} index={index} />
          ))}
        </div>

        {/* Follow Button */}
        {showFollowButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="chrome-gradient text-background hover:glow-gold transition-all"
            >
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                Follow on Instagram
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface InstagramCardProps {
  media: InstagramMedia;
  index: number;
}

function InstagramCard({ media, index }: InstagramCardProps) {
  const category = categorizeMedia(media);
  const location = media.caption ? extractLocationFromCaption(media.caption) : null;

  // Truncate caption for display
  const shortCaption = media.caption
    ? media.caption.length > 100
      ? media.caption.substring(0, 100) + "..."
      : media.caption
    : "";

  return (
    <motion.a
      href={media.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative aspect-square overflow-hidden rounded-lg bg-card block"
    >
      {/* Image */}
      <Image
        src={media.thumbnail_url || media.media_url}
        alt={shortCaption || "Instagram post"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Video indicator */}
      {media.media_type === "VIDEO" && (
        <div className="absolute top-3 right-3 p-1.5 bg-background/80 rounded-full">
          <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Carousel indicator */}
      {media.media_type === "CAROUSEL_ALBUM" && (
        <div className="absolute top-3 right-3 p-1.5 bg-background/80 rounded-full">
          <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
            <rect x="7" y="7" width="18" height="18" rx="2" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Category badge */}
      {category !== "uncategorized" && (
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-2 py-1 text-xs font-medium bg-[var(--gold)]/80 text-background rounded-full capitalize">
            {category}
          </span>
        </div>
      )}

      {/* Hover content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        {shortCaption && (
          <p className="text-sm text-foreground line-clamp-2 mb-2">
            {shortCaption}
          </p>
        )}
        {location && (
          <p className="text-xs text-[var(--gold)] flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        )}
        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          <span className="text-xs">View on Instagram</span>
        </div>
      </div>
    </motion.a>
  );
}
