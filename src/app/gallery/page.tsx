import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { galleryCategories } from "@/lib/constants";
import { portfolioItems } from "@/data/portfolio";
import { MasonryGrid } from "@/components/gallery/masonry-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Hugo's photography collection - lowriders, custom bikes, portraits, events, and street life.",
};

export default function GalleryPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <GraffitiText
            text="GALLERY"
            variant="gradient"
            size="2xl"
            animated={false}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The culture, the cars, the community. Browse by category or scroll through all the work.
          </p>
        </div>

        {/* Category Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {galleryCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="px-4 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-candy-purple/50 hover:bg-candy-purple/5 transition-all duration-300"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <PinstripeHorizontal className="mb-12" />

        {/* All Work */}
        <MasonryGrid items={portfolioItems} columns={3} />
      </div>
    </div>
  );
}
