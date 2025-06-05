import { CheckBox } from '@components/ui/checkbox';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFilteredData } from './../../FilteredDataContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const { filteredData, filtersData } = useFilteredData();
	const selectedPrice = query?.price || '';

	const [formState, setFormState] = useState<string[]>(selectedPrice ? selectedPrice.split(',').filter(Boolean) : []);
	const [isOpen, setIsOpen] = useState<boolean>(false);


	// Calculate number of products in each price range


	useEffect(() => {
		// Update form state when the query changes
		setFormState(selectedPrice ? selectedPrice.split(',').filter(Boolean) : []);
	}, [selectedPrice]);

	const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const updatedState = formState.includes(value)
			? formState.filter(range => range !== value)
			: [...formState, value];

		const newQuery = { ...query };

		if (updatedState.length > 0) {
			newQuery.price = updatedState.join(',');
		} else {
			delete newQuery.price; // ✅ Explicitly remove price if empty
		}

		router.push(
			{
				pathname,
				query: newQuery,
			},
			undefined,
			{ scroll: false }
		);
	};
	;
	console.log(filtersData.priceRanges)
	const togglePriceFilter = () => {
		setIsOpen(prevState => !prevState);
	};
	console.log(filtersData.priceRanges)

	return (
		<div className="block border-b border-gray-300 pb-5 mb-7">
			<h3
				className="text-heading text-sm md:text-base font-semibold mb-3 cursor-pointer flex items-center space-x-2"
				onClick={togglePriceFilter}
			>
				{/* Toggle Icon */}
				{isOpen ? (
					<FaChevronUp className="text-primary" />
				) : (
					<FaChevronDown className="text-primary" />
				)}
				<span>{t("text-price")}</span>
			</h3>
			{isOpen && (
				<div className="mt-2 flex flex-col space-y-4">

					{filtersData.priceRanges?.map((range) => {
						const value = `${range.min}-${range.max}`;
						const isChecked = formState.includes(value);

						return (
							<CheckBox
								key={value}
								label={
									<span className="flex items-center">
										<span className="w-4 h-4 border-2 border-primary rounded-sm mr-3"></span> {/* Custom checkbox design */}
										{`${range.label} (${range.count})`}
									</span>
								}
								name="price"
								value={value}
								checked={isChecked}
								onChange={handlePriceRangeChange}
								className="mb-2 text-sm text-gray-800"  // Custom text and spacing
							/>

						);
					})}
				</div>
			)}
		</div>
	);
};
