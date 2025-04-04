import { useTranslation } from 'next-i18next';
import Select from 'react-select';
import { FaInfoCircle, FaLink, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import usePrice from '@framework/product/use-price';




interface Props {
  className?: string;
  title: string;
  attributes: {
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
    url?: string; // Add URL for the link
    namn: string;
    group: string;
    variation: boolean;
    mainObject?: boolean; // Key to hide options
    required?: boolean; // Indicates if the input is required
    sku: string;
    option: boolean;
    produktvariation: boolean;
    image: { original: string; } | string;
    _id: string;
    shipping: number;

  }[];
  resetInputFields: boolean;
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
  resetInputFields
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


  function formatWithSeparator(price) {
    if (price < 1000) {
      return price.toFixed(2).replace('.', ','); // Ensure two decimals & replace '.' with ','
    } else if (price >= 1000) {
      return price
        .toFixed(2) // Remove decimals
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ','); // Add spaces as thousand separators
    }
    return price.toString(); // Default for numbers between 100 and 999 (no changes)
  }

  useEffect(() => {
    if (resetInputFields) {
      setSelectedValue(''); // Clear selected value
    }
  }, [resetInputFields]);

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


/*   console.log(attributes)
 */  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize flex items-center">
        {t(title) !== title ? t(title) : titleNew}

        {/* Add an asterisk for required inputs */}
        {attributes.some((attr) => attr.variation) && (
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

                {attributes.some((attr) => !attr.variation) && <p className="mb-2">
                  <strong>{truncateText(productAttribute.translation[i18n.language], 25)}</strong>
                </p>}

                <p className="mb-2">
                  {attributes.some((attr) => !attr.variation) && productAttribute.description &&
                    <span>{truncateText(productAttribute.description[i18n.language], 50)}</span>
                  }
                  {attributes.some((attr) => attr.variation) &&
                    <span>{"Detta är ett fält du måste fylla i"}</span>
                  }
                </p>



                {attributes.some((attr) => !attr.variation) && <a
                  href={`/products/${productAttribute._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex items-center mt-2"
                >
                  <FaLink className="mr-1" /> Gå till produktsidan
                </a>}
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
          .map(({ value, meta, price, img, namn, variation, sku, option, produktvariation, image, _id, id, shipping, sale_price }) => ({

            value,
            variation,
            img,
            sku,
            option,
            produktvariation,
            id,
            _id,
            shipping,
            sale_price,
            label: (
              <div className="flex items-center space-x-2">
                {title === 'color' ? (
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: meta }}
                  ></span>
                ) : (
                  img &&
                  typeof img === 'object' &&
                  img.url && ( // Check if img.url is not empty
                    <img src={img.url} alt={img.name || 'Image'} className="w-6 h-6 rounded-full" />
                  )
                )}
                <span>
                  {<span>{namn ? namn : t(value)}</span>}
                  {<span style={{ padding: "0 8px" }}> - </span>}
                  {sale_price > 0 ? (
                    <>
                      <span style={{ color: "#ff6666" }}>{formatWithSeparator(sale_price)} €</span> <s>{formatWithSeparator(price)} €</s>
                    </>
                  ) : (
                    `${formatWithSeparator(price)} €`
                  )}
                </span>

              </div>
            ),
            price,
          }))}
        styles={customStyles} // Apply custom styles
        value={attributes
          .filter(({ mainObject }) => !mainObject)
          .map((attr) => ({
            value: attr.value,
            label: t(`${attr.value}`) ? t(`${attr.value}`) : attr.value,

          }))
          .find((option) => option.value === selectedValue) || null}
        onChange={(selectedOption) => {
          const newValue = selectedOption ? selectedOption.value : null;
          const newPrice = selectedOption ? selectedOption.price : 0;


          // Check if selectedOption has an img URL before trying to access it
          const imageUrl = selectedOption
            ? selectedOption.img?.url || selectedOption.image?.original || null
            : null;
/*           console.log(selectedOption)
 */          const sku = selectedOption && selectedOption.sku ? selectedOption.sku : null;
          console.log(selectedOption)
          const option = selectedOption && selectedOption.option ? selectedOption.option : null;
          /*           console.log("selected", variationsssss)
           */        /*   console.log(variationsssss) */
          setSelectedValue(newValue); // Update local state for this specific attribute

          onClick({
            id: selectedOption?._id, // Måste Ändras påverkar prisuppdateing
            group: title,
            productName: newValue,
            price: newValue ? newPrice : -clicked[title]?.price || 0, // Pass -price if deselected
            sale_price: selectedOption?.sale_price,
            customOrder: selectedOption?.customOrder || false,
            value: newValue,
            produktvariation: selectedOption?.produktvariation || selectedOption?.variation || false,
            name: title === 'color' ? title : selectedOption?.translation?.se,
            url: imageUrl, // Use the URL only if img exists
            sku: sku,
            option: option || false,
            shipping: selectedOption?.shipping,
            deselected: !selectedOption, // Add this flag to indicate deselection
          });
        }}

      />


    </div>
  );
};
