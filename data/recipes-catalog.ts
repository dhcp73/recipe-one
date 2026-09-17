import type { Recipe } from "./recipes";
import { catalogRecipes1 } from "./recipes-catalog-1";
import { catalogRecipes2 } from "./recipes-catalog-2";
import { catalogRecipes3 } from "./recipes-catalog-3";
import { catalogRecipes4 } from "./recipes-catalog-4";

/** All demand-list catalog recipes merged. */
export const catalogRecipes: Recipe[] = [
  ...catalogRecipes1,
  ...catalogRecipes2,
  ...catalogRecipes3,
  ...catalogRecipes4,
];
