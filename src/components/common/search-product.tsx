import Link from '@components/ui/link';
import Image from 'next/image';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
type SearchProductProps = {
  item: any;
  searchTerm: string;
};


// --- Highlight-komponent ---
const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight) return <>{text}</>;
  if (!text) return null;

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 rounded px-1">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const SearchProduct: React.FC<SearchProductProps> = ({ item, searchTerm }) => {
  const [location, setLocation] = useState<{ currency: string } | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

  const { price, basePrice } = usePrice({
    amount: item.sale_price ? item.sale_price : item.price,
    baseAmount: item.price,
    currencyCode: location?.currency,
  });


  const stripHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?._id}`}
      className="flex items-center justify-start w-full h-auto group flex-col"
    >
      <div className="flex items-center justify-start w-full h-auto group">
        <div className="relative flex flex-shrink-0 w-16 h-16 md:w-24 md:h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer ltr:mr-4 rtl:ml-4">
          <Image
            src={item?.image?.original && item.image.original.trim() !== ''
              ? item.image.original
              : '/assets/placeholder/search-product.svg'}
            width={96}
            height={96}
            loading="eager"
            alt={item.name || 'Product Image'}
            className="object-cover bg-gray-200"
          />
        </div>



        <div className="flex flex-col w-full overflow-hidden">
          {/* Produktnamn */}
          <h3 className="mb-2 text-sm truncate text-heading">
            <HighlightedText text={item.name} highlight={searchTerm} />
          </h3>

          {/* Beskrivning */}
          {item.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              <HighlightedText text={stripHTML(item.description)} highlight={searchTerm} />
            </p>
          )}

          {item.compadibleWithProduct?.length > 0 && (<div className='hidden md:block mt-2'>
            {/* Compatible Products */}<p className="mt-0 text-xs ">{t('common:compadibleWith')}</p>

            <div className="flex flex-wrap gap-2 mt-1.5">

              {item.compadibleWithProduct.map((prod: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  style={{ backgroundColor: "#3BE49D", color: "white" }}
                >
                  <HighlightedText text={prod} highlight={searchTerm} />
                </span>
              ))}
            </div>
          </div>)}

          {/* Pris */}
          <div className="text-sm font-semibold text-heading flex gap-2 mt-2">
            {price}
            {basePrice && (
              <del className="font-normal text-gray-400">{basePrice}</del>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full overflow-hidden block md:hidden">


        {item.compadibleWithProduct?.length > 0 && (<div className='block md:hidden mt-2'>
          <p className="mt-0 text-xs">{t('common:compadibleWith')}</p>

          <div className="flex flex-wrap gap-2 mt-1.5">

            {item.compadibleWithProduct.map((prod: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200 "
              >
                <HighlightedText text={prod} highlight={searchTerm} />
              </span>
            ))}
          </div></div>
        )}


      </div>
    </Link>
  );
};

export default SearchProduct;
