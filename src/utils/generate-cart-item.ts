import isEmpty from "lodash/isEmpty";

interface Item {
  id: string | number;
  _id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
  currency: string;
  location: string;
  weightPack: number;
  widthPack: number;
  heightPack: number;
  lengthPack: number;
  shippingCosts: number;
  variationName: string;
  shippingSpecial: object;
}


export function generateCartItem(item: Item, attributes: object, attributeArray: Array<any>, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id, shippingCosts, weightPack, widthPack, heightPack, lengthPack, sku, variationName, shippingSpecial } = item;


  const formulaShip = 9999; //jej
  const { attribute } = attributes
  // Generate unique ID based on attributes and item ID
  const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");

  console.log("generate", shippingCosts, item)
  const generatedId = `${_id}.${attributeString}`;

  const mainProductName = item.name

  return {
    id: id ? id : _id,
    linkId: _id,
    mainProductName: item.name,
    name,
    variationName,
    slug,
    image: image.original ? image : item.url, // Assuming image has a thumbnail property
    price/* : price ? price : parseInt(currentPrice) */,
    attributes: attributeArray,
    currency,
    sale_price,
    location: locationS,
    sku: sku ? sku : attribute?.sku,
    shippingCosts: shippingCosts ? shippingCosts : formulaShip,
    shippingSpecial
  };
}

export function generateCartItemOptions(item: Item) {
  /* onst { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku } = item;
 */
  const { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku, shippingSpecial, shippingCosts } = item;
  /*   console.log(item)
    const formulaShip = 9999;

    // Generate unique ID based on attributes and item ID
    const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");
    const generatedId = `${_id}.${attributeString}`; */
  const formulaShip = 9999;
  console.log(item)
  /*   console.log("generate", item)
   */
  console.log(shippingCosts)
  return {
    id,
    linkId: _id,
    name: item.productName,
    slug: "slug",
    image: item.url,
    price: price,
    sale_price,
    attributes: "No",
    currency: "foji",
    location: "locationS",
    sku,
    shippingCosts: shippingCosts ? shippingCosts : formulaShip,
    shippingSpecial
  };
}