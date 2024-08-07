import React, { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/common/counter';
import { useRouter } from 'next/router';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { ProductAttributes } from './product-attributes';
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
import { pick } from 'lodash';


let options; // Till logikem
let textObjekt = [];

let found = false;



const productGalleryCarouselResponsive = {
  '768': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();





  /*   const productId = pathname.split('/products/')[1]?.split('/')[0];
   */
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { data, isLoading } = useProductQuery(slug as string,);
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [filterDataLanguage, setfilterDataLanguage] = useState();
  const [filterDataLanguageAttributes, setFilterDataLanguageAttributes] = useState();
  const [additionalData, setAdditionalData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locationCurrency, setlocationCurrency] = useState(null);




  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: 'SEK',
    }
  );
  const { t, i18n } = useTranslation('common');






  useEffect(() => {

    const location = JSON.parse(localStorage.getItem('clickedLocation'))
    setlocationCurrency(location)
    /*     const countyCode = i18n.language
     */
    if (!isLoading && data && data.meta) {
      // Kontrollera om datan har laddats och om den innehåller meta-information
      const translatedData = data.meta.map((item) => {
        // Hämta översättningen för titeln baserat på språknyckeln
        const countyCode = i18n.language

        let translatedContent;

        if (!item.PDF) {
          translatedContent = item.content[countyCode]
        }
        const translatedTitle = item.title[countyCode]



        // Returnera en kopia av objektet med den översatta titeln
        return { ...item, title: translatedTitle, content: translatedContent };
      });
      setfilterDataLanguage(translatedData);
    }




    if (!isLoading && data) {
      // Loop through each item in the variations array
      let dataNew = []
      data.variations.forEach((item) => {
        // Hämta översättningen för titeln baserat på språknyckeln
        const countyCode = i18n.language;

        const translatedName = item.attribute.name[countyCode];
        const translatedSlug = item.attribute.slug[countyCode];
        const translatedValue = item.value[countyCode];
        // Create a new object or deep clone the item object to avoid modifying the original
        const newItem = {
          ...item,
          attribute: { ...item.attribute, name: translatedName, slug: translatedSlug },
          value: translatedValue // Deep clone the attribute object
        };


        // Push the modified item to the dataNy array
        dataNew.push(newItem)
      });
      setFilterDataLanguageAttributes(dataNew)

    }






  }, [data, i18n.language]);



  /*   setfilterDataLanguage(data) */

  const [currentPrice, setCurrentPrice] = useState();

  useEffect(() => {
    if (price !== null && price !== undefined) {
      console.log(discount && discount)
      if (data && data.sale_price <= 0) {
        setCurrentPrice(data && data.price);
      } else {
        setCurrentPrice(data && data.sale_price);
      }
    }
  }, [price]);


  if (isLoading) return <p>Loading...</p>;


  const variations = getVariations(filterDataLanguageAttributes);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) =>
      attributes.hasOwnProperty(variation)
    )
    : true;

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);
    console.log(data!)
    const storedLocation = JSON.parse(localStorage.getItem('clickedLocation'));
    console.log(storedLocation)
    const item = generateCartItem(data!, attributes, currentPrice, storedLocation);
    console.log(item)
    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width > 768 ? 'bottom-right' : 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }


  function handleAttribute(attribute: any, tva: any, attribut: any) {


    let totalProduct = 0; //pris attribut

    if (typeof attribute.price === "number") {
      console.log("Not same value")

      // Check if the array is not empty
      if (textObjekt.length > 0) {
        let found = false;

        // Iterate over each item in the array
        textObjekt.forEach(item => {
          // Check if the item has the same type as the specified type (tva)
          if (item.type === tva) {
            // If found, update the priceAtt of the existing object

            item.priceAtt = attribute.price;
            found = true; // Set found to true
          }
        });
        // If the specified type (tva) was not found in the array, push a new object
        if (!found) {
          textObjekt.push({ type: tva, priceAtt: attribute.price });
        }
      } else {
        // If the array is empty, directly push a new object
        textObjekt.push({ type: tva, priceAtt: attribute.price });
      }
      textObjekt.forEach(obj => {
        console.log(obj)
        totalProduct += parseInt(obj.priceAtt);
      });


      if (data.sale_price > 0) {
        setCurrentPrice(data.sale_price + totalProduct)
      } else {
        setCurrentPrice(data.price + totalProduct)
      }

    }

    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }







  const handleClick = (index) => {
    setActiveIndex(index);
  };

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
                  src={
                    item?.original ??
                    '/assets/placeholder/products/product-gallery.svg'
                  }
                  alt={`${data?.name}--${index}`}
                  className="object-cover w-full h-full max-h-[400px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      ) : /* original ( 
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {data?.gallery?.map((item, index: number) => (
            <div
              key={index}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              <img
                src={
                  item?.original ??
                  '/assets/placeholder/products/product-gallery.svg'
                }
                alt={`${data?.name}--${index}`}
                className="object-cover w-full max-h-80"
              />
            </div>
          ))}
        </div>
      ) */
        (
          <div className="col-span-4 grid grid-cols-1 gap-2.5">
            <div className="col-span-1">
              <img
                src={data.gallery[activeIndex]?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                alt={`${data?.name}--${activeIndex}`}
                className="object-cover w-full max-h-[500px] min-h-[500px] transition duration-150 ease-in hover:opacity-90"
              />
            </div>
            <div className="col-span-1 overflow-x-auto flex space-x-2.5 mt-2.5">
              {data?.gallery?.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-24 h-24 transition duration-150 ease-in hover:opacity-90 cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  <img
                    src={item?.original ?? '/assets/placeholder/products/product-gallery.svg'}
                    alt={`${data?.name}--${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      <div className="col-span-5 pt-8 lg:pt-0">
        <div className="pb-7 mb-7 border-b border-gray-300">
          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {data?.name}
          </h2>
          <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
            {data.description.se}
          </p>
          <div className="flex items-center mt-5">
            <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
              {currentPrice}{locationCurrency.currency === "SEK" ? "kr" : locationCurrency.currency}
            </div>
            {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">
                {basePrice}
              </span>
            )}
          </div>
        </div>

        <div className="pb-3 border-b border-gray-300">
          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={variation}
                title={variation}
                attributes={variations[variation]}
                active={attributes[variation]}
                clicked={attributes}
                onClick={(attribute: any) => handleAttribute(attribute, variation, attributes[variation])}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48  border-b border-gray-300 py-8">
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
              }`}
            disabled={!isSelected}
            loading={addToCartLoader}
          >
            <span className="py-2 3xl:px-8">{t("text-add-to-cart")}</span>
          </Button>
        </div>
        <div className="py-6">
          <ul className="text-sm space-y-5 pb-1">
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                {t('text-sku')}
              </span>
              {data?.sku}
            </li>
            <li>
              <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                {t('text-category')}:
              </span>
              <Link
                href="/"
                className="transition hover:underline hover:text-heading"
              >
                {data?.category?.name}
              </Link>
            </li>
            {data?.tags && Array.isArray(data.tags) && (
              <li className="productTags">
                <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                  {t('text-tags')}:
                </span>
                {data.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={tag.slug}
                    className="inline-block ltr:pr-1.5 rtl:pl-1.5 transition hover:underline hover:text-heading ltr:last:pr-0 rtl:last:pl-0"
                  >
                    {tag.name}
                    <span className="text-heading"></span>
                  </Link>
                ))}
              </li>
            )}
          </ul>
        </div>

        <ProductMetaReview data={filterDataLanguage} />
      </div>
    </div>
  );
};

export default ProductSingleDetails;
