import { useTranslation } from 'next-i18next';
import Select from 'react-select';
import { FaInfoCircle, FaLink, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

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
  }[];
  active: string;
  onClick: any;
  clicked: any;
}

export const ProductAttributes: React.FC<Props> = ({
  className = 'mb-4',
  title,
  attributes,
  active,
  onClick,
  clicked,
}) => {
  const { t, i18n } = useTranslation('common');
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Helper function to strip HTML and truncate text
  function truncateText(htmlContent, limit) {
    const textContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
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

  let titleNew = attributes[0]?.translation?.[i18n.language] || title;
  const productAttribute = attributes.find(attr => attr.product);

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize flex items-center">
        {t(title) !== title ? t(title) : titleNew}

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
                    <span>
                      {truncateText(productAttribute.description[i18n.language], 50)}
                    </span>
                  )}
                </p>

                <a href={`/products/${productAttribute._id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
                  <FaLink className="mr-1" /> Gå till produktsidan
                </a>
              </div>
            )}
          </div>
        )}
      </h3>

      <Select
        options={attributes.map(({ id, value, meta, price, img, customOrder, product, translation }) => ({
          value,
          label: (
            <div className="flex items-center space-x-2">
              {title === 'color' ? (
                <span
                  className="inline-block w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: meta }}
                ></span>
              ) : (
                img && typeof img === 'object' && (
                  <img src={img.url} alt={img.name} className="w-6 h-6 rounded-full" />
                )
              )}
              <span>{img ? (value ? "Ja" : "Nej") : t(`${value}`)}</span>
            </div>
          ),
          price,
          customOrder,
          product,
        }))}
        className="basic-single-select"
        classNamePrefix="select"
        // Use the correct value format
        value={attributes
          .map(attr => ({
            value: attr.value,
            label: (
              <div className="flex items-center space-x-2">
                {title === 'color' ? (
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: attr.meta }}
                  ></span>
                ) : (
                  attr.img && typeof attr.img === 'object' && (
                    <img src={attr.img.url} alt={attr.img.name} className="w-6 h-6 rounded-full" />
                  )
                )}
                <span>{attr.img ? (attr.value ? "Ja" : "Nej") : t(`${attr.value}`)}</span>
              </div>
            )
          }))
          .find(option => option.value === active) || null}
        onChange={(selectedOption) => {
          onClick({
            id: title,
            [title]: selectedOption.value,
            price: selectedOption.price,
            customOrder: selectedOption.customOrder,
            value: selectedOption.value,
            name: title === "color" ? title : selectedOption.translation?.se,
          });
        }}
        isMulti={title === 'img'}
      />

    </div>
  );
};
