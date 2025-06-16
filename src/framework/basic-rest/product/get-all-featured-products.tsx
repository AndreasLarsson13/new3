import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

export const fetchFeaturedProducts = async ({ queryKey }: any) => {


  const location = JSON.parse(localStorage.getItem('clickedLocation'));




  const [_key, options] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FEATURED_PRODUCTS, {
    params: {
      ...options,
      location: location.value
    },
  });
  console.log(data)


  return data as Product[];
};


export const useFeaturedProductsQuery = (options: QueryOptionsType) => {
  const { i18n } = useTranslation()
  /*  if (options.demoVariant === 'ancient') {
     return useQuery<Product[], Error>({
       queryKey: [API_ENDPOINTS.FEATURED_PRODUCTS, options],
       queryFn: fetchAncientFeaturedProducts
     });

   } */
  options.language = i18n.language
  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FEATURED_PRODUCTS, options],
    queryFn: fetchFeaturedProducts
  });
};
