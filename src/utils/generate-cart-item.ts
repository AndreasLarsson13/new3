import isEmpty from "lodash/isEmpty";

interface Item {
  id: string | number;
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
export function generateCartItem(item: Item, attributes: object, currentPrice: number, locationS: string) {
  const { id, name, slug, image, price, sale_price, currency } = item;
  console.log(item)
  const currencyLocation = locationS.currency

  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    name,
    slug,
    image: image.thumbnail,
    price: currentPrice,
    attributes,
    currency: locationS.currency,
    location: locationS.value
  };
}
