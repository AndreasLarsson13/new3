import Link from '@components/ui/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { IoIosCloseCircle } from 'react-icons/io';
import Counter from '@components/common/counter';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import { useTranslation } from 'next-i18next';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t, i18n } = useTranslation('common');
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

  console.log(item)


  const { price, discount, basePrice } = usePrice({

    amount: item.sale_price ? item.sale_price : item.price,
    baseAmount: item.price,
    /*  currencyCode: item.currency,  */ // Byt framöver
    currencyCode: "EUR",
  });


  const { price: totalPrice, discount: discounttotalPrice, basePrice: basePricetotalPrice } = usePrice({
    amount: item.itemTotalSale && item.itemTotalSale > 0 ? item.itemTotalSale : item.itemTotal,

    baseAmount: item.itemTotal,
    /*    currencyCode: item.currency, */  // Byt framöver
    currencyCode: "EUR",
  });

  console.log(basePrice, price)

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
      title={item?.name}
    >
      <div className="relative flex flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer md:w-28 md:h-28 ltr:mr-4 rtl:ml-4">
        <Image
          src={item?.image?.original ? item?.image?.original : item.image /* : '/assets/placeholder/cart-item.svg' */}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-fit bg-gray-300"
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <Link
          href={`${ROUTES.PRODUCT}/${item?.linkId}`}
          className="truncate text-sm text-heading mb-1.5 -mt-1"
        >
          {generateCartItemName(item.name, item.attributes)}
        </Link>
        {/* @ts-ignore */}
        {item.variationName ? `Variation : ${item.variationName}` : ''}

        {item.attributes.lenght > 0 ?? item.attributes.map((extraAdded, index) => (
          extraAdded.id === "color" ?
            <span className="text-sm rtl:pr-3 text-gray-400" key={index}>
              {`${t(extraAdded.name)} : ${t(extraAdded.value)}`}
            </span>
            : extraAdded.img ?
              <span className="text-sm ltr:pl-3 rtl:pr-3 text-gray-400" key={index}>
                + {t(extraAdded.name)}
              </span>
              :
              <span className="text-sm ltr:pl-3 rtl:pr-3 text-gray-400" key={index}>
                + {extraAdded.value ? extraAdded.value : extraAdded.name}
              </span>


        ))}

        <span className="text-sm text-gray-400 mb-2.5">
          {t('text-unit-price')} :&nbsp;
          {price !== basePrice && discount ? (
            <>
              <span className="text-red-500">{price}</span>&nbsp;
              <del>{basePrice}</del>
            </>
          ) : (
            <>{price}</>
          )}
        </span>

        <div className="flex items-end justify-between">
          <Counter
            quantity={item.quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.id)}
            variant="dark"
          />
          <span className="text-sm font-semibold leading-5 md:text-base text-heading">
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
    </motion.div>
  );
};

export default CartItem;
