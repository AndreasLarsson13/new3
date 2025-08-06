import Link from 'next/link';
import Image from 'next/image';
import { useWindowSize } from '@utils/use-window-size';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { useTranslation } from 'next-i18next';


interface BannerProps {
  banner: {
    image: any;
    title: string;
    text: string; // Lade till 'text' i interfacet
    type: string;
    location: string,
    slug: string
  };
  variant?: 'rounded' | 'default';
  className?: string;
  href: LinkProps['href'];
  target: string;
  disableBorderRadius?: boolean;
  type: string
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function BannerCard({
  banner,
  className,
  variant = 'rounded',
  href,
  target,
  disableBorderRadius = false,
}: BannerProps) {
  const { t } = useTranslation('menu');
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { title, image, text, type, location, slug } = banner; // Destrukturera ut 'text' här
  const selectedImage = getImage(width, image);

  // Använd en CSS-variabel för att skicka bild-URL till den inre spannen
  const textMaskStyles = {
    '--text-mask-image': `url(${selectedImage.url})`,
  };
  // Med Tailwind v3 kan vi använda inline-stilar för detta.
  // Eller en anpassad Tailwind-klass i konfigurationsfilen.
  // För enkelhets skull, låt oss använda inline-stil direkt.

  console.log(type)
  return (
    <div className={cn('relative w-full h-[200px] sm:h-[400px] ', className)} style={{ backgroundColor: "#8AD2C7" }}>
      {/* Bakgrundsbild med Next.js Image */}
      {
        type !== "rea" && <Image
          src={selectedImage.url}
          alt={title}
          fill
          className={cn('object-cover w-full h-full', {
            'rounded-md': variant === 'rounded' && !disableBorderRadius,
          })}
          priority
        />
      }


      {/* En behållare som täcker hela bilden för att maska texten */}
      {
        type && type !== "rea" && title && location === "header" && (
          <div className="absolute inset-0 z-10 flex items-end justify-start p-8">
            <div
              className="bg-white/80 p-[10px_20px] rounded"
            >
              <span
                className="font-extrabold text-2xl sm:text-3xl bg-clip-text text-transparent"
                style={{
                  /* backgroundImage: `url(${selectedImage.url})`, */
                  WebkitBackgroundClip: 'text',
                  color: '#212121e1',
                  // Viktigt: Sätt background-size och position för att matcha bilden
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {t(`${slug}`)}
              </span>
            </div>
          </div>
        )
      }
      {
        type && type === "rea" && title && (
          <div className="absolute inset-0 z-10 flex items-end justify-center items-center p-8 flex-col gap-3">
            <h3 style={{ fontFamily: "'Zooja Pro', cursive", color: "white", fontSize: "35px" }}>Upptäck</h3>
            <div
              className="bg-white/80 p-[10px_20px] rounded"
            >
              <span
                className="font-extrabold text-2xl sm:text-3xl bg-clip-text text-transparent"
                style={{

                  WebkitBackgroundClip: 'text',
                  color: '#8AD2C7',
                  // Viktigt: Sätt background-size och position för att matcha bilden
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {title}
              </span>
            </div>
            <h4 style={{ fontSize: "25px", color: "white" }}># HÖST 2025</h4>
          </div>
        )
      }
      {/* Länk över hela kortet */}
      <Link
        href={href}
        target={target}
        className="absolute inset-0 z-20"
      />
    </div >
  );
}