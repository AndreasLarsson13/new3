import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { useCheckoutMutation } from '@framework/checkout/use-checkout';
import { CheckBox } from '@components/ui/checkbox';
import Button from '@components/ui/button';
import { useEffect, useState } from 'react';
import http from "@framework/utils/http";
import { useLocalStorage } from "@utils/use-local-storage";

import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
  orderData: object;
  country: string;
}


const defaultCheckoutValues: CheckoutInputType = {
  firstName: 'Andreas',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  save: false,
  note: '',
  orderData: {},
  country: 'Åland' // Default to an empty string if location is null
};

const CheckoutForm: React.FC = ({ checkoutContainerId, setklarnaisopen, setbillingInfo }) => {
  const [cosyNew, setCozyNew] = useLocalStorage('chawkbazar-cart', [])

  const { t } = useTranslation();
  const { mutate: updateUser, isPending } = useCheckoutMutation();
  /* const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInputType>(); */
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInputType>({
    defaultValues: defaultCheckoutValues
  });
  const [location, setLocation] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);
  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

  const fetchSnippet = async (input: CheckoutInputType) => {
    const rawCart = localStorage.getItem('chawkbazar-cart');
    const productsCart = rawCart ? JSON.parse(rawCart) : [];



    /*     const productsCart = JSON.parse(localStorage.getItem('chawkbazar-cart') || '[]');
     */

    input.orderData = productsCart;
    input.country = location.name

    const text = {
      "firstName": "Test",
      "lastName": "Person-fi",
      "address": "Mannerheimintie 34",
      "phone": "+358401234567",
      "email": "customer@email.fi",
      "city": "Helsinki",
      "zipCode": "00100",
      "country": "FI",
      "note": "",
      "orderData": JSON.parse(productsCart)
    }

    const config = {
      headers: {
        'Authorization': 'Bearer your-token-here',  // Add your authorization token if necessary
        'Content-Type': 'application/json'          // Set the correct content type
      }
    };

    /*     https://service-dot-natbutiken.lm.r.appspot.com/open-payment-session,
    http://localhost:8088
        
     */
    try {
      const response = await http.post('http://localhost:8080/open-payment-session', text, config);
      console.log(response.data);

      if (response && response.data) {
        const htmlSnippet = response.data;
        const checkoutContainer = document.getElementById(checkoutContainerId);
        checkoutContainer.innerHTML = htmlSnippet;

        const scriptTags = checkoutContainer.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          const parentNode = scriptTags[i].parentNode;
          const newScriptTag = document.createElement('script');
          newScriptTag.type = 'text/javascript';
          newScriptTag.text = scriptTags[i].text;
          parentNode.removeChild(scriptTags[i]);
          parentNode.appendChild(newScriptTag);

          setklarnaisopen(true);
          setbillingInfo(true);
        }
      } else {
        throw new Error('Failed to fetch HTML snippet');
      }
    } catch (error) {
      console.error('Error fetching HTML snippet:', error);
    }
  };


  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t('text-shipping-address')}
      </h2>
      <form
        onSubmit={handleSubmit(fetchSnippet)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="forms:label-address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register('phone', {
                required: 'forms:phone-required',
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:label-city"
              {...register('city')}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="forms:label-postcode"
              {...register('zipCode')}
              variant="solid"
              className="w-full lg:w-1/2 ltr:lg:ml-3 rtl:lg:mr-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="forms:Country"
              value={location?.name}
              {...register('country')}
              variant="solid"
              readOnly
              className="w-full lg:w-1/2 cursor-not-allowed"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="forms:label-save-information" />
          </div>
          <TextArea
            labelKey="forms:label-order-notes"
            {...register('note')}
            placeholderKey="forms:placeholder-order-notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isPending}
              disabled={isPending}
            >
              {t('common:button-place-order')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;



