export type Product = {
  id: string;
  title: string;
  category: "gear" | "kits" | "books" | "gift";
  categoryLabel: string;
  emoji: string;
  why: string;
  price: number;
  rating: number;
  amazonUrl: string;
};

export const products: Product[] = [
  {
    id: "thermometer",
    title: "Instant-read thermometer",
    category: "gear",
    categoryLabel: "Gear",
    emoji: "🌡️",
    why: "Pull meat at the right temp every time — the single most useful upgrade.",
    price: 29,
    rating: 4.9,
    amazonUrl: "https://www.amazon.com",
  },
  {
    id: "cast-iron",
    title: 'Cast-iron skillet, 10"',
    category: "gear",
    categoryLabel: "Gear",
    emoji: "🍳",
    why: "Even heat for searing, rendering duck skin, and weeknight steaks.",
    price: 45,
    rating: 4.8,
    amazonUrl: "https://www.amazon.com",
  },
  {
    id: "duck-kit",
    title: "Duck glaze & plum starter",
    category: "kits",
    categoryLabel: "Kit",
    emoji: "🍯",
    why: "Wildflower honey, smoked paprika pack, and fermented plum notes for the relish.",
    price: 22,
    rating: 4.7,
    amazonUrl: "https://www.amazon.com",
  },
  {
    id: "smoker-chips",
    title: "Stovetop smoker chips",
    category: "gear",
    categoryLabel: "Gear",
    emoji: "🔥",
    why: "Mild apple or cherry — light smoke without a dedicated smoker.",
    price: 12,
    rating: 4.5,
    amazonUrl: "https://www.amazon.com",
  },
  {
    id: "technique-notebook",
    title: "Technique notebook",
    category: "books",
    categoryLabel: "Books",
    emoji: "📖",
    why: "Printable why-it-works sheets and temp charts for the recipes you cook most.",
    price: 18,
    rating: 4.6,
    amazonUrl: "https://www.amazon.com",
  },
  {
    id: "gift-box",
    title: "Host gift box",
    category: "gift",
    categoryLabel: "Gift",
    emoji: "🎁",
    why: "Honey, finishing salt, and a recipe card — ready to wrap.",
    price: 36,
    rating: 4.8,
    amazonUrl: "https://www.amazon.com",
  },
];

export const featuredKit = {
  title: "Cook this recipe kit",
  blurb:
    "Everything for Smoked Honey Duck — thermometer cue card, wood chips, honey glaze jar notes, and plum relish starter.",
  price: 48,
};
