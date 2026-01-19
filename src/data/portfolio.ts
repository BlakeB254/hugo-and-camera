/**
 * Portfolio Data - Static
 *
 * This module provides static portfolio data for client-side rendering.
 * For server-side dynamic content loading, use @/lib/content.ts instead.
 */

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  width: number;
  height: number;
  featured?: boolean;
  tags?: string[];
  date?: string;
  location?: string;
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

// Static portfolio data - matches Instagram content
export const portfolioItems: PortfolioItem[] = [
  // Lowriders
  {
    id: "lowrider-001",
    title: "Blue Lowrider with Neon Lights",
    description: "Custom blue lowrider with vibrant neon underglow at night",
    category: "lowriders",
    image: "/images/gallery/lowriders/blue-lowrider-neon-lights.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["lowrider", "custom car", "hydraulics", "neon", "night show"],
    location: "Chicago, IL",
  },
  {
    id: "lowrider-002",
    title: "Purple Lowrider Car Show",
    description: "Stunning purple custom lowrider on display at car show",
    category: "lowriders",
    image: "/images/gallery/lowriders/purple-lowrider-car-show.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["lowrider", "car show", "custom suspension", "purple paint"],
    location: "Chicago, IL",
  },
  // Bikes
  {
    id: "bike-001",
    title: "Green Lowrider Bike - Woman Rider",
    description: "Custom green lowrider bike with ornate detailing and neon lighting",
    category: "bikes",
    image: "/images/gallery/bikes/green-lowrider-bike-woman.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["lowrider bike", "custom bike", "woman", "neon lights"],
    location: "Chicago, IL",
  },
  {
    id: "bike-002",
    title: "Man on Lowrider Bike with Flags",
    description: "Man posing with custom lowrider bike displaying American and Mexican flags",
    category: "bikes",
    image: "/images/gallery/bikes/man-lowrider-bike-flags.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["lowrider bike", "man", "flags", "community event"],
    location: "Chicago, IL",
  },
  // Portraits
  {
    id: "portrait-001",
    title: "Woman at Car Show - Sunglasses",
    description: "Stylish woman portrait at car show with Chicago skyline backdrop",
    category: "portraits",
    image: "/images/gallery/portraits/woman-sunglasses-car-show.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["portrait", "woman", "car show", "sunglasses", "urban"],
    location: "Chicago, IL",
  },
  {
    id: "portrait-002",
    title: "Woman in Red Dress - Car Interior",
    description: "Elegant woman in red dress posing in lowrider car interior",
    category: "portraits",
    image: "/images/gallery/portraits/woman-red-dress-car.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["portrait", "woman", "red dress", "car interior", "elegant"],
    location: "Chicago, IL",
  },
  // Events
  {
    id: "event-001",
    title: "Car Show Gathering with Lowriders",
    description: "Large community car show with multiple custom lowriders and enthusiasts",
    category: "events",
    image: "/images/gallery/events/car-show-gathering-lowriders.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["car show", "event", "community", "lowriders", "gathering"],
    location: "Chicago, IL",
  },
  {
    id: "event-002",
    title: "Nighttime Car Show with Neon",
    description: "Evening car show featuring illuminated lowriders with neon underglow",
    category: "events",
    image: "/images/gallery/events/neon-car-show-night.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["car show", "event", "neon", "night", "lowriders"],
    location: "Chicago, IL",
  },
  // Street
  {
    id: "street-001",
    title: "Chicago Skyline",
    description: "Iconic Chicago skyline photograph with urban street scene",
    category: "street",
    image: "/images/gallery/street/chicago-skyline-urban.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["urban", "skyline", "Chicago", "architecture", "cityscape"],
    location: "Chicago, IL",
  },
  {
    id: "street-002",
    title: "Street Mural - Migration",
    description: "Powerful street art mural depicting migration themes with cultural significance",
    category: "street",
    image: "/images/gallery/street/street-mural-migration.jpg",
    width: 1080,
    height: 1350,
    featured: true,
    tags: ["street art", "mural", "migration", "cultural", "vibrant"],
    location: "Chicago, IL",
  },
];

// Video content
export const videoItems: VideoItem[] = [
  {
    id: "video-1",
    title: "Night Moves",
    description: "Cruising the streets of Chicago after dark",
    thumbnail: "/images/videos/night-cruising.jpg",
    youtubeId: "placeholder",
    duration: "4:32",
    featured: true,
    tags: ["cruising", "night", "hydraulics", "chicago"],
  },
];

// Get items by category
export function getItemsByCategory(category: string): PortfolioItem[] {
  return portfolioItems.filter((item) => item.category === category);
}

// Get featured items
export function getFeaturedItems(): PortfolioItem[] {
  return portfolioItems.filter((item) => item.featured);
}

// Get single item
export function getItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id);
}
