/**
 * Content Type Definitions
 *
 * These types are shared between server and client components.
 */

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  width?: number;
  height?: number;
  featured?: boolean;
  tags?: string[];
  location?: string;
  date?: string;
  category?: string;
}

export interface GalleryCategory {
  category: string;
  title: string;
  description: string;
  items: GalleryItem[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeId?: string;
  duration: string;
  featured?: boolean;
  tags?: string[];
  date?: string;
}

export interface ContentStats {
  totalPhotos: number;
  totalVideos: number;
  categories: number;
  featuredItems: number;
}
