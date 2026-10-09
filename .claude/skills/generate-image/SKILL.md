---
name: generate-image
description: Generate or edit images with Cloudflare AI (model openai/gpt-image-2.5-flare). Use when the user asks to create, generate, make, or edit an image, photo, illustration, banner, OG image, or visual asset for the Shafira Resort site.
---

# Generate images with Cloudflare AI (GPT Image 2.5 Flare)

Run the repo script, which calls the Cloudflare `/ai/run` endpoint and writes the image to disk:

```bash
node scripts/generate-image.mjs \
  --prompt "<detailed prompt>" \
  --out public/photos/<descriptive-seo-name>.jpg \
  [--size 1536x1024|1024x1536|1024x1024|auto] \
  [--quality low|medium|high|xhigh|max|auto] \
  [--background transparent|opaque|auto] \
  [--image existing.jpg]   # repeatable (max 16) → edit/reference mode
```

- Needs `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the environment. If they are
  missing, stop and tell the user to add them as environment secrets — never ask them to paste
  the token into chat or commit it.
- Output format follows the `--out` extension (`.jpg`, `.png`, `.webp`). Defaults: `1536x1024`, `high`.
- Use `--quality low` for quick drafts, then re-run the chosen prompt at `high`.
- Transparent backgrounds may not be supported by every GPT Image model; if a transparent PNG is
  required and it fails, retry with `--model openai/gpt-image-1.5`.
- Each call costs money on the user's Cloudflare account — don't loop or batch-generate
  without asking.

## Conventions for this repo

- Site photos live in `public/photos/<section>/` with descriptive, SEO-friendly kebab-case
  names (e.g. `vila-besar-shafira-resort.jpg`); reference them from `src/data/site.ts`.
- Scratch/draft images go in `generated/` (git-ignored) until the user approves them.
- After generating, open the file with the Read tool to check it, then show it to the user
  (SendUserFile) before wiring it into the site.
- Generated images are not real photos of the resort: mark them as illustrations
  (e.g. in the `credit` field) rather than presenting them as actual property photos.
