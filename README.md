# OHND Race Host Game Hub

An installable PWA combining the OHND tools into one app:

- **Movie Guide** — Rotten Tomatoes score, synopsis & cast for any title
- **Dad Jokes** — 649 jokes, one button
- **Would You Rather** — 370 dilemmas, one button
- **Discord** — jump straight to the community
- **Website** — coming soon

**Live:** https://dose2x.github.io/ohnd-hub/

## Install it on your phone

Open the live link above, then:
- **Android/Chrome:** tap "Install app" from the menu (or the install prompt)
- **iOS/Safari:** tap Share → "Add to Home Screen"

It installs with its own icon and opens full-screen like a native app. The Jokes and Would You Rather tabs work fully offline; Movie Guide needs an internet connection to look up titles.

## Run locally

Just open `index.html` in a browser — no build step, no dependencies. (The Movie Guide tab's search will fail locally due to CORS — the lookup API only allows requests from the live GitHub Pages domain.)
