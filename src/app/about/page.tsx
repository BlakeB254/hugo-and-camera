import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeBorder, PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Hugo - a Chicago-based photographer dedicated to capturing lowrider culture, Latino heritage, and street life in the Windy City and beyond.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <GraffitiText
            text="ABOUT HUGO"
            variant="gradient"
            size="2xl"
            animated={false}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Portrait */}
          <div className="relative">
            <PinstripeBorder variant="gold" animated>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/images/hugo-portrait-camera.jpg"
                  alt="Hugo with his camera"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </PinstripeBorder>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="gold-text">The Man Behind the Lens</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Born and raised on the streets of Chicago, I grew up surrounded by the vibrant culture
                  of lowriders, custom bikes, and the beautiful people who make up our community. From
                  Pilsen to Little Village, the neighborhoods shaped who I am. My camera became my way
                  of preserving these moments, these stories, these lives.
                </p>
                <p>
                  Every photo I take is a love letter to the culture that raised me. The candy paint
                  shimmering in the golden hour against the Chicago skyline. The pride in a father&apos;s
                  eyes as he shows his son the family car. The murals that tell our history. The
                  quinceañeras, the car shows, the Sunday cruises down 26th Street.
                </p>
                <p>
                  Chicago&apos;s lowrider scene is special - we built it from the ground up, honoring our
                  roots while creating something uniquely ours. This isn&apos;t just photography to me.
                  It&apos;s documentation. It&apos;s celebration. It&apos;s preservation of a culture
                  that deserves to be seen and remembered.
                </p>
              </div>
            </div>

            <PinstripeHorizontal />

            {/* Stats/Experience */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-gold">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-chrome">100+</div>
                <div className="text-sm text-muted-foreground">Events Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold gold-text">CHI</div>
                <div className="text-sm text-muted-foreground">Chicago Based</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-red/10 text-accent-red hover:bg-accent-red/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="chrome-text">Services</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Event Photography",
                description: "Car shows, quinceañeras, family gatherings, and community events throughout Chicago and beyond. Full coverage with edited photos delivered.",
                color: "gold",
              },
              {
                title: "Portrait Sessions",
                description: "Individual, couple, or family portraits with your ride or in the neighborhood. Capturing your story in the Chi.",
                color: "chrome",
              },
              {
                title: "Video Production",
                description: "Documentary-style videos, event coverage, promotional content for clubs and businesses.",
                color: "gold",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-lg bg-card border border-border/50 hover:border-gold/30 transition-colors"
              >
                <h3 className={`text-lg font-bold mb-2 text-${service.color}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Exhibition */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/hugo-gallery-exhibition.jpg"
                alt="Hugo at his gallery exhibition"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <span className="gold-text">From the Streets to the Gallery</span>
              </h2>
              <p className="text-muted-foreground mb-4">
                What started as documenting car shows and community events has grown into
                gallery exhibitions showcasing the beauty and pride of Chicago&apos;s lowrider culture.
              </p>
              <p className="text-muted-foreground">
                Each photograph tells a story - of family, tradition, and the artistry that goes
                into every custom car, bike, and the people who build them.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <Camera className="h-12 w-12 mx-auto mb-4 text-gold" />
          <h2 className="text-2xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Whether it&apos;s your car, your family, or your event - let&apos;s capture it right.
            Based in Chicago, but willing to travel anywhere for the right project.
          </p>
          <Button asChild size="lg" className="chrome-gradient text-background hover:glow-gold">
            <Link href="/contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
