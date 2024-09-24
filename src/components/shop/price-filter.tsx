import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useFilteredData } from './../../FilteredDataContext';

export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPriceRange = query?.price ? (query.price as string).split("-") : [];
	const { filteredData } = useFilteredData();
	const [locationCurrency, setLocationCurrency] = useState(null);

	useEffect(() => {
		const location = JSON.parse(localStorage.getItem('clickedLocation'));
		setLocationCurrency(location);
	}, []);

	let highestPrice = 0;
	let lowestPrice = Infinity;

	filteredData.forEach(item => {
		if (item.price > highestPrice) {
			highestPrice = item.price * (item.vat + 1);
		}
		if (item.price < lowestPrice) {
			lowestPrice = item.price;
		}
	});

	const [minPrice, setMinPrice] = useState<number>(selectedPriceRange[0] ? parseInt(selectedPriceRange[0]) : lowestPrice);
	const [maxPrice, setMaxPrice] = useState<number>(selectedPriceRange[1] ? parseInt(selectedPriceRange[1]) : highestPrice);

	useEffect(() => {
		// Update min and max price when filteredData changes
		setMinPrice(lowestPrice);
		setMaxPrice(highestPrice);
	}, [lowestPrice, highestPrice, filteredData]);

	function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>, isMin: boolean) {
		const value = parseInt(event.target.value);
		if (isMin) {
			setMinPrice(value);
		} else {
			setMaxPrice(value);
		}
	}

	function applyPriceRange() {
		const priceRange = `${minPrice}-${maxPrice}`;
		router.push(
			{
				pathname,
				query: {
					...query,
					price: priceRange,
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-price")}
			</h3>
			<div className="mt-2">
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">
						Min: {minPrice}{locationCurrency && locationCurrency.currency === "SEK" ? "kr" : locationCurrency ? locationCurrency.currency : ""}
					</span>
					<span className="text-sm text-gray-600">
						Max: {maxPrice}{locationCurrency && locationCurrency.currency === "SEK" ? "kr" : locationCurrency ? locationCurrency.currency : ""}
					</span>
				</div>
				<input
					type="range"
					min={lowestPrice} // Dynamically set the min value
					max={highestPrice} // Dynamically set the max value
					step="10"
					value={minPrice}
					onChange={(e) => handleSliderChange(e, true)}
					className="block w-full mt-2"
				/>
				<input
					type="range"
					min={lowestPrice} // Dynamically set the min value
					max={highestPrice} // Dynamically set the max value
					step="10"
					value={maxPrice}
					onChange={(e) => handleSliderChange(e, false)}
					className="block w-full mt-2"
				/>
				<button
					onClick={applyPriceRange}
					className="mt-3 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
				>
					Filtrera
				</button>
			</div>
		</div>
	);
};
