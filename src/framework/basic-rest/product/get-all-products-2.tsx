import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";

export const fetchProducts = async ({ queryKey, pageParam = 1 }: any) => {

  const location = JSON.parse(localStorage.getItem('clickedLocation'));


  const [_key, options] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FILTERPAGE, {
    params: {
      ...options,
      page: pageParam,
      location: location.value
    },
  });
  console.log(data)
  return data; // no need to cast as Product[] anymore
};


export const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [API_ENDPOINTS.FILTERPAGE, options],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.paginatorInfo?.hasMorePages
        ? lastPage.paginatorInfo.nextPage
        : undefined,

    // 🚫 Prevent unnecessary refetches
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // cache results for 5 minutes
  });
};

