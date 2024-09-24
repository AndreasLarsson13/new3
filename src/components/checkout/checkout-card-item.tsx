import { Item } from '@contexts/cart/cart.utils';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';
import { useEffect, useState } from 'react'
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

  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: location?.currency,
  });

  console.log(item)

  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      <div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
        <img
          src={item.image ?? '/assets/placeholder/order-product.svg'}

          height="64"
          className="object-fit"
        />
      </div>
      <div>
        <h6 className="text-sm ltr:pl-3 rtl:pr-3 font-regular text-heading">
          {generateCartItemName(item.name, item.attributes)}
        </h6>

        <div className="flex flex-col">
          {item.attributes.map((extraAdded, index) => (
            extraAdded.id === "color" ?
              <h6 className="text-sm ltr:pl-3 rtl:pr-3 text-gray-400" key={index}>
                {`${t(extraAdded.name)} : ${t(extraAdded.value)}`}
              </h6> : extraAdded.img ?
                <h6 className="text-sm ltr:pl-3 rtl:pr-3 text-gray-400" key={index}>
                  + {t(extraAdded.name)}
                </h6>
                :
                <h6 className="text-sm ltr:pl-3 rtl:pr-3 text-gray-400" key={index}>
                  + {extraAdded.translationName ? extraAdded.translationName[i18n.language] : extraAdded.namn}
                </h6>

          ))}
        </div>
      </div>
      <div className="flex ltr:ml-auto rtl:mr-auto text-heading text-sm ltr:pl-2 rtl:pr-2 flex-shrink-0 gap-5">
        <span>x {item.quantity}</span>
        {price}
      </div>
    </div>
  );
};
