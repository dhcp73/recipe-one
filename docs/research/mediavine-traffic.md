# Mediavine Requirements & Recipe-Site Traffic / Monetization

**Researched:** mid-September 2026 (UTC+1 / Europe/London)  
**Site context:** Uncommon Kitchen (recipe / food publishing)  
**Purpose:** Path to Journey → Mediavine Official, traffic playbook, and non-programmatic revenue stack

---

## Requirements

### Mediavine Official (full program)

As of the **January 2026 program redesign**, Mediavine Official no longer markets a hard **50,000 monthly sessions** gate as the primary qualifier. Public requirements now emphasize **annual ad revenue**:

| Requirement | Current public bar |
|---|---|
| **Annual ad revenue** | **$5,000+** |
| Content | Original, audience-first (not scrapers / AI-farm spam) |
| Traffic quality | Clean, human, brand-safe (no bots, incentivized, or unsafe sources) |
| Google standing | Good standing with AdSense / Ad Exchange (no active bans/violations) |
| UX | Reader experience that supports premium ads |

**Source:** [Mediavine Requirements](https://www.mediavine.com/mediavine-requirements/), [What does it take to get approved?](https://help.mediavine.com/what-does-it-take-to-get-approved-by-mediavine)

Additional review factors (not hard public numbers): traffic **countries of origin**, **traffic sources**, reader demographics, and quality/safety checks.

### Journey by Mediavine (on-ramp)

For sites **below $5K annual ad revenue**:

| Requirement | Current public bar |
|---|---|
| **Sessions** | **≥ 1,000 sessions** from **Tier 1 countries** (explicitly including **U.S., Canada, U.K., Australia**) within a **30-day period** |
| Content / quality | Same audience-first + quality standards as Mediavine |
| Domain age | Ad partners commonly need **~4 months of domain history** before bidding |
| Onboarding | Install **Grow**; Journey typically needs **~30 days** of Grow data before ads |
| Revenue share | **70%** to publisher; **Net 65** payment schedule (Journey docs) |

**Sources:** [Mediavine Requirements](https://www.mediavine.com/mediavine-requirements/), [Journey getting started](https://www.journeymv.com/getting-started-with-journey-by-mediavine/)

> **Practical path for Uncommon Kitchen:** Hit Journey first (1K Tier-1 sessions / 30 days) → grow ad revenue under Journey → apply/transition to Official once **~$5K annualized ad revenue** is credible.

### 2026 Publisher Programs (post-January)

Eligibility by **previous calendar year annual ad revenue** ([Programs & path to growth](https://help.mediavine.com/programs-and-the-publisher-path-to-growth)):

| Program | Annual ad revenue |
|---|---|
| **Official** | ≥ **$5,000** |
| **Select** | **$100,000 – $249,999** |
| **Signature** | **$250,000 – $499,999** |
| **Premiere** | ≥ **$500,000** |
| **Premiere Plus** | ≥ **$1,000,000** |

Legacy note in the same Help article: *until* the Jan 2026 launch, sites still qualified for classic Mediavine Ad Management at **50,000 monthly sessions** and Mediavine Pro at **$100K** annual revenue. By mid-Sept 2026 those legacy gates are superseded for new program framing; cite the revenue ladder above as current.

### Exclusivity (programmatic only)

Mediavine requires **exclusive control of programmatic ad inventory**.

**Allowed alongside Mediavine:**
- Affiliate marketing (Amazon, meal kits, tools, etc.)
- Sponsored / brand posts (can disable MV ads on specific pages)
- Direct-sold inventory (incl. via Mediavine Direct)

**Violates exclusivity:**
- Anything that needs **extra `ads.txt` lines** (Taboola, RevContent, other programmatic networks, “testing” another ad network)
- Ad-supported tools that inject programmatic inventory (e.g. Disqus Basic)

**Source:** [Why Mediavine requires exclusivity](https://help.mediavine.com/why-mediavine-requires-exclusivity)

### Ad density rules (public / CBA)

Mediavine places in-content ads under **Coalition for Better Ads (CBA)** rules:

- **Hard ceiling:** ads ≤ **30%** of content height; content ≥ **70%**
- **Minimum spacing:** typically **2 “paragraphs”** (HTML blocks the script treats as paragraphs: `p`, headings, etc.) between in-content ads
- **Recommended defaults (Help Center):**
  - Mobile: **28–30%** frequency, 2-paragraph spacing, optimized for content length
  - Desktop: **20–25%** frequency, same spacing rules
- Dashboard defaults cited elsewhere: **~28% mobile / ~20% desktop** density

Even at max settings, Mediavine stays within the 30% CBA cap. Longer recipe posts = more eligible in-content slots (height-based).

**Sources:** [Adjusting in-content ads](https://help.mediavine.com/adjusting-your-in-content-ads), [CBA in-content logic](https://help.mediavine.com/cba-in-content-logic), [Optimizing content](https://help.mediavine.com/optimizing-content-for-better-seo-and-ad-performance)

### Recipe-specific monetization notes (Mediavine)

- Supported cards for MV recipe optimizations: **Create**, **WP Recipe Maker**, **WP Tasty**
- **Jump to Recipe (JTR)** + **Arrival Unit** + recipe-card ads: Mediavine has published that publishers with full recipe optimizations can see **up to ~15% more revenue** on sessions where users click JTR (lazy-load skips unloaded in-content ads; recipe/arrival units compensate)
- Lower instruction-ad density if you put **photos inside instruction steps** (photos inflate height / change density math)

**Source:** [Jump to Recipe revenue impact](https://prod.mediavine.com/blog/jump-button-positive-revenue-impact/), [Recipe card ad settings](https://prod.mediavine.com/blog/recipe-card-ad-settings/)

---

## Traffic playbook for Uncommon Kitchen

Goal sequence: **1K Tier-1 sessions (Journey)** → compound SEO + Pinterest → **$5K annual ad revenue (Official)** → higher Programs.

### Top 8 traffic tactics (ranked)

Ranked for **speed-to-sessions + durability for a recipe site** aiming at Mediavine:

| Rank | Tactic | Why it ranks here | Uncommon Kitchen action |
|---|---|---|---|
| **1** | **Pinterest SEO + fresh pins** | Fastest compounding traffic for food; pins can send clicks for months; intent-rich (cook-now) visitors monetize well | 2–5 **fresh** pin designs per recipe (new image URLs); 1000×1500; keyword boards/descriptions; claim site + Rich Pins; pin seasonally **~45 days** early |
| **2** | **Google SEO: long-tail recipe clusters** | Slower than Pinterest but highest long-term session stability and Tier-1 geo mix | Target low-competition “how to / with X / for Y” queries; one primary recipe + related roundups; internal links; update winners quarterly |
| **3** | **Email list (welcome + RSS-to-email)** | Platform-proof retention; lifts sessions without new discovery; improves return visits / RPM | Capture above ingredients / after card; lead magnet (meal plan PDF, shopping list); auto-send new recipes |
| **4** | **YouTube Shorts (+ occasional long-form)** | Shorts can spike direct/search traffic even without clickable links when CTA is verbal (“recipe at uncommonkitchen…”) | Hook in 1–2s; recipe title in spoken CTA + description; batch-film while cooking; link full recipe in long-form descriptions |
| **5** | **Seasonal / holiday content calendar** | Predictable session spikes (Thanksgiving, Christmas, BBQ season, Veganuary, etc.) | Publish 4–8 weeks ahead; refresh last year’s winners; align Pinterest schedule to peaks |
| **6** | **Recipe schema + rich results + print UX** | Improves SERP CTR (stars, time, image) → more sessions per ranking | Full Recipe JSON-LD (image ≥ ~1200px wide, times, HowToStep instructions, yield, nutrition); print button; ratings if genuine |
| **7** | **Interlinking + “related recipes” depth** | Raises pages/session and time-on-site (ad impressions + RPM) | End-of-post related grid; “what to serve with”; category hubs; no orphan recipes |
| **8** | **Instagram Reels / TikTok for brand → site** | Weaker direct click economics than Pinterest; still useful for email/Pinterest funnel and brand deals | Comment-to-DM link tools; Link-in-bio to recipe; always push to email + pin the same asset |

### Supporting ops (not in top 8 but required)

- Track **GA4 sessions** (and Tier-1 geo split) weekly — Journey/Mediavine care about sessions/quality, not follower counts
- Prefer **U.S./UK/CA/AU** audience in content language, measurements, and promo targeting
- Site speed (Core Web Vitals): slow pages kill both SEO and ad RPM
- Avoid low-quality traffic schemes (incentivized clicks, bots) — application killers

### Content formats that raise RPM / time-on-page

| Format | RPM / engagement effect | Notes |
|---|---|---|
| **Jump to Recipe + Arrival Unit** | Protects UX; with MV recipe stack can be revenue-neutral to **+~15%** on JTR sessions | Pair with Create / WPRM / Tasty |
| **Step-by-step photos** | Increases scroll depth & dwell; can *reduce* instruction-ad density if photos sit inside steps | Prefer photos in narrative; keep instruction blocks denser for ads, or lower instruction density |
| **Recipe video (embedded)** | Strong dwell + video ad / Universal Player upside | Host on YT/Vimeo for Journey; schema VideoObject when possible |
| **Print button** | Trust / utility; cooks stay engaged on-page before printing | Strip ads in print CSS only |
| **Recipe schema** | Indirect RPM via higher SERP CTR & qualified traffic | Validate with Google Rich Results Test |
| **Longer intro + tips / FAQ / variations** | More in-content height → more CBA-compliant ad slots | Don’t pad fluff; answer real cook questions |
| **Ingredient shopping / meal-kit modules** | Affiliate + dwell; Chicory-style units exist in MV ecosystem | Watch page weight vs ad RPM |

---

## Monetization stack

### Layer 1 — Display (primary at scale)

1. **Journey by Mediavine** once ≥1K Tier-1 sessions / 30 days  
2. **Mediavine Official** once ≥ **$5K** annual ad revenue  
3. Climb Programs (Select → Signature → Premiere) as revenue grows  

### Layer 2 — Affiliates (explicitly allowed with Mediavine)

Exclusivity does **not** block affiliates. Common recipe-site stack:

| Channel | Use case | Caveats |
|---|---|---|
| **Amazon Associates** | Tools, pantry, cookbooks, appliances | Disclosure FTC; don’t let heavy widgets tank Core Web Vitals; Amazon is not exclusive vs other affiliates |
| **Meal kits / grocery** (e.g. HelloFresh-class, Instacart-style) | High intent on recipe pages | Commission terms change; disclose; test vs display RPM |
| **Specialty food / kitchen brands** | Niche affiliates | Prefer text/contextual links over heavy banners |
| **Chicory / shoppable recipes** | Ingredient-to-cart | Check current MV/Chicory integration; still non-`ads.txt` commerce |

**Mediavine tip:** On pages where **affiliate RPM >> display**, disable Mediavine ads on that URL so programmatic doesn’t compete with your affiliate offer ([Ads & affiliate balance](https://prod.mediavine.com/blog/ads-and-affiliate-marketing/)).

### Layer 3 — Owned products & brand

| Offer | Fit for Uncommon Kitchen |
|---|---|
| **Digital products** (ebooks, meal plans, spice guides, batch-cook planners) | High margin; sell via email; no Mediavine conflict |
| **Membership / paid newsletter** | Recurring; complements ads |
| **Sponsored posts / brand deals** | Allowed; use Mediavine’s per-page ad disable for clean sponsorships |
| **Direct-sold ads** | Via Mediavine Direct when brands approach |

### What *not* to stack with Mediavine

- Second programmatic network / sticky “recommendation” widgets needing `ads.txt`
- Ad-supported comments (Disqus Basic)
- Side-by-side “testing” AdSense + Mediavine programmatic

---

## Risks / constraints

1. **Programmatic exclusivity** — One ads.txt controller (Mediavine). Violations risk account issues and CPM erosion.  
2. **Revenue vs old session myth** — Planning only for “50K sessions” is outdated for Official; optimize for **quality Tier-1 sessions + ad revenue**.  
3. **Geo mix** — High non-Tier-1 traffic can stall Journey approval or tank RPM even if raw sessions look fine.  
4. **Domain age** — New domains may wait ~**4 months** before Journey ads fully bid. Run Grow / build content early.  
5. **Traffic quality rejection** — Bought, incentivized, or botty traffic fails review.  
6. **Affiliate vs display conflict** — Competing product ads on affiliate posts; disable MV selectively.  
7. **Page weight** — Heavy affiliate widgets + images hurt CWV → lower SEO + lower ad viewability.  
8. **Ad density UX** — Staying at CBA max without enough content height looks spammy; long, useful recipes win both RPM and trust.  
9. **Platform risk** — Over-reliance on one channel (only Pinterest or only Google) is brittle; keep email as insurance.  
10. **Policy / Google standing** — AdSense/AdX violations can block Mediavine even at revenue threshold.

---

## Sources

### Official Mediavine / Journey

- https://www.mediavine.com/mediavine-requirements/  
- https://help.mediavine.com/what-does-it-take-to-get-approved-by-mediavine  
- https://help.mediavine.com/programs-and-the-publisher-path-to-growth  
- https://help.mediavine.com/why-mediavine-requires-exclusivity  
- https://help.mediavine.com/adjusting-your-in-content-ads  
- https://help.mediavine.com/cba-in-content-logic  
- https://help.mediavine.com/optimizing-content-for-better-seo-and-ad-performance  
- https://www.journeymv.com/getting-started-with-journey-by-mediavine/  
- https://prod.mediavine.com/blog/jump-button-positive-revenue-impact/  
- https://prod.mediavine.com/blog/recipe-card-ad-settings/  
- https://prod.mediavine.com/blog/ads-and-affiliate-marketing/  

### Recipe traffic / format (industry practice)

- https://bootstrapped.ventures/food-blog-content-strategy/  
- https://bootstrapped.ventures/growing-food-blog-audience/  
- https://84pins.com/pinterest-marketing-for-food-bloggers/  
- https://www.jupiter.co/blog/pinterest-for-food-bloggers  
- https://www.jupiter.co/blog/recipe-schema-markup-food-blog-rich-results  
- https://www.foodbloggerpro.com/podcast/jeanelle-castro-youtube/  
- https://aurorawptheme.com/recipe-card-plugin-setup/  

---

## Quick reference for Uncommon Kitchen

| Milestone | Target |
|---|---|
| Journey apply | **1,000** Tier-1 sessions in 30 days + Grow live ~30 days + ~4 mo domain |
| Official apply | **$5,000+** annual ad revenue + clean traffic/UX |
| Display exclusivity | Mediavine owns programmatic; affiliates/sponsors/direct OK |
| Ad density | ≤ **30%** ads (CBA); aim ~**28%** mobile / ~**20–25%** desktop |

*Figures reflect public Mediavine/Journey docs and Help Center pages retrieved mid-September 2026. Always re-check requirements pages before applying — thresholds and program names can change.*
