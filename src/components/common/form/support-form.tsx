import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { useTranslation } from 'next-i18next';
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useState } from 'react';

interface ContactFormValues {
  name: string;
  email: string;
  orderId: string;
  type: string;
  message: string;
  produktNamn: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<string>(''); // State to track the selected type
  const [formStatus, setformStatus] = useState()
  const [errorStatus, seterrorStatus] = useState(false)
  const [countDown, setcountDown] = useState(10)

  function onSubmit(values: ContactFormValues) {

    http.post(API_ENDPOINTS.SUPPORT_FORM, values).then(resp => {
      if (resp.status = 200) {
        seterrorStatus(false)
        setformStatus(t("forms:supportFormSucess"))
        const timeout = setTimeout(() => {
          setformStatus("");
        }, 10000);
      }
      else {
      }
    }).catch(error => {
      if (error.message === "Network Error") {
        setformStatus(t("forms:networkError"))
        seterrorStatus(true)
      }

      const interval = setInterval(() => {
        setcountDown(prevCountDown => {
          if (prevCountDown > 1) {
            return prevCountDown - 1;
          } else {
            clearInterval(interval);
            setcountDown(10)
            return 0;
          }
        });
      }, 1000);

      const timeout = setTimeout(() => {
        setformStatus("");

      }, 10000);



    });
  }

  function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedType(event.target.value);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={formStatus ? "hidden" : "w-full mx-auto flex flex-col justify-center max-w-xl"}
        noValidate
      >
        <div className="flex flex-col space-y-5">
          <select
            {...register('type', { required: 'forms:type-required' })}
            onChange={handleTypeChange}
            className="py-2 border rounded-md border-gray-300 md:px-5"
            value={selectedType}
          >
            <option value="">{t("forms:selectSuppport")}</option>
            <option value="reklamation">{t("forms:reklamation")}</option>
            <option value="prisförfrågan">{t("forms:reqularQUestion")}</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}

          {selectedType && (
            <>
              <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                <Input
                  labelKey="forms:label-name-required"
                  placeholderKey="forms:placeholder-name"
                  {...register('name', { required: 'forms:name-required' })}
                  className="w-full md:w-1/2"
                  errorKey={errors.name?.message}
                  variant="solid"
                />
                <Input
                  labelKey="forms:label-email-required"
                  type="email"
                  placeholderKey="forms:placeholder-email"
                  {...register('email', {
                    required: 'forms:email-required',
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'forms:email-error',
                    },
                  })}
                  className="w-full md:w-1/2 ltr:md:ml-2.5 rtl:md:mr-2.5 ltr:lg:ml-5 rtl:lg:mr-5 mt-2 md:mt-0"
                  errorKey={errors.email?.message}
                  variant="solid"
                />
              </div>

              {selectedType === "reklamation" && (
                <>
                  <Input
                    labelKey="forms:support-produktNamn"
                    {...register('produktNamn', { required: 'forms:orderId-required' })}
                    className="relative"
                    placeholderKey="forms:support-produktNamn"
                    errorKey={errors.produktNamn?.message}
                    variant="solid"
                  />
                  <Input
                    labelKey="forms:support-orderId"
                    {...register('orderId', { required: 'forms:produktNamn-required' })}
                    className="relative"
                    placeholderKey="forms:support-orderId"
                    errorKey={errors.produktNamn?.message}
                    variant="solid"
                  />
                </>
              )}

              <TextArea
                labelKey="forms:label-message"
                {...register('message')}
                className="relative mb-4"
                placeholderKey="forms:placeholder-message"
              />
              <div className="relative">
                <Button
                  type="submit"
                  className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                >
                  {t('common:button-send-message')}
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
      <p className={`${formStatus ? `text-xl text-center py-6 ${errorStatus ? 'text-red-500' : 'text-lime-500'}` : `hidden`}`}>{formStatus}{countDown < 10 && countDown}</p>
    </>
  );
};

export default ContactForm;
