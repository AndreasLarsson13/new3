import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'next-i18next';


// 1. Ändra fetchProduct att ta emot language
export const fetchProduct = async (_slug: string, language: string) => {
	const location = JSON.parse(localStorage.getItem('clickedLocation'));
	const { data } = await http.get(
		`${API_ENDPOINTS.PRODUCT}${_slug}?location=${location.value}&language=${language}`
	);
	return data;
};

// 2. Använd hooken på rätt plats – inne i useProductQuery
export const useProductQuery = (slug: string) => {
	const { i18n } = useTranslation(); // ✅ korrekt här, detta är en hook

	return useQuery<Product, Error>({
		queryKey: [API_ENDPOINTS.PRODUCT, slug, i18n.language],
		queryFn: () => fetchProduct(slug, i18n.language),
	});
};
