// Site constants and configuration

export const siteConfig = {
  name: "Hugo and His Camera",
  tagline: "Capturing the Soul of the Streets",
  description: "Lowrider culture, Latino/Latina heritage, and hood culture photography by Hugo. Car shows, custom bikes, portraits, and street life.",
  url: "https://hugoandcamera.com",
  author: "Hugo",
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
    description: "Custom cars, shows, and cruising culture",
    href: "/gallery/lowriders",
    image: "/images/hero-lowrider.jpg",
    color: "gold",
  },
  {
    id: "bikes",
    name: "Bikes",
    description: "Custom bikes, bike clubs, and rides",
    href: "/gallery/bikes",
    image: "/images/bikes-featured.jpg",
    color: "chrome",
  },
  {
    id: "portraits",
    name: "Portraits",
    description: "Community members, families, culture",
    href: "/gallery/portraits",
    image: "/images/portrait-male.jpg",
    color: "chrome-light",
  },
  {
    id: "events",
    name: "Events",
    description: "Car shows, quinceañeras, gatherings",
    href: "/gallery/events",
    image: "/images/events-carshow.jpg",
    color: "gold",
  },
  {
    id: "street",
    name: "Street Life",
    description: "Hood culture, murals, neighborhoods",
    href: "/gallery/street",
    image: "/images/street-mural.jpg",
    color: "chrome-dark",
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
};

// Hugo's base location
export const baseLocation = {
  city: "Chicago",
  state: "Illinois",
  abbr: "CHI",
};
