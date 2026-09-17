# AI Step Media Pipeline — Uncommon Kitchen

Research notes for generating **per-step recipe instruction stills** and optional **short videos/GIFs**, then embedding them on Next.js recipe pages.

**Date:** 2026-09-16  
**Scope:** 100 recipes × ~8–12 steps (~800–1,200 media assets)

---

## 1. Remotion (remotion.dev)

### Capabilities
- Programmatic video from **React** (CSS, Canvas, SVG, WebGL, data-driven props).
- Strong fit when step media is composed from existing recipe JSON + brand UI (titles, timers, ingredient callouts, progress bars).
- Outputs: **MP4, WebM, GIF, ProRes, stills, audio**.
- Preview via Remotion Studio / Player; agent-assisted composition authoring is a first-class workflow in recent docs.

### Rendering pipeline
1. **Bundle** Remotion project (Webpack/esbuild-style bundle of React compositions).
2. **Serve** the bundle; spawn **headless Chrome** (Puppeteer).
3. **Render frames** concurrently (page pool + `concurrency`).
4. **Encode** with FFmpeg (`renderMedia`, or `renderFrames` + `stitchFramesToVideo`; `renderStill` for single frames).
5. Cloud options: **Remotion Lambda** (`renderMediaOnLambda` + `getRenderProgress`), Cloud Run, Vercel sandbox, client-side rendering.

### Cost / license model (verify on remotion.dev / remotion.pro)
| Tier | Who | Price (as of research) |
|------|-----|------------------------|
| Free License | Individuals; orgs ≤3 people; nonprofits; evaluation | $0 (full features) |
| Creators | Low-volume, non-automated company use | **$25 / seat / month** |
| Automators | Automated pipelines, Player embeds, programmatic renders | **$0.01 / successful render**, **$100 / month minimum** (renders billed in 1,000 increments) |
| Enterprise | Custom terms, paperwork, private support | **$500 / month minimum** baseline |

- Infrastructure (AWS Lambda GB-seconds, S3, etc.) is **separate** from Remotion license fees.
- One successful export (video, GIF, still, PDF) = **1 render** for Automators billing.
- For a small Uncommon Kitchen team (≤3), Remotion can be free; at 4+ people with automation, expect **≥$100/mo** once Automators is required.

### Fit for cooking steps
- Excellent for **templated step cards**: still photo + overlaid step number, instruction text, timer ring, brand chrome.
- Less ideal as a *generator* of food photography — stills usually come from an image model or real photos, then Remotion animates them (Ken Burns, transitions, captions).

---

## 2. HyperFrames (and Remotion-adjacent tools)

### HyperFrames (heygen-com/hyperframes)
- **Open-source** HTML → deterministic MP4 (Apache 2.0): **no per-render fees, no headcount license threshold**.
- Authoring: plain **HTML + CSS + seekable animation** (GSAP, Lottie, CSS, WAAPI, Three.js, etc.) with `data-start` / `data-duration` / `data-track-index`.
- Pipeline mirrors Remotion: headless Chrome seeks each frame → FFmpeg encodes. CLI: `npx hyperframes init` → `preview` → `render` (mp4 / webm / mov / **gif** / png-sequence).
- Explicitly **agent-friendly** (skills for Claude/Cursor/etc.); has a published **animated recipe-card** example (ingredients, steps, circular timer).
- Distributed render: local, AWS Lambda, Cloud Run, HeyGen-hosted cloud (newer / less battle-tested than Remotion Lambda).

| | HyperFrames | Remotion |
|--|-------------|----------|
| Authoring | HTML/CSS/JS | React/TS components |
| Build step | None | Bundler required |
| License | Apache 2.0 | Source-available Remotion License |
| Agent handoff | Edit HTML as source of truth | JSX project |
| Cloud maturity | Growing | Mature Lambda ecosystem |
| Recipe content | Official recipe-card blog/examples | DIY compositions |

### Similar / adjacent
- **Remotion** — React-native twin (see §1).
- **fal.ai ffmpeg-api / images-to-video** — stitch stills into MP4 without generative AI ($0 compute on fal’s ffmpeg endpoint listing).
- **Self-hosted Chrome + FFmpeg scripts** — same idea without a framework (more glue code).

