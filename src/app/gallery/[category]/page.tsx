import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { MasonryGrid } from "@/components/gallery/masonry-grid";
import { galleryCategories } from "@/lib/constants";
import { getItemsByCategory, portfolioItems } from "@/data/portfolio";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return galleryCategories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryData = galleryCategories.find((c) => c.id === category);

  if (!categoryData) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: categoryData.name,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = galleryCategories.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  const items = getItemsByCategory(category);

  // If no items in category, show all items as placeholder
  const displayItems = items.length > 0 ? items : portfolioItems;

  const colorVariants: Record<string, "chrome" | "chrome-light" | "gold" | "gradient"> = {
    "gold": "gold",
    "chrome": "chrome",
    "chrome-light": "chrome-light",
    "chrome-dark": "chrome",
    "default": "gradient",
  };

  return (
    <div className="py-12">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        <Image
          src={categoryData.image}
          alt={categoryData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <GraffitiText
              text={categoryData.name.toUpperCase()}
              variant={colorVariants[categoryData.color] || "gradient"}
              size="2xl"
              animated={false}
              glow
            />
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Back link */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {galleryCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                cat.id === category
                  ? "bg-[var(--gold)] text-background"
                  : "border border-border/50 text-muted-foreground hover:text-foreground hover:border-[var(--gold)]/50"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <PinstripeHorizontal className="mb-8" />

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <MasonryGrid items={displayItems} columns={3} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              More {categoryData.name.toLowerCase()} photos coming soon.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Check out the featured work below in the meantime.
            </p>
            <div className="mt-8">
              <MasonryGrid items={portfolioItems.slice(0, 3)} columns={3} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
