# ONE-J Music — weekly-update site

This version is deliberately data-driven so you do **not** edit the homepage every week.

## Weekly update workflow
Open only `data/catalog.json`.

To add an artist:
1. Copy one artist object.
2. Change `id`, `name`, and `description`.
3. Add its releases.

To add a release:
1. Copy one release object inside the correct artist.
2. Change `slug`, `title`, `year`, `status`.
3. Add streaming links later in `links`.
4. Put a cover in `assets/covers/` and set `cover` to e.g. `assets/covers/conversation.jpg`.

Commit the change to GitHub. GitHub Pages republishes the site automatically.

## Initial catalog
- BiTEUL — The Color of Breeze
- BiTEUL — Conversation
- LazyPub — Little Step
- LazyPub — Identity

## Domain
The included CNAME points to `onejmusic.com`.

## Next automation phase
A later ONE-J Music OS can write `data/catalog.json` automatically, generate artist/release pages, update sitemap/structured data, and push the commit to GitHub. This keeps the public site simple while allowing weekly automation.