**Recommendation:** Prefer **HyperFrames** for MVP step *cards/videos* unless the team already standardizes on Remotion components and stays on the Free License.

---

## 3. Image-to-video / image-to-GIF approaches

| Approach | Typical use | Quality for food | Cost (approx., 2026) | Notes |
|----------|-------------|------------------|----------------------|-------|
| **Runway Gen-4 Turbo** | I2V / T2V API | Good motion; food can morph | ~**$0.05/s** | Gen-4.5 ~$0.12/s |
| **Kling 3.0 Pro** (fal / official) | Cinematic I2V | Strong motion | ~**$0.112/s** (no audio); ~**$0.168/s** with audio | Up to ~15s; overkill for 2–4s step loops |
| **Luma Ray / Dream Machine** | Photoreal I2V | Strong realism | ~**$0.06/s** 720p; ~**$0.24/s** 1080p (credit plans) | Subscription credit packs |
| **fal.ai Stable Video (SVD)** | Short I2V from still | Moderate; older model | ~**$0.075 / clip** | Cheap experiments; less control |
| **fal.ai** multi-model hub | Single API for Kling/Flux/SVD/ffmpeg | Varies | Usage-based + signup credits | Best DX for Next.js scripts |
| **ffmpeg GIF from stills** | Ken Burns / crossfade / palette GIF | Predictable, no AI morph | **~$0** (CPU) | Best MVP “motion” for steps |
| **HyperFrames / Remotion GIF|MP4** | Overlay UI on stills | Brand-consistent | Infra + (Remotion) license | Preferred over generative I2V for instructions |

### Practical guidance for recipes
- Generative I2V often **distorts utensils, hands, and food textures** — risky for instructional accuracy.
- Prefer: **accurate still** → light motion (zoom/pan, text fade, timer) via HyperFrames/ffmpeg.
- Reserve Kling/Runway for **hero dish ambience** (steam, pour) on a few recipes, not every step.

---

## 4. Free/cheap AI image generators (food steps + commercial use)

Commercial/ad-site use means **paid tiers or open licenses** — free tiers frequently assign ownership to the vendor.

| Tool | Strength for food/steps | Approx. API cost | Commercial / licensing (summary) |
|------|-------------------------|------------------|----------------------------------|
| **FLUX.1 [schnell]** (fal / self-host) | Fast, solid food photos; good for batch | **~$0.003 / MP** on fal (~$0.003–0.006 per 1K image) | **Apache 2.0** weights; fal states commercial-ready outputs |
| **FLUX Pro / Kontext** (BFL / fal) | Higher fidelity, edits | ~$0.04–0.08 class (tier-dependent) | Commercial via paid API; check BFL ToS |
| **Ideogram 3/4** | Best when step cards need **readable text** in-image | ~**$0.03–0.10** / image | Platform: commercial use allowed; verify current ToS |
| **Recraft V3/V4** | Brand-consistent, vector/illustration style | ~**$0.035** raster (Pro much higher) | **Free plan: Recraft owns, no commercial.** Paid: you own + commercial |
| **Leonardo** | Many models, food styles | Credit / API plans | **Paid: you own.** Free: Leonardo owns; limited commercial license — avoid free for ads |
| **Imagen / other cloud** | Quality varies | ~$0.02–0.06 class | Google/cloud ToS; watch product sunsets |

### Food-illustration tips
- Prompt template: `overhead documentary food photo, [action], stainless bowl, natural window light, no text, no watermark, 4:3`.
- Lock **seed + style reference** across a recipe for visual consistency.
- Prefer **illustration or clean photo style** over hyper-real hands (hands/fingers fail often).
- Do **not** bake step text into the image if you can overlay it in HyperFrames/Next.js (cheaper edits, better a11y).

---

## 5. Recommended end-to-end pipeline

