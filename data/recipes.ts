import { festiveRecipes } from "./festive-recipes";

export type Ingredient = {
  id: string;
  qty?: number;
  text: string;
};

export type IngredientGroup = {
  label: string;
  items: Ingredient[];
};

export type RecipeStep = {
  title: string;
  body: string;
  tip?: string;
  /** Short sensory checkpoint: what success looks/smells/sounds like. */
  visualCue?: string;
  /** Optional still for this step (WebP/JPEG URL or public path). */
  image?: string;
  /** Alt text when `image` is set. */
  imageAlt?: string;
  /** Optional short muted MP4/WebM loop (preferred over GIF). */
  videoUrl?: string;
  /** Optional GIF when video is unavailable. */
  gifUrl?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  shortTitle?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  caption?: string;
  rating: number;
  ratingCount: number;
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes: number;
  servings: number;
  publishedAt: string;
  author: string;
  continents: string[];
  countries: string[];
  types: string[];
  dietOccasion: string[];
  filterTags: Array<"time" | "diet" | "technique" | "ai-video">;
  badges: string[];
  whyItWorks: string[];
  ingredientGroups: IngredientGroup[];
  steps: RecipeStep[];
  equipment: string[];
  shopGear: Array<{ title: string; blurb: string; href: string }>;
  featured?: boolean;
};

