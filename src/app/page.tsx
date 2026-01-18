import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedWork, CategoryCards } from "@/components/sections/featured-work";
import { LocationsShowcase } from "@/components/sections/locations-showcase";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { getInstagramMedia } from "@/lib/instagram";

export default async function Home() {
  // Fetch Instagram media (will use placeholders if not configured)
  const instagramMedia = await getInstagramMedia(8);

  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <LocationsShowcase />
      <CategoryCards />
      <InstagramFeed media={instagramMedia} columns={4} />
    </>
  );
}
