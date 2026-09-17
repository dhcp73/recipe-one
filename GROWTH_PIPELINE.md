# Uncommon Kitchen — Growth Pipeline

**As of:** 17 September 2026 (Europe/London)  
**Purpose:** One-page map of how traffic compounds across search, AI surfaces, short video, Pinterest, and courses — without turning recipe pages into ad spam.

---

## North star

Ship **uncommon but home-cookable** recipes with beginner-clear steps, sensory cues, and “why it works” teaching. That depth is the moat for Google, AI answers, and social saves.

Monetisation path (from research notes): hit **Journey by Mediavine** (~1K Tier-1 sessions / 30 days) → grow under Journey → **Mediavine Official** once ~$5K annualised ad revenue is credible. Keep pages calm; affiliates and kits sit beside content, not on top of it.

---

## 1. Google (organic search)

| Lever | What we do |
|-------|------------|
| **Seasonal calendar** | Publish ahead of Halloween → Bonfire → Diwali → Thanksgiving/Friendsgiving → Christmas (`/seasons/[slug]` hubs + diet-occasion tags). |
| **Intent match** | Title + slug + excerpt target long-tail how-to queries; JSON-LD `Recipe` / breadcrumbs already wired. |
| **On-page UX** | Jump-to-recipe, sticky ingredients, numbered steps, visual cues — dwell time and cook success over word-count padding. |
| **Internal links** | Season hubs ↔ category pillars ↔ related recipes; shallow taxonomy (continent / country / type / diet-occasion). |
| **Technical** | `sitemap.ts`, `robots.ts`, fast static recipe pages, clean Open Graph. |

**Cadence:** Batch festive recipes 4–8 weeks before peak; refresh winners with step media and FAQs later.

---

## 2. AI / MCP discovery

| Lever | What we do |
|-------|------------|
| **Structured clarity** | Machine-readable ingredients, timed steps, tips, and visual cues so assistants can cite accurately. |
| **Brandable uniqueness** | Unusual flavour bridges (miso caramel, yuzu pavlova, black garlic chaat) so answers name *this* recipe, not a generic clone. |
| **MCP / agent surfaces** | Expose recipe JSON and season collections to cook assistants; Chef AI on-site is the interactive twin of the same data. |
| **Citations** | Stable URLs under `/recipes/[slug]` and `/seasons/[slug]`; avoid soft-404 thin tags. |

---

## 3. TikTok / YouTube / Instagram

| Lever | What we do |
|-------|------------|
| **One cue per clip** | Film the sensory checkpoint (“look for copper caramel”, “edges blistered”) — not a full 12-minute cook. |
| **Hook → plate → link** | 3–7s hook, finished plate, on-screen slug or Link-in-bio to the recipe. |
| **Platform fit** | TikTok/Reels: chaos-to-calm transforms; YT Shorts + long-form: technique deep-dives; IG carousels: step stills. |
| **Series** | “Festive uncommon” weekly through Dec; stitch season hubs for binge context. |

Step `videoUrl` / still fields on `RecipeStep` support embedding muted loops later without redesigning the page.

---

## 4. Pinterest

| Lever | What we do |
|-------|------------|
| **Vertical pins** | Hero + title text overlay; season boards (Halloween, Diwali, Christmas, Friendsgiving). |
| **Idea pins / story pins** | 4–6 frames matching numbered steps + “Jump to recipe” CTA. |
| **Seasonal timing** | Pin early — Pinterest search leads Google for holiday planning. |
| **Freshness** | Re-pin variants (overhead, slice, gift box) of the same URL rather than new thin posts. |

---

## 5. Courses & owned products

| Lever | What we do |
|-------|------------|
| **Technique courses** | Paid modules that expand “why it works” (pastry shells, mithai set tests, meringue humidity). |
| **Lead magnet → list** | Seasonal PDF or “cook mode checklist” into newsletter (footer signup). |
| **Kits / affiliates** | Shop gear blocks + `/shop` kits; Mediavine-compatible (affiliates allowed beside exclusive programmatic). |
| **Community** | Chef AI + Cook Mode as retention loops that make the next seasonal drop land warmer. |

---

## Operating rhythm (next 90 days)

1. **Publish** festive batch → promote season hubs.  
2. **Clip** 2–3 cues per recipe for TikTok/IG; one longer YT technique cut per week.  
3. **Pin** each recipe to 2 boards within 24h of publish.  
4. **Measure** Search Console queries + season hub CTR; double down on recipes that earn saves.  
5. **Package** strongest techniques into a mini-course outline once 3–4 evergreen winners emerge.

---

## Guardrails

- No ad-dense recipe UI; jump links and sticky ingredients beat interstitial clutter.  
- British English, home-cook equipment, honest substitutions.  
- Prefer one excellent uncommon plate over five generic SEO clones.

