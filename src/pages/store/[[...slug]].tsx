import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import ShopDiscount from '@components/shop/discount';
import { ShopFilters } from '@components/shop/filters';
import { MenuFilterDropdown } from '@components/shop/menuFilterpage';
import StickyBox from 'react-sticky-box';
import { ProductGrid } from '@components/product/product-grid';
import SearchTopBar from '@components/shop/top-bar';
import ActiveLink from '@components/ui/active-link';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { FilteredDataProvider } from '../../FilteredDataContext';
import { useRouter } from 'next/router';

// Main Shop Page Component
export default function Shop({ slugData }) {
    const { t } = useTranslation();
    const { query } = useRouter();

    return (
        <>
            <ShopDiscount />
            <FilteredDataProvider>
                <Container>
                    <div className={`flex pt-8 pb-16 lg:pb-20`}>
                        <div className="flex-shrink-0 ltr:pr-24 rtl:pl-24 hidden lg:block w-96">
                            <StickyBox offsetTop={50} offsetBottom={20}>
                                <div className="pb-7">
                                    <BreadcrumbItems separator="/">
                                        {/* Dynamic Breadcrumb based on slug */}



                                        {slugData?.slug.map((slug, index) => (
                                            <span key={index}>
                                                {slug}
                                                {index < slugData?.slug.length - 1}
                                            </span>
                                        ))}
                                        {/* <a>{t('breadcrumb-home')}</a> */}

                                    </BreadcrumbItems>
                                </div>
                                <MenuFilterDropdown />
                                <ShopFilters />
                            </StickyBox>
                        </div>

                        <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
                            <SearchTopBar />
                            <ProductGrid />
                        </div>
                    </div>
                    <Subscription />
                </Container>
            </FilteredDataProvider>
        </>
    );
}

// Layout for this page
Shop.Layout = Layout;

// getStaticPaths: Generate paths for dynamic routes (e.g., /butik/kamin/nerad)
export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch possible paths for slug (replace with your dynamic data)
    const paths = [
        { params: { slug: ['butik', 'kamin'] } },
        { params: { slug: ['butik', 'kamin', 'nerad'] } },
        { params: { slug: ['butik', 'kamin', 'nerad', 'nendn'] } },
        // Add more paths based on your data structure
    ];

    return {
        paths,
        fallback: 'blocking', // Make sure the page is generated if it's not in the build paths
    };
};

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