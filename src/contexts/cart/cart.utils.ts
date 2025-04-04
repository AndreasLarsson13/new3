export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, "id">> { }

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === item.id
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item["id"],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item["id"]) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item["id"],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], id: Item["id"]) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotalSale: item.sale_price * item.quantity!,
    itemTotal: item.price * item.quantity!,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => {
    // Use the lower price between sale_price and price
    const priceToUse = item.sale_price && item.sale_price < item.price
      ? item.sale_price
      : item.price;

    return total + (priceToUse * (item.quantity || 0));
  }, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
