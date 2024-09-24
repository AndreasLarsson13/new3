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


export function generateCartItem(item: Item, attributes: object, attributeArray: Array, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id, ship_price, weightPack, widthPack, heightPack, lengthPack } = item;
  const currencyLocation = locationS.currency

  console.log(attributes)
  const formulaSHip = 11 * 10

  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    linkId: _id,
    name,
    slug,
    image: image.thumbnail,
    price: currentPrice,
    attributes,
    currency: locationS.currency,
    location: locationS.value,
    shipping: ship_price ? ship_price : formulaSHip,
  };
}
