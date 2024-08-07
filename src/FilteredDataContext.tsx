// FilteredDataContext.js
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@framework/types';

interface FilteredDataContextType {
  filteredData: Product[];
  setFilteredData: React.Dispatch<React.SetStateAction<Product[]>>;
}

const FilteredDataContext = createContext<FilteredDataContextType | undefined>(undefined);

export const useFilteredData = () => {
  const context = useContext(FilteredDataContext);
  if (!context) {
    throw new Error('useFilteredData must be used within a FilteredDataProvider');
  }
  return context;
};

export const FilteredDataProvider: React.FC = ({ children }) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  return (
    <FilteredDataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </FilteredDataContext.Provider>
  );
};
