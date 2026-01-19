# Image Download Checklist for Hugo and His Camera

**Total: 49 images across 5 categories**

> **IMPORTANT**: This is a Next.js project. Save images to `public/images/gallery/` (NOT `static/`)

---

## LOWRIDERS (10 images)
**Save to:** `public/images/gallery/lowriders/`

- [ ] `blue-lowrider-neon-lights.jpg` - Blue lowrider with neon underglow at night ⭐ FEATURED
- [ ] `purple-lowrider-car-show.jpg` - Purple lowrider at car show ⭐ FEATURED
- [ ] `yellow-lowrider-gold-wheels.jpg` - Yellow lowrider with gold wire wheels
- [ ] `red-lowrider-hydraulics.jpg` - Red lowrider performing with hydraulics
- [ ] `white-lowrider-gold-wheels-detail.jpg` - White lowrider with gold wheels and chrome
- [ ] `green-neon-lowrider-night.jpg` - Green neon lowrider at night show
- [ ] `orange-lowrider-classic.jpg` - Orange vintage lowrider
- [ ] `blue-lowrider-profile.jpg` - Blue lowrider profile view
- [ ] `yellow-red-lowriders-event.jpg` - Yellow and red lowriders together at event
- [ ] `black-vintage-lowrider.jpg` - Black vintage lowrider with wire wheels

---

## BIKES (6 images)
**Save to:** `public/images/gallery/bikes/`

- [ ] `green-lowrider-bike-woman.jpg` - Green lowrider bike with woman ⭐ FEATURED
- [ ] `man-lowrider-bike-flags.jpg` - Man on lowrider bike with American/Mexican flags ⭐ FEATURED
- [ ] `lowrider-bikes-car-show.jpg` - Multiple lowrider bikes at car show
- [ ] `couple-lowrider-bikes.jpg` - Couple on lowrider bikes
- [ ] `woman-custom-lowrider-bike.jpg` - Woman on ornate lowrider bike
- [ ] `colorful-lowrider-bikes-fleet.jpg` - Multiple colorful lowrider bikes overhead view

---

## PORTRAITS (15 images)
**Save to:** `public/images/gallery/portraits/`

- [ ] `woman-sunglasses-car-show.jpg` - Woman with sunglasses at car show ⭐ FEATURED
- [ ] `woman-red-dress-car.jpg` - Woman in red dress in car interior ⭐ FEATURED
- [ ] `couple-bw-portrait.jpg` - Couple in black and white
- [ ] `man-portrait-lowrider-truck.jpg` - Man with lowrider truck
- [ ] `woman-heart-glasses-event.jpg` - Woman with heart-shaped glasses
- [ ] `woman-tattoo-night-portrait.jpg` - Woman with tattoos at night
- [ ] `woman-yellow-lowrider-portrait.jpg` - Woman with yellow lowrider
- [ ] `man-dodgers-street-portrait.jpg` - Man in Dodgers shirt
- [ ] `woman-hat-artistic-portrait.jpg` - Woman with hat
- [ ] `man-car-show-bw.jpg` - Man at car show (black and white)
- [ ] `woman-red-flower-portrait.jpg` - Woman with red flower in hair
- [ ] `women-group-event-portrait.jpg` - Group of women at event
- [ ] `man-child-family-portrait.jpg` - Man holding child
- [ ] `woman-colorful-glasses-portrait.jpg` - Woman with colorful glasses
- [ ] `woman-neon-night-portrait.jpg` - Woman with neon lights at night

---

## EVENTS (10 images)
**Save to:** `public/images/gallery/events/`

- [ ] `car-show-gathering-lowriders.jpg` - Large car show with crowds ⭐ FEATURED
- [ ] `neon-car-show-night.jpg` - Neon lowriders at night show ⭐ FEATURED
- [ ] `lowriders-sign-car-show.jpg` - Car show with Lowriders signage
- [ ] `car-show-parking-lot.jpg` - Wide car show parking lot view
- [ ] `yellow-lowrider-cargo-event.jpg` - Yellow lowrider with cargo trailer
- [ ] `blue-gold-lowriders-show.jpg` - Blue and gold lowriders at show
- [ ] `daytime-car-show-vehicles.jpg` - Daytime car show with multiple vehicles
- [ ] `car-show-grass-field.jpg` - Car show on grass field
- [ ] `night-event-yellow-lowrider.jpg` - Yellow lowrider at night event
- [ ] `lowrider-vertical-stance-show.jpg` - Lowrider doing vertical stance maneuver

---

## STREET/URBAN (8 images)
**Save to:** `public/images/gallery/street/`

- [ ] `chicago-skyline-urban.jpg` - Chicago skyline ⭐ FEATURED
- [ ] `street-mural-migration.jpg` - Street mural with migration theme ⭐ FEATURED
- [ ] `chicago-night-street-scene.jpg` - Night Chicago street scene
- [ ] `colorful-street-art.jpg` - Colorful street art mural
- [ ] `urban-building-car-detail.jpg` - Urban building with car detail
- [ ] `woman-urban-background-portrait.jpg` - Woman with urban Chicago backdrop
- [ ] `bw-street-mural.jpg` - Black and white street mural
- [ ] `urban-downtown-chicago.jpg` - Downtown Chicago street scene

---

## Quick Download Instructions

1. **Go to Instagram**: https://www.instagram.com/hugoandhiscamera/
2. **For each image**:
   - Find the post
   - Right-click → "Save image as..." (or use browser dev tools for higher quality)
   - Rename using filename from checklist
   - Save to correct folder
3. **After downloading all images**:
   ```bash
   cd /home/codex450/workspace/hugo-and-camera
   pnpm build
   ```

---

## Folder Structure Verification

After downloading, your structure should look like:

```
public/images/gallery/
├── lowriders/
│   ├── blue-lowrider-neon-lights.jpg
│   ├── purple-lowrider-car-show.jpg
│   └── ... (10 files total)
├── bikes/
│   ├── green-lowrider-bike-woman.jpg
│   └── ... (6 files total)
├── portraits/
│   ├── woman-sunglasses-car-show.jpg
│   └── ... (15 files total)
├── events/
│   ├── car-show-gathering-lowriders.jpg
│   └── ... (10 files total)
└── street/
    ├── chicago-skyline-urban.jpg
    └── ... (8 files total)
```

---

## Tips for Best Quality

1. **Use browser dev tools** (F12 → Network tab) to find original resolution images
2. **Instagram serves different sizes** - look for `_n.jpg` URLs for larger versions
3. **Aim for at least 1080px wide** for good display quality
4. **Compress images** after downloading using [Squoosh](https://squoosh.app/) to reduce file size
