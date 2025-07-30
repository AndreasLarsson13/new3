import { Item } from '@contexts/cart/cart.utils';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const [location, setLocation] = useState<{ currency: string } | null>(null);
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

  /* const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: location?.currency || 'EUR', // Default to 'EUR' if location is unavailable
  }); */


  const { price: totalPrice, discount: discounttotalPrice, basePrice: basePricetotalPrice } = usePrice({
    amount: item.itemTotalSale && item.itemTotalSale > 0 ? item.itemTotalSale : item.itemTotal,

    baseAmount: item.itemTotal,
    currencyCode: location?.value,
  });

  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      {/* Product Image */}
      <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
        <img
          src={
            item.image?.original
            ?? item.image
            ?? '/assets/placeholder/cart-item.svg'
          }
          alt={item.name || 'Product Image'}
          className="object-fit w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ltr:pl-3 rtl:pr-3">
        {/* Product Name */}
        <h6 className="text-sm font-medium text-heading truncate">
          {generateCartItemName(item.name, item.attributes)}
        </h6>

        {/* Attributes */}
        <div className="flex flex-col">
          {item.attributes.lenght > 0 ?? item.attributes.map((extraAdded, index) => (
            extraAdded.id === 'color' ? (
              <h6
                className="text-sm text-gray-400"
                key={index}
              >
                {`${t(extraAdded.name)} : ${t(extraAdded.value)}`}
              </h6>
            ) : extraAdded.img ? (
              <h6
                className="text-sm text-gray-400"
                key={index}
              >
                + {t(extraAdded.name)}
              </h6>
            ) : (
              <h6
                className="text-sm text-gray-400"
                key={index}
              >
                + {extraAdded.translationName
                  ? extraAdded.translationName[i18n.language]
                  : extraAdded.namn || extraAdded.value}
              </h6>
            )
          ))}
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex items-center ltr:ml-auto rtl:mr-auto text-heading text-sm gap-5">
        <span>x {item.quantity}</span>



        <span className="text-sm  leading-5 md:text-base text-heading">
          {/* {totalPrice} */}
          {totalPrice !== basePricetotalPrice && discounttotalPrice ? (
            <>
              <span className="text-red-500">{totalPrice}</span>&nbsp;
              <del>{basePricetotalPrice}</del>
            </>
          ) : (
            <>{totalPrice}</>
          )}
        </span>
      </div>
    </div>
  );
};
