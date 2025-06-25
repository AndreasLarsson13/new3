import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchRelatedProducts = async (options) => {
/* 	const item = options.queryKey.find(item => item.productBrand.categoryPaths || item.productBrand.related) ?? {};
 */	console.log(item)
	/* const lastCategory = category?.[category.length - 1];

	const parts = category.categoryPaths.split("/");
	console.log(category)
	const last = parts.length ? parts[parts.length - 1] : ""; */



	const location = JSON.parse(localStorage.getItem('clickedLocation'));

	console.log(options)

	const { data } = await http.get(API_ENDPOINTS.RELATED_PRODUCTS, {
		params: {
			product: options,
			location: location.value,
			category: lastCategory,
			related: related ? related : 'false'
		},
	});

	return data;




};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
	return useQuery<Product[], Error>({
		queryKey: [API_ENDPOINTS.RELATED_PRODUCTS, options],
		queryFn: fetchRelatedProducts
	});
};
