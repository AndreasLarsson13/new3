import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { useFilteredData } from './../../FilteredDataContext';

export const CategoryFilter = () => {

	const { filteredData } = useFilteredData();
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;

	const { data, isLoading } = useCategoriesQuery({
		limit: 10
	});



	const selectedCategories = query?.category
		? (query.category as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);

	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.category]);

	if (isLoading) return <p>Laddar...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { category, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { category: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}


	//Filter category
	let arrayProduct = []



	filteredData.forEach(item => {

		item.category.forEach(categoryItem => {

			// If the current item's slug doesn't match the query slug
			if (categoryItem.child) {
				if (categoryItem.child[0].child) {
					if (categoryItem.child[0].child[0].child) {
						if (
							query.category?.includes(categoryItem.child[0].child[0].child[0].slug) ||
							query.q === categoryItem.child[0].child[0].slug
						) {
							arrayProduct.push(categoryItem.child[0].child[0].child[0].slug);
						} else {
							arrayProduct.push(categoryItem.child[0].child[0].slug);
							arrayProduct.push(categoryItem.child[0].child[0].child[0].slug);
						}
					} else {
						if (
							query.category?.includes(categoryItem.child[0].child[0].slug) ||
							query.q === categoryItem.child[0].slug
						) {
							arrayProduct.push(categoryItem.child[0].child[0].slug);
						} else {
							arrayProduct.push(categoryItem.child[0].slug);
							arrayProduct.push(categoryItem.child[0].child[0].slug);
						}
					}
				} else {
					arrayProduct.push(categoryItem.child[0].slug);
				}
			}



		})

	})

/* 	console.log(arrayProduct)
 */	const items = data?.categories.data; //test
	const finalFilteredItems = items.filter((item) => {
		if (true) {
			return arrayProduct.includes(item.slug)
		}
	});



	console.log("HEJSAN", finalFilteredItems)

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-category")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{finalFilteredItems?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={"item.name.toLowerCase()"}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
