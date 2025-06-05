import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchFlashSaleProducts = async ({ queryKey }: any) => {

  const location = JSON.parse(localStorage.getItem('clickedLocation'));




  const [_key, options] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS, {
    params: {
      ...options,
      location: location.value
    },
  });
  console.log(data)
  return data as Product[];
};



export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {


  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: fetchFlashSaleProducts
  });
};
