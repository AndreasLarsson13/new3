import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchNewArrivalProducts = async () => {
  const clickedLocation = "clickedLocation"
  const location = JSON.parse(localStorage.getItem(clickedLocation));


  const currency = location.value

  const { data } = await http.get(`${API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS}?currency=${currency}`);


  return data as Product[];
};



export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {

  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    queryFn: fetchNewArrivalProducts
  });
};
