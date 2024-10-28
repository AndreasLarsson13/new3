import { useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import PageHeader from '@components/ui/page-header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function ContactUsPage() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageHeader pageHeader="text-page-about" />
      <Container>
        <div className="py-5 lg:py-13 px-0 max-w-5xl mx-auto space-y-4 min-h-[320px]">
          <p className='text-center'>{t("about")}</p>

          {/* FAQ Dropdown */}
          <div className="text-center">
            <h2
              className="cursor-pointer text-lg font-semibold"
              onClick={toggleDropdown}
            >
              Eruf projekt {isOpen ? '▲' : '▼'}
            </h2>
            {isOpen && (
              <div className="mt-2">
                <p>
                  Då inte bara vi tror på vikten att underlätta för handel på Åland, vi tror på att tillsammans är man starka och vi kan genom detta erbjuda slutkunderna prisvärda produkter.
                </p>
                <img src="/assets/images/eubild.png" alt="EU Bild" />
              </div>
            )}
          </div>
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
