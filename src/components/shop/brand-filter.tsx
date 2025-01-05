import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFilteredData } from './../../FilteredDataContext';

export const BrandFilter = () => {
	const { filteredData, setFilteredData } = useFilteredData();

	const { t } = useTranslation("common");
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, error } = useBrandsQuery({
		limit: 10,
	});

	const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedBrands);

	useEffect(() => {
		setFormState(selectedBrands);
	}, [query?.brand]);

	if (isLoading) return <p>Laddar...</p>;
	if (error) return <p>{error.message}</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		const currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		setFormState(currentFormState);
		const { brand, ...restQuery } = query;
		router.push(
			{
				query: {
					...restQuery,
					...(!!currentFormState.length ? { brand: currentFormState.join(",") } : {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	// Filter brands based on products
	const arrayProductBrands = filteredData.map((item: any) => item.brand);
	const finalFilteredItems = data.filter((item) =>
		arrayProductBrands.includes(item.slug)
	);

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-brands")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{finalFilteredItems.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
