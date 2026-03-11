# SkyscraperCity Compact View

A Greasemonkey / Tampermonkey userscript that transforms SkyscraperCity forum threads into an ultra-compact layout.

## What it does

- Converts the sidebar user-info panel into a slim inline header (tiny avatar + username + stats on one line)
- Removes signatures, user banners, and user titles
- Tightens spacing on posts, quotes, action bars, and page navigation
- Hides the right sidebar to reclaim full page width
- Shrinks quote blocks, image thumbnails, and attachment previews
- Works on both thread pages and forum index lists
- Includes a toggle: click the "Compact" badge (bottom-right) or use the Greasemonkey menu to disable

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox) or [Greasemonkey](https://www.greasespot.net/) (Firefox).
2. Open `skyscrapercity-compact-view.user.js` in your browser — the extension will offer to install it.
   - Alternatively, open the extension dashboard, create a new script, and paste the contents.
3. Visit any SkyscraperCity page — the compact layout applies immediately.

## Toggle

- **Greasemonkey/Tampermonkey menu** → "Disable Compact View" / "Enable Compact View"
- **On-page badge** → click the green "Compact" pill at the bottom-right corner

The preference is stored in `localStorage` and persists across sessions.
