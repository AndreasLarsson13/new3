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
}
export function generateCartItem(item: Item, attributes: object, attributeArray: Array, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency, _id } = item;
  const currencyLocation = locationS.currency


  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    linkId: _id,
    name,
    slug,
    image: image.thumbnail,
    price: currentPrice,
    attributes: attributeArray,
    currency: locationS.currency,
    location: locationS.value
  };
}
