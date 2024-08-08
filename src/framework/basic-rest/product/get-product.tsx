import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";


export const fetchProduct = async (_slug: string) => {
	const storedLocation = JSON.parse(localStorage.getItem('clickedLocation'));
	console.log(storedLocation.value)
	const currency = storedLocation.value
	console.log("fetch currency", currency)
	console.log(_slug)
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}${_slug}?currency=${currency}`);
	console.log(data)

	return data;
};


export const useProductQuery = (slug: string) => {
	return useQuery<Product, Error>({
		queryKey: [API_ENDPOINTS.PRODUCT, slug],
		queryFn: () => fetchProduct(slug),
	});
};
