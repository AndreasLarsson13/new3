import { useProductQuery } from '@framework/product/get-product';
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

export default function ProductPage() {
	const router = useRouter();
	const { itemId, slug } = router.query;


	const fullPath = router.asPath;

	// Split the path by '/' to get all parts as an array
	const pathParts = fullPath.split('/')
	// Use the useProductQuery to fetch data based on itemId
	const { data: product, isLoading, error } = useProductQuery(slug as string,);

	if (isLoading) return <p>Laddar...</p>;
	if (error) return <p>Error loading product data</p>;


	return (
		<>
			<Divider className="mb-0" />
			<Container>
				<div className="pt-8">
					<Breadcrumb product={product} />
				</div>
				<ProductSingleDetails product={product} />
				<RelatedProducts productRelated={product} sectionHeading="text-related-products" />
				<Subscription />
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
