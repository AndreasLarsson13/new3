import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchFlashSaleProducts = async () => {

  const clickedLocation = "clickedLocation"
  const location = JSON.parse(localStorage.getItem(clickedLocation));


  const currency = location.value

  if (location) {
    const { data } = await http.get(`${API_ENDPOINTS.FLASH_SALE_PRODUCTS}?currency=${currency}`);
    return data;
  } else {
    const { data } = await http.get(`${API_ENDPOINTS.FLASH_SALE_PRODUCTS}?currency=se`);
    return data;
  }

};



export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {


  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: fetchFlashSaleProducts
  });
};
