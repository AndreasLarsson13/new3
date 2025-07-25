import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import Button from '@components/ui/button';
import Counter from '@components/common/counter';
import { useCart } from '@contexts/cart/cart.context';
import { ProductAttributes } from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { useTranslation } from 'next-i18next';

export default function ProductPopup() {
  const { t } = useTranslation('common');
  const [ArrayData, setArrayData] = useState([]);  // Use state for ArrayData
  const [textObjekt, setTextObjekt] = useState([]); // Use state for textObjekt if needed

  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();

  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: any }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [customOrder, setcustomOrder] = useState(false);


  const storedLocation = JSON.parse(localStorage.getItem('clickedLocation') || '{}');

  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: storedLocation.currency,
  });

  const variations = getVariations(data.variations);
  const { slug, image, name, description } = data;

  const [currentPrice, setCurrentPrice] = useState<number>(price);

  useEffect(() => {
    if (price !== null && price !== undefined) {
      setCurrentPrice(data && (data.sale_price > 0 ? data.sale_price : data.price));
    }
  }, [price]);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation))
    : true;

  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      setViewCartBtn(true);
    }, 600);
    console.log(ArrayData)
    const item = generateCartItem(data, attributes, ArrayData, currentPrice, storedLocation);
    console.log(item)
    addItemToCart(item, quantity);
    setArrayData([])
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${data._id}/`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any, tva: any) {
    // Use functional update to immediately access the latest state
    setAttributes((prev) => ({
      ...prev,
      [tva]: attribute, // Update the specific attribute
    }));

    const updatedArray = attribute.value
      ? ArrayData.some(item => item.id === attribute.id)
        ? ArrayData.map(item => item.id === attribute.id ? attribute : item)  // Update existing attribute
        : [...ArrayData, attribute]  // Add new attribute
      : ArrayData.filter(item => item.id !== attribute.id);  // Remove attribute if value is falsy

    console.log(updatedArray)
    setArrayData(updatedArray);

    /*  let totalProduct = 0;
     updatedArray.forEach(obj => {
       totalProduct += obj.price ? parseInt(obj.price) : 0;
     }); */

    /*     setCurrentPrice(data.sale_price > 0 ? data.sale_price + totalProduct : data.price + totalProduct); //kolla
     */

    /* data?.gallery.forEach(item => {
      if (item.extraColor) {
        if (attribute.value === "green") {
          item.original = item.extraColor.green;
          data.image.original = item.extraColor.green;
        }
        if (attribute.value === "red") {
          item.original = item.extraColor.red;
          data.image.original = item.extraColor.red;
        }
        if (attribute.value === "white") {
          item.original = item.extraColor.white;
          data.image.original = item.extraColor.white;
        }
      }
    }); */

    if (attribute.customOrder) {
      setcustomOrder(true);
    } else {
      setcustomOrder(false);
    }
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          <img
            src={image?.original ?? '/assets/placeholder/products/product-thumbnail.svg'}
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div
              className="mb-2 md:mb-2.5 block -mt-1.5"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold hover:text-black">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {description}
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {currentPrice} {storedLocation.currency === "SEK" ? "kr" : storedLocation.currency}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {/*  {Object.keys(variations).map((variation) => (
            <ProductAttributes
              key={variation}
              title={variation}
              attributes={variations[variation]}
              active={attributes[variation]}
              clicked={attributes}
              onClick={(attribute: any) => handleAttribute(attribute, variation)}
            />
          ))} */}

          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
              <Counter
                quantity={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() =>
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                }
                disableDecrement={quantity === 1}
              />
              <Button
                onClick={addToCart}
                variant="flat"
                className={`w-full h-11 md:h-12 px-1.5 ${!isSelected && 'bg-gray-400 hover:bg-gray-400'}`}
                disabled={!isSelected}
                loading={addToCartLoader}
              >
                {t('text-add-to-cart')}
              </Button>
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t('text-view-cart')}
              </button>
            )}

            <Button
              onClick={navigateToProductPage}
              variant="flat"
              className="w-full h-11 md:h-12"
            >
              {t('text-view-details')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
