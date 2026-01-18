import { Metadata } from "next";
import Image from "next/image";
import { Play, Clock, Calendar } from "lucide-react";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeHorizontal, PinstripeBorder } from "@/components/cultural/pinstripe-border";
import { Card, CardContent } from "@/components/ui/card";
import { videoItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Video",
  description: "Watch Hugo's video work - documenting lowrider culture, car shows, and community stories.",
};

export default function VideoPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <GraffitiText
            text="VIDEO"
            variant="gradient"
            size="2xl"
            animated={false}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Moving pictures tell moving stories. Watch the culture come alive.
          </p>
        </div>

        <PinstripeHorizontal className="mb-12" />

        {/* Featured Video */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">
            <span className="gold-text">Featured</span>
          </h2>
          <div className="relative">
            <PinstripeBorder variant="gold" animated>
              <div className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src="/images/night-cruising.jpg"
                  alt="Night Moves - Featured Video"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-candy-purple/90 flex items-center justify-center group-hover:bg-candy-purple transition-colors glow-purple">
                    <Play className="h-8 w-8 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Night Moves
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-xl">
                    Cruising Hollywood Blvd after dark. The lights, the hydraulics, the culture alive at night.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      4:32
                    </span>
                  </div>
                </div>
              </div>
            </PinstripeBorder>
          </div>
        </section>

        {/* Video Grid */}
        <section>
          <h2 className="text-xl font-bold mb-6">
            <span className="chrome-text">All Videos</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder video cards */}
            {[
              {
                title: "Sunday Show",
                description: "Weekly car show at Elysian Park",
                thumbnail: "/images/events-carshow.jpg",
                duration: "8:45",
              },
              {
                title: "Build Series: '64 Impala",
                description: "Following the restoration of a classic",
                thumbnail: "/images/hero-lowrider.jpg",
                duration: "12:30",
              },
              {
                title: "Bike Life",
                description: "Custom lowrider bikes of East LA",
                thumbnail: "/images/bikes-featured.jpg",
                duration: "6:15",
              },
              {
                title: "Street Murals",
                description: "The art that tells our stories",
                thumbnail: "/images/street-mural.jpg",
                duration: "5:20",
              },
              {
                title: "Familia",
                description: "Generational bonds through car culture",
                thumbnail: "/images/portrait-male.jpg",
                duration: "7:45",
              },
              {
                title: "Queen of the Streets",
                description: "Women in lowrider culture",
                thumbnail: "/images/portrait-female.jpg",
                duration: "9:10",
              },
            ].map((video, index) => (
              <Card
                key={index}
                className="gallery-card group overflow-hidden bg-card border-border/50 hover:border-candy-purple/50 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-candy-purple/90 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white ml-1" fill="white" />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs text-foreground backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-candy-purple transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <div className="mt-16 text-center py-12 bg-secondary/30 rounded-lg">
          <h2 className="text-xl font-bold mb-2">More Content Coming</h2>
          <p className="text-muted-foreground">
            Subscribe to stay updated on new video releases
          </p>
        </div>
      </div>
    </div>
  );
}
