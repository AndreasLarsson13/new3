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
  shipping: number;
  variationName: string;
}


export function generateCartItem(item: Item, attributes: object, attributeArray: Array<any>, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku, variationName } = item;


  const formulaShip = 9999;
  const { attribute } = attributes
  // Generate unique ID based on attributes and item ID
  const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");

  console.log("22", item)
  console.log(attribute)
  const generatedId = `${_id}.${attributeString}`;
  console.log(name)
  return {
    id,
    linkId: _id,
    name,
    variationName,
    slug,
    image: image.original ? image : item.url, // Assuming image has a thumbnail property
    price: price ? price : parseInt(currentPrice),
    attributes: attributeArray,
    currency,
    location: locationS,
    sku: sku ? sku : attribute?.sku,
    shipping: shipping ? shipping : formulaShip,
  };
}

export function generateCartItemOptions(item: Item) {
  /* onst { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku } = item;
 */
  const { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku } = item;
  /*   console.log(item)
    const formulaShip = 9999;
    console.log(attributes)
    // Generate unique ID based on attributes and item ID
    const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");
    const generatedId = `${_id}.${attributeString}`; */
  const formulaShip = 9999;

  console.log("generate", item)

  return {
    id: item.productName + item.sku,
    linkId: id,
    name: item.productName,
    slug: "slug",
    image: item.url,
    price: sale_price > 0 ? sale_price : price,
    attributes: "No",
    currency: "foji",
    location: "locationS",
    sku: sku,
    shipping: shipping ? shipping : formulaShip,
  };
}