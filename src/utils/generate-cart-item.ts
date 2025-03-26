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
  shipping: number
}


export function generateCartItem(item: Item, attributes: object, attributeArray: Array<any>, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku } = item;


  console.log(item)
  const formulaShip = 9999;
  console.log(attributes)
  // Generate unique ID based on attributes and item ID
  const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");
  const generatedId = `${_id}.${attributeString}`;

  return {
    id: generatedId,
    linkId: _id,
    name,
    slug,
    image: image.original, // Assuming image has a thumbnail property
    price: currentPrice,
    attributes: attributeArray,
    currency,
    location: locationS,
    sku,
    shipping: shipping ? shipping : formulaShip,
  };
}

export function generateCartItemOptions(item: Array<any>) {
  /* onst { id, name, slug, image, price, sale_price, currency, _id, shipping, weightPack, widthPack, heightPack, lengthPack, sku } = item;
 */

  /*   console.log(item)
    const formulaShip = 9999;
    console.log(attributes)
    // Generate unique ID based on attributes and item ID
    const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");
    const generatedId = `${_id}.${attributeString}`; */
  const formulaShip = 9999;

  return {
    id: item.productName + item.sku,
    linkId: item.id,
    name: item.productName,
    slug: "slug",
    image: item.url,
    price: item.price,
    attributes: "No",
    currency: "foji",
    location: "locationS",
    sku: item.sku,
    shipping: /* shipping ? shipping :  */formulaShip,
  };
}