# Sanjana Krishnan — Author Website

A production-ready, static website for Sanjana Krishnan — author of *So You Want to Be a
Doctor: All About the Human Body* — built with plain HTML, CSS, and vanilla JavaScript. No
build step, framework, or backend required.

## Structure

```
.
├── index.html            Home
├── about.html            Biography, milestones
├── book.html             Book details, synopsis, purchase links
├── impact.html           Global literacy initiative & distribution data
├── gallery.html          Photo gallery with lightbox
├── endorsements.html     Physician endorsement quotes
├── media.html            Photo gallery + speaking invitations
├── contact.html          Contact form (with photo attachment) & social links
├── assets/
│   ├── css/style.css     Design system + all page styles
│   ├── js/main.js        Nav, scroll reveal, counters, lightbox, form
│   ├── icons/favicon.svg Monogram favicon (SK)
│   └── images/
│       ├── author/       Add author photo(s) here
│       ├── book/book_cover.png   Real book cover (already in place)
│       ├── gallery/       Real photos, organized in school/, rotary/, community/ subfolders
│       └── impact/        Add distribution/event photos here
└── README.md
```

## Running locally

No build tools needed. From this folder, serve the files with any static server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Before launch — replace placeholder content

- **Endorsements**: `endorsements.html` currently contains bracketed placeholder quotes
  (`[Insert full endorsement quote...]`) and physician names. Swap in the five verified
  endorsement quotes and attributions from the United States, United Kingdom, and India.
  The same cards are echoed as a short preview on `index.html` — update both.
- **Amazon links**: Kindle purchase links are live (`https://a.co/d/05Ejr5bg`) on
  `index.html` and `book.html`. The paperback button on `book.html` is still a `#` placeholder —
  update it once a paperback listing exists.
- **Photos**: `about.html` and `impact.html` still use emoji/icon placeholders in place of real
  photography — drop images into `assets/images/author/` and `assets/images/impact/`, then swap
  the `.gallery-placeholder` / `.hero-media` blocks for `<img>` tags (see `index.html`'s hero for
  the pattern). `gallery.html` and `media.html` already use real photos from
  `assets/images/gallery/{school,rotary,community}/` — only the "Distribution Events" tile is
  still a placeholder, pending photos specific to that category.
- **Large video files**: `assets/images/gallery/school/Stratford_Milpitas_2.MOV` (123MB) and
  `Stratford_Student_Engagement_1.MOV` (127MB) are not referenced anywhere on the site — they're
  far too large to embed in a static page and there's no video-compression tooling in this repo.
  Compress them (e.g. with HandBrake, or an online compressor) to a web-friendly MP4 — under
  ~15-20MB — before adding them to `gallery.html`/`media.html`, following the pattern used for
  `Book_Handoff_Clip.MP4`.
- **Screenshot images not shown on the site**: `assets/images/gallery/rotary/Rotary_Book_Launch.png`
  and `assets/images/gallery/school/Rotary_Mahajana.png` are Facebook post screenshots (not candid
  photos) kept in the folder as source documentation — their text was used to write accurate
  captions elsewhere, but they aren't displayed in the gallery grid themselves.
- **Contact form**: `contact.html`'s form (including the photo attachment field) is client-side
  only — it validates, then shows a demo success message, but nothing is actually transmitted.
  Wire it to a service such as Formspree or Netlify Forms (both support receiving file
  attachments) to receive real submissions with photos.
- **Social links**: the LinkedIn link in the footer and contact page is a `#` placeholder.
- **Book cover file size**: `assets/images/book/book_cover.png` is a large, uncompressed PNG.
  Run it through a PNG optimizer (e.g. ImageOptim, Squoosh) before deploying to keep load times
  fast — the spec calls for it to be used as-is, but compressing losslessly won't change how it
  looks.
- **Sample chapter file size**: `assets/preview/anatomybook_preview.pdf` (linked from `book.html`)
  is ~31MB. Compress it (e.g. with Adobe Acrobat, Ghostscript, or an online PDF compressor) before
  launch so the download doesn't stall on slower connections.

## Design system

Colors, spacing, and shadows are defined as CSS custom properties at the top of
`assets/css/style.css` (`:root`). Update `--color-navy` / `--color-gold` there to re-theme the
entire site.

## Accessibility & performance notes

- Skip-to-content link, visible focus states, `aria-current` on the active nav link, and an
  accessible lightbox/mobile-menu (focus trapping + Escape to close) are already wired up.
- All scroll/counter/bar animations respect `prefers-reduced-motion`.
- Google Fonts are loaded with `preconnect` + `display=swap`. If you need the site to work fully
  offline, self-host the two font families instead.
- Structured data (`schema.org` JSON-LD) is included for Person, Book, and the impact program —
  update the `sameAs` array on `index.html`/`about.html` once social profiles are live.

## Deploying

Any static host works as-is: GitHub Pages, Netlify, Cloudflare Pages, Vercel, S3 + CloudFront,
etc. There is nothing to build — upload the folder contents (or point the host at this repo) and
set `index.html` as the entry point.
