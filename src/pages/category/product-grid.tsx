import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useCategoryProductsQuery } from "@framework/product/get-all-category-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";
import { useEffect, useState } from "react";

import { has } from "lodash";

interface ProductGridProps {
	className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { t } = useTranslation("common");
	const { query, route } = useRouter();

	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		paginatorInfo,
		data,
		error,
	} = useCategoryProductsQuery({ limit: 12, ...query, route });


	if (error) return <p>{error.message}</p>;

	const allProducts = data?.pages.flatMap((page) => page.data) || [];
	const totalProducts = data?.pages?.[0]?.paginatorInfo?.total || 0;

	return (
		<>


			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !data?.pages?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					allProducts.map((product: Product) => (
						<ProductCard
							key={`product--key${product._id}`}
							product={product}
							variant="grid"
						/>
					))
				)}
			</div>
			{!isLoading && (
				<p className="text-sm text-center mb-4">
					{t("showing")} {allProducts.length} {t("of")} {totalProducts} {t("products")}
				</p>
			)}
			<div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)}

			</div>
		</>
	);
};

export default ProductGrid;
