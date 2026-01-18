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
 * Placeholder media when Instagram is not connected
 * Using the generated placeholder images
 */
function getPlaceholderMedia(): InstagramMedia[] {
  const now = new Date().toISOString();

  return [
    {
      id: "placeholder-1",
      caption: "Purple Reign 💜 Candy purple Impala hitting switches at golden hour #lowrider #eastLA #hydraulics",
      media_type: "IMAGE",
      media_url: "/images/hero-lowrider.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-2",
      caption: "Blue Steel 🔵 Custom lowrider bike against the graffiti wall #lowriderbike #chrome #boyleheights",
      media_type: "IMAGE",
      media_url: "/images/bikes-featured.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-3",
      caption: "Hood Portrait 📸 Real ones know #portrait #southcentral #culture",
      media_type: "IMAGE",
      media_url: "/images/portrait-male.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-4",
      caption: "Sunday Funday 🎉 Community car show with mariachi #carshow #familia #elysianpark",
      media_type: "IMAGE",
      media_url: "/images/events-carshow.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-5",
      caption: "Varrio Arte 🎨 Chicano mural with roses and script #mural #chicanostyle #streetart",
      media_type: "IMAGE",
      media_url: "/images/street-mural.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-6",
      caption: "Elegance 💋 Portrait vibes #portrait #lowrider #compton",
      media_type: "IMAGE",
      media_url: "/images/portrait-female.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
    {
      id: "placeholder-7",
      caption: "Night Moves 🌃 Cruising Hollywood Blvd after dark #nightcruise #hollywood #hydraulics",
      media_type: "IMAGE",
      media_url: "/images/night-cruising.jpg",
      permalink: "https://instagram.com/hugoandhiscamera",
      timestamp: now,
      username: "hugoandhiscamera",
    },
  ];
}
