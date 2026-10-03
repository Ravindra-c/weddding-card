# Telugu + English Wedding Invitation Website

A cinematic, bilingual (తెలుగు / English) digital wedding invitation built with
**React + Vite + Tailwind CSS + Framer Motion + Lucide icons**.
Every name, date, photo, song and sentence lives in a few data files, so you never have to touch the components.

## 1. Run it

```bash
npm install
npm run dev        # open the URL it prints (usually http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # preview the production build
```
Requires Node.js 18 or newer.

## 2. Project structure

```
public/
  favicon.svg
  assets/images/      ← your photos go here (same file names)
  assets/music/       ← optional wedding.mp3
src/
  data/
    weddingData.js    ← names, parents, date, time, venue, address, Google Maps
    translations.js   ← ALL Telugu + English text
    events.js         ← Engagement, Haldi, Mehendi, Wedding, Reception (switch on/off)
    images.js         ← image paths (god, groom, bride, story, gallery)
  config/
    music.js          ← YOUTUBE_MUSIC_URL + local MP3 fallback
    rsvp.js           ← where RSVP answers are sent
  components/         ← OpeningScreen, MusicPlayer, LanguageSwitcher, Navbar, Countdown,
                        Lightbox, PetalAnimation, MandalaBackground, Diya, Ornaments, Img, Reveal…
  sections/           ← Hero, Couple, Story, Family, Events, Countdown, WeddingDetails,
                        Gallery, Venue, RSVP, Share, Blessings, ThankYou, Footer
  context/            ← language + music state
index.html            ← page title, description, Open Graph / Twitter tags
```

## 3. How to customise

### Names, parents, venue
Open `src/data/weddingData.js`. There are two blocks: `en` (English) and `te` (Telugu).
Replace each `[PLACEHOLDER]` in **both** blocks:

| What | Fields |
|---|---|
| Groom / Bride | `groomName`, `brideName` |
| Parents | `groomFather`, `groomMother`, `brideFather`, `brideMother` |
| Hometowns | `groomTown`, `brideTown` |
| Wedding date & time shown on screen | `weddingDate`, `weddingTime` |
| Venue & address | `venue`, `address`, `town`, `district` |

### Wedding date for the countdown
In the same file set `weddingDateTime` in this format (IST = `+05:30`):
```js
weddingDateTime: '2027-02-14T10:30:00+05:30',
```
`weddingDate` / `weddingTime` are only the *display text* (e.g. "14 February 2027", "10:30 AM"). Keep both in sync.

### Events
Open `src/data/events.js`. Each event has `enabled: true/false`. Set `false` (or delete the block) to hide it.
Fill in `date`, `time`, `venue`, `description` in both `en` and `te`.

### Replace photos
Put your files in `public/assets/images/` with the **same names**, or edit the paths in `src/data/images.js`.

| File | Used for |
|---|---|
| `lord-venkateshwara.png` | Opening screen (use a clear, high-quality image; PNG with transparent background looks best). It is shown with `object-contain`, so it is never stretched or cropped. |
| `divine-couple.png` | Optional second devotional image (path ready in `images.js`) |
| `groom.jpg`, `bride.jpg` | Couple section (portrait 3:4 works best) |
| `couple.jpg` | Social-share preview image (1200×630) |
| `story-1.jpg … story-3.jpg` | Our Story timeline |
| `gallery-1.jpg … gallery-8.jpg` | Gallery. Add or remove entries in `images.js`; `aspect` sets the frame shape |

Tip: resize photos to ~1600px wide and compress them (e.g. squoosh.app) so the site loads fast on mobile data.
If a file is missing, a gold placeholder is shown instead of a broken image.

### Telugu & English text
Everything is in `src/data/translations.js` (`te` and `en`). Edit sentences freely. `{groom}`, `{bride}`, `{name}` are filled in automatically.
Our Story paragraphs: `story.items`. Blessings: `blessings.cards`. Invitation lines: `hero.line`, `wedding.invite`, etc.

