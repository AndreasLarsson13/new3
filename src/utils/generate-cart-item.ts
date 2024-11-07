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
}


export function generateCartItem(item: Item, attributes: object, attributeArray: Array<any>, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id, ship_price, weightPack, widthPack, heightPack, lengthPack } = item;

  const formulaShip = 11 * 10;

  // Generate unique ID based on attributes and item ID
  const attributeString = Object.values(attributes).map((attr) => String(attr)).join(".");
  const generatedId = `${_id}.${attributeString}`;

  return {
    id: generatedId,
    linkId: _id,
    name,
    slug,
    image: image.thumbnail, // Assuming image has a thumbnail property
    price: currentPrice,
    attributes: attributeArray,
    currency,
    location: locationS,
    shipping: ship_price ? ship_price : formulaShip,
  };
}
