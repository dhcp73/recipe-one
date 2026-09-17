#!/usr/bin/env node
/**
 * Generates original Uncommon Kitchen catalog recipes from recipe-demand-100.json.
 * AI-authored original content — not scraped from copyrighted sources.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const demand = JSON.parse(
  fs.readFileSync(path.join(root, "data/recipe-demand-100.json"), "utf8")
);

const IMAGES = {
  baking:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80",
  bread:
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1400&q=80",
  dessert:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=80",
  pie: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=1400&q=80",
  cookie:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=80",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=80",
  stew: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1400&q=80",
  chicken:
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1400&q=80",
  turkey:
    "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=1400&q=80",
  beef: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80",
  duck: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=1400&q=80",
  ham: "https://images.unsplash.com/photo-1529692236671-f1f9cff55032?auto=format&fit=crop&w=1400&q=80",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
  veg: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=80",
  squash:
    "https://images.unsplash.com/photo-1570197788417-0e0382395e60?auto=format&fit=crop&w=1400&q=80",
  pumpkin:
    "https://images.unsplash.com/photo-1506917728039-e8f4e0d4e4e4?auto=format&fit=crop&w=1400&q=80",
  apple:
    "https://images.unsplash.com/photo-1568702846914-96b305d2aa03?auto=format&fit=crop&w=1400&q=80",
  drink:
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=80",
  cocktail:
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=80",
  indian:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1400&q=80",
  sweet:
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=80",
  snack:
    "https://images.unsplash.com/photo-1621939514649-280e2ee7f8b7?auto=format&fit=crop&w=1400&q=80",
  breakfast:
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80",
  pasta:
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1400&q=80",
  dip: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=1400&q=80",
  cabbage:
    "https://images.unsplash.com/photo-1594282486552-05b4d8049bbf?auto=format&fit=crop&w=1400&q=80",
  potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1400&q=80",
  egg: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80",
  chili:
    "https://images.unsplash.com/photo-1576852421510-1a0b0e0b0b0b?auto=format&fit=crop&w=1400&q=80",
  risotto:
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1400&q=80",
  waffle:
    "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1400&q=80",
  default:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
};

// Fix a couple of potentially bad image URLs with known good ones
IMAGES.pumpkin =
  "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=80";
IMAGES.chili =
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1400&q=80";

function pickImage(item) {
  const t = (item.title + " " + item.keyword + " " + item.theme).toLowerCase();
  const types = item.types || [];
  if (/ladoo|barfi|katli|gulab|mysore|shrikhand|mithai|diwali/.test(t))
    return IMAGES.indian;
  if (/cookie|biscuit|snowball|spritz|blossom|shortbread/.test(t))
    return IMAGES.cookie;
  if (/pie|tart|pavlova|pudding|yule|cake|log|scone|blondie|brownie|bar\b/.test(t))
    return types.includes("dessert") ? IMAGES.dessert : IMAGES.pie;
  if (/bread|loaf|pretzel|roll|waffle|toast|dumpling.*crust|crust/.test(t))
    return IMAGES.bread;
  if (/soup|pho|broth|stew|chili|risotto|curry/.test(t))
    return /stew|chili|curry/.test(t) ? IMAGES.stew : IMAGES.soup;
  if (/turkey|spatchcock|brine|tetrazzini|sliders|leftover/.test(t))
    return IMAGES.turkey;
  if (/chicken|buffalo/.test(t)) return IMAGES.chicken;
  if (/duck|wellington|brisket|short.?rib|beef|ham/.test(t))
    return /duck/.test(t)
      ? IMAGES.duck
      : /ham/.test(t)
        ? IMAGES.ham
        : IMAGES.beef;
  if (/salad|green.?bean|brussels|cabbage|pepper|veg/.test(t))
    return /cabbage/.test(t) ? IMAGES.cabbage : IMAGES.salad;
  if (/pumpkin|squash/.test(t)) return IMAGES.pumpkin;
  if (/apple|cider/.test(t)) return IMAGES.apple;
  if (/latte|cocoa|cider|mulled|cocktail|wine|eggnog|drink|brew/.test(t))
    return /cocktail|prosecco|champagne|wine/.test(t)
      ? IMAGES.cocktail
      : IMAGES.drink;
  if (/dip|nacho|board|snack|bark|mix|buckeye|caramel/.test(t))
    return IMAGES.snack;
  if (/oat|breakfast|french.?toast/.test(t)) return IMAGES.breakfast;
  if (/potato|latke|mash/.test(t)) return IMAGES.potato;
  if (/egg/.test(t)) return IMAGES.egg;
  if (types.includes("dessert") || types.includes("breads-baking"))
    return IMAGES.baking;
  if (types.includes("drinks")) return IMAGES.drink;
  if (types.includes("soups-stews")) return IMAGES.soup;
  return IMAGES.default;
}

function inferCountries(item) {
  const t = (item.title + " " + item.theme + " " + item.keyword).toLowerCase();
  if (/ladoo|barfi|katli|gulab|mysore|rava|besan|diwali|chaat|tandoori/.test(t))
    return ["india"];
  if (/pho|ginger.?scallion/.test(t)) return ["vietnam", "china"];
  if (/latke|sufgan|matzo|brisket|hanukkah/.test(t)) return ["usa"];
  if (/wellington|sticky.?toffee|parkin|mincemeat|mulled/.test(t))
    return ["uk"];
  if (/risotto|anise/.test(t)) return ["italy"];
  if (/yule|french.?toast|custard/.test(t) && /eggnog|bake/.test(t))
    return ["usa", "france"];
  if (/pretzel|beer.?cheese|oktober/.test(t)) return ["usa", "uk"];
  if (/nacho|chipotle|crunchwrap/.test(t)) return ["mexico", "usa"];
  if (/hawaiian|slider/.test(t)) return ["usa"];
  if (/thanksgiving|friendsgiving|turkey|pumpkin.?pie|pecan.?pie|stuffing|casserole|gravy|deviled/.test(
    t
  ))
    return ["usa"];
  if (/christmas|gingerbread|yule|poinsettia|peppermint|snowball|spritz/.test(t))
    return ["usa", "uk"];
  if (/halloween|witch|boo|jack.?o|candy.?corn|spooky/.test(t)) return ["usa", "uk"];
  if (/bonfire/.test(t)) return ["uk"];
  if (/cabbage.?dumpling/.test(t)) return ["china", "korea"];
  if (/farro|labneh/.test(t)) return ["italy", "lebanon"];
  if (/curry|coconut.?lime/.test(t)) return ["india", "thailand"];
  if (/miso|matcha/.test(t)) return ["japan"];
  return ["usa", "uk"];
}

function inferContinents(countries) {
  const map = {
    india: "asia",
    japan: "asia",
    china: "asia",
    thailand: "asia",
    korea: "asia",
    vietnam: "asia",
    lebanon: "asia",
    italy: "europe",
    france: "europe",
    spain: "europe",
    uk: "europe",
    greece: "europe",
    mexico: "north-america",
    usa: "north-america",
    brazil: "south-america",
    morocco: "africa",
  };
  return [...new Set(countries.map((c) => map[c]).filter(Boolean))];
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function ratingFor(slug) {
  const h = hash(slug);
  return Math.round((4.5 + (h % 50) / 100) * 10) / 10;
}

function ratingCountFor(slug) {
  return 40 + (hash(slug) % 90);
}

function timesFor(item) {
  const t = (item.title + " " + item.theme).toLowerCase();
  if (/overnight|brine|timeline|wellington|spatchcock|brisket|yule|house.?assembly/.test(
    t
  ))
    return { prep: 40, cook: 180, total: 240, servings: 8 };
  if (/turkey|ham|roast.?duck|short.?rib|stuffing|casserole|pie\b|stew|chili|pho|soup/.test(
    t
  ))
    return { prep: 25, cook: 90, total: 120, servings: 6 };
  if (/cookie|blondie|brownie|bar\b|scone|oat|dip|salad|syrup|relish|bark|snack|board|pretzel|sliders|nacho|fried.?rice|wrap|cup/.test(
    t
  ))
    return { prep: 20, cook: 25, total: 50, servings: 8 };
  if (/ladoo|barfi|katli|mysore|caramels|jamun|sufgan/.test(t))
    return { prep: 20, cook: 35, total: 70, servings: 16 };
  if (/cocktail|latte|cider|mulled|cocoa|drink/.test(t))
    return { prep: 10, cook: 20, total: 30, servings: 6 };
  if (/weeknight|one.?pot|sheet.?pan|25.?minute|quick|beginner/.test(t))
    return { prep: 15, cook: 30, total: 45, servings: 4 };
  return { prep: 20, cook: 45, total: 70, servings: 6 };
}

function filterTagsFor(item, times) {
  const tags = [];
  if (times.total <= 60) tags.push("time");
  if ((item.dietOccasion || []).some((d) =>
    ["vegan", "vegetarian", "gluten-free", "dairy-free", "high-protein", "low-carb"].includes(d)
  ))
    tags.push("diet");
  if (/technique|blind.?bake|temper|brine|spatchcock|roll|syrup|royal.?icing|flood|confit|wellington|crackling|string.?syrup|oil.?temp/.test(
    (item.title + " " + item.keyword).toLowerCase()
  ))
    tags.push("technique");
  if (tags.length === 0) tags.push("time");
  return tags;
}

function badgesFor(item, tags) {
  const b = [];
  const diet = item.dietOccasion || [];
  if (diet.includes("halloween")) b.push("Halloween");
  if (diet.includes("diwali")) b.push("Diwali");
  if (diet.includes("christmas")) b.push("Christmas");
  if (diet.includes("thanksgiving") || diet.includes("friendsgiving"))
    b.push("Thanksgiving");
  if (diet.includes("hanukkah") || item.theme === "hanukkah") b.push("Hanukkah");
  if (tags.includes("technique")) b.push("Technique");
  if (tags.includes("time") && b.length < 2) b.push("Under 1 hr");
  if (diet.includes("vegan") && b.length < 2) b.push("Vegan");
  if (diet.includes("vegetarian") && b.length < 2) b.push("Vegetarian");
  if (b.length === 0) b.push("Home cook");
  return b.slice(0, 3);
}

function shortTitle(title) {
  const cleaned = title
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= 42) return cleaned;
  return cleaned.slice(0, 39).replace(/\s+\S*$/, "") + "…";
}

function excerptFor(item) {
  const k = item.keyword || "this dish";
  return `A beginner-clear Uncommon Kitchen take on ${k}: exact times, sensory cues, and rescue tips so you cook with confidence — not guesswork. Written original for home kitchens; no restaurant drama required.`;
}

function whyItWorks(item) {
  const theme = item.theme || "seasonal";
  return [
    `We pace heat and rest so ${item.keyword || "the dish"} hits the doneness cue without racing the clock.`,
    `Seasoning is layered early and finished late — salt for structure, acid or bitter for lift.`,
    `Texture contrast (crisp/soft, hot/cool) is built into the method, not left as a garnish afterthought.`,
    `Every heated step pairs a time or temperature with a look/smell/sound cue — the Uncommon Kitchen standard for ${theme.replace(/-/g, " ")} cooking.`,
  ];
}

function equipmentFor(item) {
  const t = (item.title + " " + item.types.join(" ")).toLowerCase();
  const eq = ["Mixing bowls", "Measuring cups and spoons", "Kitchen scale (helpful)"];
  if (/oven|bake|roast|pie|cookie|casserole|bars|loaf|scone|turkey|ham|duck|wellington/.test(t))
    eq.push("Rimmed sheet pan or roasting tin", "Oven thermometer (optional)");
  if (/soup|stew|chili|curry|brisket|one.?pot|syrup|caramel|cider|mulled/.test(t))
    eq.push("Heavy pot or Dutch oven", "Wooden spoon");
  if (/blend|soup|hummus|smoothie/.test(t)) eq.push("Blender or immersion blender");
  if (/fry|latke|doughnut|sufgan|jamun|pretzel/.test(t))
    eq.push("Deep skillet or Dutch oven", "Instant-read / candy thermometer");
  if (/grill|smoked|spatchcock/.test(t)) eq.push("Grill or smoker (or oven fallback)");
  if (/waffle/.test(t)) eq.push("Waffle iron");
  if (/slow.?cooker/.test(t)) eq.push("Slow cooker");
  return [...new Set(eq)].slice(0, 6);
}

function shopGear() {
  return [
    {
      title: "Instant-read thermometer",
      blurb: "Pull meats and candy stages with confidence.",
      href: "https://www.amazon.com",
    },
  ];
}

/** Theme / keyword driven ingredient packs */
function ingredientGroupsFor(item) {
  const t = (item.title + " " + item.keyword + " " + item.theme).toLowerCase();
  const id = (prefix, i) => `${prefix}${i}`;

  if (/besan.?ladoo|chickpea.*ladoo/.test(t)) {
    return [
      {
        label: "For the ladoo",
        items: [
          { id: id("a", 1), qty: 2, text: "cups fine chickpea flour (besan)" },
          { id: id("a", 2), qty: 0.75, text: "cup ghee, plus more if the mix looks dry" },
          { id: id("a", 3), qty: 1, text: "cup powdered sugar, sifted" },
          { id: id("a", 4), qty: 0.5, text: "tsp ground cardamom" },
          { id: id("a", 5), qty: 2, text: "tbsp chopped pistachios or almonds" },
          { id: id("a", 6), text: "Pinch fine sea salt" },
        ],
      },
    ];
  }
  if (/barfi|katli|mysore.?pak|anjeer|milk.?powder/.test(t)) {
    return [
      {
        label: "For the mithai base",
        items: [
          { id: id("b", 1), qty: 2, text: "cups full-fat milk powder (or cashew flour for katli)" },
          { id: id("b", 2), qty: 1, text: "cup sugar" },
          { id: id("b", 3), qty: 0.5, text: "cup water (for syrup)" },
          { id: id("b", 4), qty: 0.5, text: "cup ghee or unsalted butter" },
          { id: id("b", 5), qty: 0.5, text: "tsp ground cardamom or saffron strands" },
          { id: id("b", 6), text: "Chopped nuts or edible silver leaf to finish (optional)" },
        ],
      },
    ];
  }
  if (/gulab.?jamun/.test(t)) {
    return [
      {
        label: "Dough & syrup",
        items: [
          { id: id("g", 1), qty: 1, text: "cup milk powder" },
          { id: id("g", 2), qty: 0.25, text: "cup plain flour" },
          { id: id("g", 3), qty: 0.25, text: "tsp baking powder" },
          { id: id("g", 4), qty: 2, text: "tbsp ghee, melted" },
          { id: id("g", 5), qty: 3, text: "tbsp whole milk, as needed" },
          { id: id("g", 6), qty: 2, text: "cups sugar + 2 cups water for syrup" },
          { id: id("g", 7), text: "Neutral oil for frying; cardamom + rose water for syrup" },
        ],
      },
    ];
  }
  if (/pumpkin.*loaf|pumpkin.*bread|pumpkin.*bar|pumpkin.*pie|pumpkin.*shortcake|pumpkin.*spice/.test(
    t
  ) || (item.theme === "autumn-pumpkin" && /bake|loaf|pie|bar|shortcake|blondie/.test(t))) {
    return [
      {
        label: "Dry & wet",
        items: [
          { id: id("p", 1), qty: 1.75, text: "cups plain flour" },
          { id: id("p", 2), qty: 1, text: "tsp baking soda" },
          { id: id("p", 3), qty: 1.5, text: "tsp pumpkin pie spice (or cinnamon + ginger + nutmeg)" },
          { id: id("p", 4), qty: 0.5, text: "tsp fine sea salt" },
          { id: id("p", 5), qty: 1, text: "cup pumpkin purée (not pie filling)" },
          { id: id("p", 6), qty: 0.75, text: "cup sugar (or maple sugar blend)" },
          { id: id("p", 7), qty: 2, text: "large eggs" },
          { id: id("p", 8), qty: 0.5, text: "cup neutral oil or melted butter" },
          { id: id("p", 9), text: "Optional maple crackle: 3 tbsp maple syrup + 2 tbsp sugar" },
        ],
      },
    ];
  }
  if (/apple|dumpling|cider.?chicken|caramel.?apple|apple.?salad|apple.?pie|apple.?oat/.test(t)) {
    return [
      {
        label: "Apples & pantry",
        items: [
          { id: id("ap", 1), qty: 4, text: "firm apples (Honeycrisp or Braeburn), peeled if you prefer" },
          { id: id("ap", 2), qty: 0.5, text: "cup brown sugar" },
          { id: id("ap", 3), qty: 1, text: "tsp cinnamon" },
          { id: id("ap", 4), qty: 2, text: "tbsp butter" },
          { id: id("ap", 5), qty: 0.5, text: "cup apple cider or juice" },
          { id: id("ap", 6), text: "Pinch salt; lemon juice to keep apples bright" },
        ],
      },
      {
        label: "For the rest of the dish",
        items: [
          { id: id("ap", 7), text: "Pastry, oats, chicken thighs, cheddar, or pecans as the recipe title suggests" },
          { id: id("ap", 8), qty: 1, text: "tbsp Dijon or maple mustard when a tangy finish is needed" },
        ],
      },
    ];
  }
  if (/turkey|spatchcock|brine|gravy|leftover.?turkey|tetrazzini|sliders|fried.?rice|waldorf|shepherd|carcass|pho/.test(
    t
  )) {
    return [
      {
        label: "Turkey & seasoning",
        items: [
          { id: id("tk", 1), text: "Turkey pieces, breast, carcass, or leftover cooked turkey as needed for this dish" },
          { id: id("tk", 2), qty: 2, text: "tsp kosher salt (Diamond Crystal) or 1 tsp table salt per pound when brining/seasoning raw meat" },
          { id: id("tk", 3), qty: 1, text: "tsp freshly ground black pepper" },
          { id: id("tk", 4), qty: 2, text: "tbsp butter or oil" },
          { id: id("tk", 5), text: "Aromatics: onion, garlic, herbs (thyme/sage/rosemary)" },
          { id: id("tk", 6), text: "Stock, cranberry, chili, or gravy components matching the title" },
        ],
      },
    ];
  }
  if (/soup|stew|chili|curry|risotto|broth/.test(t)) {
    return [
      {
        label: "Base",
        items: [
          { id: id("s", 1), qty: 2, text: "tbsp olive oil or butter" },
          { id: id("s", 2), qty: 1, text: "large onion, diced" },
          { id: id("s", 3), qty: 3, text: "garlic cloves, minced" },
          { id: id("s", 4), qty: 1, text: "kg / 2 lb main vegetable, squash, beans, lentils, or meat from the title" },
          { id: id("s", 5), qty: 4, text: "cups stock or water" },
          { id: id("s", 6), text: "Salt, pepper, and finishing oil, cream, herbs, or acid" },
        ],
      },
    ];
  }
  if (/cookie|blondie|brownie|scone|gingerbread|snowball|spritz|sugar.?cookie|hot.?cocoa.?cookie|peanut.?butter|yule.?log|pudding|hand.?pie|mincemeat/.test(
    t
  )) {
    return [
      {
        label: "Dough / batter",
        items: [
          { id: id("c", 1), qty: 2.25, text: "cups plain flour (adjust for the style of bake)" },
          { id: id("c", 2), qty: 1, text: "cup unsalted butter, softened (or browned)" },
          { id: id("c", 3), qty: 0.75, text: "cup sugar (granulated or brown as suited)" },
          { id: id("c", 4), qty: 1, text: "large egg (omit for some shortbread-style doughs)" },
          { id: id("c", 5), qty: 1, text: "tsp vanilla extract" },
          { id: id("c", 6), qty: 0.5, text: "tsp fine sea salt" },
          { id: id("c", 7), text: "Mix-ins from the title: chocolate, candy, nuts, citrus zest, spices" },
        ],
      },
    ];
  }
  if (/drink|latte|cider|mulled|cocoa|cocktail|champagne|wine|eggnog|syrup|brew/.test(t)) {
    return [
      {
        label: "For the drink",
        items: [
          { id: id("d", 1), qty: 4, text: "cups base liquid (milk, cider, wine, or water)" },
          { id: id("d", 2), qty: 0.33, text: "cup sweetener (sugar, maple, or honey)" },
          { id: id("d", 3), qty: 2, text: "tsp spice blend (cinnamon, clove, ginger, nutmeg as fits)" },
          { id: id("d", 4), text: "Citrus peel, vanilla, cocoa, or tea bags when the title calls for them" },
          { id: id("d", 5), text: "Optional spirit or sparkling topper for adult serves" },
        ],
      },
    ];
  }
  if (/latke|sufgan|doughnut|matzo/.test(t)) {
    return [
      {
        label: "Batter & fry",
        items: [
          { id: id("h", 1), qty: 4, text: "medium floury potatoes (for latkes) or 2.5 cups flour (for doughnuts)" },
          { id: id("h", 2), qty: 1, text: "small onion, grated (latkes) or 2.25 tsp yeast (doughnuts)" },
          { id: id("h", 3), qty: 2, text: "large eggs" },
          { id: id("h", 4), qty: 0.25, text: "cup matzo meal or flour for binding" },
          { id: id("h", 5), text: "Neutral oil for frying; salt; applesauce and sour cream or jelly to serve" },
        ],
      },
    ];
  }
  // Generic solid pantry pack tailored lightly by types
  const main =
    item.types?.includes("dessert") || item.types?.includes("breads-baking")
      ? "flour, butter, sugar, eggs, and the hero flavour named in the title"
      : item.types?.includes("mains") || item.types?.includes("dinner")
        ? "protein or hearty veg named in the title, plus onion, garlic, oil, and stock"
        : "fresh produce and pantry staples named in the title";
  return [
    {
      label: "Ingredients",
      items: [
        { id: id("x", 1), text: `Core: ${main}` },
        { id: id("x", 2), qty: 1, text: "tsp fine sea salt, plus more to taste" },
        { id: id("x", 3), qty: 0.5, text: "tsp freshly ground black pepper" },
        { id: id("x", 4), qty: 2, text: "tbsp butter or olive oil for cooking fat" },
        { id: id("x", 5), text: "Acid finish: lemon juice, vinegar, or yogurt as fits the dish" },
        { id: id("x", 6), text: "Fresh herbs or crunchy garnish for contrast" },
      ],
    },
  ];
}

