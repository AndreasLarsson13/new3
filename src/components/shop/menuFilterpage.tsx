import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import menuData from "../../settings/menu";
import { useTranslation } from 'next-i18next';



interface MenuItemProps {
	item: any;
	level?: number;
	isSubChild?: boolean;
	handleNavigate: (path: string) => void;
	currentPath: string;
}

const menu = menuData.unfiledsMenu;

const MenuItem: React.FC<MenuItemProps> = ({
	item,
	level = 0,
	isSubChild = false,
	handleNavigate,
	currentPath,
}) => {
	const [open, setOpen] = useState(currentPath.includes(item.slug));
	const indent = `pl-${level * 2}`;
	const { t } = useTranslation('common');
	const toggleOpen = () => setOpen((prev) => !prev);
	const isActive = currentPath.includes(item.slug);

	return (
		<div className="mb-1">
			<div
				className={`cursor-pointer flex items-center justify-between ${indent} py-1 hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
					}`}
				onClick={toggleOpen}
			>
				<span onClick={() => handleNavigate(item.path)} className={`${open ? "font-semibold text-heading" : "font-medium"
					}`}>
					{t(`menu:${item.label}`)}
				</span>
				{(item.columnItemItems || item.subMenu) && (
					<span className="ml-1 text-lg">{open ? "−" : "+"}</span>
				)}
			</div>

			{/* Nested items */}
			{open && item.columnItemItems && (
				<div className="transition-all duration-300 ease-in-out">
					{item.columnItemItems.map((child: any, index: number) => (
						<MenuItem
							key={index}
							item={child}
							level={level + 1}
							handleNavigate={handleNavigate}
							currentPath={currentPath}
						/>
					))}
				</div>
			)}

			{/* Submenu items */}
			{open && item.subMenu && (
				<div className="ml-2 text-sm text-gray-600 transition-all duration-300 ease-in-out">
					{item.subMenu.map((sub: any, index: number) => (
						<div
							key={index}
							onClick={() => handleNavigate(sub.path)}
							className="cursor-pointer py-0.5 hover:text-blue-500"
						>
							{sub.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const MenuFilterDropdown: React.FC = () => {
	const router = useRouter();
	const currentPath = router.asPath;

	const handleNavigate = useCallback(
		(path: string) => {
			router.push(path);
		},
		[router]
	);

	return (
		<div className="pt-1 max-w-md">
			<div className="border-b border-gray-300 pb-7 mb-7">
				<h2 className="font-semibold text-heading text-xl md:text-2xl mb-4">
					Kategorier
				</h2>

				<div className="space-y-1">
					{menu
						.filter((element) => currentPath.includes(element.slug))
						.map((element, index) => (
							<MenuItem
								key={index}
								item={{
									label: element.slug,
									path: `/store/${element.slug}`,
									columnItemItems: element.child?.map((child, i) => ({
										label: child.slug,
										path: `/store/${element.slug}/${child.slug}`,
										columnItemItems: child.child?.map((subChild, j) => ({
											label: subChild.slug,
											path: `/store/${element.slug}/${child.slug}/${subChild.slug}`,
											subMenu: subChild.child?.map((subSub, k) => ({
												label: subSub.slug,
												path: `s/tore/${element.slug}/${child.slug}/${subChild.slug}/${subSub.slug}`,
											})),
										})),
									})),
								}}
								handleNavigate={handleNavigate}
								currentPath={currentPath}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
