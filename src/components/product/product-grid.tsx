import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";
import { useEffect, useState } from "react";
import { useFilteredData } from './../../FilteredDataContext';
import { has } from "lodash";

interface ProductGridProps {
	className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { t, i18n } = useTranslation("common");
	const { query, route } = useRouter();
/* 	console.log(useRouter())
 */	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		data,
		error,
	} = useProductsQuery({ limit: 10, ...query, route });
	if (error) return <p>{error.message}</p>;

	const { filteredData, setFilteredData } = useFilteredData();

	useEffect(() => {
		if (!isLoading && data) {
			const filterProducts = (products, categoryQuery, priceQuery, colorQuery, brandQuery) => {
				if (!products || !Array.isArray(products)) {
					return [];
				}

				// Parse category query
				const categoryList = categoryQuery ? categoryQuery.split(',').map((cat) => cat.trim()) : [];

				// Parse color query
				const colorList = colorQuery ? colorQuery.split(',').map((color) => color.trim()) : [];

				// Parse price query
				const priceRanges = priceQuery ? priceQuery.split(',').map((range) => {
					const [min, max] = range.split('-').map((value) => parseInt(value.trim(), 10));
					return { min, max };
				}) : [];

				// Parse brand query
				const brandList = brandQuery ? brandQuery.split(',').map((brand) => brand.trim()) : [];

				return products.filter((product) => {
					// Check category filter
					const isInCategory = !categoryList.length || (
						product.category &&
						product.category.length &&
						product.category.some(cat =>
							categoryList.includes(cat.slug) ||
							(cat.child && cat.child.some(childCat =>
								categoryList.includes(childCat.slug) ||
								(childCat.child && childCat.child.some(grandChildCat =>
									categoryList.includes(grandChildCat.slug) ||
									(grandChildCat.child && grandChildCat.child.some(greatGrandChildCat =>
										categoryList.includes(greatGrandChildCat.slug)
									))
								))
							))
						)
					);


					// Check price filter
					const isInPriceRange = !priceRanges.length || priceRanges.some(({ min, max }) => {
						const price = parseFloat(product.price); // Assuming product.price is a string representation of price
						return price >= min && price <= max;
					});

					// Check color filter
					const isInColor = !colorList.length || (
						colorList.length === 1
							? product.variations.some((variation) => colorList.includes(variation.value))
							: colorList.every((color) => product.variations.some((variation) => color === variation.value))
					);

					// Check brand filter
					const isInBrand = !brandList.length || brandList.includes(product.brand);

					// Return true if the product matches all filters
					return isInCategory && isInPriceRange && isInColor && isInBrand;
				});
			};

			// Example usage
			const filteredProducts = filterProducts(
				data?.pages[0]?.data,
				query.category,
				query.price,
				query.color,
				query.brand
			);

			setFilteredData(filteredProducts);
		}
	}, [isLoading, data]);

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !filteredData?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					filteredData?.map((product: Product) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							variant="grid"
						/>
					))
				)}
			</div>
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
