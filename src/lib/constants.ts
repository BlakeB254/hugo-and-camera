// Site constants and configuration

export const siteConfig = {
  name: "Hugo and His Camera",
  tagline: "Capturing the Soul of the Streets",
  description: "Chicago-based photographer Hugo captures the city's vibrant lowrider culture, Latino/Latina heritage, and community life. Custom cars, lowrider bikes, portraits, car shows, and urban street photography from the Chi to the world.",
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
    description: "Custom lowrider cars showcasing hydraulic suspensions, vibrant paint jobs, and detailed wheel work",
    href: "/gallery/lowriders",
    image: "/images/gallery/lowriders/blue-lowrider-neon-lights.jpg",
    fallbackImage: "/images/hero-lowrider.jpg",
    color: "gold",
    count: 10,
  },
  {
    id: "bikes",
    name: "Lowrider Bikes",
    description: "Custom lowrider bicycles featuring intricate designs, decorative details, and vibrant colors",
    href: "/gallery/bikes",
    image: "/images/gallery/bikes/green-lowrider-bike-woman.jpg",
    fallbackImage: "/images/bikes-featured.jpg",
    color: "chrome",
    count: 6,
  },
  {
    id: "portraits",
    name: "Portraits",
    description: "Community portraits capturing the faces and personalities of Chicago's lowrider culture",
    href: "/gallery/portraits",
    image: "/images/gallery/portraits/woman-sunglasses-car-show.jpg",
    fallbackImage: "/images/portrait-male.jpg",
    color: "chrome-light",
    count: 15,
  },
  {
    id: "events",
    name: "Events & Car Shows",
    description: "Community events and car shows celebrating lowrider culture with neon-lit nighttime spectacles",
    href: "/gallery/events",
    image: "/images/gallery/events/neon-car-show-night.jpg",
    fallbackImage: "/images/events-carshow.jpg",
    color: "gold",
    count: 10,
  },
  {
    id: "street",
    name: "Street & Urban",
    description: "Urban photography capturing Chicago's streets, architecture, and powerful cultural murals",
    href: "/gallery/street",
    image: "/images/gallery/street/chicago-skyline-urban.jpg",
    fallbackImage: "/images/street-mural.jpg",
    color: "chrome-dark",
    count: 8,
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
  totalPhotos: 49,
  categories: 5,
  yearsExperience: 5,
  eventsShot: 100,
};
