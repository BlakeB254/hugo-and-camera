/**
 * Content Management System - Server Only
 *
 * This module loads gallery and video content from JSON files in the /content directory.
 * IMPORTANT: This file can only be imported in Server Components or API routes.
 *
 * To add new content:
 * 1. Add images to /public/images/gallery/{category}/
 * 2. Update the corresponding JSON file in /content/gallery/
 * 3. Rebuild the site
 */

import 'server-only';
import fs from 'fs';
import path from 'path';
import type {
  GalleryItem,
  GalleryCategory,
  VideoItem,
  ContentStats,
} from './content-types';

// Re-export types for convenience
export type { GalleryItem, GalleryCategory, VideoItem, ContentStats };

const CONTENT_DIR = path.join(process.cwd(), 'content');
const GALLERY_DIR = path.join(CONTENT_DIR, 'gallery');
const VIDEOS_FILE = path.join(CONTENT_DIR, 'videos', 'videos.json');

/**
 * Load a single gallery category from JSON
 */
export function loadGalleryCategory(categoryId: string): GalleryCategory | null {
  try {
    const filePath = path.join(GALLERY_DIR, `${categoryId}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Gallery category file not found: ${categoryId}`);
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading gallery category ${categoryId}:`, error);
    return null;
  }
}

/**
 * Load all gallery categories
 */
export function loadAllGalleries(): GalleryCategory[] {
  try {
    if (!fs.existsSync(GALLERY_DIR)) {
      console.warn('Gallery directory not found');
      return [];
    }

    const files = fs.readdirSync(GALLERY_DIR).filter(f => f.endsWith('.json'));
    const categories: GalleryCategory[] = [];

    for (const file of files) {
      const categoryId = file.replace('.json', '');
      const category = loadGalleryCategory(categoryId);
      if (category) {
        categories.push(category);
      }
    }

    return categories;
  } catch (error) {
    console.error('Error loading galleries:', error);
    return [];
  }
}

/**
 * Get all items across all categories
 */
export function getAllGalleryItems(): GalleryItem[] {
  const categories = loadAllGalleries();
  return categories.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.category }))
  );
}

/**
 * Get featured items from all categories
 */
export function getFeaturedGalleryItems(): GalleryItem[] {
  return getAllGalleryItems().filter(item => item.featured);
}

/**
 * Get items by category
 */
export function getGalleryItemsByCategory(categoryId: string): GalleryItem[] {
  const category = loadGalleryCategory(categoryId);
  return category?.items || [];
}

/**
 * Load video content
 */
export function loadVideos(): VideoItem[] {
  try {
    if (!fs.existsSync(VIDEOS_FILE)) {
      console.warn('Videos file not found');
      return getPlaceholderVideos();
    }
    const content = fs.readFileSync(VIDEOS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return data.items || [];
  } catch (error) {
    console.error('Error loading videos:', error);
    return getPlaceholderVideos();
  }
}

/**
 * Get featured videos
 */
export function getFeaturedVideos(): VideoItem[] {
  return loadVideos().filter(v => v.featured);
}

/**
 * Fallback videos when no content file exists
 */
function getPlaceholderVideos(): VideoItem[] {
  return [
    {
      id: "video-1",
      title: "Night Moves",
      description: "Cruising the streets after dark with hydraulics hitting",
      thumbnail: "/images/gallery/lowriders/lowrider-sparking-highway-action.jpg",
      youtubeId: "dQw4w9WgXcQ",
      duration: "4:32",
      featured: true,
      tags: ["cruising", "night", "hydraulics"],
    },
  ];
}

/**
 * Get total counts for stats display
 */
export function getContentStats(): ContentStats {
  const allItems = getAllGalleryItems();
  const videos = loadVideos();

  return {
    totalPhotos: allItems.length,
    totalVideos: videos.length,
    categories: loadAllGalleries().length,
    featuredItems: allItems.filter(i => i.featured).length,
  };
}
