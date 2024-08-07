/* import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";
type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async (options) => {

	// Construct the query string from options, e.g., converting { limit: 10 } to "?limit=10"
	const queryString = Object.keys(options)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key]))
		.join('&');

	const url = `${API_ENDPOINTS.PRODUCTS}?${queryString}`;

	console.log(url)
	
	const { data } = await http.get(url);
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: ({ pageParam = 0 }) => fetchProducts({...options, page: pageParam}),
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
	});
};

export { useProductsQuery, fetchProducts }; */


import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";
type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async (updateCurrency: boolean) => {

	const clickedLocation = "clickedLocation"
	const location = JSON.parse(localStorage.getItem(clickedLocation));


	const currency = location.value

	const storageKey = 'productsData';
	if (updateCurrency) {
		const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}?currency=${currency}`);
		const processedData = {
			data: shuffle(data),
			paginatorInfo: {
				nextPageUrl: "",
			},
		};
		localStorage.setItem(storageKey, JSON.stringify(processedData));
		return processedData;
	}

	// Try to load the data from local storage first
	/* const storedData = localStorage.getItem(storageKey);
	if (storedData) {
	  return JSON.parse(storedData);
	} else {
		const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}?currency=${currency}`);
		const processedData = {
		  data: shuffle(data),
		  paginatorInfo: {
			nextPageUrl: "",
		  },
		};
			// Store the fetched data in local storage for future use
			localStorage.setItem(storageKey, JSON.stringify(processedData));
			return processedData;
	} */

};


const useProductsQuery = (options: QueryOptionsType) => {

	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: fetchProducts,
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
	});
};

export { useProductsQuery, fetchProducts };
