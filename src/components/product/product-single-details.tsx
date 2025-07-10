import React, { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/common/counter';
import { useRouter } from 'next/router';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem, generateCartItemOptions } from '@utils/generate-cart-item';
import { ProductAttributes } from './product-attributes';
import { ProductOptionAttributes } from './product-option-attributes';
import isEmpty from 'lodash/isEmpty';
import Link from '@components/ui/link';
import { toast } from 'react-toastify';
import { useWindowSize } from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import ProductMetaReview from '@components/product/product-meta-review';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { useTranslation } from 'next-i18next';
import { RiTyphoonLine } from 'react-icons/ri';
import { forEach, pick } from 'lodash';
import Alert from '@components/ui/alert';
import { FaInfoCircle } from 'react-icons/fa';
import ProductAccessoryOptions from './product-accessory-options'; // <--- Importera den nya komponenten



let options; // Till logikem
let textObjekt = [];

let found = false;

let AttributeArray = []


const productGalleryCarouselResponsive = {
  '768': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC = () => {

  const router = useRouter()
  const {
    query: { slug },
  } = useRouter();


  const fullPath = router.asPath;

  // Split the path by '/' to get all parts as an array
  const pathParts = fullPath.split('/')


  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { data, isLoading } = useProductQuery(slug as string,); // Ändra
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [filterDataLanguage, setfilterDataLanguage] = useState();
  const [filterDataLanguageAttributes, setFilterDataLanguageAttributes] = useState();
  const [filterDataLanguagOptions, setFilterDataLanguageOptions] = useState();
  const [additionalData, setAdditionalData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locationCurrency, setlocationCurrency] = useState(null);
  const [customOrder, setcustomOrder] = useState(false);
  const [resetInputFields, setresetInputFields] = useState(false);
  const [variationImage, setVariationImage] = useState<string | null>(null);
  const [skuNumber, setSkuNumber] = useState("")
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentSalePrice, setCurrentSalePrice] = useState(0);
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: parseInt(currentSalePrice) > 0 ? currentSalePrice : currentPrice,
      baseAmount: parseInt(currentPrice),
      currencyCode: 'EUR',
    }
  );
  const { t, i18n } = useTranslation('common');




  useEffect(() => {
    setSkuNumber(data.sku)
    setCurrentSalePrice(data.sale_price)
    setCurrentPrice(data.price)
    if (data?.gallery?.length > 0) {
      setVariationImage(data.gallery[activeIndex].original);
    }
  }, [data, activeIndex]);





  function formatWithSeparator(price) {
    const formatted = price
      .toFixed(2) // Always two decimals
      .replace('.', ',') // Use comma for decimal
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Add space as thousand separator

    return formatted;
  }




  const [optionPrice, setOptionPrice] = useState(0);
  const [originalPriceExeptSale, setOriginalPriceExeptSale] = useState(0);

  /*   useEffect(() => {
      if (price !== null && price !== undefined) {
        if (data && data.sale_price <= 0) {
          setCurrentPrice(data && price);
        } else {
          setCurrentPrice(data && data.sale_price);
        }
      }
    }, [price]); */

  if (isLoading) return <p>Laddar...</p>;

  const variations = getVariations(data.variations);


  const productOptions = getVariations(data.options)


  const isSelected = !isEmpty(variations)
    ? Object.keys(variations).every((variation) => {
      const isRequired = variations[variation][0]?.required; // Check if required
      return !isRequired || attributes.hasOwnProperty(variation); // Ensure required attributes are selected
    })
    : true;

  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  function addToCart() {
    // Validate required fields
    const missingRequiredFields = Object.keys(variations).filter((variation) => {
      const isRequired = variations[variation][0]?.required;
      return isRequired && (!attributes[variation] || attributes[variation] === null);
    });

    if (missingRequiredFields.length > 0) {
      setFieldErrors(missingRequiredFields);
      toast.error(t('common:text-please-select-required-options'), {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    setFieldErrors([]);

    // Show loader
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);

    // Get stored location
    const storedLocation = JSON.parse(localStorage.getItem('clickedLocation'));

    // Generate the cart item


    console.log(data)
    const item = generateCartItem(data, attributes, AttributeArray, currentPrice, storedLocation);
    console.log(item)

    // Debugging: Check the item before adding
    // Add to cart

    if (data.variations.length === 0) {

      addItemToCart(item, quantity)


    }
    let variationPrice = 0
    let combinedIds = ""
    if (AttributeArray.length > 0) {
      let int = 0

      AttributeArray.forEach(itemAttributes => {
        if (!itemAttributes.itsaVariation) {

          int++

          const test = generateCartItemOptions(itemAttributes)
          addItemToCart(test, 1)
        }
        else {

          /* variationPrice += itemAttributes.sale_price > 0 ? itemAttributes.sale_price : itemAttributes.price */
          item.name = `${item.name} - ${itemAttributes.value}`
          item.variationName = itemAttributes.value
          item.id = itemAttributes.id
          /*  */
          item.sale_price = itemAttributes.sale_price

          combinedIds += `${itemAttributes.id}_`
          item.image = variationImage
          item.sku = itemAttributes.sku

          addItemToCart(item, quantity)
        }
      })

    }


    console.log(item)


    AttributeArray = [];

    // Display success message
    toast.success(t('common:text-added-to-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width > 768 ? 'bottom-right' : 'top-right',
      autoClose: 2000,
    });
    setresetInputFields(true)


    setTimeout(() => {
      setAddToCartLoader(false);
      setresetInputFields(false); // Reset back to false after clearing
      if (data.sale_price > 0) {
        setCurrentSalePrice(data.sale_price); // Use sale price plus attribute prices if no variation
        setOptionPrice(0)
        setOriginalPriceExeptSale(data.price)
      } else {
        setCurrentPrice(data.price); // Use default price plus attribute prices
        setOptionPrice(0)
      }
    }, 500);

  }


  function handleAttribute(attribute: any, variation: any, attribut: any) {


    console.log(attribute.id)

    const index = AttributeArray.findIndex((attr) => attr.group === attribute.group);





    // Update or remove the attribute in AttributeArray
    const shouldRemove = attribute.value === false || attribute.id === undefined;

    console.log(attribute)



    if (index !== -1) {
      if (!shouldRemove) {
        // Update existing attribute
        AttributeArray[index] = attribute;
      } else {
        // Remove the attribute
        AttributeArray.splice(index, 1);
      }
    } else {
      if (!shouldRemove) {
        // Add new attribute
        AttributeArray.push(attribute);
      }
    }


    // Check if any `produktvariation` is selected
    const hasProduktvariation = AttributeArray.some((attr) => attr.itsaVariation === true);
    console.log(hasProduktvariation)
    // Calculate the total price based on selected attributes

    let totalProduct = 0;
    let totalSaleProduct = 0;
    let totalOptionProduct = data.price;
    let totalOptionSaleProduct = data.price;
    let totalPriceExeptSalePrice = 0;

    console.log(AttributeArray)
    AttributeArray.forEach((attr) => {

      console.log(AttributeArray)

      if (hasProduktvariation) {

        totalSaleProduct += (attr.sale_price > 0 && attr.sale_price) || 0;
        totalProduct += attr.price || 0;
      }
      /* totalProduct += attr.price || 0; */
      if (!hasProduktvariation) {

        totalOptionSaleProduct += attr.sale_price > 0 ? attr.sale_price : attr.price || 0;
        console.log(attr)

        console.log(totalOptionSaleProduct)

        totalOptionProduct += attr.price || 0;
      }
      console.log(totalProduct)
      totalPriceExeptSalePrice += attr.price || 0
    });



    // Update currentPrice based on the selection
    if (hasProduktvariation) {

      setCurrentPrice(totalProduct)
      setCurrentSalePrice(totalSaleProduct)
      console.log(totalSaleProduct, totalProduct)

      setSkuNumber(attribute.sku)
      setOriginalPriceExeptSale(totalPriceExeptSalePrice);
      // Use total product price if a product variation is selected
    }


    if (!hasProduktvariation) {
      setCurrentPrice(totalOptionProduct)
      setCurrentSalePrice(totalOptionSaleProduct)
      console.log(totalProduct)
      setOptionPrice(totalProduct)
      setOriginalPriceExeptSale(totalPriceExeptSalePrice)
    }

    // Update the gallery image based on the selected attribute
    if (attribute.itsaVariation) {

      // Set the gallery's active image to the variation's image
      data.gallery[activeIndex].original = attribute.url;
      setVariationImage(attribute.url)
    }

    // Update the attributes state
    setAttributes((prev) => ({
      ...prev,
      attribute,
    }));
  }

  const handleClick = (index: number) => {
    if (data?.gallery?.[index]) {
      setVariationImage(data.gallery[index].original); // Uppdatera huvudbilden
      setActiveIndex(index); // Uppdatera aktivt index (om du använder det någon annanstans)
    }
  };


  const categoryPath = data?.categoryPaths[0]?.split('/') || [];

  const breadcrumbs = categoryPath.reduce(
    (acc, cat, index) => {
      const path = `${acc.currentPath}/${cat}`;
      acc.currentPath = path;

      acc.breadcrumbs.push(
        <div key={index} className="inline-flex items-center">
          <Link
            href={`/store/${path}`}
            className="transition hover:underline hover:text-heading"
          >
            {t(`menu:${cat}`)}
          </Link>
          {index < categoryPath.length - 1 && (
            <span className="text-heading inline-block pr-1 pl-1">{'>'}</span>
          )}
        </div>
      );

      return acc;
    },
    { currentPath: '', breadcrumbs: [] as JSX.Element[] }
  ).breadcrumbs;


  return (
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
      {width < 1025 ? (
        <Carousel
          pagination={{
            clickable: true,
          }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          buttonGroupClassName="hidden"
        >
          {data?.gallery?.map((item, index: number) => (
            <SwiperSlide key={`product-gallery-key-${index}`}>
              <div className="col-span-1 transition duration-150 ease-in hover:opacity-90 max-h-[400px]">
                <img
                  src={data.gallery[activeIndex]?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                  alt={`${data?.name}--${activeIndex}`}
                  className="w-auto h-full max-h-[402px] min-h-[402px] transition duration-150 ease-in hover:opacity-90"
                />

              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      ) :
        (
          <div className="col-span-4 grid grid-cols-1 gap-2.5">
            <div className="col-span-1 overflow-hidden flex justify-center">
              <img
                src={variationImage ?? '/assets/placeholder/products/product-gallery.svg'}
                alt={`${data?.name}--${activeIndex}`}
                className="w-auto h-full max-h-[402px] min-h-[402px] transition duration-150 ease-in hover:opacity-90 "
              />
            </div>
            <div className="col-span-1 overflow-x-auto flex space-x-2.5 mt-2.5">
              {data?.gallery?.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-24 h-24 flex justify-center items-center overflow-hidden transition duration-150 ease-in hover:opacity-90 cursor-pointer"
                  onClick={() => handleClick(index)}

                >
                  <img
                    src={item?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                    alt={`${data?.name}--${index}`}
                    className="object-fit w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      <div className="col-span-5 pt-8 lg:pt-0">
        <div className={`${variations.length > 0 ? 'pb-7 mb-7 border-b border-gray-300' : 'pb-7'}`}>
          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {data?.name}
          </h2>
          {
            <div className="description-content" dangerouslySetInnerHTML={{ __html: data.description[i18n.language] }} />
          }

        </div>

        {variations && Object.keys(variations).length > 0 && <div className={`${productOptions ? 'pb-5 border-b border-gray-300' : ''}`}>
          {/* <h3 className="text-base md:text-lg text-heading font-semibold capitalize pb-3">Variationer</h3> */}
          {Object.keys(variations).map((variation) => {

            return (
              <ProductAttributes
                key={variation}
                title={variation}
                attributes={variations[variation]}
                active={attributes[variation]}
                clicked={attributes}
                fieldErrors={fieldErrors}
                onClick={(attribute: any) => handleAttribute(attribute, variation, attributes[variation])}
                resetInputFields={resetInputFields}
              />
            );
          })}
        </div>}

        {productOptions && Object.keys(productOptions).length > 0 && <div className="pb-3 border-b border-gray-300 pt-5">
          <h3 className="text-base md:text-lg text-heading font-semibold capitalize pb-3">Tillbehör</h3>

          {Object.keys(productOptions).map((option) => {

            return (
              <ProductOptionAttributes
                key={option}
                title={option}
                attributes={productOptions[option]}
                active={attributes[option]}
                clicked={attributes}
                fieldErrors={fieldErrors}
                onClick={(attribute: any) => handleAttribute(attribute, option, attributes[option])}
                resetInputFields={resetInputFields}
              />
            );
          })}
        </div>}


        <div className="flex items-center mt-5">
          <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">

            {/* {(currentPrice === 0 && optionPrice === 0)
              ? price
              : formatWithSeparator(currentPrice === 0 ? parseInt(price) + optionPrice : currentPrice + optionPrice)
            } */}

            {/*  {optionPrice > 0 ? formatWithSeparator(parseInt(data.price) + optionPrice) : price} */} {/* {price} */}
            {/* {currentPrice} */}
            <div className={`font-bold ${currentSalePrice > 0 ? 'text-red-600 text-xl md:text-2xl lg:text-3xl 2xl:text-5xl' : 'text-heading text-base md:text-xl lg:text-2xl 2xl:text-4xl'}`}>
              {price}
            </div>
          </div>

          <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">

            {basePrice}

          </span>
        </div>
        <div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48  py-8">
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
            variant="slim"
            className={`w-full md:w-6/12 xl:w-full ${!isSelected && 'bg-gray-400 hover:bg-gray-400'
              } ${customOrder && 'bg-green-400'} `}
            disabled={!isSelected}
            loading={addToCartLoader}
          >
            <span className="py-2 3xl:px-8">{customOrder ? t("text-add-to-cart-special") : t("text-add-to-cart")}</span>
          </Button>
        </div>

        <div className="flex items-center pb-7 space-x-2 border-b border-gray-300">
          <h3 className="text-base md:text-lg text-heading font-semibold capitalize">
            Förväntad leveranstid:
          </h3>
          <p className="text-gray-400">{data?.deliveryTime}</p>
          <div className="relative group">
            <FaInfoCircle className="text-gray-400 cursor-pointer" />
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-white text-gray-700 text-sm border border-gray-200 rounded shadow-md p-2">
              Vi strävar efter att leverera din produkt inom den angivna tidsramen, men leveranstider kan variera beroende på produktens tillgänglighet och ditt val av leveransmetod.
            </div>
          </div>
        </div>
        <div className="py-6">
          <ul className="text-sm space-y-5 pb-1">
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                {t('text-sku')}
              </span>
              {skuNumber}
            </li>
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                {t('text-category')}:
              </span>
              {breadcrumbs}


            </li>

          </ul>
        </div>

        <ProductMetaReview data={data.meta} />
      </div>
    </div >
  );
};

export default ProductSingleDetails;
