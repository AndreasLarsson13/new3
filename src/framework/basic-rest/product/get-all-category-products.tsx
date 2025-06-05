import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";

export const fetchCategoryProducts = async ({ queryKey, pageParam = 1 }: any) => {
  const location = JSON.parse(localStorage.getItem("clickedLocation"));
  const [_key, options] = queryKey;

  const { data } = await http.get(API_ENDPOINTS.CATEGORIESPRODUCTS, {
    params: {
      ...options,
      page: pageParam,
      location: location?.value,
    },
  });

  return data;
};



export const useCategoryProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<{
    data: Product[];
    paginatorInfo: {
      hasMorePages: boolean;
      nextPage: number;
    };
  }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIESPRODUCTS, options],
    queryFn: fetchCategoryProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.paginatorInfo?.hasMorePages
        ? lastPage.paginatorInfo.nextPage
        : undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

