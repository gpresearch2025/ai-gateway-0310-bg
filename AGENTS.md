# AGENTS.md

## Purpose
Project-specific working notes for `C:\Ai Projects\Ai Gateway 3-10-26`.

## Product Shape
- This repo contains a static prototype for `Consentext AI Gateway`.
- The main app is `index.html`.
- The presentation surface is `walkthrough.html`.
- The walkthrough is now MP4-first, not interactive-reel-first.

## Walkthrough Rules
- Keep `walkthrough.html` centered on the exported MP4 experience.
- Use `exports/ai-gateway-demo.mp4` as the primary walkthrough asset.
- Keep visible subtitles under the video; do not rely only on browser caption toggles.
- Preserve `boss mode` at `walkthrough.html?mode=boss`.
- Preserve the `Open prototype after video` handoff into the main app.

## Video Export
- Source scripts:
  - `capture-demo-frames.js`
  - `export-demo-video.py`
- Exported assets live in `exports/`.
- When the video content changes, regenerate:
  - `exports/ai-gateway-demo.mp4`
  - `exports/demo-narration.wav`
  - `exports/demo-script.txt`
  - `exports/ai-gateway-demo.vtt`

## Validation
- Quick check: `npm run smoke`
- Full check: `npm run review-ready`
- If walkthrough markup or export behavior changes, run at least `npm run smoke`.

## Deployment
- GitHub remote: `origin`
- Vercel project: `ai-gateway-0310-bg`
- If walkthrough assets or styling change, redeploy so the live walkthrough matches local.

## Editing Notes
- Prefer small targeted edits.
- Preserve the current MP4-first presentation structure unless explicitly asked to reintroduce interactive walkthrough behavior.
- Keep consumer-facing copy direct and presentation-ready.
