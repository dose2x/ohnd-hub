# OHND Race Host Game Hub

An installable PWA combining the OHND tools into one app:

- **Movie Guide** — Rotten Tomatoes score, synopsis & cast for any title
- **Dad Jokes** — 647 jokes, one button
- **Would You Rather** — 370 dilemmas, one button
- **Discord** — jump straight to the community
- **Website** — opens the [Legend of OHND (GTA5)](https://aaronfs5.wixsite.com/ohnd-2/blank-4) page of the official OHND Racing site

**Live:** https://dose2x.github.io/ohnd-hub/

## Install it on your phone

Open the live link above, then:
- **Android/Chrome:** tap "Install app" from the menu (or the install prompt)
- **iOS/Safari:** tap Share → "Add to Home Screen"

It installs with its own icon and opens full-screen like a native app. The Jokes and Would You Rather tabs work fully offline; Movie Guide needs an internet connection to look up titles.

## Run locally

No build step and no dependencies, but serve it over HTTP rather than opening the file directly. The page's security policy and the service worker don't work from `file://`. Use port **4173**: it's on the movie Worker's CORS allowlist, so the Movie Guide tab works locally too.

```bash
python -m http.server 4173
```

Then open http://localhost:4173.

## Movie Guide: Rotten Tomatoes fallback

The Movie Guide tab calls the same `ohnd-movie-proxy` Cloudflare Worker as the standalone [OHND Movie Guide](https://github.com/dose2x/ohnd-movie-guide), so it automatically gets the Worker's Rotten Tomatoes fallback: when OMDb doesn't return an RT rating for a title (common for TV series, shorts, and less mainstream titles), the Worker looks the score up directly from Rotten Tomatoes' search page and adds it to the response. No extra setup is needed here — it works as long as this app is served from an origin the Worker allows (`https://dose2x.github.io`).

See the Worker's own repo/docs for how the fallback is implemented.
