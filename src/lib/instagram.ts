/**
 * Instagram Integration Service
 *
 * This module provides integration with Instagram's Graph API for fetching
 * Hugo's photography content. The Graph API requires:
 *
 * 1. An Instagram Business or Creator account
 * 2. A Facebook Page connected to the Instagram account
 * 3. A Facebook App with Instagram Graph API permissions
 * 4. User authorization and access tokens
 *
 * Setup Instructions:
 * 1. Convert Instagram account to Business/Creator (if not already)
 * 2. Create a Facebook App at https://developers.facebook.com
 * 3. Add Instagram Graph API product
 * 4. Get access tokens through the authorization flow
 * 5. Store tokens in environment variables
 *
 * Environment Variables Required:
 * - INSTAGRAM_ACCESS_TOKEN: Long-lived access token
 * - INSTAGRAM_USER_ID: Instagram Business Account ID
 */

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  username: string;
  children?: { data: InstagramMedia[] };
}

export interface InstagramProfile {
  id: string;
  username: string;
  name?: string;
  biography?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
}

interface InstagramAPIResponse<T> {
  data: T[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
    previous?: string;
  };
}

const INSTAGRAM_GRAPH_API_BASE = "https://graph.instagram.com";
const INSTAGRAM_API_VERSION = "v18.0";

/**
 * Check if Instagram API is configured
 */
export function isInstagramConfigured(): boolean {
  return !!(
    process.env.INSTAGRAM_ACCESS_TOKEN &&
    process.env.INSTAGRAM_USER_ID
  );
}

/**
 * Fetch Instagram user profile
 */
export async function getInstagramProfile(): Promise<InstagramProfile | null> {
  if (!isInstagramConfigured()) {
    console.log("Instagram API not configured");
    return null;
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  try {
    const fields = "id,username,name,biography,profile_picture_url,followers_count,media_count";
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API_BASE}/${INSTAGRAM_API_VERSION}/${userId}?fields=${fields}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch Instagram profile:", error);
    return null;
  }
}

/**
 * Fetch Instagram media posts
 */
export async function getInstagramMedia(
  limit: number = 25
): Promise<InstagramMedia[]> {
  if (!isInstagramConfigured()) {
    console.log("Instagram API not configured, using placeholder data");
    return getPlaceholderMedia();
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username";
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API_BASE}/${INSTAGRAM_API_VERSION}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data: InstagramAPIResponse<InstagramMedia> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch Instagram media:", error);
    return getPlaceholderMedia();
  }
}

/**
 * Fetch all media with pagination
 */
export async function getAllInstagramMedia(): Promise<InstagramMedia[]> {
  if (!isInstagramConfigured()) {
    return getPlaceholderMedia();
  }

  const allMedia: InstagramMedia[] = [];
  let nextUrl: string | null = null;
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username";
  let url = `${INSTAGRAM_GRAPH_API_BASE}/${INSTAGRAM_API_VERSION}/${userId}/media?fields=${fields}&limit=100&access_token=${accessToken}`;

  try {
    do {
      const response = await fetch(url);
      if (!response.ok) break;

      const data: InstagramAPIResponse<InstagramMedia> = await response.json();
      allMedia.push(...(data.data || []));
      nextUrl = data.paging?.next || null;
      url = nextUrl || "";
    } while (nextUrl);

    return allMedia;
  } catch (error) {
    console.error("Failed to fetch all Instagram media:", error);
    return allMedia.length > 0 ? allMedia : getPlaceholderMedia();
  }
}

/**
 * Extract location from caption using common patterns
 */
export function extractLocationFromCaption(caption: string): string | null {
  // Common patterns for location mentions
  const locationPatterns = [
    /📍\s*(.+?)(?:\n|$)/i,
    /in\s+(Los Angeles|LA|Houston|HTX|Chicago|CHI)/i,
    /#(LosAngeles|Houston|Chicago|LA|HTX|CHI|EastLA|SouthCentral|Compton)/i,
  ];

  for (const pattern of locationPatterns) {
    const match = caption.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return null;
}

/**
 * Categorize media based on caption/hashtags
 */
export function categorizeMedia(media: InstagramMedia): string {
  const caption = (media.caption || "").toLowerCase();

  if (
    caption.includes("lowrider") ||
    caption.includes("impala") ||
    caption.includes("64") ||
    caption.includes("hydraulics") ||
    caption.includes("#lowrider")
  ) {
    return "lowriders";
  }

  if (
    caption.includes("bike") ||
    caption.includes("bicycle") ||
    caption.includes("#lowriderbike")
  ) {
    return "bikes";
  }

  if (
    caption.includes("portrait") ||
    caption.includes("headshot") ||
    caption.includes("#portrait")
  ) {
    return "portraits";
  }

  if (
    caption.includes("show") ||
    caption.includes("cruise") ||
    caption.includes("event") ||
    caption.includes("quinceañera") ||
    caption.includes("#carshow")
  ) {
    return "events";
  }

  if (
    caption.includes("mural") ||
    caption.includes("graffiti") ||
    caption.includes("street") ||
    caption.includes("#streetart")
  ) {
    return "street";
  }

  return "uncategorized";
}

/**
 * Fallback media when Instagram API is not connected
 * Uses real gallery images from Hugo's portfolio
 */
function getPlaceholderMedia(): InstagramMedia[] {
  const now = new Date().toISOString();

  return [
    {
      id: "fallback-1",
      caption: "Chicago Skyline Cruising - Gold lowrider with the Chi skyline in the background #lowrider #chicago #hydraulics",
      media_type: "IMAGE",
      media_url: "/images/gallery/lowriders/chicago-skyline-gold-lowrider-cruising.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-2",
      caption: "Chrome Dreams - Custom lowrider bike with chrome details and flags #lowriderbike #chrome #chicago",
      media_type: "IMAGE",
      media_url: "/images/gallery/bikes/boy-chrome-lowrider-bike-flags.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-3",
      caption: "Couple Portrait - Real ones at the car show #portrait #carshow #culture",
      media_type: "IMAGE",
      media_url: "/images/gallery/portraits/couple-bw-car-show-portrait.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-4",
      caption: "Hydraulic Hop Competition - Crowd goes wild at the night show #carshow #hydraulics #competition",
      media_type: "IMAGE",
      media_url: "/images/gallery/events/hydraulic-hop-competition-night-crowd.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-5",
      caption: "Blue Beauty - Lowrider under the neon lights #lowrider #nightlife #chrome",
      media_type: "IMAGE",
      media_url: "/images/gallery/lowriders/blue-lowrider-neon-lights.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-6",
      caption: "Queen of the Scene - Gold lowrider portrait vibes #portrait #lowrider #model",
      media_type: "IMAGE",
      media_url: "/images/gallery/portraits/woman-gold-lowrider-model.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "fallback-7",
      caption: "Night Moves - Cruising and sparking on the highway #nightcruise #sparks #hydraulics",
      media_type: "IMAGE",
      media_url: "/images/gallery/lowriders/lowrider-sparking-highway-action.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
  ];
}