```
recipe JSON
    │
    ├─► prompt builder (step text → image prompt + negative prompt)
    │
    ├─► fal.ai FLUX.schnell  ──► step stills (WebP/PNG) ──► R2/S3/CDN
    │         │
    │         optional QA / regenerate (seed, prompt tweak)
    │
    ├─► optional motion:
    │         A) ffmpeg Ken Burns / crossfade → short MP4 or palette GIF
    │         B) HyperFrames composition (still + step # + caption + timer) → MP4/GIF
    │         C) selective fal SVD / Runway / Kling for hero ambience only
    │
    └─► Next.js recipe page
              next/image for stills
              <video> or lightweight GIF for optional motion
              media URLs stored on recipe JSON / CMS
```

### Recipe JSON sketch
```json
{
  "slug": "miso-glazed-aubergine",
  "steps": [
    {
      "n": 1,
      "instruction": "Score the aubergine flesh in a crosshatch.",
      "media": {
        "still": "https://cdn…/miso-aubergine/step-01.webp",
        "motion": "https://cdn…/miso-aubergine/step-01.mp4",
        "motionType": "template",
        "promptId": "flux-schnell-v1",
        "seed": 48291
      }
    }
  ]
}
```

### Next.js embedding
- Use `next/image` with fixed aspect (e.g. 4:3) and blur placeholders.
- Prefer **muted looping `<video playsInline>`** over heavy GIFs (smaller, sharper).
- Lazy-load below-the-fold steps; preload step 1.
- Keep instruction text in HTML (SEO + screen readers); treat media as illustrative.

---

## 6. Cost & time for 100 recipes × 8–12 steps

**Assumptions:** ~**1,000** keepers; ~1.5–2.5 generations per keeper after rejects → **~1,500–2,500** image API calls.

### Cost scenarios (USD, approximate)

| Scenario | What’s generated | Est. API / license | Est. human time |
|----------|------------------|--------------------|-----------------|
| **A — MVP stills only** | Flux schnell stills | **$5–25** image API (+ CDN pennies) | **40–80 h** prompt QA / curation |
| **B — MVP + template motion** | A + HyperFrames/ffmpeg MP4 or GIF | **$5–40** (+ optional small cloud render) | **50–100 h** (template once, then batch) |
| **C — Selective AI I2V** | B + ~10% steps × 3s Runway Turbo | **+$15–40** I2V | + review time for morph artifacts |
| **D — Full AI I2V every step** | 1,000 × 3s @ $0.05–0.11/s | **$150–350+** | High reject rate; **not recommended** |
| **Remotion Automators** (if company ≥4 + automation) | License floor | **+$100/mo** while pipeline runs | — |

**Realistic MVP budget for 100 recipes:** **~$20–80** cash (Flux + storage + light render) and **~1–2 person-weeks** of focused curation, or **~3–4 weeks** part-time alongside other site work.

Generation wall-clock (API only) is hours; **human QA and prompt consistency dominate calendar time**.

---

## Tool comparison table

| Tool | Role | Strengths | Weaknesses | MVP pick? |
|------|------|-----------|------------|-----------|
| **FLUX.1 schnell (fal)** | Step stills | Cheap, fast, commercial-friendly | Occasional food anatomy fails | **Yes — primary** |
| **Ideogram** | Stills with in-image text | Readable labels | Costlier than Flux | Optional |
| **Recraft (paid)** | Brand / vector steps | Style lock | Free tier not commercial | Optional paid |
| **Leonardo (paid)** | Style variety | Many models | Free ownership trap | Optional paid |
| **HyperFrames** | Step card MP4/GIF | Apache, recipe examples, agent DX | Younger cloud story | **Yes — motion** |
| **Remotion** | React step videos | Mature Lambda, React reuse | License at ≥4 / Automators $100 min | Alt if React-deep & ≤3 |
| **ffmpeg** | Ken Burns / GIF | Free, deterministic | No generative motion | **Yes — fallback** |
| **Runway / Kling / Luma** | Generative I2V | Fancy motion | Cost + food distortion | Hero-only later |
| **fal SVD** | Cheap I2V trials | Low $ | Quality limits | Experiments |

---

## Recommended stack for MVP

