import Image from "next/image";
import Link from "@components/ui/link";
import { siteSettings } from "@settings/site-settings";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
	return (
		<Link
			href={siteSettings.logo.href}
			className={`inline-flex focus:outline-none ${className}`}
			{...props}
		>
			<div className="logo">
				<Image
					src={siteSettings.logo.url}
					alt={siteSettings.logo.alt}
					width={280}
					height={60}
					loading="eager"
					style={{ width: '100%', height: 'auto' }} // Ensures responsive scaling
				/>
			</div>
		</Link>
	);
};

export default Logo;
