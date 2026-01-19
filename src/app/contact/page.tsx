"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeBorder, PinstripeHorizontal } from "@/components/cultural/pinstripe-border";
import { siteConfig } from "@/lib/constants";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log("Form submitted:", formState);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <GraffitiText
            text="CONTACT"
            variant="gradient"
            size="2xl"
            animated={false}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Ready to capture your story? Let&apos;s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6">
                <span className="gold-text">Get in Touch</span>
              </h2>
              <div className="space-y-4">
                <a
                  href="mailto:hugo@hugoandcamera.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-[var(--gold)]/50 transition-colors"
                >
                  <div className="p-3 rounded-full bg-[var(--gold)]/10">
                    <Mail className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">hugo@hugoandcamera.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50">
                  <div className="p-3 rounded-full bg-[var(--chrome)]/10">
                    <MapPin className="h-5 w-5 text-[var(--chrome)]" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Based In</div>
                    <div className="font-medium">Chicago, IL</div>
                    <div className="text-xs text-muted-foreground">Will travel anywhere</div>
                  </div>
                </div>
              </div>
            </div>

            <PinstripeHorizontal />

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">
                <span className="chrome-text">Follow the Work</span>
              </h3>
              <div className="flex gap-4">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--chrome)]/10 text-[var(--chrome)] hover:bg-[var(--chrome)]/20 transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  YouTube
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  Event Photography (Car Shows, Quinceañeras, Gatherings)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--chrome)]" />
                  Portrait Sessions (Individual, Family, with Vehicles)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--chrome-light)]" />
                  Video Production (Documentary, Promo, Event Coverage)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  Car/Bike Features (Magazine Quality Shoots)
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <PinstripeBorder variant="gold">
              <Card className="bg-card border-0">
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-[var(--gold)]" />
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formState.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                        >
                          <option value="">Select a service</option>
                          <option value="event">Event Photography</option>
                          <option value="portrait">Portrait Session</option>
                          <option value="video">Video Production</option>
                          <option value="feature">Car/Bike Feature</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors resize-none"
                          placeholder="Tell me about your project, event, or idea..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full chrome-gradient text-background hover:glow-gold font-semibold"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </PinstripeBorder>
          </div>
        </div>
      </div>
    </div>
  );
}
