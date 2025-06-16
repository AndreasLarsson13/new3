import { useTranslation } from 'next-i18next';
import { FaInfoCircle, FaLink, FaTimes } from 'react-icons/fa';
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
  onClick: (val: any) => void;
  clicked: any;
  fieldErrors: string[];
}

export const ProductOptionAttributes: React.FC<Props> = ({
  className = 'mb-2',
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
  const [selectedValue, setSelectedValue] = useState<string>(active);
  const hasError = fieldErrors.includes(title);

  const truncateText = (htmlContent: string, limit: number) => {
    const textContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');
    return textContent.length > limit ? `${textContent.substring(0, limit)}...` : textContent;
  };

  const formatWithSeparator = (price: number) => {
    return price
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace('.', ',');
  };

  useEffect(() => {
    if (resetInputFields) {
      setSelectedValue('');
    }
  }, [resetInputFields]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltipOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const titleNew = "dadyaw8y!" /* attributes[0]?.group || attributes[0]?.translation?.[i18n.language] || title */;
  const productAttribute = attributes.find((attr) => attr.product);

  return (
    <div className={className}>


      <div className={`flex flex-col space-y-2 ${hasError ? 'border border-red-500 p-2 rounded' : ''}`}>
        {attributes
          .filter(({ mainObject }) => !mainObject)
          .map((attr) => {
            const isChecked = selectedValue === attr.value;
            return (
              <label
                key={attr._id}
                className={`flex items-center cursor-pointer space-x-2 p-2 rounded hover:bg-gray-100 ${isChecked ? 'bg-blue-100' : ''
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    const newValue = isChecked ? '' : attr.value; // Avmarkera om redan vald
                    setSelectedValue(newValue);

                    onClick({
                      id: newValue ? attr._id : '',
                      group: title,
                      productName: newValue,
                      price: newValue ? attr.price : -clicked[title]?.price || 0,
                      sale_price: attr.sale_price,
                      customOrder: attr.customOrder || false,
                      value: newValue,
                      itsaVariation: attr.itsaVariation,
                      produktvariation: attr.produktvariation || attr.variation || false,
                      name: title === 'color' ? title : attr.translation?.[i18n.language],
                      url: typeof attr.img === 'object' ? attr.img.url : typeof attr.image === 'object' ? attr.image.original : '',
                      sku: attr.sku || '',
                      option: attr.option || false,
                      shipping: attr.shipping || 0,
                      deselected: !newValue,
                    });
                  }}
                />
                {title === 'color' ? (
                  <span
                    className="inline-block w-5 h-5 rounded-full border"
                    style={{ backgroundColor: attr.meta }}
                  />
                ) : typeof attr.img === 'object' && attr.img?.url ? (
                  <img src={attr.img.url} alt={attr.img.name || 'Image'} className="w-6 h-6 rounded-full" />
                ) : null}
                <span>
                  {attr.namn || t(attr.value)}{' '}
                  <span className="px-2">-</span>{' '}
                  {attr.sale_price > 0 ? (
                    <>
                      <span className="text-red-500">{formatWithSeparator(attr.sale_price)} €</span>
                      <s className="ml-1">{formatWithSeparator(attr.price)} €</s>
                    </>
                  ) : (
                    `${formatWithSeparator(attr.price)} €`
                  )}
                </span>
                {/*   {productAttribute && (
                  <div
                    className="relative group ml-2"
                    onMouseEnter={() => setTooltipOpen(true)}
                    onMouseLeave={() => setTooltipOpen(false)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTooltipOpen(!isTooltipOpen);
                    }}
                    ref={tooltipRef}
                  >
                    <FaInfoCircle className="text-gray-400 cursor-pointer" />
                    {isTooltipOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-white text-gray-700 text-sm border border-gray-200 rounded shadow-md p-4 z-10">
                        <button
                          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTooltipOpen(false);
                          }}
                        >
                          <FaTimes />
                        </button>

                        {productAttribute.translation?.[i18n.language] && (
                          <p className="mb-2 font-bold">{truncateText(productAttribute.translation[i18n.language], 25)}</p>
                        )}

                        <p className="mb-2">
                          {productAttribute.description?.[i18n.language]
                            ? truncateText(productAttribute.description[i18n.language], 50)
                            : 'Detta är ett fält du måste fylla i'}
                        </p>

                        <a
                          href={`/products/${productAttribute._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 flex items-center mt-2"
                        >
                          <FaLink className="mr-1" /> Gå till produktsidan
                        </a>
                      </div>
                    )}
                  </div>
                )} */}
                <a
                  href={`/products/${productAttribute._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 flex items-center "
                >
                  <FaLink className="mr-1" /> Gå till produktsidan
                </a>
              </label>
            );
          })}
      </div>
    </div>
  );
};
