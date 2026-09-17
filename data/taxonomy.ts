export type PillarId = "continent" | "country" | "type" | "diet-occasion";

export type TaxonomySlug = {
  slug: string;
  label: string;
  continent?: string;
  description?: string;
};

export type TaxonomyGroup = {
  id: string;
  label: string;
  slugs: TaxonomySlug[];
};

export type Pillar = {
  id: PillarId;
  label: string;
  path: string;
  blurb: string;
  slugs?: TaxonomySlug[];
  groups?: TaxonomyGroup[];
};

export const SITE_NAME = "Uncommon Kitchen";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uncommonkitchen.com";
export const BRAND_TEAL = "#0F6B5C";

export const pillars: Pillar[] = [
  {
    id: "continent",
    label: "Continent",
    path: "/categories/continent",
    blurb: "Cook by world region — Africa, Asia, Europe, the Americas, and Oceania.",
    slugs: [
      { slug: "africa", label: "Africa", description: "North African spice routes to Southern braises and coastal stews." },
      { slug: "asia", label: "Asia", description: "From Japanese precision to Thai heat and Indian layering." },
      { slug: "europe", label: "Europe", description: "French technique, Italian pantry cooking, and Mediterranean clarity." },
      { slug: "north-america", label: "North America", description: "Regional American plates and Mexican technique." },
      { slug: "south-america", label: "South America", description: "Brazilian churrasco energy and Andean staples." },
      { slug: "oceania", label: "Oceania", description: "Pacific seafood, grilled produce, and bright acid." },
    ],
  },
  {
    id: "country",
    label: "Country",
    path: "/categories/country",
    blurb: "Representative cuisines with a clear link back to their continent.",
    slugs: [
      { slug: "india", label: "India", continent: "asia" },
      { slug: "japan", label: "Japan", continent: "asia" },
      { slug: "china", label: "China", continent: "asia" },
      { slug: "thailand", label: "Thailand", continent: "asia" },
      { slug: "korea", label: "Korea", continent: "asia" },
      { slug: "vietnam", label: "Vietnam", continent: "asia" },
      { slug: "lebanon", label: "Lebanon", continent: "asia" },
      { slug: "italy", label: "Italy", continent: "europe" },
      { slug: "france", label: "France", continent: "europe" },
      { slug: "spain", label: "Spain", continent: "europe" },
      { slug: "uk", label: "UK", continent: "europe" },
      { slug: "greece", label: "Greece", continent: "europe" },
      { slug: "mexico", label: "Mexico", continent: "north-america" },
      { slug: "usa", label: "USA", continent: "north-america" },
      { slug: "brazil", label: "Brazil", continent: "south-america" },
      { slug: "morocco", label: "Morocco", continent: "africa" },
    ],
  },
  {
    id: "type",
    label: "Food type",
    path: "/categories/type",
    blurb: "Meal moments and dish forms — breakfast through sauces.",
    slugs: [
      { slug: "breakfast", label: "Breakfast" },
      { slug: "lunch", label: "Lunch" },
      { slug: "dinner", label: "Dinner" },
      { slug: "dessert", label: "Dessert" },
      { slug: "snacks", label: "Snacks" },
      { slug: "drinks", label: "Drinks" },
      { slug: "mains", label: "Mains" },
      { slug: "sides", label: "Sides" },
      { slug: "soups-stews", label: "Soups & Stews" },
      { slug: "breads-baking", label: "Breads & Baking" },
      { slug: "salads", label: "Salads" },
      { slug: "sauces", label: "Sauces" },
    ],
  },
  {
    id: "diet-occasion",
    label: "Diet & occasion",
    path: "/categories/diet-occasion",
    blurb: "Dietary needs, who you are cooking for, and when you are cooking.",
    groups: [
      {
        id: "diet",
        label: "Diet",
        slugs: [
          { slug: "vegan", label: "Vegan" },
          { slug: "vegetarian", label: "Vegetarian" },
          { slug: "gluten-free", label: "Gluten-Free" },
          { slug: "dairy-free", label: "Dairy-Free" },
          { slug: "high-protein", label: "High-Protein" },
          { slug: "low-carb", label: "Low-Carb" },
        ],
      },
      {
        id: "people",
        label: "People",
        slugs: [
          { slug: "for-kids", label: "For Kids" },
          { slug: "for-elders", label: "For Elders" },
          { slug: "for-two", label: "For Two" },
          { slug: "meal-prep", label: "Meal Prep" },
        ],
      },
      {
        id: "season-occasion",
        label: "Season & occasion",
        slugs: [
          { slug: "summer", label: "Summer" },
          { slug: "winter", label: "Winter" },
          { slug: "spring", label: "Spring" },
          { slug: "autumn", label: "Autumn" },
          { slug: "festivals", label: "Festivals" },
          { slug: "weeknight", label: "Weeknight" },
          { slug: "weekend-project", label: "Weekend Project" },
          { slug: "holiday-table", label: "Holiday Table" },
          { slug: "halloween", label: "Halloween" },
          { slug: "bonfire-night", label: "Bonfire Night" },
          { slug: "diwali", label: "Diwali" },
          { slug: "thanksgiving", label: "Thanksgiving" },
          { slug: "friendsgiving", label: "Friendsgiving" },
          { slug: "christmas", label: "Christmas" },
        ],
      },
    ],
  },
];

export function getPillar(id: string): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}

export function isPillarId(id: string): id is PillarId {
  return pillars.some((p) => p.id === id);
}

export function getPillarSlugs(pillar: Pillar): TaxonomySlug[] {
  if (pillar.slugs) return pillar.slugs;
  if (pillar.groups) return pillar.groups.flatMap((g) => g.slugs);
  return [];
}

export function getCategorySlug(pillarId: string, slug: string): TaxonomySlug | undefined {
  const pillar = getPillar(pillarId);
  if (!pillar) return undefined;
  return getPillarSlugs(pillar).find((s) => s.slug === slug);
}

export const popularChips = [
  { label: "Breakfast", href: "/categories/type/breakfast" },
  { label: "Vegan", href: "/categories/diet-occasion/vegan" },
  { label: "India", href: "/categories/country/india" },
  { label: "Halloween", href: "/seasons/halloween" },
  { label: "Diwali", href: "/seasons/diwali" },
  { label: "Christmas", href: "/seasons/christmas" },
];

export const countryMegaGroups = [
  {
    label: "Asia",
    slugs: ["india", "japan", "china", "thailand", "korea", "vietnam", "lebanon"],
  },
  {
    label: "Europe",
    slugs: ["italy", "france", "spain", "uk", "greece"],
  },
  {
    label: "Americas & Africa",
    slugs: ["mexico", "usa", "brazil", "morocco"],
  },
];
