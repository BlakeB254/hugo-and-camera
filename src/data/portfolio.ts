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

// Static portfolio data
export const portfolioItems: PortfolioItem[] = [
  {
    id: "lowrider-1",
    title: "Purple Reign",
    description: "Candy purple Impala hitting switches at golden hour",
    category: "lowriders",
    image: "/images/hero-lowrider.jpg",
    width: 1920,
    height: 1280,
    featured: true,
    tags: ["impala", "hydraulics", "purple", "golden hour"],
    location: "Chicago, IL",
  },
  {
    id: "bikes-1",
    title: "Blue Steel",
    description: "Custom lowrider bike against graffiti wall",
    category: "bikes",
    image: "/images/bikes-featured.jpg",
    width: 1920,
    height: 1280,
    featured: true,
    tags: ["bike", "chrome", "graffiti", "custom"],
    location: "Chicago, IL",
  },
  {
    id: "portrait-1",
    title: "Hood Portrait",
    description: "Portrait in front of cherry red lowrider",
    category: "portraits",
    image: "/images/portrait-male.jpg",
    width: 1920,
    height: 1280,
    featured: true,
    tags: ["portrait", "male", "lowrider"],
    location: "Chicago, IL",
  },
  {
    id: "portrait-2",
    title: "Elegance",
    description: "Portrait with burgundy lowrider",
    category: "portraits",
    image: "/images/portrait-female.jpg",
    width: 1920,
    height: 1280,
    featured: false,
    tags: ["portrait", "female", "lowrider"],
    location: "Chicago, IL",
  },
  {
    id: "events-1",
    title: "Sunday Funday",
    description: "Community car show with mariachi",
    category: "events",
    image: "/images/events-carshow.jpg",
    width: 1920,
    height: 1280,
    featured: true,
    tags: ["car show", "mariachi", "community", "family"],
    location: "Chicago, IL",
  },
  {
    id: "street-1",
    title: "Varrio Arte",
    description: "Chicano mural with roses and script",
    category: "street",
    image: "/images/street-mural.jpg",
    width: 1920,
    height: 1280,
    featured: true,
    tags: ["mural", "graffiti", "chicano", "art"],
    location: "Chicago, IL",
  },
];

// Video content
export const videoItems: VideoItem[] = [
  {
    id: "video-1",
    title: "Night Moves",
    description: "Cruising the streets after dark",
    thumbnail: "/images/night-cruising.jpg",
    youtubeId: "placeholder",
    duration: "4:32",
    featured: true,
    tags: ["cruising", "night", "hydraulics"],
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
