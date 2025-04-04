import Link from '@components/ui/link';
import Image from 'next/image';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import { useState, useEffect } from 'react';
type SearchProductProps = {
  item: any;
};



const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {

  const [location, setLocation] = useState<{ currency: string } | null>(null);
/*   console.log(location?.currency)
 */  useEffect(() => {
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
  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?._id}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer ltr:mr-4 rtl:ml-4">
        <Image
          src={
            item?.image?.original ?? '/assets/placeholder/search-product.svg'
          }
          width={96}
          height={96}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-gray-200"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="mb-2 text-sm truncate text-heading">{item.name}</h3>
        <div className="text-sm font-semibold text-heading flex gap-1">
          {price}
          <del className="font-normal text-gray-400 ltr:pr-2 rtl:pl-2">
            {basePrice}
          </del>
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;
