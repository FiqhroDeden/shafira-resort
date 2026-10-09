#!/usr/bin/env node
// Generate / edit images via Cloudflare AI (default model: openai/gpt-image-2.5-flare).
//
// Env:   CLOUDFLARE_ACCOUNT_ID, plus CLOUDFLARE_API_TOKEN (token needs "Workers AI: Read/Edit").
//        The token may instead be a network secret that injects the Authorization header
//        for api.cloudflare.com, in which case CLOUDFLARE_API_TOKEN can be left unset.
// Usage: node scripts/generate-image.mjs --prompt "..." --out public/photos/x.jpg
//        [--size 1024x1024|1024x1536|1536x1024|auto]
//        [--quality low|medium|high|xhigh|max|auto]
//        [--background transparent|opaque|auto]
//        [--image path/to/input.jpg ...]   (repeatable, max 16 — edit mode)
//        [--model openai/gpt-image-2.5-flare]

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, extname } from "node:path";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    prompt: { type: "string", short: "p" },
    out: { type: "string", short: "o" },
    size: { type: "string", default: "1536x1024" },
    quality: { type: "string", default: "high" },
    background: { type: "string" },
    image: { type: "string", multiple: true, default: [] },
    model: { type: "string", default: process.env.CF_IMAGE_MODEL || "openai/gpt-image-2.5-flare" },
  },
});

const { CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: token } = process.env;
if (!accountId) fail("Set CLOUDFLARE_ACCOUNT_ID.");
if (!args.prompt) fail('Missing --prompt "..."');

const out = args.out || `generated/image-${Date.now()}.jpg`;
const formats = { ".png": "png", ".webp": "webp", ".jpg": "jpeg", ".jpeg": "jpeg" };
const outputFormat = formats[extname(out).toLowerCase()];
if (!outputFormat) fail("--out must end in .png, .webp, .jpg or .jpeg");

const mimes = { ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const images = await Promise.all(
  args.image.map(async (path) => {
    const mime = mimes[extname(path).toLowerCase()];
    if (!mime) fail(`Unsupported input image type: ${path}`);
    return `data:${mime};base64,${(await readFile(path)).toString("base64")}`;
  }),
);

const input = { prompt: args.prompt, size: args.size, quality: args.quality, output_format: outputFormat };
if (args.background) input.background = args.background;
if (images.length) input.images = images;

console.error(`→ ${args.model} (${args.size}, ${args.quality}${images.length ? `, ${images.length} input image(s)` : ""})`);
const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run`, {
  method: "POST",
  headers: { ...(token && { Authorization: `Bearer ${token}` }), "Content-Type": "application/json" },
  body: JSON.stringify({ model: args.model, input }),
});
const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  fail(`HTTP ${res.status}: ${text.slice(0, 500)}`);
}
if (!res.ok || body.success === false || (body.state && body.state !== "Completed")) {
  fail(`HTTP ${res.status}: ${JSON.stringify(body.errors ?? body, null, 2).slice(0, 2000)}`);
}

const image = body.result?.image;
if (!image) fail(`No result.image in response: ${text.slice(0, 1000)}`);

let bytes;
if (/^https?:\/\//.test(image)) {
  const img = await fetch(image);
  if (!img.ok) fail(`Downloading ${image} failed: HTTP ${img.status}`);
  bytes = Buffer.from(await img.arrayBuffer());
} else {
  bytes = Buffer.from(image.replace(/^data:[^,]+,/, ""), "base64");
}

await mkdir(dirname(out), { recursive: true });
await writeFile(out, bytes);
console.log(out);

function fail(msg) {
  console.error(`generate-image: ${msg}`);
  process.exit(1);
}