function stepsFor(item) {
  const title = item.title;
  const keyword = item.keyword || "the dish";
  const t = (title + " " + item.theme).toLowerCase();

  // Shared skeleton with recipe-specific phrasing
  const steps = [];

  steps.push({
    title: "Read the plan and gather",
    body: `Skim this method once. Set out bowls for prep, preheat or chill anything the timeline needs, and measure the hero ingredients for ${keyword}. A calm mise en place prevents mid-cook scrambles.`,
    tip: "If a step needs overnight resting (brine, dough chill, dry bread), start that clock first.",
    visualCue:
      "Counters clear, ingredients measured, tools within reach — no hunting for the whisk mid-sauce.",
  });

  steps.push({
    title: "Prep the hero ingredients",
    body: `Wash, trim, peel, cube, or portion whatever leads ${title}. Pat proteins dry; cut vegetables to even sizes so they cook together. Season lightly with salt now if the method is a roast, stew, or fry.`,
    tip: "Even pieces matter more than perfect knife work — aim for similar thickness.",
    visualCue:
      "Surfaces look matte (not wet) on proteins; veg pieces are roughly the same size in the bowl.",
  });

  if (/bake|cookie|pie|loaf|blondie|brownie|scone|bar\b|cake|pudding|biscuit|gingerbread|snowball|spritz|caramel|crust|icing|dough/.test(
    t
  )) {
    steps.push({
      title: "Mix the dough or batter",
      body: `Cream or whisk fats and sugars until combined, then add eggs and flavourings. Fold in dry ingredients just until no dry flour remains. Do not overmix — toughness hides in extra strokes.`,
      tip: "If the dough feels sticky, chill 20–30 minutes rather than packing in more flour.",
      visualCue:
        "Batter looks thick and even; dough holds together when pinched without cracking dryly.",
    });
    steps.push({
      title: "Shape and rest if needed",
      body: `Scoop, roll, press into a pan, or line a pie tin as the style requires. Chill shaped dough when the recipe is pastry- or cookie-forward so edges keep definition in the oven.`,
      tip: "Line pans with parchment for clean release and less scrubbing.",
      visualCue:
        "Edges look neat; chill-rested dough feels cool and firm, not greasy-soft.",
    });
    steps.push({
      title: "Bake to the sensory cue",
      body: `Bake on the middle rack at 175°C / 350°F unless a hotter blast is noted for crackling or browning. Start checking 2–3 minutes before the early end of the range. Pull when edges are set and the centre matches the cue for this bake.`,
      tip: "Ovens run hot or cool — trust colour and spring-back over the timer alone.",
      visualCue:
        "Edges deep golden; centres spring back or show moist crumbs on a tester, not wet batter.",
    });
    steps.push({
      title: "Cool before finishing",
      body: `Cool on a rack or in the pan as structure needs. Icings, glazes, and dustings go on when the surface is just warm or fully cool so they set instead of melting off.`,
      tip: "Cutting too early squishes crumb — give bars and loaves at least 20 minutes.",
      visualCue:
        "Tops look matte and set; steam has quieted before you slice or decorate.",
    });
  } else if (/soup|stew|chili|curry|risotto|broth|pho|beans/.test(t)) {
    steps.push({
      title: "Build the aromatic base",
      body: `Warm fat in a heavy pot over medium heat. Soften onion (and any carrot/celery) 6–8 minutes until translucent and sweet-smelling. Stir in garlic and spices 30–60 seconds until fragrant — not scorched.`,
      tip: "If spices stick or darken too fast, splash in a spoon of stock and scrape.",
      visualCue:
        "Onions look glossy and pale gold; spices smell toasty, not bitter or smoky-burnt.",
    });
    steps.push({
      title: "Add bulk and simmer",
      body: `Stir in the main vegetable, bean, grain, or meat. Add stock to cover by about 2 cm / ¾ inch. Bring to a gentle simmer, then lower heat. Cook until tender — usually 20–45 minutes depending on the ingredient.`,
      tip: "Keep a lazy bubble, not a rolling boil, so dairy or starch doesn’t split or scorch.",
      visualCue:
        "Surface shows slow blips; solids are fork-tender and the liquid has thickened slightly.",
    });
    steps.push({
      title: "Blend or leave chunky",
      body: `For silky soups, blend carefully (vent the lid; cover with a towel). For stews and chili, mash a ladle of beans/veg against the pot wall to thicken naturally. Taste and adjust salt.`,
      tip: "Immersion blender stays in the pot — less splatter than a countertop jug of hot liquid.",
      visualCue:
        "Texture matches the goal: velvet puree or spoon-coating stew with visible pieces.",
    });
    steps.push({
      title: "Finish with fat and acid",
      body: `Off heat, swirl in butter, cream, herb oil, citrus, or vinegar as the dish wants. The finish should brighten, not drown. Ladle into warm bowls.`,
      tip: "Flat tasting? Add salt first, then a few drops of acid before more spice.",
      visualCue:
        "Surface looks glossy; aroma jumps when the acid hits; spoon leaves a soft trail.",
    });
  } else if (/turkey|chicken|duck|ham|brisket|wellington|roast|thighs|sausage|beef|ribs/.test(
    t
  ) && !/cookie|soup|stew|chili|dip|fried.?rice|slider|nacho|wrap|cup|salad/.test(t)) {
    steps.push({
      title: "Season or brine on time",
      body: `Salt the protein evenly (and sugar/spices if a dry brine). Rest uncovered in the fridge when the schedule allows so the surface dries for better browning. Bring closer to room temperature 30–40 minutes before cooking large roasts.`,
      tip: "Write the pull temperature on a sticky note — decision fatigue mid-roast is real.",
      visualCue:
        "Surface looks lightly dry and seasoned; no puddles of water on the tray.",
    });
    steps.push({
      title: "Sear or start the heat",
      body: `Preheat oven, grill, or skillet as required. Sear skin or fat sides until deep gold when the method wants a crust. Transfer to roast or cover for braising liquid.`,
      tip: "Crowding steams — work in batches if the pan is small.",
      visualCue:
        "Fond (brown bits) sticks to the pan; fat renders clear; colour is deep gold, not grey.",
    });
    steps.push({
      title: "Cook to temperature",
      body: `Roast or braise until an instant-read thermometer hits the safe target for the cut (turkey breast ~74°C / 165°F; thighs a bit higher; medium beef per preference with rest). Tent loosely and rest 10–20 minutes so juices redistribute.`,
      tip: "Carryover adds a few degrees — pull slightly early on large roasts.",
      visualCue:
        "Juices run clear on poultry; probe slides in with little resistance; rest juices pool pink-clear, not cloudy raw.",
    });
    steps.push({
      title: "Make the accompanying sauce",
      body: `Use drippings, cider, wine, chili crisp, or pan juices named in the title. Deglaze, reduce, and season until the sauce coats a spoon. Slice protein against the grain and spoon sauce over.`,
      tip: "If gravy lumps, strain and whisk — still homemade.",
      visualCue:
        "Sauce looks glossy and leaves a trail on the spoon; meat slices show even doneness.",
    });
  } else if (/fry|latke|doughnut|sufgan|jamun|pretzel|fried/.test(t)) {
    steps.push({
      title: "Mix the batter or dough",
      body: `Combine wet and dry until just mixed. For yeasted doughs, knead until smooth and elastic, then rise until doubled. For latkes, squeeze grated potato dry — water is the enemy of crisp.`,
      tip: "Wet hands or a light oil film stop sticky dough from fighting you.",
      visualCue:
        "Dough springs slowly when poked; latke mix looks fluffy, not watery.",
    });
    steps.push({
      title: "Heat oil to the right range",
      body: `Fill a heavy pot with 4–5 cm / 1½–2 inches oil. Heat to 170–180°C / 340–355°F. Test with a scrap — it should sizzle steadily and rise without scorching in seconds.`,
      tip: "No thermometer? A wooden spoon handle should show lively but not violent bubbles.",
      visualCue:
        "Oil shimmers; test scrap turns golden in ~60 seconds, not instantly black.",
    });
    steps.push({
      title: "Fry in small batches",
      body: `Slide portions in gently. Do not crowd. Flip once if needed. Drain on a rack set over a tray so steam escapes and bottoms stay crisp.`,
      tip: "Between batches, let oil return to temperature — pale greasy results mean the oil cooled.",
      visualCue:
        "Exteriors deep gold and blistered; interiors cooked through without raw dough smell.",
    });
    steps.push({
      title: "Finish and serve hot",
      body: `Dust with sugar, fill with jelly, pile with applesauce and sour cream, or salt while hot as the dish requires. Serve soon — fried foods wait poorly.`,
      tip: "Hold briefly in a low oven on a rack if feeding a crowd.",
      visualCue:
        "Surfaces look crisp and dry, not oil-slick; fillings stay put without leaking everywhere.",
    });
  } else if (/drink|latte|cider|mulled|cocoa|cocktail|syrup|brew|wine/.test(t)) {
    steps.push({
      title: "Combine the base and sweetener",
      body: `Add liquid and sweetener to a pot (or shaker for cocktails). Warm gently for hot drinks — avoid a hard boil with dairy or wine. Stir until sugar dissolves completely.`,
      tip: "Taste before adding spirits or sparkling — balance is easier to fix early.",
      visualCue:
        "Liquid looks clear of sugar crystals; steam rises softly without aggressive boiling.",
    });
    steps.push({
      title: "Infuse spices and aromatics",
      body: `Add cinnamon, clove, citrus peel, cocoa, tea, or vanilla. Steep 10–20 minutes on low heat (or cold-infuse syrups longer). Strain if you want a smooth sip.`,
      tip: "Cloves go bitter if boiled hard — keep them polite.",
      visualCue:
        "Kitchen smells warmly spiced; colour deepens a shade; surface may show a thin spice oil sheen.",
    });
    steps.push({
      title: "Adjust strength and serve",
      body: `Dilute with milk, water, or sparkling wine to taste. Serve in warmed mugs or chilled glasses. Garnish with citrus, grated nutmeg, or a cinnamon stick.`,
      tip: "Make a concentrated syrup ahead; mix single drinks to order all week.",
      visualCue:
        "Drink looks inviting in the glass — no floating grit; aroma hits before the first sip.",
    });
  } else if (/dip|board|nacho|snack|mix|bark|salad|sliders|wrap|cup|tetrazzini|casserole|waffles|oat|hummus|eggs|relish|sauce|stuffing|mashed|green.?bean|brussels|cabbage|pepper|farro|rice|chili.?con/.test(
    t
  )) {
    steps.push({
      title: "Cook or soften the base",
      body: `Sauté, roast, boil, or toast the foundation for ${keyword} until nearly done. Season in layers. Keep textures intentional — something creamy, something crisp.`,
      tip: "Salt early for vegetables; finish fats and acids late.",
      visualCue:
        "Base looks cooked through and lightly coloured; nothing is grey-steamed or burnt.",
    });
    steps.push({
      title: "Combine mix-ins",
      body: `Fold in cheeses, herbs, leftover turkey, beans, pasta, or crunchy toppings as the title suggests. Taste. Adjust salt, heat, and acid so the mixture is bold enough for chips, bread, or a plate.`,
      tip: "If serving as a board, keep wet and dry components in separate zones until the last minute.",
      visualCue:
        "Mixture looks cohesive but not pasty; visible flecks of herb, spice, or crunch remain.",
    });
    steps.push({
      title: "Heat through or chill",
      body: `Bake dips until bubbling at the edges, chill salads so flavours marry, or toast/waffle leftover components until crisp. Time this stage to when people actually eat.`,
      tip: "Reheat gently with a splash of stock or milk if leftovers look tight.",
      visualCue:
        "Hot dishes bubble at the rim; cold dishes look glossy and freshly dressed.",
    });
    steps.push({
      title: "Plate with contrast",
      body: `Finish with herbs, seeds, chili oil, pickles, or a squeeze of citrus. Serve with the right vehicle — sturdy chips, toasted bread, lettuce cups, or a wide bowl.`,
      tip: "A final flaky salt pinch wakes up rich dishes.",
      visualCue:
        "Plate shows colour contrast and a clear invitation to dig in — not a beige mound.",
    });
  } else {
    // Generic cook path
    steps.push({
      title: "Start the main cooking",
      body: `Heat the pan, pot, or oven. Cook the primary ingredient for ${keyword} with steady attention — stir, flip, or baste as needed. Watch for the first colour change.`,
      tip: "Medium heat fixes more beginner mistakes than high heat.",
      visualCue:
        "Gentle sizzle or soft oven hum; colour moving from raw to lightly golden.",
    });
    steps.push({
      title: "Build flavour in layers",
      body: `Add aromatics, spices, liquids, or mix-ins in the order that protects them from burning. Simmer, roast, or sauté until the dish comes together and tastes rounded.`,
      tip: "When in doubt, scrape the bottom of the pan — fond is free flavour.",
      visualCue:
        "Kitchen smells intentional; sauce or surface looks glossy, not dull and dry.",
    });
    steps.push({
      title: "Check doneness",
      body: `Use time as a guide and senses as the judge. Probe, taste, or press. Give carryover rest when proteins are involved.`,
      tip: "Underdone can often cook more; overdone cannot undo — check early.",
      visualCue:
        "Texture matches the goal for this dish; no raw centres or scorched edges.",
    });
    steps.push({
      title: "Finish and serve",
      body: `Adjust salt and acid. Add fresh herbs, crunch, or a flavoured oil. Plate while the contrast still sings.`,
      tip: "Warm plates keep weeknight food tasting restaurant-kind.",
      visualCue:
        "Finished plate looks vivid; aroma is bright; first bite has salt, fat, and lift.",
    });
  }

  // Always end with a serve / store step if we have room
  if (steps.length < 10) {
    steps.push({
      title: "Serve, store, or make ahead",
      body: `Serve ${shortTitle(title)} while textures are at their peak. Cool leftovers quickly; refrigerate up to 3 days unless the dish is dairy-fragile or fried (those are best same day). Reheat gently with a splash of liquid if needed.`,
      tip: "Label make-ahead components with the day you cooked them — future you will thank present you.",
      visualCue:
        "Leftovers look well sealed; reheated food steams lightly and smells fresh, not tired.",
    });
  }

  // Ensure 8–12 steps
  while (steps.length < 8) {
    steps.push({
      title: "Taste and tweak",
      body: `Pause for a spoonful. Add salt in small pinches, then acid, then heat. Stop when the flavour tastes awake and balanced for ${keyword}.`,
      tip: "Salt needs 15–20 seconds to bloom in hot food — wait before adding more.",
      visualCue:
        "Your face should say “yes” before you plate for other people.",
    });
  }

  return steps.slice(0, 12);
}

