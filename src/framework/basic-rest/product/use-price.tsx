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
// Custom rounding logic function
// Custom rounding logic function
function getFormattedAmount(amount: number, locale: string) {
  // Use Intl.NumberFormat to dynamically handle decimals and separators
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0, // Allow no decimals if none are present
    maximumFractionDigits: 20, // Allow as many decimals as are present in the input
    useGrouping: true, // Enable thousand separator
  })
    .format(amount)
    .replace(/,/g, ' '); // Replace commas with spaces if needed
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
  const formattedAmount = getFormattedAmount(amount, locale); // Use formatted amount for 1000+
  const currencySymbol = currencySymbols[currencyCode] || currencyCode;

  return `${formattedAmount}${currencySymbol}`; // Add a space before currency symbol
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
