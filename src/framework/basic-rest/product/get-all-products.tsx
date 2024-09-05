import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

const fetchProducts = async (updateCurrency: any) => {
	// Extract the necessary query params from queryKey
	const queryObject = updateCurrency.queryKey.find(
		(item: any) => item.q || item.brand || item.limit
	);

	// Fetch currency from local storage or fallback to default
	const clickedLocation = "clickedLocation";
	const location = JSON.parse(localStorage.getItem(clickedLocation) || '{}');
	const currency = location?.value || 'defaultCurrency'; // Handle default currency

	const { q, limit = 10, brand } = queryObject || {}; // Set default limit if not provided

	// Extract the route and determine if it's a category page
	const activeRoute = updateCurrency.queryKey[1]?.route;
	const categoryPage = activeRoute?.split('/')[1];

	console.log(categoryPage)
	console.log(updateCurrency.queryKey[1].slug)
	// Construct URL based on query parameters
	let url = `${API_ENDPOINTS.PRODUCTS}?currency=${encodeURIComponent(currency)}&limit=${encodeURIComponent(limit)}`;
	if (categoryPage === "category") {
		url += `&category=${encodeURIComponent(updateCurrency.queryKey[1].slug || '')}`;
	} else if (q || brand) {
		url += `&${q ? `category=${encodeURIComponent(q)}` : `brand=${encodeURIComponent(brand)}`}`;
	}

	// Perform the HTTP request
	const { data } = await http.get(url);
	return {
		data: shuffle(data),
		paginatorInfo: { nextPageUrl: "" }, // Handle pagination if needed
	};
};

// Use React Query to fetch products with infinite scrolling
const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: fetchProducts,
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
	});
};

export { useProductsQuery, fetchProducts };