1. **Stills:** fal.ai `fal-ai/flux/schnell` with a shared style prompt + per-step seeds; store WebP on R2/S3.
2. **Motion (optional):** HyperFrames HTML templates (step still + number + caption + optional timer) → short muted MP4; or ffmpeg Ken Burns if HyperFrames is deferred.
3. **Skip generative I2V** for instructional steps in MVP.
4. **Orchestration:** Node script (or Inngest/Trigger) reading recipe JSON → batch generate → write media URLs back to JSON/CMS.
5. **Next.js:** `next/image` + lazy `<video>`; instruction text always in DOM.

---

## Phase plan (weeks 1–4)

### Week 1 — Foundations
- Define media schema on recipe JSON; CDN bucket + path convention (`/{slug}/step-{nn}.webp`).
- Build prompt template + negative prompt; generate **2–3 pilot recipes** (all steps) with Flux schnell.
- Manual QA rubric: edible realism, utensil correctness, no text artifacts, style match.

### Week 2 — Batch stills
- Script batch generation for **20–30 recipes**; retry/reject loop; seed logging.
- Wire stills into Next.js recipe step UI (`next/image`).
- Measure keep rate; refine prompts (cuisine-specific variants).

### Week 3 — Motion template
- Implement one HyperFrames (or ffmpeg) **step-card composition**; export 3–5s muted MP4.
- Apply to pilot recipes; compare GIF vs MP4 weight on mobile.
- Decide default: still-only vs auto-play muted video.

### Week 4 — Scale to ~100
- Batch remaining recipes; spot-check 10–20% of steps.
- Optional: 5–10 hero I2V clips via fal for homepage/social only.
- Document ops runbook (regenerate one step, cost dashboard, license notes).

---

## Cost estimate (summary)

| Item | 100 recipes (≈1,000 steps) |
|------|----------------------------|
| Flux schnell stills (w/ retries) | **~$10–25** |
| Storage / CDN | **~$1–5 / mo** early |
| HyperFrames / ffmpeg motion | **~$0–15** compute |
| Remotion Automators (only if required) | **$100 / mo** floor |
| Generative I2V (not MVP) | **$150–350+** if applied to all steps |
| **Recommended MVP cash outlay** | **~$20–80** one-time gen + small CDN |
| **Labor** | **~40–100 hours** curation / integration |

---

## Technical architecture sketch

```
┌─────────────────────────────────────────────────────────────┐
│  data/recipes/*.json  (instructions, timing, media refs)    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  scripts/generate-step-media.ts                             │
│    • buildPrompt(step)                                      │
│    • fal.subscribe("fal-ai/flux/schnell")                   │
│    • upload → R2/S3                                         │
│    • optional: hyperframes render | ffmpeg kenburns         │
│    • patch JSON media URLs                                  │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Object CDN      HyperFrames     (later) fal I2V
         WebP/MP4        template MP4     hero clips
              │              │              │
              └──────────────┼──────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Next.js app/recipes/[slug]                                 │
│    StepList → StepMedia (still + optional <video>)          │
│    SEO: text instructions; media decorative / illustrative  │
└─────────────────────────────────────────────────────────────┘
```

### Key implementation notes
- Idempotent jobs: skip if `media.still` exists unless `--force`.
- Cap concurrency on fal (rate limits); exponential backoff.
- Keep a **manifest CSV** (slug, step, seed, prompt hash, cost, keep/reject) for audits and ads compliance.
- Re-check vendor ToS before paid ads using AI imagery (platform policies change).

---

## Sources (fetched / searched 2026-09-16)

- Remotion: remotion.dev docs (license FAQ, Lambda `renderMediaOnLambda`, rendering pipeline), remotion.pro/license  
- HyperFrames: github.com/heygen-com/hyperframes, hyperframes.heygen.com (vs Remotion, CLI, developers)  
- Video pricing: fal.ai Kling/SVD/Flux pages; industry summaries (Runway/Luma/Kling ~2026 rates)  
- Image licensing: fal Flux schnell; Recraft ownership docs; Leonardo pricing/ToS summaries; Ideogram API pricing  

*Figures are research snapshots — re-verify pricing and ToS before production spend.*