function formatDuration(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function formatRecipeMeta(recipe: Recipe): string {
  return `${recipe.rating.toFixed(1)} · ${formatDuration(recipe.totalMinutes)}`;
}

export function formatClock(mins: number): string {
  if (mins < 60) return `${mins} mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} mins`;
}

export const recipes: Recipe[] = [
  {
    slug: "smoked-honey-duck-with-fermented-plum",
    title: "Smoked Honey Duck with Fermented Plum",
    shortTitle: "Smoked Honey Duck",
    excerpt:
      "Crisp-skinned smoked duck glazed with wildflower honey and served with a sharp fermented plum relish. Every step is written for a home cook — exact cues, thermometer targets, and what to do if something goes sideways.",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Roasted duck breast plated with fruit relish",
    caption: "Crisp skin, rosy medium-rare interior, sharp plum relish.",
    rating: 4.8,
    ratingCount: 127,
    prepMinutes: 25,
    cookMinutes: 70,
    totalMinutes: 95,
    servings: 2,
    publishedAt: "2026-09-04",
    author: "Uncommon Kitchen",
    continents: ["asia", "europe"],
    countries: ["china", "france"],
    types: ["dinner", "mains"],
    dietOccasion: ["high-protein", "for-two", "weekend-project", "autumn", "holiday-table"],
    filterTags: ["technique", "ai-video", "time"],
    badges: ["Technique", "AI video"],
    featured: true,
    whyItWorks: [
      "Starting the duck skin-side down in a cold pan renders fat slowly, so the skin crisps without burning.",
      "A brief uncovered fridge rest after seasoning dries the surface further — moisture is the enemy of crackling skin.",
      "Honey goes on after the flip so sugars don’t scorch.",
      "Fermented plum relish cuts the richness with acid and salt; a touch of brown sugar keeps it balanced.",
      "Optional stovetop wood-chip smoke (or smoked salt) adds aroma without a dedicated smoker.",
    ],
    ingredientGroups: [
      {
        label: "For the duck",
        items: [
          { id: "d1", qty: 2, text: "duck breasts, skin-on (about 200–225g / 7–8 oz each)" },
          { id: "d2", qty: 0.5, text: "tsp fine sea salt, plus more to taste" },
          { id: "d3", qty: 0.25, text: "tsp freshly ground black pepper" },
          { id: "d4", qty: 1, text: "tsp smoked paprika" },
          { id: "d5", qty: 1, text: "tbsp neutral oil or duck fat" },
          { id: "d6", text: "Optional: handful apple or cherry wood chips, soaked" },
        ],
      },
      {
        label: "For the glaze",
        items: [{ id: "g1", qty: 2, text: "tbsp wildflower honey" }],
      },
      {
        label: "For the fermented plum relish",
        items: [
          { id: "p1", qty: 200, text: "g / 7 oz fermented plums, drained and roughly chopped" },
          { id: "p2", qty: 1, text: "small shallot, finely minced" },
          { id: "p3", qty: 1, text: "tsp rice vinegar (or apple cider vinegar)" },
          { id: "p4", qty: 1, text: "tsp light brown sugar" },
          { id: "p5", text: "Handful soft herbs (parsley or chives), chopped" },
        ],
      },
    ],
    steps: [
      {
        title: "Dry, score, and season",
        body: "Pat the duck breasts thoroughly dry. Score the skin in a shallow crosshatch through fat only. Season with salt, pepper, and smoked paprika. Rest uncovered in the fridge 30–60 minutes if you can.",
        tip: "If you see pink meat while scoring, stop — pale fat opening is enough.",
      },
      {
        title: "Render the skin from a cold pan",
        body: "Place breasts skin-side down in a cold, dry heavy skillet. Medium heat 8–10 minutes, pouring off fat, until skin is deep golden.",
        tip: "Steady gentle sizzle, not a hard fry. Don’t peek early.",
      },
      {
        title: "Flip, glaze, and finish to temperature",
        body: "Flip. Brush skin with half the honey. Cook 3–4 minutes to 57°C / 135°F. Rest 8 minutes under loose foil.",
        tip: "Honey only after the flip — sugars burn fast.",
      },
      {
        title: "Make the plum relish",
        body: "Mix plums, shallot, vinegar, brown sugar, remaining honey, pinch of salt. Fold in herbs before plating.",
        tip: "Salty plums? Rinse briefly. Flat relish? More vinegar, not sugar.",
      },
      {
        title: "Optional smoke, then slice and serve",
        body: "Foil pouch of soaked chips; smoke duck skin-up 3–4 minutes. Slice against the grain; serve with relish.",
        tip: "No chips? A pinch of smoked salt works.",
      },
    ],
    equipment: [
      'Cast-iron skillet, 10–12"',
      "Instant-read thermometer",
      "Apple or cherry wood chips (optional smoke)",
      "Sharp knife, tongs, foil for resting",
    ],
    shopGear: [
      {
        title: "Instant-read thermometer",
        blurb: "Pull duck at the right temp every time.",
        href: "https://www.amazon.com",
      },
      {
        title: 'Cast-iron skillet, 10"',
        blurb: "Even heat for rendering duck skin.",
        href: "https://www.amazon.com",
      },
      {
        title: "Stovetop smoker chips",
        blurb: "Mild apple or cherry for a light smoke.",
        href: "https://www.amazon.com",
      },
    ],
  },
  {
    slug: "black-garlic-miso-chicken-thighs",
    title: "Black Garlic Miso Chicken Thighs",
    excerpt:
      "Sticky-savory thighs glazed with black garlic and white miso — weeknight-friendly with restaurant depth.",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Glazed chicken thighs on a plate",
    rating: 4.9,
    ratingCount: 98,
    prepMinutes: 15,
    cookMinutes: 40,
    totalMinutes: 55,
    servings: 4,
    publishedAt: "2026-08-22",
    author: "Uncommon Kitchen",
    continents: ["asia"],
    countries: ["japan", "korea"],
    types: ["dinner", "mains"],
    dietOccasion: ["high-protein", "weeknight", "meal-prep", "gluten-free"],
    filterTags: ["time", "diet"],
    badges: ["Under 1 hr"],
    featured: true,
    whyItWorks: [
      "Black garlic adds molasses depth without burning like fresh garlic.",
      "Miso browns into a lacquer that sticks to skin-on thighs.",
      "A brief broil finish crisps edges without drying the meat.",
    ],
    ingredientGroups: [
      {
        label: "Chicken & marinade",
        items: [
          { id: "c1", qty: 8, text: "bone-in, skin-on chicken thighs" },
          { id: "c2", qty: 3, text: "tbsp white miso" },
          { id: "c3", qty: 4, text: "cloves black garlic, mashed" },
          { id: "c4", qty: 2, text: "tbsp mirin or honey" },
          { id: "c5", qty: 1, text: "tbsp neutral oil" },
        ],
      },
    ],
    steps: [
      {
        title: "Mix the glaze",
        body: "Mash black garlic into miso with mirin and oil until spreadable.",
        tip: "Too thick? A teaspoon of water loosens it.",
      },
      {
        title: "Coat and roast",
        body: "Pat thighs dry, season lightly, coat with glaze. Roast at 200°C / 400°F for 35–40 minutes.",
        tip: "Skin up the whole time for better browning.",
      },
      {
        title: "Broil and rest",
        body: "Broil 1–2 minutes until lacquered. Rest 5 minutes before serving.",
        tip: "Watch closely — miso sugars go from perfect to bitter fast.",
      },
    ],
    equipment: ["Sheet pan", "Instant-read thermometer"],
    shopGear: [
      {
        title: "White miso paste",
        blurb: "Mild and versatile for glazes and dressings.",
        href: "https://www.amazon.com",
      },
    ],
  },
  {
    slug: "charred-cabbage-with-brown-butter-anchovy",
    title: "Charred Cabbage with Brown Butter Anchovy",
    excerpt:
      "Wedges of cabbage seared hard, then glossed with brown butter, anchovy, and lemon — a side that steals the plate.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Charred cabbage salad bowl",
    rating: 4.7,
    ratingCount: 64,
    prepMinutes: 10,
    cookMinutes: 30,
    totalMinutes: 40,
    servings: 4,
    publishedAt: "2026-08-10",
    author: "Uncommon Kitchen",
    continents: ["europe"],
    countries: ["italy", "uk"],
    types: ["sides", "dinner", "lunch"],
    dietOccasion: ["gluten-free", "low-carb", "weeknight", "vegetarian"],
    filterTags: ["diet", "time"],
    badges: ["Diet-flexible"],
    featured: true,
    whyItWorks: [
      "High heat creates Maillard char that sweetens cabbage.",
      "Anchovy melts into brown butter for umami without fishiness.",
      "Lemon at the end keeps the richness bright.",
    ],
    ingredientGroups: [
      {
        label: "Cabbage",
        items: [
          { id: "cb1", qty: 1, text: "small green cabbage, cut into 8 wedges" },
          { id: "cb2", qty: 3, text: "tbsp unsalted butter" },
          { id: "cb3", qty: 4, text: "anchovy fillets (optional for vegetarian: 1 tsp miso)" },
          { id: "cb4", qty: 1, text: "lemon, zest and juice" },
        ],
      },
    ],
    steps: [
      {
        title: "Char the wedges",
        body: "Oil a hot skillet. Sear cabbage cut-sides until deep brown, 4–5 minutes per side. Transfer to a tray and finish in a 200°C oven if needed.",
        tip: "Don’t move them early — color is flavor.",
      },
      {
        title: "Make brown butter anchovy",
        body: "Melt butter until nutty. Stir in chopped anchovy off heat, then lemon zest and juice.",
        tip: "Vegetarian? Swap anchovy for white miso.",
      },
      {
        title: "Dress and serve",
        body: "Spoon sauce over cabbage. Finish with black pepper and soft herbs.",
      },
    ],
    equipment: ["Heavy skillet", "Sheet pan"],
    shopGear: [],
  },
  {
    slug: "slow-roasted-tomatoes-with-chili-oil-labneh",
    title: "Slow-Roasted Tomatoes with Chili Oil Labneh",
    excerpt:
      "Jammy tomatoes over cool labneh with chili oil — a vegetarian plate built on contrast.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Tomato salad with creamy base",
    rating: 4.8,
    ratingCount: 81,
    prepMinutes: 15,
    cookMinutes: 65,
    totalMinutes: 80,
    servings: 4,
    publishedAt: "2026-07-28",
    author: "Uncommon Kitchen",
    continents: ["asia", "europe"],
    countries: ["lebanon", "greece"],
    types: ["sides", "lunch", "breakfast"],
    dietOccasion: ["vegetarian", "gluten-free", "summer", "spring", "for-two"],
    filterTags: ["diet", "technique"],
    badges: ["Vegetarian"],
    featured: true,
    whyItWorks: [
      "Low oven concentrates tomato sugars without steaming.",
      "Labneh’s tang cools chili heat.",
      "Chili oil blooms aromatics in fat so spice tastes rounded, not sharp.",
    ],
    ingredientGroups: [
      {
        label: "Tomatoes & labneh",
        items: [
          { id: "t1", qty: 800, text: "g ripe tomatoes, halved" },
          { id: "t2", qty: 300, text: "g labneh or thick Greek yogurt" },
          { id: "t3", qty: 3, text: "tbsp chili oil" },
          { id: "t4", qty: 2, text: "tbsp olive oil" },
          { id: "t5", text: "Flaky salt, herbs" },
        ],
      },
    ],
    steps: [
      {
        title: "Slow-roast the tomatoes",
        body: "Toss tomatoes with olive oil and salt. Roast at 150°C / 300°F for about 1 hour until collapsed and jammy.",
        tip: "Leave space on the tray so they roast, not steam.",
      },
      {
        title: "Plate with labneh",
        body: "Spread labneh on a platter. Top with warm tomatoes and chili oil. Finish with herbs.",
      },
    ],
    equipment: ["Sheet pan"],
    shopGear: [],
  },
  {
    slug: "crispy-pork-belly-with-apple-kimchi",
    title: "Crispy Pork Belly with Apple Kimchi",
    excerpt:
      "Shatter-crisp pork belly with a bright apple kimchi that cuts the fat — a weekend project worth the wait.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f9cff55032?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Crispy pork belly slices",
    rating: 4.9,
    ratingCount: 112,
    prepMinutes: 30,
    cookMinutes: 105,
    totalMinutes: 135,
    servings: 6,
    publishedAt: "2026-07-12",
    author: "Uncommon Kitchen",
    continents: ["asia"],
    countries: ["korea", "china"],
    types: ["dinner", "mains"],
    dietOccasion: ["high-protein", "weekend-project", "festivals", "holiday-table", "dairy-free"],
    filterTags: ["technique", "ai-video"],
    badges: ["AI video", "Technique"],
    featured: true,
    whyItWorks: [
      "A dry fridge rest dehydrates the skin for better crackling.",
      "Starting hot then dropping the oven renders fat without burning.",
      "Apple kimchi brings sweet acid that resets the palate between bites.",
    ],
    ingredientGroups: [
      {
        label: "Pork",
        items: [
          { id: "pb1", qty: 1.2, text: "kg skin-on pork belly" },
          { id: "pb2", qty: 2, text: "tsp fine salt for the skin" },
          { id: "pb3", qty: 1, text: "tbsp neutral oil" },
        ],
      },
      {
        label: "Apple kimchi",
        items: [
          { id: "ak1", qty: 2, text: "crisp apples, julienned" },
          { id: "ak2", qty: 1, text: "tbsp gochugaru" },
          { id: "ak3", qty: 1, text: "tsp fish sauce or soy" },
          { id: "ak4", qty: 1, text: "tsp sugar" },
        ],
      },
    ],
    steps: [
      {
        title: "Prep and dry the belly",
        body: "Score skin, salt heavily on skin only, and refrigerate uncovered overnight if possible.",
        tip: "Moisture is the enemy of crackling.",
      },
      {
        title: "Roast for crackling",
        body: "Oil the skin. Roast at 230°C / 450°F for 30 minutes, then 160°C / 325°F for 60–75 minutes until tender.",
        tip: "If skin softens, finish under the broiler briefly.",
      },
      {
        title: "Toss apple kimchi",
        body: "Mix apples with gochugaru, fish sauce, and sugar. Rest 20 minutes. Slice pork and serve.",
      },
    ],
    equipment: ["Sheet pan", "Sharp knife"],
    shopGear: [],
  },
  {
    slug: "mushroom-confit-toast-with-soft-egg",
    title: "Mushroom Confit Toast with Soft Egg",
    excerpt:
      "Mushrooms slowly confited in olive oil until silky, piled on toast with a jammy egg.",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Egg and mushroom toast",
    rating: 4.6,
    ratingCount: 53,
    prepMinutes: 10,
    cookMinutes: 35,
    totalMinutes: 45,
    servings: 2,
    publishedAt: "2026-06-30",
    author: "Uncommon Kitchen",
    continents: ["europe"],
    countries: ["france", "uk"],
    types: ["breakfast", "lunch", "snacks"],
    dietOccasion: ["vegetarian", "for-two", "weeknight", "spring"],
    filterTags: ["time", "diet"],
    badges: ["Under 1 hr"],
    featured: true,
    whyItWorks: [
      "Gentle oil heat concentrates mushroom flavor without evaporating aromatics.",
      "A soft egg adds richness that ties toast and mushrooms together.",
      "Acid (vinegar or lemon) at the end keeps the plate from tasting heavy.",
    ],
    ingredientGroups: [
      {
        label: "Confit & toast",
        items: [
          { id: "m1", qty: 400, text: "g mixed mushrooms, torn" },
          { id: "m2", qty: 120, text: "ml olive oil" },
          { id: "m3", qty: 2, text: "garlic cloves, smashed" },
          { id: "m4", qty: 2, text: "thick slices sourdough" },
          { id: "m5", qty: 2, text: "eggs" },
        ],
      },
    ],
    steps: [
      {
        title: "Confit the mushrooms",
        body: "Combine mushrooms, oil, garlic, and a pinch of salt in a small pot. Cook gently 25–30 minutes until silky.",
        tip: "Barely a simmer — no hard bubbling.",
      },
      {
        title: "Toast and soft-cook eggs",
        body: "Toast bread. Soft-boil or fry eggs to jammy yolks.",
      },
      {
        title: "Assemble",
        body: "Pile mushrooms on toast with a little confit oil. Top with egg, herbs, and a splash of vinegar.",
      },
    ],
    equipment: ["Small saucepan"],
    shopGear: [],
  },
  ...festiveRecipes,
];

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getAllRecipeSlugs(): string[] {
  return recipes.map((r) => r.slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return recipes.filter((r) => r.featured);
}

export function getRecipesByCategory(pillar: string, slug: string): Recipe[] {
  return recipes.filter((r) => {
    if (pillar === "continent") return r.continents.includes(slug);
    if (pillar === "country") return r.countries.includes(slug);
    if (pillar === "type") return r.types.includes(slug);
    if (pillar === "diet-occasion") return r.dietOccasion.includes(slug);
    return false;
  });
}


export function getRecipesBySeasonTags(tags: string[]): Recipe[] {
  const set = new Set(tags);
  return recipes.filter((r) => r.dietOccasion.some((t) => set.has(t)));
}

export function formatQty(n: number): string {
  if (n === 0.25) return "¼";
  if (n === 0.5) return "½";
  if (n === 0.75) return "¾";
  if (Math.abs(n - Math.round(n)) < 0.01) return String(Math.round(n));
  return String(Math.round(n * 100) / 100);
}
