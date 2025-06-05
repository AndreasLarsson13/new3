import { CheckBox } from '@components/ui/checkbox';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFilteredData } from './../../FilteredDataContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const colorFilterItems = [
  { id: '1', name: 'Black', slug: 'black', hexColor: '#000' },
  { id: '2', name: 'Pink', slug: 'pink', hexColor: '#3310ce' },
  { id: '3', name: 'Purple', slug: 'purple', hexColor: '#0c7448' },
  { id: '4', name: 'Red', slug: 'red', hexColor: '#FF0000' },
  { id: '5', name: 'Brown', slug: 'brown', hexColor: '#362727' },
  { id: '6', name: 'White', slug: 'white', hexColor: '#fff' },
  { id: '7', name: 'Gray', slug: 'gray', hexColor: '#e1e1e1' },
];

export const ColorFilter = () => {
  const { filteredData } = useFilteredData();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Get selected colors from query (URL)
  const selectedColors = Array.isArray(query?.color)
    ? (query.color as string[])
    : query?.color
      ? query.color.split(',')
      : [];

  const [formState, setFormState] = useState<string[]>(selectedColors);

  // Update formState when the query changes
  useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);

  // Handle color filter change
  const handleItemClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let updatedState = [...formState];

    if (updatedState.includes(value)) {
      // Remove the color if already selected
      updatedState = updatedState.filter((color) => color !== value);
    } else {
      // Add the color if not already selected
      updatedState.push(value);
    }

    // Ensure the updatedState contains unique values
    updatedState = [...new Set(updatedState)];

    // Update the query with the selected colors
    const newQuery = { ...query };

    if (updatedState.length > 0) {
      newQuery.color = updatedState.join(',');
    } else {
      delete newQuery.color; // Remove color key if no colors are selected
    }

    // Push the updated query to the router
    router.push(
      {
        pathname,
        query: newQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  // Toggle filter visibility
  const togglePriceFilter = () => {
    setIsOpen(prevState => !prevState);
  };

  // Get unique colors
  const uniqueColors = React.useMemo(() => {
    const colorCounts: Record<string, number> = {};

    const allColors = filteredData.flatMap((product) =>
      product.meta?.flatMap((metaItem) =>
        metaItem.tecnical
          ?.filter((t) => t.idforFiltering === "color")
          .flatMap((colorEntry) => {
            const colors = colorEntry.data || [];
            colors.forEach((color) => {
              const slug = typeof color === 'string' ? color.toLowerCase() : '';
              if (slug) {
                colorCounts[slug] = (colorCounts[slug] || 0) + 1;
              }
            });
            return colors;
          }) ?? []
      ) ?? []
    );

    const unique = Array.from(new Set(allColors));

    return unique.map((colorRaw) => {
      const color = typeof colorRaw === 'string' ? colorRaw : '';
      const slug = color.toLowerCase();
      const matched = colorFilterItems.find(
        (item) => item.slug.toLowerCase() === slug
      );

      return {
        id: matched?.id ?? slug,
        name: matched?.name ?? color,
        slug,
        hexColor: matched?.hexColor ?? '#ccc',
        count: colorCounts[slug] || 0,
      };
    });
  }, [filteredData]);

  return (
    <div className="block border-b border-gray-300 pb-5">


      <h3
        className="text-heading text-sm md:text-base font-semibold mb-3 cursor-pointer flex items-center space-x-2"
        onClick={togglePriceFilter}
      >
        {/* Toggle Icon */}
        {isOpen ? (
          <FaChevronUp className="text-primary" />
        ) : (
          <FaChevronDown className="text-primary" />
        )}
        <span> {t('text-colors')}</span>
      </h3>
      {isOpen && <div className="mt-2 flex flex-col space-y-4">
        {uniqueColors.map((color) => (
          <CheckBox
            key={color.id}
            label={
              <span className="flex items-center">
                <span
                  className="w-5 h-5 rounded-full block ltr:mr-3 rtl:ml-3 mt-0.5 border border-black border-opacity-20"
                  style={{ backgroundColor: color.hexColor }}
                />
                {t(color.slug)} {`(${color.count})`}
              </span>
            }
            name={color.slug}
            checked={formState.includes(color.slug)}
            value={color.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>}
    </div>
  );
};