### Music (YouTube or MP3)
Open `src/config/music.js`:
```js
export const YOUTUBE_MUSIC_URL = 'https://www.youtube.com/watch?v=XXXXXXXXXXX';
```
- Any normal YouTube link works (watch, youtu.be, shorts, embed).
- Music starts when the guest taps **"Enter Invitation / వివాహ ఆహ్వానం తెరవండి"** (browsers do not allow autoplay with sound, so this tap is required).
- Some videos disallow embedding. If YouTube fails, the site automatically tries the local MP3 and otherwise just shows a disabled music button. The rest of the site keeps working.
- **Local MP3 (most reliable):** put your song at `public/assets/music/wedding.mp3` and leave the YouTube link as the placeholder.
- Use music you have the right to use.
- Set `enabled: false` to remove music completely.

### Google Maps
In `src/data/weddingData.js`:
- `mapsUrl` → open your venue in Google Maps → **Share → Copy link**.
- `directionsUrl` → optional; if empty, a directions link is built from the venue + address.
- `mapEmbedUrl` → optional; Google Maps → Share → **Embed a map** → copy only the `src="..."` URL to show a live map in the page.
If `mapsUrl` is still a placeholder, the buttons open a Google Maps search for your venue name.

### Guest personalisation
Add `?guest=Name` to the link:
`https://yourdomain.com/?guest=Ravi` → "Dear Ravi" / "ప్రియమైన Ravi గారికి".
You can write the Telugu name too: `?guest=రవి`. For names with spaces, use `%20` or `+`. Without it, the greeting is "Dear Family & Friends".
(The Share buttons always share the link **without** `?guest=`.)

### RSVP
`src/config/rsvp.js` → `rsvpConfig.mode`:
- `'demo'` (default): the form works, but nothing is sent.
- `'formspree'`: create a form at formspree.io and paste `https://formspree.io/f/xxxx` into `endpoint`.
- `'webhook'`: any URL that accepts a JSON POST (Google Apps Script web app, Make, Zapier…).
- For Supabase / Firebase / Google Forms, edit `submitRSVP()` (examples are in the file). Never place secret keys in frontend code.

### SEO / WhatsApp preview
Edit `<title>`, description and `og:` tags in `index.html`, and the tab title in `weddingData.siteTitle`.
For good WhatsApp previews, use a **full URL** for `og:image`, e.g. `https://yourdomain.com/assets/images/couple.jpg`.

### Colours & fonts
Colours: `tailwind.config.js` (`maroon`, `gold`, `cream`, `ivory`, …) and CSS variables at the top of `src/index.css`.
Fonts (Google Fonts): Cormorant Garamond, Great Vibes, Jost, Noto Serif Telugu, Noto Sans Telugu — linked in `index.html`.

## 4. Deploy

First run `npm run build`; the `dist/` folder is the website. The build uses relative paths (`base: './'`), so it works on all hosts below.

**Vercel**
1. Push the project to GitHub.
2. vercel.com → *Add New → Project* → import the repo.
3. Framework: Vite (auto-detected). Build command `npm run build`, output `dist`. Deploy.

**Netlify**
1. app.netlify.com → *Add new site → Import from Git* (or drag-and-drop the `dist` folder onto netlify.com/drop).
2. Build command `npm run build`, publish directory `dist`.

**GitHub Pages**
1. Push to GitHub.
2. Build locally: `npm run build`.
3. Easiest: install `gh-pages` (`npm i -D gh-pages`), add the script `"deploy": "gh-pages -d dist"` to `package.json`, then run `npm run deploy`.
4. Repo → *Settings → Pages* → source: branch `gh-pages`, folder `/ (root)`.
(The `?guest=` links work because the site is a single page.)

## 5. Performance & accessibility notes
- Images are lazy-loaded (the opening image loads eagerly); gallery frames reserve their space, so there is no layout shift.
- Petals / golden dust are drawn on one small canvas each, use fewer particles on phones, pause when off-screen or in a background tab, and are switched off when the device asks for reduced motion (CSS and Framer Motion animations are also reduced).
- Keyboard: skip-free tab order, visible gold focus rings, Esc / ← / → in the gallery viewer, focus is trapped and restored in the lightbox.
- Telugu text is never split inside a word (animations split on spaces only), so conjunct letters always render correctly.

## 6. Troubleshooting
- **No sound:** tap *Enter Invitation* first; check `YOUTUBE_MUSIC_URL`; some videos block embedding → use the MP3 option.
- **Telugu looks like boxes:** you are offline (Google Fonts could not load) — it works once online, and phones have Telugu system fonts anyway.
- **Images show a gold placeholder:** the file name in `public/assets/images/` doesn't match `src/data/images.js`.
