import { useTranslation } from 'next-i18next';
import Select from 'react-select';
import { FaInfoCircle, FaLink, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

interface Props {
  className?: string;
  title: string;
  attributes: {
    id: number;
    value: string;
    meta: string;
    price: number;
    img: { url: string; name: string } | string;
    customOrder: boolean;
    product?: boolean;
    translation: { [key: string]: string };
    description?: { [key: string]: string };
    url?: string; // Add URL for the link
    namn: string;
    group: string;
    mainObject?: boolean; // Key to hide options
    required?: boolean; // Indicates if the input is required
  }[];
  active: string;
  onClick: any;
  clicked: any;
  fieldErrors: string[]; // Array of field errors for highlighting
}

export const ProductAttributes: React.FC<Props> = ({
  className = 'mb-4',
  title,
  attributes,
  active,
  onClick,
  clicked,
  fieldErrors,
}) => {
  const { t, i18n } = useTranslation('common');
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Local state to track selected value for this specific attribute type
  const [selectedValue, setSelectedValue] = useState(active);

  // Check if this field has an error
  const hasError = fieldErrors.includes(title);

  // Helper function to strip HTML and truncate text
  function truncateText(htmlContent, limit) {
    const textContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');
    return textContent.length > limit ? `${textContent.substring(0, limit)}...` : textContent;
  }

  // Close tooltip if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltipOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  let titleNew = attributes[0]?.group || attributes[0]?.translation?.[i18n.language] || title;
  const productAttribute = attributes.find((attr) => attr.product);

  // Custom styles for React-Select to apply a red border on errors
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: hasError ? 'red' : base.borderColor, // Apply red border if there's an error
      boxShadow: hasError ? '0 0 0 1px red' : base.boxShadow,
      '&:hover': {
        borderColor: hasError ? 'red' : base['&:hover']?.borderColor,
      },
    }),
  };

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize flex items-center">
        {t(title) !== title ? t(title) : titleNew}

        {/* Add an asterisk for required inputs */}
        {attributes.some((attr) => attr.required) && (
          <span className="text-red-500 ml-1">*</span>
        )}

        {/* Info icon with toggleable tooltip */}
        {productAttribute && (
          <div
            className="relative group ml-2"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => !isTooltipOpen && setTooltipOpen(false)}
            onClick={(e) => {
              e.stopPropagation();
              setTooltipOpen(!isTooltipOpen);
            }}
            ref={tooltipRef}
          >
            <FaInfoCircle className="text-gray-400 cursor-pointer" />

            {isTooltipOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white text-gray-700 text-sm border border-gray-200 rounded shadow-md p-4">
                <button
                  className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTooltipOpen(false);
                  }}
                >
                  <FaTimes />
                </button>

                <p className="mb-2">
                  <strong>{truncateText(productAttribute.translation[i18n.language], 25)}</strong>
                </p>

                <p className="mb-2">
                  {productAttribute.description && (
                    <span>{truncateText(productAttribute.description[i18n.language], 50)}</span>
                  )}
                </p>

                <a
                  href={`/products/${productAttribute.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex items-center mt-2"
                >
                  <FaLink className="mr-1" /> Gå till produktsidan
                </a>
              </div>
            )}
          </div>
        )}
      </h3>

      <Select
        placeholder={t('select_placeholder')}
        isClearable={true} // Allows deselecting the input
        options={attributes
          .filter(({ mainObject }) => !mainObject) // Exclude options with the mainObject key
          .map(({ value, meta, price, img, namn }) => ({
            value,
            label: (
              <div className="flex items-center space-x-2">
                {title === 'color' ? (
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: meta }}
                  ></span>
                ) : (
                  img &&
                  typeof img === 'object' && (
                    <img src={img.url} alt={img.name} className="w-6 h-6 rounded-full" />
                  )
                )}
                <span>{`${namn} - ${price}€`}</span>
              </div>
            ),
            price,
          }))}
        styles={customStyles} // Apply custom styles
        value={attributes
          .filter(({ mainObject }) => !mainObject)
          .map((attr) => ({
            value: attr.value,
            label: attr.value,
          }))
          .find((option) => option.value === selectedValue) || null}
        onChange={(selectedOption) => {
          const newValue = selectedOption ? selectedOption.value : null;
          const newPrice = selectedOption ? selectedOption.price : 0;

          setSelectedValue(newValue); // Update local state for this specific attribute

          onClick({
            id: title,
            [title]: newValue,
            price: newValue ? newPrice : -clicked[title]?.price || 0, // Pass -price if deselected
            customOrder: selectedOption?.customOrder || false,
            value: newValue,
            name: title === 'color' ? title : selectedOption?.translation?.se,
          });
        }}
      />
    </div>
  );
};
