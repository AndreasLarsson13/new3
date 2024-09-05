import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchRelatedProducts = async (options) => {
	const id = options.queryKey.forEach(item => {
		if (item.id) {
			return item.id
		}
	})
	console.log(id)
	console.log(options.queryKey[1].id)


	const { data } = await http.get(`${API_ENDPOINTS.RELATED_PRODUCTS}?q=${options.queryKey[1].id}`);
	return data;
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
	return useQuery<Product[], Error>({
		queryKey: [API_ENDPOINTS.RELATED_PRODUCTS, options],
		queryFn: fetchRelatedProducts
	});
};
