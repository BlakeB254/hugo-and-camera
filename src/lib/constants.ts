// Site constants and configuration

export const siteConfig = {
  name: "Hugo and His Camera",
  tagline: "Real shots from the culture",
  description: "Chicago-based photographer Hugo captures lowrider culture, car shows, and the people who live it. Custom cars, lowrider bikes, portraits, and event photography from the Chi to the world.",
  url: "https://hugoandcamera.com",
  author: "Hugo",
  location: "Chicago, Illinois",
  social: {
    instagram: "https://instagram.com/hugoandhiscamera",
    youtube: "https://youtube.com/@hugoandhiscamera",
    tiktok: "https://tiktok.com/@hugoandhiscamera",
  },
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Video", href: "/video" },
  { name: "Book", href: "/book" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const galleryCategories = [
  {
    id: "lowriders",
    name: "Lowriders",
    description: "Custom lowrider cars showcasing hydraulic suspensions, vibrant paint jobs, and detailed chrome work",
    href: "/gallery/lowriders",
    image: "/images/gallery/lowriders/chicago-skyline-gold-lowrider-cruising.jpg",
    fallbackImage: "/images/gallery/lowriders/blue-lowrider-neon-lights.jpg",
    color: "gold",
    count: 21,
  },
  {
    id: "bikes",
    name: "Lowrider Bikes",
    description: "Custom lowrider bicycles featuring intricate chrome designs and cultural pride",
    href: "/gallery/bikes",
    image: "/images/gallery/bikes/boy-chrome-lowrider-bike-flags.jpg",
    fallbackImage: "/images/gallery/bikes/boy-chrome-lowrider-bike-flags.jpg",
    color: "chrome",
    count: 1,
  },
  {
    id: "portraits",
    name: "Portraits",
    description: "Community portraits capturing the faces and personalities of lowrider culture",
    href: "/gallery/portraits",
    image: "/images/gallery/portraits/couple-bw-car-show-portrait.jpg",
    fallbackImage: "/images/gallery/portraits/three-men-graffiti-wall.jpg",
    color: "chrome-light",
    count: 30,
  },
  {
    id: "events",
    name: "Events & Car Shows",
    description: "Community events, car shows, and hydraulic hopping competitions",
    href: "/gallery/events",
    image: "/images/gallery/events/hydraulic-hop-competition-night-crowd.jpg",
    fallbackImage: "/images/gallery/events/estilo-car-club-group.jpg",
    color: "gold",
    count: 5,
  },
];

// Cultural design tokens - Chrome & Black Chicano Palette
export const culturalColors = {
  // Chrome/Metallic - Primary
  chrome: "#A8A8A8",
  chromeLight: "#D4D4D4",
  chromeDark: "#707070",
  silver: "#C0C0C0",
  // Gold - Secondary Accent
  gold: "#D4AF37",
  goldLight: "#F4CF67",
  goldDark: "#996515",
  // Subtle Accents - Use sparingly
  accentRed: "#8B0000",
  accentBlue: "#1a3a5c",
  // Neon accents for night shots
  neonBlue: "#00D4FF",
  neonPink: "#FF1493",
  neonGreen: "#39FF14",
};

// Hugo's base location
export const baseLocation = {
  city: "Chicago",
  state: "Illinois",
  abbr: "CHI",
};

// Stats for homepage
export const portfolioStats = {
  totalPhotos: 57,
  categories: 4,
  yearsExperience: 5,
  eventsShot: 100,
};
