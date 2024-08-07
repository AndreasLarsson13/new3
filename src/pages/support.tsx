import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import PageHeader from '@components/ui/page-header';
import SupportForm from '@components/common/form/support-form';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function ContactUsPage() {
  const { t } = useTranslation('common');
  return (
    <><PageHeader pageHeader="text-page-support" />
      <Container>
        <div className="py-5 lg:py-13 px-0 max-w-5xl mx-auto space-y-4 min-h-[320px]">

          <SupportForm />


        </div>
        <Subscription />
      </Container>
    </>
  );
}

ContactUsPage.Layout = Layout;

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
