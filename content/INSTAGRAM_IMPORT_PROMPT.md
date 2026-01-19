# Instagram Import Prompt for Claude for Chrome

Copy and paste this prompt when viewing Hugo's Instagram profile (@hugoandhiscamera):

---

## PROMPT START

I'm building a photography portfolio website for Hugo and need to import content from this Instagram page. Please help me:

### 1. ANALYZE THE VISIBLE POSTS

For each photo you can see, identify:
- What's in the image (car, bike, portrait, mural, event, etc.)
- The caption/description if visible
- The category it belongs to:
  - `lowriders` - Custom cars, Impalas, hydraulics, car shows
  - `bikes` - Custom lowrider bikes, bike clubs
  - `portraits` - People, community members, families
  - `events` - Car shows, gatherings, quinceañeras
  - `street` - Murals, graffiti, neighborhood scenes

### 2. GENERATE JSON ENTRIES

For each photo, create a JSON entry in this exact format:

```json
{
  "id": "descriptive-id-001",
  "title": "Short Title",
  "description": "Brief description of the photo",
  "image": "/images/gallery/CATEGORY/suggested-filename.jpg",
  "width": 1920,
  "height": 1280,
  "featured": true,
  "tags": ["tag1", "tag2", "tag3"],
  "location": "Chicago, IL",
  "date": "2024-MM-DD"
}
```

### 3. SUGGEST FILENAMES

For each image, suggest a descriptive filename I should use when I save it:
- Use lowercase with hyphens
- Be descriptive: `purple-impala-hydraulics.jpg` not `IMG001.jpg`
- Include distinguishing details

### 4. OUTPUT FORMAT

Please organize your response like this:

---

## LOWRIDERS CATEGORY
*Images to save to: `public/images/gallery/lowriders/`*

**Image 1**: [describe what you see]
- Suggested filename: `filename.jpg`
- JSON entry:
```json
{ ... }
```

---

## BIKES CATEGORY
...

---

## PORTRAITS CATEGORY
...

---

## EVENTS CATEGORY
...

---

## STREET CATEGORY
...

---

### 5. FINAL JSON FILES

At the end, please compile complete JSON files I can copy directly into:
- `content/gallery/lowriders.json`
- `content/gallery/bikes.json`
- `content/gallery/portraits.json`
- `content/gallery/events.json`
- `content/gallery/street.json`

Use this structure for each file:
```json
{
  "category": "categoryname",
  "title": "Category Title",
  "description": "Category description",
  "items": [
    // all items for this category
  ]
}
```

---

### NOTES
- Hugo is based in **Chicago, IL** - use this as the default location unless the caption says otherwise
- Mark the best 1-2 photos per category as `"featured": true`
- For dates, estimate based on post age if visible, otherwise use recent dates
- If you can see hashtags, include relevant ones as tags

## PROMPT END

---

## After Claude Responds:

1. **Save the images** - Right-click each photo → Save Image As → use the suggested filename
2. **Place images** in `public/images/gallery/{category}/`
3. **Copy the JSON** into the corresponding files in `content/gallery/`
4. **Rebuild**: Run `pnpm build` or push to GitHub for auto-deploy

## Tips:

- Scroll down on Instagram to load more posts before running the prompt
- You may need to do this in batches (10-15 posts at a time)
- If Claude can't see images clearly, try zooming out or using grid view
