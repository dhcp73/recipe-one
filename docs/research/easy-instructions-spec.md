# Easy Instructions Spec (Uncommon Kitchen)

Reusable step format so beginners can cook with confidence. Aligns with `RecipeStep` in code (`title`, `body`, `tip?`) and adds a required **visual cue** field for production/CMS (even if rendered as part of `body` or `tip` until schema expands).

## Step object (canonical)

```ts
type EasyStep = {
  title: string;       // 3–8 words, imperative, action-first
  body: string;        // 2–5 short sentences: what to do + how to know it’s right
  tip?: string;        // optional rescue / why / substitution
  visualCue: string;   // what it should LOOK / SMELL / SOUND / FEEL like
};
```

### Field rules

| Field | Rules |
|-------|--------|
| **title** | Imperative verb first. No jokes that hide the action. Example: `Toast the spices`, not `Spice things up!` |
| **body** | One action cluster per step. Include **time**, **temperature**, and **doneness cue** when heat is involved. Use plain words (stir, scrape, fold) over jargon — or define jargon once. |
| **tip** | Optional. Use for: common failure, make-ahead, substitution, equipment alternate. Never introduce a new required technique that isn’t in `body`. |
| **visualCue** | Mandatory for UK voice. Sensory, specific, brand-friendly. Prefer sight + one other sense. |

## Times, temperatures, sensory cues

1. **Always pair heat with a number *and* a cue.**  
   Bad: “Cook until done.”  
   Good: “Bake at 350°F / 175°C for 22–26 minutes, until the center springs back and a toothpick has a few moist crumbs.”
2. **Give ranges, then a decision rule.**  
   “18–22 minutes — pull when the edges are deep golden and the middle still looks slightly soft; it firms as it cools.”
3. **Thermometer targets for meat & candy.**  
   State USDA-safe temps **and** carryover rest. For sugar: name the stage *and* °F/°C.
4. **Pan size & depth matter.**  
   “Use a 10-inch skillet; a deeper Dutch oven will need ~3 extra minutes.”
5. **Altitude / oven variance note** once per recipe in headnotes, not every step.
6. **Sensory vocabulary bank (preferred):** pale gold → deep gold → amber; foamy → matte; bubbles slow/thick; smells nutty (not burnt); edges set / center jiggle; spoon leaves a trail; mixture pulls from pan sides.

## Good vs bad steps

### Example A — roasting chickpea flour for ladoo

**Bad**
> Roast the besan until ready. Add sugar and roll into balls.

**Good**
> **Title:** Roast the besan in ghee  
> **Body:** Set a heavy pan over low heat. Melt 4 Tbsp ghee, then add the chickpea flour. Stir and scrape the bottom continuously for 18–22 minutes. The flour should darken one shade and smell deeply nutty — like toasted popcorn, not bitter smoke.  
> **Tip:** If you see brown freckles forming fast, pull the pan off heat for 30 seconds and keep stirring; low and slow beats burnt flour.  
> **Visual cue:** Color shifts from raw yellow to warm sandy gold; the ghee looks absorbed and the mixture turns slightly glossy.

### Example B — turkey gravy

**Bad**
> Make a roux and add stock until thickened.

**Good**
> **Title:** Whisk drippings into a lump-free gravy  
> **Body:** Pour turkey drippings into a fat separator; return 3 Tbsp fat to the pan over medium heat. Whisk in 3 Tbsp flour for 60–90 seconds until it smells toasty and looks like wet sand. Slowly stream in 2 cups warm stock while whisking. Simmer 4–6 minutes until it coats a spoon.  
> **Tip:** If lumps form, pour through a fine mesh strainer and whisk again — still counts as homemade.  
> **Visual cue:** Gravy should leave a clear trail when you drag a spoon across the pan; thickness like melted ice cream, not paste.

### Example C — cookie bake

**Bad**
> Bake until golden brown.

**Good**
> **Title:** Bake until edges set  
> **Body:** Bake on the middle rack at 350°F / 175°C for 9–11 minutes. The edges should look set and lightly golden; the centers will still look slightly underdone. Cool on the sheet 5 minutes before moving.  
> **Tip:** If your oven runs hot, start checking at 8 minutes — peanut butter cookies go from perfect to dry fast.  
> **Visual cue:** Matte tops with tiny cracks; centers soft when gently poked, not wet and shiny.

## Recipe-level checklist (before publish)

- [ ] Every heated step has time **or** temp **plus** a sensory doneness cue  
- [ ] First mention of a tool includes a plain-language alternate when possible  
- [ ] Failures beginners hit are covered in `tip` (burnt spices, soggy crust, greasy latkes, cracked yule log)  
- [ ] Resting / cooling times are explicit (carryover cook counts)  
- [ ] Salt level called “Diamond Crystal” or “table salt” with conversion if relevant  
- [ ] No copyrighted scraped phrasing; original AI-authored UK voice  
- [ ] Visual direction notes deep teal props where plating matters  

## Voice micro-rules

- Speak to one home cook: “you,” never “one should.”  
- Encouraging, never condescending.  
- Prefer “this is normal” over “don’t panic.”  
- Keep brand uncommon: name the *why* of a technique in one short clause inside `body` or `tip`.

## Minimal CMS mapping (current Next app)

Until `visualCue` is a first-class field, authors may append it as the last sentence of `body` prefixed with `Look for:` or store it in `tip` as `Visual: …`. Preferred long-term: extend `RecipeStep` with optional `visualCue`.
