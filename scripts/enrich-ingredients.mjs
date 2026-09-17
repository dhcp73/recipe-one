import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import demand from "../data/recipe-demand-100.json" with { type: "json" };

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function pack(groups) {
  return groups.map(([label, items]) => ({
    label,
    items: items.map((it, i) => {
      if (typeof it === "string") return { id: `i${i}`, text: it };
      const [qty, text] = it;
      return qty == null ? { id: `i${i}`, text } : { id: `i${i}`, qty, text };
    }),
  }));
}

function groupsFor(item) {
  const t = `${item.title} ${item.keyword} ${item.slug}`.toLowerCase();
  const types = (item.types || []).join(" ");

  if (/gulab.?jamun/.test(t))
    return pack([
      ["Dough", [[1, "cup milk powder"], [0.25, "cup plain flour"], [0.25, "tsp baking powder"], [2, "tbsp ghee"], [3, "tbsp milk"]]],
      ["Syrup & fry", [[2, "cups sugar"], [2, "cups water"], "Cardamom, rose water, oil for frying"]],
    ]);
  if (/mysore.?pak/.test(t))
    return pack([["Mysore pak", [[1, "cup besan"], [1, "cup sugar"], [0.5, "cup water"], [1, "cup ghee"], "Pinch cardamom"]]]);
  if (/kaju.?katli/.test(t))
    return pack([["Katli", [[2, "cups cashew flour"], [1, "cup sugar"], [0.5, "cup water"], [1, "tsp ghee"], [0.25, "tsp cardamom"]]]]);
  if (/besan.?ladoo/.test(t))
    return pack([["Ladoo", [[2, "cups besan"], [0.75, "cup ghee"], [1, "cup powdered sugar"], [0.5, "tsp cardamom"], [2, "tbsp pistachios"]]]]);
  if (/rava.?coconut/.test(t))
    return pack([["Ladoo", [[1, "cup semolina"], [1, "cup desiccated coconut"], [0.75, "cup sugar"], [0.33, "cup ghee"], [0.5, "tsp cardamom"]]]]);
  if (/anjeer|date.?fig/.test(t))
    return pack([["Barfi", [[1.5, "cups chopped dates and figs"], [1, "cup milk powder"], [0.25, "cup ghee"], [0.25, "cup walnuts"], [0.25, "tsp cardamom"]]]]);
  if (/coconut.?barfi/.test(t))
    return pack([["Barfi", [[2, "cups desiccated coconut"], [1, "cup sugar"], [0.5, "cup milk"], [2, "tbsp ghee"], [0.5, "tsp cardamom"]]]]);
  if (/milk.?powder.?barfi|barfi/.test(t) && /diwali|milk/.test(t))
    return pack([["Barfi", [[2, "cups milk powder"], [0.75, "cup sugar"], [0.5, "cup milk"], [0.25, "cup ghee"], [0.5, "tsp cardamom"]]]]);

  if (/pumpkin.?spice.?latte|latte.?syrup/.test(t))
    return pack([["Syrup", [[1, "cup water"], [0.75, "cup sugar"], [0.33, "cup pumpkin purée"], [2, "tsp pumpkin pie spice"], [1, "tsp vanilla"], [0.25, "tsp salt"]]]]);
  if (/pumpkin.?curry/.test(t))
    return pack([["Curry", [[500, "g pumpkin cubed"], [1, "onion"], [3, "garlic cloves"], [1, "tbsp ginger"], [2, "tbsp curry paste"], [1, "can coconut milk"], [1, "cup stock"], [1, "lime"], "Salt, cilantro"]]]);
  if (/classic.?pumpkin.?pie/.test(t))
    return pack([
      ["Crust", [[1, "blind-baked 9-inch pie shell"]]],
      ["Filling", [[1, "can (15 oz) pumpkin purée"], [1, "can (12 oz) evaporated milk"], [0.75, "cup sugar"], [2, "eggs"], [1.5, "tsp pumpkin pie spice"], [0.5, "tsp salt"]]],
    ]);
  if (/pumpkin.?shortcake/.test(t))
    return pack([
      ["Shortcakes", [[2, "cups flour"], [1, "tbsp baking powder"], [0.25, "cup sugar"], [0.5, "cup cold butter"], [0.75, "cup cream"], [0.5, "cup pumpkin purée"], [1, "tsp spice"]]],
      ["Maple cream", [[1, "cup double cream"], [2, "tbsp maple syrup"]]],
    ]);
  if (/pumpkin.?bars/.test(t))
    return pack([
      ["Batter", [[1.5, "cups flour"], [1, "tsp baking powder"], [1, "tsp pumpkin spice"], [1, "cup pumpkin purée"], [0.75, "cup sugar"], [0.5, "cup oil"], [2, "eggs"]]],
      ["Swirl", [[200, "g cream cheese"], [0.25, "cup sugar"], [1, "egg yolk"], [0.5, "tsp vanilla"]]],
    ]);
  if (/pumpkin.*(loaf|maple.?crackle)/.test(t))
    return pack([
      ["Batter", [[1.75, "cups flour"], [1, "tsp baking soda"], [1.5, "tsp pumpkin pie spice"], [0.5, "tsp salt"], [1, "cup pumpkin purée"], [0.75, "cup brown sugar"], [2, "eggs"], [0.5, "cup oil"]]],
      ["Maple crackle", [[3, "tbsp maple syrup"], [2, "tbsp sugar"], [1, "tbsp melted butter"]]],
    ]);

  if (/caramel.?apple.?dumpling/.test(t))
    return pack([
      ["Filling", [[4, "apples chopped"], [0.33, "cup brown sugar"], [1, "tsp cinnamon"], [2, "tbsp butter"]]],
      ["Pastry", [[1, "sheet puff pastry"], [0.5, "cup caramel sauce"], [1, "egg for wash"]]],
    ]);
  if (/apple.?cider.?chicken/.test(t))
    return pack([
      ["Chicken", [[6, "bone-in chicken thighs"], [1.5, "tsp salt"], [1, "tbsp oil"]]],
      ["Braise", [[2, "apples wedged"], [1, "onion"], [1.5, "cups apple cider"], [1, "tbsp Dijon"], [2, "thyme sprigs"]]],
    ]);
  if (/apple.?salad/.test(t))
    return pack([["Salad", [[2, "apples sliced"], [100, "g cheddar"], [0.5, "cup pecans"], [4, "cups greens"], [2, "tbsp maple"], [1, "tbsp Dijon"], [3, "tbsp olive oil"], [1, "tbsp cider vinegar"]]]]);
  if (/soft.?caramel/.test(t))
    return pack([["Caramels", [[1, "cup sugar"], [1, "cup brown sugar"], [1, "cup cream"], [0.5, "cup butter"], [0.5, "cup golden syrup"], [1, "tsp vanilla"], [1, "tsp flaky salt"], "Apples for dunking"]]]);
  if (/caramel.?apple.?cider|witch.?brew|mulled.?cider/.test(t))
    return pack([["Cider", [[8, "cups apple cider"], [0.33, "cup caramel or brown sugar"], [2, "cinnamon sticks"], [6, "cloves"], [1, "orange sliced"]]]]);
  if (/cinnamon.?apple.?overnight/.test(t))
    return pack([["Jars", [[2, "cups rolled oats"], [2, "cups milk"], [0.5, "cup yogurt"], [2, "tbsp chia"], [2, "tbsp maple"], [1, "tsp cinnamon"], [1, "apple diced"]]]]);
  if (/apple.?pie.?cheddar/.test(t))
    return pack([
      ["Cheddar crust", [[2.5, "cups flour"], [1, "tsp salt"], [200, "g cold butter"], [100, "g cheddar"], [6, "tbsp ice water"]]],
      ["Filling", [[6, "apples sliced"], [0.75, "cup sugar"], [2, "tbsp flour"], [1, "tsp cinnamon"], [1, "tbsp lemon juice"]]],
    ]);
  if (/sausage.?apples/.test(t))
    return pack([["Sheet pan", [[6, "pork sausages"], [3, "apples wedged"], [2, "red onions"], [1, "tbsp oil"], [2, "tbsp mustard"], [1, "tbsp honey"]]]]);
  if (/brussels/.test(t))
    return pack([["Tray", [[700, "g Brussels sprouts"], [4, "rashers bacon"], [1, "apple diced"], [2, "tbsp oil"], [2, "tbsp cider"], [1, "tbsp maple"]]]]);
  if (/braised.?cabbage/.test(t))
    return pack([["Braise", [[1, "red cabbage shredded"], [2, "apples"], [1, "onion"], [2, "tbsp butter"], [1, "tsp caraway"], [0.25, "cup cider vinegar"], [0.5, "cup stock"]]]]);

  if (/dry.?brine.?turkey/.test(t))
    return pack([["Turkey & brine", [[1, "whole turkey 5–6 kg"], [0.33, "cup kosher salt"], [2, "tbsp brown sugar"], [1, "tbsp pepper"], [1, "tbsp thyme"], [2, "tsp garlic powder"], "Soft butter for roasting"]]]);
  if (/spatchcock.?turkey/.test(t))
    return pack([["Turkey", [[1, "small turkey 4–5 kg, backbone removed"], [3, "tbsp oil"], [2, "tbsp salt"], [1, "tbsp pepper"], [1, "tbsp paprika"], [4, "garlic cloves"], [2, "tbsp herbs"]]]]);
  if (/turkey.?gravy/.test(t))
    return pack([["Gravy", [[0.25, "cup turkey fat"], [0.25, "cup flour"], [3, "cups warm stock"], [0.5, "cup drippings juices"], "Salt, pepper"]]]);
  if (/turkey.?breast/.test(t))
    return pack([["Breast", [[1, "bone-in turkey breast 1.5–2 kg"], [2, "tbsp butter"], [1, "tsp salt"], [0.5, "tsp pepper"], [1, "tsp garlic powder"], [1, "tsp thyme"], [0.5, "cup stock"]]]]);
  if (/smoked.?turkey/.test(t))
    return pack([["Turkey", [[1, "whole turkey 5–6 kg"], [0.25, "cup oil"], [3, "tbsp BBQ rub"], "Apple wood chunks"]]]);
  if (/ginger.?scallion.?turkey/.test(t))
    return pack([["Roast", [[1, "turkey breast"], [4, "tbsp grated ginger"], [1, "bunch spring onions"], [3, "tbsp soy"], [2, "tbsp oil"], [1, "tbsp honey"], [4, "garlic cloves"]]]]);
  if (/slider/.test(t))
    return pack([["Sliders", [[12, "Hawaiian rolls"], [400, "g sliced turkey"], [6, "slices cheese"], [0.5, "cup cranberry sauce"], [0.25, "cup melted butter"], [1, "tbsp Dijon"]]]]);
  if (/nacho/.test(t))
    return pack([["Nachos", [[1, "bag tortilla chips"], [2, "cups leftover turkey"], [2, "cups cheese"], [1, "cup black beans"], [0.5, "cup chipotle salsa"], "Jalapeños, sour cream, lime"]]]);
  if (/pho|carcass/.test(t))
    return pack([
      ["Broth", [[1, "turkey carcass"], [1, "onion"], [1, "piece ginger"], [2, "star anise"], [1, "cinnamon stick"], [2, "tbsp fish sauce"]]],
      ["Bowls", [[400, "g rice noodles"], [2, "cups turkey meat"], "Herbs, lime, chili"]],
    ]);
  if (/crunchwrap/.test(t))
    return pack([["Wraps", [[4, "flour tortillas"], [4, "tostadas"], [2, "cups turkey"], [1, "cup stuffing"], [1, "cup mash"], [0.5, "cup cranberry"], [1, "cup gravy"], [1, "cup cheese"]]]]);
  if (/tetrazzini/.test(t))
    return pack([["Bake", [[350, "g spaghetti"], [3, "cups turkey"], [250, "g mushrooms"], [3, "tbsp butter"], [3, "tbsp flour"], [2, "cups milk"], [1, "cup stock"], [1, "cup peas"], [1, "cup Parmesan"]]]]);
  if (/spicy.?leftover.?turkey.?chili|turkey.?chili/.test(t))
    return pack([["Chili", [[3, "cups leftover turkey"], [1, "onion"], [3, "garlic cloves"], [2, "tbsp chili powder"], [2, "cans tomatoes"], [1, "can black beans"], [1, "cup stock"], [20, "g dark chocolate"]]]]);
  if (/fried.?rice/.test(t))
    return pack([["Fried rice", [[3, "cups cold rice"], [2, "cups turkey"], [2, "eggs"], [1, "cup peas and carrots"], [3, "spring onions"], [3, "tbsp soy"], [1, "tbsp oil"], [2, "tbsp cranberry splash optional"]]]]);
  if (/waldorf/.test(t))
    return pack([["Cups", [[2, "cups turkey diced"], [1, "apple"], [0.5, "cup grapes"], [0.33, "cup walnuts"], [0.33, "cup mayo"], [1, "tsp lemon"], [1, "butter lettuce"]]]]);
  if (/buffalo.?turkey/.test(t))
    return pack([["Dip", [[3, "cups shredded turkey"], [225, "g cream cheese"], [0.5, "cup Buffalo sauce"], [0.5, "cup ranch"], [1.5, "cups cheddar"]]]]);
  if (/shepherd/.test(t))
    return pack([["Pie", [[3, "cups turkey"], [1, "cup mixed veg"], [1, "cup gravy"], [4, "cups mashed potatoes"], [0.5, "cup cheddar"], [1, "tbsp butter"]]]]);

  if (/candy.?corn.?blondie/.test(t))
    return pack([["Blondies", [[1, "cup butter"], [1.25, "cups brown sugar"], [2, "eggs"], [2, "tsp vanilla"], [2, "cups flour"], [1, "tsp baking powder"], [0.75, "tsp salt"], [1, "cup candy corn"], [0.5, "cup white chocolate chips"]]]]);
  if (/black.?cocoa.?brownie/.test(t))
    return pack([["Brownies", [[0.75, "cup butter"], [1.25, "cups sugar"], [2, "eggs"], [0.75, "cup black cocoa"], [0.5, "cup flour"], [0.5, "tsp salt"], [1, "tsp vanilla"], [0.5, "cup chocolate chips"]]]]);
  if (/peanut.?butter.?blossom/.test(t))
    return pack([["Cookies", [[0.5, "cup butter"], [0.5, "cup peanut butter"], [0.5, "cup sugar"], [0.5, "cup brown sugar"], [1, "egg"], [1.5, "cups flour"], [1, "tsp baking soda"], [24, "chocolate kisses"]]]]);
  if (/buckeye|peanut.?butter.?ball/.test(t))
    return pack([["Buckeyes", [[1.5, "cups peanut butter"], [0.5, "cup soft butter"], [3, "cups powdered sugar"], [1, "tsp vanilla"], [300, "g dark chocolate"]]]]);
  if (/spritz/.test(t))
    return pack([["Spritz", [[1, "cup butter"], [0.66, "cup sugar"], [1, "egg"], [1, "tsp vanilla"], [2.25, "cups flour"], [0.5, "tsp salt"], "Sprinkles"]]]);
  if (/hot.?cocoa.?cookie/.test(t))
    return pack([["Cookies", [[0.75, "cup butter"], [1, "cup sugar"], [1, "egg"], [1.5, "cups flour"], [0.5, "cup cocoa"], [0.5, "tsp baking soda"], [12, "marshmallows halved"], [0.5, "cup chocolate chips"]]]]);
  if (/gingerbread.?cutout/.test(t))
    return pack([
      ["Dough", [[3, "cups flour"], [0.75, "cup brown sugar"], [0.75, "cup butter"], [0.5, "cup molasses"], [1, "egg"], [1, "tbsp ginger"], [1, "tsp cinnamon"], [0.5, "tsp cloves"]]],
      ["Royal icing", [[2, "cups powdered sugar"], [1.5, "tbsp meringue powder"], [3, "tbsp water"]]],
    ]);
  if (/gingerbread.?house.?assembly/.test(t))
    return pack([["Assembly", [[1, "gingerbread house kit or panels"], [3, "cups royal icing"], "Candies for decorating", "Foil-covered base"]]]);
  if (/charcuterie.?gingerbread/.test(t))
    return pack([["Savoury house", [[1, "gingerbread house panels"], [200, "g soft cheese"], [100, "g cured meats"], [100, "g cheese cubes"], [0.5, "cup olives"], "Crackers, rosemary"]]]);
  if (/yule.?log/.test(t))
    return pack([
      ["Sponge", [[4, "eggs"], [0.5, "cup sugar"], [0.33, "cup flour"], [0.25, "cup cocoa"]]],
      ["Filling & ganache", [[1.5, "cups cream"], [2, "tbsp powdered sugar"], [150, "g dark chocolate"], [0.5, "cup cream"]]],
    ]);
  if (/snowball/.test(t))
    return pack([["Snowballs", [[1, "cup butter"], [0.5, "cup powdered sugar"], [2, "cups flour"], [1, "cup chopped pecans"], [1, "tsp vanilla"], [0.25, "tsp salt"]]]]);
  if (/italian.?christmas.?cookie/.test(t))
    return pack([
      ["Cookies", [[3, "cups flour"], [0.75, "cup sugar"], [0.5, "cup butter"], [3, "eggs"], [1, "tbsp baking powder"], [1.5, "tsp anise extract"]]],
      ["Glaze", [[1.5, "cups powdered sugar"], [2, "tbsp milk"], "Sprinkles"]],
    ]);
  if (/sugar.?cookie|flood.?icing/.test(t))
    return pack([
      ["Cookies", [[3, "cups flour"], [1, "cup butter"], [1, "cup sugar"], [1, "egg"], [1.5, "tsp vanilla"], [0.5, "tsp baking powder"]]],
      ["Flood icing", [[3, "cups powdered sugar"], [3, "tbsp milk"], [1, "tbsp corn syrup"], "Gel colours"]],
    ]);
  if (/champagne.?butter|nye/.test(t))
    return pack([["Cookies", [[1, "cup butter"], [0.75, "cup sugar"], [1, "egg yolk"], [2, "tbsp Champagne"], [2, "cups flour"], [0.5, "tsp salt"], "Sanding sugar"]]]);
  if (/cranberry.?orange.?scone/.test(t))
    return pack([["Scones", [[2, "cups flour"], [0.33, "cup sugar"], [1, "tbsp baking powder"], [0.5, "cup cold butter"], [0.75, "cup cream"], [1, "cup dried cranberries"], [1, "tbsp orange zest"]]]]);
  if (/sticky.?toffee/.test(t))
    return pack([
      ["Pudding", [[200, "g dates"], [0.75, "cup boiling water"], [1, "tsp baking soda"], [0.33, "cup butter"], [0.75, "cup brown sugar"], [2, "eggs"], [1.25, "cups flour"]]],
      ["Sauce", [[0.75, "cup brown sugar"], [0.5, "cup cream"], [0.25, "cup butter"], [1, "tsp vanilla"]]],
    ]);
  if (/mincemeat/.test(t))
    return pack([["Hand pies", [[2, "sheets shortcrust"], [1.5, "cups mincemeat"], [1, "egg for wash"], [2, "tbsp sugar"]]]]);
  if (/pecan.?pie/.test(t))
    return pack([
      ["Crust", [[1.25, "cups flour"], [0.5, "tsp salt"], [115, "g cold butter"], [3, "tbsp ice water"]]],
      ["Filling", [[1.5, "cups pecans"], [0.75, "cup brown sugar"], [0.75, "cup golden syrup"], [3, "eggs"], [0.25, "cup melted butter"], [1, "tsp vanilla"]]],
    ]);
  if (/chocolate.?pudding.?pie/.test(t))
    return pack([["Pie", [[1, "baked cookie crust"], [0.75, "cup sugar"], [0.33, "cup cocoa"], [0.25, "cup cornflour"], [3, "cups milk"], [3, "egg yolks"], [2, "tbsp butter"], [1, "tsp vanilla"], "Whipped cream"]]]);
  if (/halloween.?candy.?bark/.test(t))
    return pack([["Bark", [[300, "g dark chocolate"], [150, "g white chocolate"], [1, "cup chopped candy"], [0.5, "cup pretzels"], "Sprinkles"]]]);
  if (/cinnamon.?roll.?wreath/.test(t))
    return pack([
      ["Dough", [[3.5, "cups flour"], [0.25, "cup sugar"], [2.25, "tsp yeast"], [1, "cup warm milk"], [0.25, "cup butter"], [1, "egg"]]],
      ["Filling", [[0.5, "cup soft butter"], [0.75, "cup brown sugar"], [2, "tbsp cinnamon"], [1, "cup powdered sugar"], [2, "tbsp milk"]]],
    ]);
  if (/eggnog.?custard|french.?toast/.test(t))
    return pack([["Bake", [[1, "loaf brioche"], [6, "eggs"], [2, "cups eggnog"], [0.5, "cup milk"], [0.25, "cup sugar"], [1, "tsp vanilla"], [0.5, "tsp nutmeg"]]]]);

  if (/butternut.?squash.?soup/.test(t))
    return pack([
      ["Soup", [[1, "kg butternut cubed"], [1, "onion"], [3, "garlic cloves"], [1, "tbsp oil"], [4, "cups stock"], [0.5, "tsp cumin"]]],
      ["Seed oil", [[3, "tbsp pumpkin seeds"], [3, "tbsp olive oil"]]],
    ]);
  if (/white.?bean.?stew/.test(t))
    return pack([["Stew", [[2, "cans white beans"], [1, "head garlic roasted"], [1, "onion"], [4, "cups stock"], [2, "cups kale"], [2, "tbsp oil"], [1, "tsp smoked paprika"]]]]);
  if (/tomato.?soup/.test(t))
    return pack([
      ["Soup", [[1.2, "kg tomatoes"], [1, "onion"], [4, "garlic cloves"], [2, "tbsp oil"], [2, "cups stock"], [0.25, "cup cream"]]],
      ["Croutons", [[4, "slices bread"], [100, "g cheddar"], [1, "tbsp butter"]]],
    ]);
  if (/short.?rib/.test(t))
    return pack([["Stew", [[1.5, "kg short ribs"], [2, "tbsp oil"], [1, "onion"], [3, "carrots"], [2, "parsnips"], [2, "cups red wine"], [2, "cups stock"], [2, "tbsp tomato paste"]]]]);
  if (/potato.?leek/.test(t))
    return pack([["Soup", [[4, "leeks"], [700, "g potatoes"], [2, "tbsp butter"], [4, "cups stock"], [0.5, "cup cream"], "Salt, chives"]]]);
  if (/chili.?con.?carne/.test(t))
    return pack([["Chili", [[800, "g minced beef"], [1, "onion"], [4, "garlic cloves"], [2, "tbsp chili powder"], [1, "tsp cumin"], [2, "cans tomatoes"], [1, "can kidney beans"], [1, "cup stock"], [1, "tbsp cocoa"]]]]);
  if (/mushroom.?farro/.test(t))
    return pack([["Stew", [[1.5, "cups farro"], [400, "g mushrooms"], [1, "onion"], [3, "garlic cloves"], [4, "cups stock"], [2, "tbsp oil"], [1, "tbsp butter"], "Herb oil"]]]);
  if (/risotto/.test(t))
    return pack([["Risotto", [[300, "g arborio rice"], [400, "g squash"], [1, "shallot"], [1, "litre stock"], [0.5, "cup white wine"], [40, "g butter"], [0.5, "cup Parmesan"], [8, "sage leaves"]]]]);
  if (/lentil.?sausage/.test(t))
    return pack([["Stew", [[300, "g lentils"], [4, "sausages"], [1, "onion"], [2, "carrots"], [1, "can tomatoes"], [4, "cups stock"], [1, "tsp smoked paprika"]]]]);
  if (/black.?eyed.?pea/.test(t))
    return pack([["Stew", [[2, "cups black-eyed peas"], [1, "onion"], [2, "celery"], [1, "green pepper"], [100, "g smoked sausage optional"], [4, "cups stock"], [1, "tsp thyme"]]]]);
  if (/matzo.?ball/.test(t))
    return pack([
      ["Matzo balls", [[1, "cup matzo meal"], [4, "eggs"], [0.25, "cup oil"], [0.25, "cup stock"], [1, "tsp salt"]]],
      ["Soup", [[8, "cups chicken stock"], [2, "carrots"], [2, "celery"], [1, "onion"], "Dill"]],
    ]);
  if (/cabbage.?dumpling/.test(t))
    return pack([
      ["Dumplings", [[30, "wrappers"], [2, "cups shredded cabbage"], [200, "g mince or tofu"], [2, "tsp ginger"], [2, "spring onions"], [1, "tbsp soy"]]],
      ["Broth", [[4, "cups stock"], [3, "slices ginger"], [2, "tbsp soy"], "Chili oil"]],
    ]);

  if (/poinsettia|prosecco/.test(t))
    return pack([["Cocktail", [[1, "bottle Prosecco"], [1, "cup cranberry juice"], [0.5, "cup orange liqueur"], "Cranberries, orange peel"]]]);
  if (/mulled.?wine/.test(t))
    return pack([["Mulled wine", [[1, "bottle red wine"], [0.25, "cup sugar"], [1, "orange"], [6, "cloves"], [2, "cinnamon sticks"], [1, "star anise"], [0.25, "cup brandy optional"]]]]);
  if (/peppermint.?hot.?chocolate/.test(t))
    return pack([
      ["Cocoa", [[4, "cups milk"], [0.33, "cup cocoa"], [0.33, "cup sugar"], [100, "g dark chocolate"], [0.5, "tsp peppermint extract"]]],
      ["Toppings", ["Whipped cream", "Crushed candy canes"]],
    ]);

  if (/pretzel/.test(t))
    return pack([
      ["Dough", [[1.5, "cups warm water"], [2.25, "tsp yeast"], [1, "tbsp sugar"], [4, "cups flour"], [2, "tsp salt"], [2, "tbsp butter"]]],
      ["Beer cheese", [[2, "cups cheddar"], [0.75, "cup beer"], [1, "tbsp butter"], [1, "tbsp flour"], [1, "tsp Dijon"]]],
    ]);
  if (/cranberry.?sauce/.test(t))
    return pack([
      ["Base", [[12, "oz cranberries"], [0.75, "cup sugar"], [0.5, "cup orange juice"]]],
      ["Mix-ins", ["Orange zest + cinnamon", "Jalapeno + honey", "Port + black pepper"]],
    ]);
  if (/make-ahead.?stuffing|stuffing.?cubes/.test(t))
    return pack([["Stuffing", [[12, "cups cubed bread"], [1, "cup butter"], [2, "onions"], [3, "celery stalks"], [2, "tbsp sage"], [1, "tbsp thyme"], [2.5, "cups stock"], [2, "eggs"]]]]);
  if (/green.?bean/.test(t))
    return pack([["Casserole", [[700, "g green beans"], [300, "g mushrooms"], [3, "tbsp butter"], [3, "tbsp flour"], [2, "cups milk"], [1, "cup fried onions"], [0.5, "cup Parmesan"]]]]);
  if (/sweet.?potato.?casserole/.test(t))
    return pack([
      ["Base", [[1.2, "kg sweet potatoes"], [0.33, "cup brown sugar"], [0.25, "cup butter"], [0.25, "cup milk"], [1, "tsp vanilla"]]],
      ["Streusel", [[0.75, "cup pecans"], [0.33, "cup flour"], [0.33, "cup brown sugar"], [3, "tbsp butter"]]],
    ]);
  if (/corn.?casserole/.test(t))
    return pack([["Casserole", [[4, "cups corn"], [1, "cup sour cream"], [0.5, "cup melted butter"], [2, "eggs"], [1, "cup cheddar"], [0.5, "cup cornmeal"], [2, "spring onions"]]]]);
  if (/deviled.?egg/.test(t))
    return pack([
      ["Eggs", [[12, "eggs"], [0.5, "cup mayo"], [2, "tsp Dijon"], [1, "tsp vinegar"], "Salt"]],
      ["Fillings", ["Paprika + chives", "Avocado + lime", "Horseradish + dill"]],
    ]);
  if (/mashed.?potato/.test(t))
    return pack([["Potatoes", [[1.5, "kg potatoes"], [0.75, "cup butter"], [0.75, "cup warm milk"], [120, "g cream cheese"], "Salt, chives"]]]);
  if (/latke/.test(t))
    return pack([
      ["Latkes", [[4, "potatoes"], [1, "onion"], [2, "eggs"], [0.25, "cup matzo meal"], [1, "tsp salt"], "Oil for frying"]],
      ["Serve", ["Applesauce", "Sour cream"]],
    ]);
  if (/sufgan/.test(t))
    return pack([["Doughnuts", [[3, "cups flour"], [0.25, "cup sugar"], [2.25, "tsp yeast"], [0.75, "cup warm milk"], [2, "eggs"], [0.25, "cup butter"], "Oil, jam, sugar"]]]);
  if (/buffalo.?chicken.?dip/.test(t))
    return pack([["Dip", [[3, "cups shredded chicken"], [225, "g cream cheese"], [0.5, "cup Buffalo sauce"], [0.5, "cup ranch"], [1.5, "cups cheddar"]]]]);
  if (/pickle.?dip/.test(t))
    return pack([["Dip", [[225, "g cream cheese"], [0.5, "cup sour cream"], [0.75, "cup chopped pickles"], [2, "tbsp brine"], [1, "tbsp everything bagel seasoning"]]]]);
  if (/friendsgiving|squash.?hummus/.test(t))
    return pack([
      ["Hummus", [[2, "cups roasted squash"], [1, "can chickpeas"], [0.25, "cup tahini"], [2, "tbsp lemon"], [2, "garlic cloves"], [3, "tbsp oil"]]],
      ["Board", ["Pita chips", "Crudites", "Olives"]],
    ]);
  if (/boo.?basket|snack.?mix/.test(t))
    return pack([["Mix", [[8, "cups popcorn"], [2, "cups pretzels"], [1, "cup candy corn"], [1, "cup peanuts"], [0.5, "cup melted white chocolate"], [2, "tbsp butter"]]]]);
  if (/pumpkin.?carving.?party/.test(t))
    return pack([["Board", [[2, "cups hummus"], [1, "bag pita chips"], [2, "cups veg sticks"], [1, "cup olives"], [200, "g cheese"], [1, "cup nuts"]]]]);
  if (/jack-o-lantern|stuffed.?pepper/.test(t))
    return pack([["Peppers", [[4, "orange peppers"], [400, "g mince"], [1, "cup cooked rice"], [1, "onion"], [1, "cup tomato sauce"], [1, "cup cheese"]]]]);
  if (/honey.?glazed.?holiday.?ham|holiday.?ham/.test(t))
    return pack([["Ham", [[1, "ham 2.5–3.5 kg"], [0.5, "cup honey"], [0.25, "cup brown sugar"], [2, "tbsp Dijon"], [1, "tbsp cider vinegar"], [0.25, "tsp cloves"]]]]);
  if (/wellington/.test(t))
    return pack([["Wellington", [[2, "beef fillets 150–180g"], [150, "g mushrooms"], [1, "shallot"], [1, "tbsp butter"], [2, "slices prosciutto"], [1, "sheet puff pastry"], [1, "egg"], [1, "tsp Dijon"]]]]);
  if (/roast.?duck.?cherry/.test(t))
    return pack([
      ["Duck", [[1, "whole duck 2–2.5 kg"], [2, "tsp salt"], [0.5, "tsp pepper"], [1, "orange"]]],
      ["Cherry port sauce", [[1, "cup cherries"], [0.5, "cup port"], [1, "tbsp honey"], [1, "tsp balsamic"]]],
    ]);
  if (/brisket/.test(t))
    return pack([["Brisket", [[1.5, "kg brisket"], [3, "onions"], [4, "garlic cloves"], [2, "cups stock"], [1, "cup wine"], [2, "tbsp tomato paste"], [2, "tbsp oil"]]]]);
  if (/stuffing.?waffle/.test(t))
    return pack([["Waffles", [[3, "cups leftover stuffing"], [2, "eggs"], [0.25, "cup stock"], [1, "tbsp oil"], "Fried eggs and gravy"]]]);
  if (/make-ahead.?cranberry|cranberry.?chili.?orange.?relish/.test(t))
    return pack([["Relish", [[12, "oz cranberries"], [0.75, "cup sugar"], [1, "orange zest and juice"], [1, "small chili"], "Pinch salt"]]]);

  // Fallbacks by type
  if (types.includes("drinks"))
    return pack([["Drink", [[4, "cups base liquid"], [0.33, "cup sweetener"], [2, "tsp spices"], "Citrus garnish"]]]);
  if (types.includes("dessert") || types.includes("breads-baking"))
    return pack([["Bake pantry", [[2, "cups flour"], [0.75, "cup sugar"], [0.5, "cup butter"], [2, "eggs"], [1, "tsp vanilla"], [0.5, "tsp salt"], [1, "tsp baking powder"], `Flavour accents for ${item.keyword}`]]]);
  if (types.includes("soups-stews"))
    return pack([["Pot", [[1, "onion"], [3, "garlic cloves"], [2, "tbsp oil"], [4, "cups stock"], [800, "g main veg or protein"], "Salt, pepper, herbs"]]]);

  return pack([
    ["Ingredients", [[2, "tbsp oil or butter"], [1, "onion"], [3, "garlic cloves"], `Pantry staples for ${item.keyword}`, [1, "tsp salt"], [0.5, "tsp pepper"], "Herbs or acid to finish"]],
  ]);
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((v) => padIn + serialize(v, indent + 1)).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    return `{\n${Object.entries(value)
      .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}}`;
  }
  return String(value);
}

