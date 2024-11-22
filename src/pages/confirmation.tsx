import { useEffect, useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import PageHeader from '@components/ui/page-header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ConfirmationPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const order_id = "22f8728b-e298-487d-9428-bae15f216a18"; // Replace with dynamic extraction when ready
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!order_id) return;

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/confirmation?order_id=${order_id}`);
        setOrderDetails(response.data.orderDetails);
        console.log(response.data.orderDetails)
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Could not fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_id]);

  if (loading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[320px] py-10">
          <div className="loader w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-medium text-gray-700 mt-4">{t('text-loading')}</h1>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[320px] py-10">
          <h1 className="text-xl font-bold text-red-500">{t('text-error')}</h1>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* <PageHeader pageHeader="text-order-confirmation" /> */}
      <Container>
        <div className="py-10 px-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg border border-gray-300">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {t('text-order-confirmed')}
          </h1>
          <p className="text-center text-gray-600 mb-6">
            {t('text-thank-you')} {/* {t('text-your-order')} <span className="font-semibold text-gray-800">{order_id}</span> {t('text-has-been-confirmed')} .*/}
          </p>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-3">{t('text-order-details')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>{t('text-total')}:</strong> {(orderDetails.order_amount / 100).toFixed(2)} {orderDetails.purchase_currency}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>{t('text-tax')}:</strong> {(orderDetails.order_tax_amount / 100).toFixed(2)} {orderDetails.purchase_currency}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <strong>{t('text-payment-method')}:</strong> Klarna Checkout
                </p>
                <p className="text-sm text-gray-600">
                  <strong>{t('text-date')}:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-800 mb-3">{t('text-items')}</h3>
            <ul className="divide-y divide-gray-200">
              {orderDetails.order_lines.map((item: any, index: number) => (
                <li key={index} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{t('quantity')}: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600"><strong>{t('text-unit-price')}:</strong> {(item.unit_price / 100).toFixed(2)} {orderDetails.purchase_currency}</p>
                    <p className="text-sm text-gray-600"><strong>{t('text-tax')}:</strong> {(item.total_tax_amount / 100).toFixed(2)} {orderDetails.purchase_currency}</p>
                    <p className="text-sm text-gray-600"><strong>{t('text-total')}:</strong> {(item.total_amount / 100).toFixed(2)} {orderDetails.purchase_currency}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <Subscription />
        </div>
      </Container>
    </>
  );
}

ConfirmationPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
