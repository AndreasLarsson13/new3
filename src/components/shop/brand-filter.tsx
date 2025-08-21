import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFilteredData } from './../../FilteredDataContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importera pilikoner

export const BrandFilter = () => {
	const { filteredData, filtersData } = useFilteredData();
	const { t } = useTranslation("common");
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, error } = useBrandsQuery({
		limit: 10,
	});

	const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedBrands);
	const [isOpen, setIsOpen] = React.useState<boolean>(false); // State för att toggla öppning/stängning

	useEffect(() => {
		setFormState(selectedBrands);
	}, [query?.brand]);

	if (isLoading) return <p>Laddar...</p>;
	if (error) return <p>{error.message}</p>;

	// Hantera varumärkesfilterändringar
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

	// Filtrera varumärken baserat på produkter


	const arrayProductBrands = filtersData.brands && filtersData.brands.map((item: any) => item.brand);



	/* 	const finalFilteredItems = data.filter((item) =>
			arrayProductBrands.includes(item.brand)
		); */
	const toggleBrandFilter = () => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<div className="block border-b border-gray-300 pb-5 mb-7">
			<h3
				className="text-heading text-sm md:text-base font-semibold mb-3 cursor-pointer flex items-center space-x-2"
				onClick={toggleBrandFilter}
			>
				{/* Pilikoner för öppning/stängning */}
				{isOpen ? (
					<FaChevronUp className="text-primary" />
				) : (
					<FaChevronDown className="text-primary" />
				)}
				<span>{t("text-brands")}</span>
			</h3>
			{isOpen && (
				<div className="mt-2 flex flex-col space-y-4">
					{arrayProductBrands.map((item: any) => (
						<CheckBox
							key={item}
							label={item}
							name={item}
							checked={formState.includes(item)}
							value={item}
							onChange={handleItemClick}
						/>
					))}
				</div>
			)}
		</div>
	);
};
