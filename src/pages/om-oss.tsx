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
    <><PageHeader pageHeader="text-page-about" />
      <Container>
        <div className="py-5 lg:py-13 px-0 max-w-5xl mx-auto space-y-4 min-h-[320px]">
          <p className='text-center	'>{t("about")}</p>

          <img src="https://media.istockphoto.com/id/1460717515/photo/maarianhamina-city-summer-01.jpg?s=2048x2048&w=is&k=20&c=Y9QZHK7zL5ZpSjkdkeWNQzbDcfxuJK2jhCPbmB77AKo=" alt="" srcset="" />

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
