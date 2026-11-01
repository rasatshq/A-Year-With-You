# A Year With You — 365 Days of Us
### First Anniversary Interactive Digital Experience

A digital anniversary gift celebrating our first year together on **October 02**, dedicated with all love to **Sayang**.

Designed in an art-directed **Soft Romantic** visual style — reminiscent of an editorial romantic journal, vintage photo album, and heartfelt letter.

---

## ✨ Features

1. **Interactive Opening Sequence**: An elegant vintage envelope with 3D wax seal and animated unfolding flap, welcoming Sayang into the digital scrapbook.
2. **Editorial Hero Section**: Full-screen magazine composition with primary couple photograph, elegant typography, and floating petal accents.
3. **Our Story Timeline**: Vertical alternating timeline with polaroid frames, chapter milestones, and lightbox inspection.
4. **Memories Gallery**: Editorial photo gallery showcasing 6 precious moments, with full-featured lightbox, keyboard navigation (`←`, `→`, `ESC`), and photo counter.
5. **A Letter For You**: Sealed digital love letter with interactive unfolding paper, handwritten accents, and immediate readability.
6. **Twelve Months, Twelve Reasons**: 12 interactive 3D flip cards detailing genuine reasons why Sayang is cherished.
7. **Our Song (Vintage Vinyl Turntable)**: Vintage record player with rotating vinyl disc, progress seek bar, volume/mute control, persistent audio stream, and graceful ambient fallback.
8. **One Last Surprise**: Secret modal overlay with heartfelt words and special photo reveal.
9. **Closing & Replay Experience**: Milestone closing message, personal signoff, and smooth replay experience.

---

## 📸 Photo Asset Mapping

The 9 personal photographs from the project have been structured into `public/images/`:

| Original File | Mapped Path | Section Used |
|---|---|---|
| `Foto Utama.jpeg` | `public/images/hero/main.jpg` | Section 01 (Hero) & Closing |
| `Foto Jadian.jpeg` | `public/images/timeline/beginning-01.jpg` | Section 02 (Timeline Chapter I) |
| `Foto Jadian 2.jpeg` | `public/images/timeline/beginning-02.jpg` | Section 02 (Timeline Chapter II) |
| `Galeri.jpeg` | `public/images/gallery/memory-01.jpg` | Section 03 (Gallery #1) |
| `Galeri2.jpeg` | `public/images/gallery/memory-02.jpg` | Section 03 (Gallery #2) |
| `Galeri 3.jpeg` | `public/images/gallery/memory-03.jpg` | Section 03 (Gallery #3) |
| `Galeri 4.jpeg` | `public/images/gallery/memory-04.jpg` | Section 03 (Gallery #4) |
| `Galeri 5.jpeg` | `public/images/gallery/memory-05.jpg` | Section 03 (Gallery #5) |
| `galeri 6.jpeg` | `public/images/gallery/memory-06.jpg` | Section 03 (Gallery #6) |
| `Foto Utama.jpeg` | `public/images/surprise/special.jpg` | Section 07 (Surprise) |

---

## 🎵 Adding Background Music

The website is configured to play:
- **Song**: *Perfect*
- **Artist**: *Ed Sheeran*
- **File location**: `public/audio/our-song.mp3`

To add the audio:
1. Obtain your audio file (MP3 format).
2. Save or copy it to:
   ```
   public/audio/our-song.mp3
   ```
3. If no file is placed, the web player will gracefully alert the listener and play a soothing romantic ambient chime melody so the website is always harmonious!

---

## ✏️ Customizing Content

All copywriting, dates, photos, and messages are centrally configured in:
```
src/data/anniversary.ts
```
Edit this single file to update:
- Partner nickname (`Sayang`)
- Anniversary date (`October 02`)
- Timeline dates or notes
- Love letter message
- 12 reasons
- Song title & artist
- Surprise words

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Vercel Deployment

### Local Production Build:
```bash
npm run build
npm start
```

### Deploy to Vercel:
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Next.js** (detected automatically).
5. Click **Deploy**.
6. Your anniversary website will be live on a public URL to share with Sayang!
