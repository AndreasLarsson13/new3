import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, FilterType } from '@framework/types'; // Assuming you have a FilterType in your types file
import { useRouter } from 'next/router';
import { useProductsQuery } from '@framework/product/get-all-products-2';

// Define the shape of paginated data
interface PaginatedProductResponse {
  data: Product[];
  filters: FilterType[]; // Assuming filters is an array of some FilterType
  paginatorInfo: {
    total: number;
    currentPage: number;
    totalPages: number;
    hasMorePages: boolean;
    nextPage: number | null;
  };
}

interface FilteredDataContextType {
  filteredData: Product[];
  filtersData: FilterType[]; // Filters data
  setFilteredData: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
  isError: boolean;
}

const FilteredDataContext = createContext<FilteredDataContextType | undefined>(undefined);

export const useFilteredData = () => {
  const context = useContext(FilteredDataContext);
  if (!context) {
    throw new Error('useFilteredData must be used within a FilteredDataProvider');
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const FilteredDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [filtersData, setfiltersData] = useState<FilterType[]>([]); // Set correct type here
  const [isError, setIsError] = useState(false);
  const { query } = useRouter();

  const {
    isFetching: isLoading,
    data,
    error,
  } = useProductsQuery({
    limit: 20,
    ...query
  });

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const allProducts = data.pages.flatMap((page: PaginatedProductResponse) => page.data);
      const allFilters = data.pages.flatMap((page: PaginatedProductResponse) => page.filters);
      setfiltersData(allFilters[0]);
      console.log(allFilters); // Optional, remove if not needed for production
      setFilteredData(allProducts);
    }
  }, [query, data]); // `data` already includes query updates

  return (
    <FilteredDataContext.Provider value={{ filteredData, filtersData, setFilteredData, isLoading, isError }}>
      {children}
    </FilteredDataContext.Provider>
  );
};
