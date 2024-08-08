import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchFlashSaleProducts = async () => {
  try {
    // Retrieve the location data from local storage
    const clickedLocation = "clickedLocation";
    const locationData = localStorage.getItem(clickedLocation);

    if (!locationData) {
      throw new Error(`No data found in localStorage for key: ${clickedLocation}`);
    }

    // Parse the location data from JSON
    const location = JSON.parse(locationData);

    if (!location || !location.value) {
      throw new Error(`Invalid location data: ${locationData}`);
    }

    // Extract the currency from the location data
    const currency = location.value;

    // Fetch the flash sale products using the currency
    const response = await http.get(`${API_ENDPOINTS.FLASH_SALE_PRODUCTS}?currency=${currency}`);

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch flash sale products: ${response.statusText}`);
    }

    // Extract the data from the response
    const { data } = response;

    // Return the fetched data
    return data;
  } catch (error) {
    // Handle errors (logging or re-throwing them as needed)
    console.error('Error fetching flash sale products:', error);
    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};




export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  /* if (options.demoVariant === 'ancient') {
    return useQuery<any, Error>({
      queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options],
      queryFn: fetchAncientFlashSaleProducts
    });
  } */

  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: fetchFlashSaleProducts
  });
};
