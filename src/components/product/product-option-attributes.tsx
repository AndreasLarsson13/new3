import { useTranslation } from 'next-i18next';
import { FaLink } from 'react-icons/fa';
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
  clicked: { [key: string]: any };
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
  const [selectedValue, setSelectedValue] = useState<string>(active);
  const hasError = fieldErrors.includes(title);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resetInputFields) {
      setSelectedValue('');
    }
  }, [resetInputFields]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        // Additional tooltip logic can go here if needed
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatWithSeparator = (price: number) =>
    price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');

  const productAttribute = attributes.find((attr) => attr.product);

  return (
    <div className={className}>
      <div className={`flex flex-col space-y-2 ${hasError ? 'border border-red-500 p-2 rounded' : ''}`}>
        {attributes
          .filter(({ mainObject }) => !mainObject)
          .map((attr) => {
            const isChecked = selectedValue === attr.value;

            const handleChange = () => {
              const newValue = isChecked ? '' : attr.value;
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
                url:
                  typeof attr.img === 'object'
                    ? attr.img.url
                    : typeof attr.image === 'object'
                      ? attr.image.original
                      : '',
                sku: attr.sku || '',
                option: attr.option || false,
                shipping: attr.shipping || 0,
                deselected: !newValue,
              });
            };

            return (
              <label
                key={attr._id}
                className={`flex items-center cursor-pointer space-x-2 p-2 rounded hover:bg-gray-100 ${isChecked ? 'bg-blue-100' : ''
                  }`}
              >
                <input type="checkbox" checked={isChecked} onChange={handleChange} />

                {title === 'color' ? (
                  <span className="inline-block w-5 h-5 rounded-full border" style={{ backgroundColor: attr.meta }} />
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

                {productAttribute && (
                  <a
                    href={`/products/${productAttribute._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 flex items-center ml-2"
                  >
                    <FaLink className="mr-1" /> Gå till produktsidan
                  </a>
                )}
              </label>
            );
          })}
      </div>
    </div>
  );
};
