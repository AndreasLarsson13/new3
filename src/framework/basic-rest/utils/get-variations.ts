import groupBy from "lodash/groupBy";

export function getVariations(variations: object | undefined) {
  if (!variations) return {};


  const hasVariationTrue = variations.some(v => v.itsaVariation === true);

  if (hasVariationTrue) { return groupBy(variations, "attribute.group"); }
  else {
    return groupBy(variations, "attribute.name")
  }





}
