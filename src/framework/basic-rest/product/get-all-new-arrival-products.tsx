import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
  const clickedLocation = "clickedLocation"

  const location = JSON.parse(localStorage.getItem(clickedLocation));



  console.log(location)


  const [_key, options] = queryKey;
  console.log(queryKey)
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, {
    params: {
      ...options,
      location: location.value
    },
  });
  console.log(data)

  return data as Product[];
};



export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {

  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, options],
    queryFn: fetchNewArrivalProducts
  });
};