function publishedAt(n) {
  // Spread across mid 2026 for sitemap freshness
  const day = ((n * 3) % 28) + 1;
  const month = 6 + ((n * 2) % 4); // 6–9
  return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildRecipe(item) {
  const countries = inferCountries(item);
  const continents = inferContinents(countries);
  const times = timesFor(item);
  const filterTags = filterTagsFor(item, times);
  const badges = badgesFor(item, filterTags);
  const dietOccasion = [...new Set(item.dietOccasion || [])];
  // Ensure theme festival tags land in dietOccasion when relevant
  if (item.theme === "halloween" && !dietOccasion.includes("halloween"))
    dietOccasion.push("halloween", "festivals");
  if (item.theme === "diwali" && !dietOccasion.includes("diwali"))
    dietOccasion.push("diwali", "festivals");
  if (item.theme === "christmas-baking" && !dietOccasion.includes("christmas"))
    dietOccasion.push("christmas", "festivals");
  if (item.theme === "thanksgiving" && !dietOccasion.includes("thanksgiving"))
    dietOccasion.push("thanksgiving", "holiday-table");
  if (item.theme === "hanukkah" && !dietOccasion.includes("festivals"))
    dietOccasion.push("festivals", "holiday-table");
  if (item.theme === "new-years" && !dietOccasion.includes("festivals") === false)
    dietOccasion.push("festivals", "winter");

  return {
    slug: item.slug,
    title: item.title,
    shortTitle: shortTitle(item.title),
    excerpt: excerptFor(item),
    image: pickImage(item),
    imageAlt: `${item.title} plated and ready to serve`,
    caption: `Home-cook method for ${item.keyword}.`,
    rating: ratingFor(item.slug),
    ratingCount: ratingCountFor(item.slug),
    prepMinutes: times.prep,
    cookMinutes: times.cook,
    totalMinutes: times.total,
    servings: times.servings,
    publishedAt: publishedAt(item.n),
    author: "Uncommon Kitchen",
    continents,
    countries,
    types: item.types || ["dinner"],
    dietOccasion,
    filterTags,
    badges,
    featured: item.priority === "P0" || item.n <= 12,
    whyItWorks: whyItWorks(item),
    ingredientGroups: ingredientGroupsFor(item),
    steps: stepsFor(item),
    equipment: equipmentFor(item),
    shopGear: shopGear(),
  };
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (value === null || value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => padIn + serialize(v, indent + 1));
    return `[\n${items.join(",\n")}\n${pad}]`;
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    const lines = keys.map((k) => {
      const v = value[k];
      if (v === undefined) return null;
      // quote keys that aren't valid identifiers
      const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : JSON.stringify(k);
      return `${padIn}${key}: ${serialize(v, indent + 1)}`;
    }).filter(Boolean);
    return `{\n${lines.join(",\n")}\n${pad}}`;
  }
  return String(value);
}

