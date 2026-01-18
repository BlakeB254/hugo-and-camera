# Content Management

This directory contains all the content for Hugo and His Camera website.

## Directory Structure

```
content/
├── gallery/           # Photo galleries
│   ├── lowriders.json
│   ├── bikes.json
│   ├── portraits.json
│   ├── events.json
│   └── street.json
├── videos/
│   └── videos.json    # Video content
└── README.md          # This file
```

## Adding New Photos

### 1. Add the Image File

Place your image in the appropriate folder:
```
public/images/gallery/{category}/your-image.jpg
```

Categories: `lowriders`, `bikes`, `portraits`, `events`, `street`

**Image Guidelines:**
- Format: JPG or WebP (JPG recommended)
- Resolution: At least 1920px wide
- Aspect ratio: 3:2 or 4:3 works best
- File size: Optimize to under 500KB if possible

### 2. Update the JSON File

Open `content/gallery/{category}.json` and add a new item:

```json
{
  "id": "unique-id-here",
  "title": "Photo Title",
  "description": "Brief description of the photo",
  "image": "/images/gallery/{category}/your-image.jpg",
  "featured": false,
  "tags": ["tag1", "tag2", "tag3"],
  "location": "Chicago, IL",
  "date": "2024-12-25"
}
```

**Fields:**
- `id` - Unique identifier (required)
- `title` - Display title (required)
- `description` - Brief description (required)
- `image` - Path to image file (required)
- `featured` - Set to `true` to show on homepage
- `tags` - Array of searchable tags
- `location` - Where the photo was taken
- `date` - When the photo was taken (YYYY-MM-DD)

### 3. Rebuild the Site

After adding content, rebuild:
```bash
pnpm build
```

Or if running dev server, changes will reflect automatically.

---

## Adding Videos

### 1. Upload to YouTube

Upload your video to YouTube and get the video ID.
(The ID is the part after `v=` in the URL: youtube.com/watch?v=**VIDEO_ID**)

### 2. Add Thumbnail

Place thumbnail image:
```
public/images/videos/your-video-thumbnail.jpg
```

### 3. Update videos.json

Add entry to `content/videos/videos.json`:

```json
{
  "id": "video-unique-id",
  "title": "Video Title",
  "description": "Video description",
  "thumbnail": "/images/videos/your-video-thumbnail.jpg",
  "youtubeId": "YOUR_YOUTUBE_VIDEO_ID",
  "duration": "5:30",
  "featured": true,
  "tags": ["tag1", "tag2"],
  "date": "2024-12-25"
}
```

---

## Instagram Integration

The site can pull photos directly from Instagram if configured.

### Setup Instagram API

1. Create a Facebook Developer App at https://developers.facebook.com
2. Add Instagram Graph API product
3. Get your access token and user ID
4. Add to `.env.local`:

```env
INSTAGRAM_ACCESS_TOKEN=your_token_here
INSTAGRAM_USER_ID=your_user_id_here
```

When configured, the Instagram feed section will show real posts from @hugoandhiscamera.

---

## Image Optimization Tips

1. **Compress images** before uploading using:
   - [Squoosh](https://squoosh.app/)
   - [TinyPNG](https://tinypng.com/)

2. **Naming convention**: Use descriptive, lowercase names:
   - Good: `purple-impala-carshow-2024.jpg`
   - Bad: `IMG_2847.jpg`

3. **WebP format**: For better performance, use WebP format when possible

---

## Troubleshooting

**Images not showing?**
- Check the file path is correct in the JSON
- Ensure the image exists in `/public/images/gallery/{category}/`
- File names are case-sensitive

**Changes not appearing?**
- Run `pnpm build` to regenerate static pages
- Clear browser cache
- Check for JSON syntax errors

**Need help?**
Contact the developer or check the main project README.
