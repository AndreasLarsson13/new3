import { CategoryFilter } from "./category-filter";
import { BrandFilter } from "./brand-filter";
import { FilteredItem } from "./filtered-item";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";



export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const { t } = useTranslation("common");
	const filteredQuery = Object.fromEntries(
		Object.entries(query).filter(([key]) => key !== "slug")
	);


	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							const newQuery: Record<string, string> = {};
							if (query.q) {
								newQuery.q = query.q.toString();
							}

							const pathname = Array.isArray(query.slug)
								? `/store/${query.slug.join("/")}`
								: "/";

							router.push({
								pathname,
								query: newQuery,
							});
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(filteredQuery) &&
						Object.values(filteredQuery)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(filteredQuery).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

			{/* 		<CategoryFilter />*/}
			<BrandFilter />
			<PriceFilter />
			<ColorFilter />
		</div>
	);
};
