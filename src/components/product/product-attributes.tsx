import { useTranslation } from 'next-i18next';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

interface Attribute {
  id: number;
  value: string;
  meta: string;
  price: number;
  sale_price: number;
  img: { url: string; name: string } | string;
  customOrder: boolean;
  product?: boolean;
  translation: { [key: string]: string };
  description?: { [key: string]: string };
  url?: string;
  namn: string;
  group: string;
  variation: boolean;
  mainObject?: boolean;
  required?: boolean;
  sku: string;
  option: boolean;
  produktvariation: boolean;
  image: { original: string } | string;
  _id: string;
  shipping: number;
  itsaVariation: boolean;
}

interface Props {
  className?: string;
  title: string;
  attributes: Attribute[];
  resetInputFields: boolean;
  active: string;
  onClick: (selected: {
    id?: string;
    group: string;
    productName: string | null;
    price: number;
    sale_price?: number;
    customOrder: boolean;
    value: string | null;
    itsaVariation?: boolean;
    produktvariation: boolean;
    name?: string;
    url?: string | null;
    sku?: string | null;
    option: boolean;
    shipping?: number;
    deselected: boolean;
  }) => void;
  clicked: { [key: string]: { price: number } };
  fieldErrors: string[];
}

export const ProductAttributes: React.FC<Props> = ({
  className = 'mb-4',
  title,
  attributes,
  active,
  onClick,
  clicked,
  fieldErrors,
  resetInputFields,
}) => {
  const { t, i18n } = useTranslation('common');
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<{ currency: string } | null>(null);

  // Hitta attributet med lägst pris (sale_price om > 0, annars price)
  const findLowestPriceAttribute = () => {
    if (!attributes || attributes.length === 0) return null;
    return attributes.reduce((lowest, current) => {
      const currentPrice = current.sale_price > 0 ? current.sale_price : current.price;
      const lowestPrice = lowest.sale_price > 0 ? lowest.sale_price : lowest.price;
      return currentPrice < lowestPrice ? current : lowest;
    });
  };


  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);


  const initialSelectedAttribute = findLowestPriceAttribute();

  const [selectedValue, setSelectedValue] = useState<string>(
    resetInputFields ? '' : initialSelectedAttribute?.value || ''
  );

  const hasError = fieldErrors.includes(title);

  const formatWithSeparator = (price: number) => {
    if (price < 1000) {
      return price.toFixed(2).replace('.', ',');
    } else {
      return price
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',');
    }
  };

  // Reset vid ändring
  /*  useEffect(() => {
     if (resetInputFields) {
       setSelectedValue('');
     } else {
       setSelectedValue(initialSelectedAttribute?.value || '');
     }
   }, [resetInputFields, attributes]); */

  useEffect(() => {
    if (resetInputFields) {
      setSelectedValue('');
    } else if (!selectedValue) {  // bara sätt initialt om inget är valt
      setSelectedValue(initialSelectedAttribute?.value || '');
    }
  }, [resetInputFields, attributes]);


  // Tooltip close vid klick utanför
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const titleNew =
    attributes[0]?.group || attributes[0]?.translation?.[i18n.language] || title;

  const productAttribute = attributes.find((attr) => attr.product);

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      borderColor: hasError ? 'red' : base.borderColor,
      boxShadow: hasError ? '0 0 0 1px red' : base.boxShadow,
      '&:hover': {
        borderColor: hasError ? 'red' : base['&:hover']?.borderColor,
      },
    }),
  };

  const options = attributes
    .filter(({ mainObject }) => !mainObject)
    .sort((a, b) => {
      const priceA = a.sale_price > 0 ? a.sale_price : a.price;
      const priceB = b.sale_price > 0 ? b.sale_price : b.price;
      return priceA - priceB; // Descending order
    })
    .map(
      ({
        value,
        meta,
        price,
        sale_price,
        img,
        namn,
        sku,
        option,
        produktvariation,
        image,
        _id,
        shipping,
        itsaVariation,
      }) => ({
        value,
        label: (
          <div className="flex items-center space-x-2">
            {title === 'color' ? (
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: meta }}
              />
            ) : img && typeof img === 'object' && 'url' in img && img.url ? (
              <img
                src={img.url}
                alt={img.name || 'Image'}
                className="w-6 h-6 rounded-full"
              />
            ) : null}
            <span>
              <span>{namn || t(value)}</span>
              <span style={{ padding: '0 8px' }}> - </span>
              {sale_price > 0 ? (
                <>
                  <span style={{ color: '#ff6666' }}>
                    {formatWithSeparator(sale_price)}{' '}
                    {location?.currency === 'SEK' ? 'kr' : location?.currency}
                  </span>{' '}
                  <s>
                    {formatWithSeparator(price)}{' '}
                    {location?.currency === 'SEK' ? 'kr' : location?.currency}
                  </s>
                </>
              ) : (
                `${formatWithSeparator(price)} ${location?.currency === 'SEK' ? 'kr' : location?.currency
                }`
              )}
            </span>
          </div>
        ),
        price,
        sale_price,
        img,
        sku,
        option,
        produktvariation,
        itsaVariation,
        _id,
        shipping,
      })
    );


  const currentSelectedOption = options.find((opt) => opt.value === selectedValue) || null;
  console.log(currentSelectedOption)
  const handleChange = (selected: SingleValue<typeof options[number]>) => {
    if (!selected) {
      setSelectedValue('');
      onClick({
        id: undefined,
        group: title,
        productName: null,
        price: -clicked[title]?.price || 0,
        customOrder: false,
        value: null,
        produktvariation: false,
        option: false,
        deselected: true,
      });
      return;
    }

    setSelectedValue(selected.value);

    const imageUrl =
      selected.img && typeof selected.img === 'object' && 'url' in selected.img
        ? selected.img.url
        : typeof selected.image === 'object' && 'original' in selected.image
          ? selected.image.original
          : null;

    onClick({
      id: selected._id,
      group: title,
      productName: selected.value,
      price: /* selected.sale_price > 0 ? selected.sale_price :  */selected.price,
      sale_price: selected.sale_price,
      customOrder: false,
      value: selected.value,
      itsaVariation: selected.itsaVariation,
      produktvariation: selected.produktvariation || false,
      name: title === 'color' ? title : undefined,
      url: imageUrl,
      sku: selected.sku || null,
      option: selected.option || false,
      shipping: selected.shipping,
      deselected: false,
    });
  };

  // Skicka onClick med initialt valt värde vid mount
  useEffect(() => {
    if (initialSelectedAttribute) {
      const imgUrl =
        initialSelectedAttribute.img && typeof initialSelectedAttribute.img === 'object' && 'url' in initialSelectedAttribute.img
          ? initialSelectedAttribute.img.url
          : typeof initialSelectedAttribute.image === 'object' && 'original' in initialSelectedAttribute.image
            ? initialSelectedAttribute.image.original
            : null;

      onClick({
        id: initialSelectedAttribute._id,
        group: title,
        productName: initialSelectedAttribute.value,
        price:
          initialSelectedAttribute.sale_price > 0
            ? initialSelectedAttribute.sale_price
            : initialSelectedAttribute.price,
        sale_price: initialSelectedAttribute.sale_price,
        customOrder: false,
        value: initialSelectedAttribute.value,
        itsaVariation: initialSelectedAttribute.itsaVariation,
        produktvariation: initialSelectedAttribute.produktvariation || false,
        name: title === 'color' ? title : undefined,
        url: imgUrl,
        sku: initialSelectedAttribute.sku || null,
        option: initialSelectedAttribute.option || false,
        shipping: initialSelectedAttribute.shipping,
        deselected: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetInputFields]);

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize flex items-center">
        {t(title) !== title ? t(title) : titleNew}



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
            {/* <FaInfoCircle className="text-gray-400 cursor-pointer" />

            {isTooltipOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white text-gray-700 text-sm border border-gray-200 rounded shadow-md p-4 z-10">
                <button
                  className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTooltipOpen(false);
                  }}
                  aria-label="Close tooltip"
                >
                  <FaTimes />
                </button>
                <p>
                  {attributes.some((attr) => !attr.variation)
                    ? truncateText(productAttribute.description?.[i18n.language] || '', 130)
                    : ''}
                </p>
              </div>
            )} */}
          </div>
        )}
      </h3>

      <Select
        classNamePrefix="react-select"
        options={options}
        onChange={handleChange}
        value={currentSelectedOption}
        /* isClearable={true} */
        styles={customStyles}
        placeholder={t('select_placeholder')}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value}
        aria-label={title}
        isSearchable={false}
      />
    </div>
  );
};

// Hjälpfunktion för att trunca text (kan läggas utanför komponenten)
function truncateText(htmlContent: string, limit: number) {
  const textContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');
  return textContent.length > limit ? `${textContent.substring(0, limit)}...` : textContent;
}