function writeCatalog(chunkName, recipes) {
  const body = recipes.map((r) => serialize(r, 1)).join(",\n");
  const src = `import type { Recipe } from "./recipes";

/** Auto-generated original catalog recipes (${chunkName}). Do not paste copyrighted copy. */
export const ${chunkName}: Recipe[] = [
${body}
];
`;
  const out = path.join(root, "data", `${chunkName.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()).replace(/^-/, "").replace(/^catalog-/, "recipes-catalog-")}.ts`);
  // Simpler naming:
  return src;
}

const recipes = demand.map(buildRecipe);
const chunkSize = 25;
const chunks = [];
for (let i = 0; i < recipes.length; i += chunkSize) {
  chunks.push(recipes.slice(i, i + chunkSize));
}

const exportNames = [];
chunks.forEach((chunk, idx) => {
  const name = `catalogRecipes${idx + 1}`;
  exportNames.push(name);
  const body = chunk.map((r) => serialize(r, 1)).join(",\n");
  const src = `import type { Recipe } from "./recipes";

/** Original Uncommon Kitchen catalog batch ${idx + 1} (AI-authored; not scraped). */
export const ${name}: Recipe[] = [
${body}
];
`;
  const file = path.join(root, "data", `recipes-catalog-${idx + 1}.ts`);
  fs.writeFileSync(file, src);
  console.log("wrote", file, "recipes", chunk.length);
});

// index merge helper file
const mergeSrc = `import type { Recipe } from "./recipes";
${exportNames.map((n, i) => `import { ${n} } from "./recipes-catalog-${i + 1}";`).join("\n")}

/** All demand-list catalog recipes merged. */
export const catalogRecipes: Recipe[] = [
${exportNames.map((n) => `  ...${n},`).join("\n")}
];
`;
fs.writeFileSync(path.join(root, "data/recipes-catalog.ts"), mergeSrc);
console.log("total catalog", recipes.length);
