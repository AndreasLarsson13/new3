import { useMemo } from "react";

// Mapping currency codes to symbols
const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  SEK: "kr",
  // Add more currency codes and symbols as needed
};

// Custom rounding logic function
function getFormattedAmount(amount: number, locale: string) {
  let minimumFractionDigits: number;
  let maximumFractionDigits: number;

  if (amount >= 1000) {
    minimumFractionDigits = 0;
    maximumFractionDigits = 0;
  } else if (amount >= 100) {
    minimumFractionDigits = 1;
    maximumFractionDigits = 1;
  } else {
    minimumFractionDigits = 2;
    maximumFractionDigits = 2;
  }

  // Round up the amount based on the decimal places
  const roundedAmount =
    Math.ceil(amount * Math.pow(10, maximumFractionDigits)) /
    Math.pow(10, maximumFractionDigits);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(roundedAmount);
}

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formattedAmount = getFormattedAmount(amount, locale);
  const currencySymbol = currencySymbols[currencyCode] || currencyCode;

  return `${formattedAmount}${currencySymbol}`;
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  return { price, basePrice, discount };
}

export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
  } | null
) {
  const { amount, baseAmount, currencyCode } = data ?? {};

  const locale = "en";
  const value = useMemo(() => {
    if (typeof amount !== "number" || !currencyCode) return "";

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null }
    : value;
}
