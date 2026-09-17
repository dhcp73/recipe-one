export type Season = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  /** Matches Recipe.dietOccasion tags */
  tags: string[];
  emoji?: string;
};

export const seasons: Season[] = [
  {
    slug: "halloween",
    label: "Halloween",
    shortLabel: "Halloween",
    description:
      "Spooky-but-grown-up plates for late October — black cocoa, charred squash, and party-ready snacks with clear home-cook cues.",
    tags: ["halloween"],
  },
  {
    slug: "bonfire-night",
    label: "Bonfire Night",
    shortLabel: "Bonfire",
    description:
      "Guy Fawkes warmth: sticky ginger, smoky beans, and fireside comfort you can cook on a weeknight hob.",
    tags: ["bonfire-night"],
  },
  {
    slug: "diwali",
    label: "Diwali",
    shortLabel: "Diwali",
    description:
      "Festival of Lights sweets and savoury sharers — barfi, shrikhand, chaat crisps, and flatbreads with beginner sensory cues.",
    tags: ["diwali"],
  },
  {
    slug: "thanksgiving",
    label: "Thanksgiving & Friendsgiving",
    shortLabel: "Thanksgiving",
    description:
      "Table sides and sharers for late November — maple-miso squash, bright relishes, and Friendsgiving-friendly plates.",
    tags: ["thanksgiving", "friendsgiving"],
  },
  {
    slug: "christmas",
    label: "Christmas",
    shortLabel: "Christmas",
    description:
      "December centrepieces and edible gifts — pavlova wreaths, snow cookies, and festive relishes without the fuss.",
    tags: ["christmas"],
  },
];

export function getSeason(slug: string): Season | undefined {
  return seasons.find((s) => s.slug === slug);
}

export function getAllSeasonSlugs(): string[] {
  return seasons.map((s) => s.slug);
}

/** First matching festive season for badges / filters. */
export function getRecipeSeasonTags(dietOccasion: string[]): Season[] {
  return seasons.filter((season) =>
    season.tags.some((tag) => dietOccasion.includes(tag)),
  );
}
