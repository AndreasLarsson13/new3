import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	console.log(data)
	const [expanded, setExpanded] = useState<number>(0);
	return (
		<>
			{data && data?.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					pdf={item.PDF}
					translatorNS="review"
					tecnical={item.tecnical}
					content={
						/* item.PDF ? (item.PDF.title.se) : */
						data?.length === item.id ? (
							<>
								{item.content} <ReviewForm />
							</>
						) : (
							item.content
						)
					}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