const bySlug = Object.fromEntries(demand.map((d) => [d.slug, groupsFor(d)]));
let replaced = 0;
const missed = [];
for (const idx of [1, 2, 3, 4]) {
  const file = path.join(root, `data/recipes-catalog-${idx}.ts`);
  let src = fs.readFileSync(file, "utf8");
  for (const [slug, groups] of Object.entries(bySlug)) {
    if (!src.includes(`slug: "${slug}"`)) continue;
    const re = new RegExp(
      `(slug: "${slug}"[\\s\\S]*?ingredientGroups: )\\[[\\s\\S]*?\\](,\\n    steps:)`
    );
    if (!re.test(src)) {
      missed.push(slug);
      continue;
    }
    src = src.replace(re, `$1${serialize(groups, 2)}$2`);
    replaced++;
  }
  fs.writeFileSync(file, src);
}
const all = [1, 2, 3, 4]
  .map((i) => fs.readFileSync(path.join(root, `data/recipes-catalog-${i}.ts`), "utf8"))
  .join("\n");
console.log(
  JSON.stringify({
    replaced,
    missed: missed.slice(0, 10),
    missedCount: missed.length,
    weak: (all.match(/as the (recipe )?title suggests/gi) || []).length,
    core: (all.match(/Core:/g) || []).length,
    pantryStaples: (all.match(/Pantry staples for/g) || []).length,
  })
);
