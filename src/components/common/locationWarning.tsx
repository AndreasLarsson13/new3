import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { fetchProducts } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import { useUI } from '@contexts/ui.context';


export default function LocationWarning() {
	const { t } = useTranslation();
	const router = useRouter()

	const { closeModal } = useUI();



	function confirmAction(bool: boolean) {
		if (bool) {
			fetchProducts(true)
			router.push('/').then(() => router.reload());

		}
		closeModal()
	}


	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:w-[450px] md:w-[550px] lg:w-[980px] xl:w-[1170px] flex flex-col max-w-full max-h-full bg-white overflow-hidden rounded-md">
				<div className="flex items-center">
					<div className="flex flex-col px-5 py-7 sm:p-10 md:p-12 xl:p-14 text-center w-full">

						<h3 className="text-heading text-lg sm:text-xl md:text-2xl leading-8 font-bold mb-5 sm:mb-7 md:mb-9">
							{t("common:warningTextLocation")}
						</h3>
						<div className="flex justify-center	gap-10">
							<Button
								className="w-24"
								onClick={() => confirmAction(true)}>
								{t('common:yes')}
							</Button>
							<Button
								className="w-24"
								onClick={() => confirmAction(false)}>
								{t('common:no')}
							</Button>
						</div>

					</div>
				</div>
			</div>
		</div >
	);
}
