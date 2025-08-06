import Link from '@components/ui/link';
import Image from 'next/image';
import { useWindowSize } from '@utils/use-window-size';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { useTranslation } from 'next-i18next';
interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps['href'];
  disableBorderRadius?: boolean;
  target: string;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function BannerCard({
  banner,
  className,
  variant = 'rounded',
  effectActive = false,
  classNameInner,
  href,
  target,
  disableBorderRadius = false,
}: BannerProps) {
  const { t } = useTranslation('');
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { title, image } = banner;
  const selectedImage = getImage(width, image);
  return (
    <div className={cn(className)}>
      <Link
        href={href}

        className={cn(
          'h-full group flex justify-center relative overflow-hidden ',
          classNameInner
        )}
        style={{ backgroundColor: '#8AD2C7' }}
      >
        {banner.type !== "rea" &&
          <Image
            src={selectedImage.url}
            width={selectedImage.width}
            height={selectedImage.height}
            alt={title}
            quality={100}
            className={cn('bg-gray-300 object-cover w-full', {
              'rounded-md': variant === 'rounded' && !disableBorderRadius,
            })}
            priority={true}
          />}
        {banner.type !== "rea" && banner.location === "header" &&

          <div className="absolute inset-0 z-10 flex items-end justify-start p-4 sm:p-8  ">
            <div
              className="bg-white/80 p-[10px_20px] rounded sm:p-[10px_20px] p-[5px_10px]"
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
                {t(`menu:${banner.slug}`)}
              </span>
            </div>
          </div>

        }
        {
          banner.type === "rea" && title && (
            <div className="absolute inset-0 z-10 flex items-end justify-center items-center p-8 flex-col gap-3">
              <h3 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Zooja Pro', cursive", color: "white" }}>{t('common:discover')}</h3>
              <div
                className="bg-white/80 p-[10px_20px] rounded sm:p-[10px_20px] p-[5px_10px]"              >
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
                  {t('common:autumnSale')}
                </span>
              </div>
              <h4 className="text-1xl sm:text-3xl" style={{ color: "white" }}># HÖST 2025</h4>
            </div>
          )
        }
      </Link>
    </div>
  );
}
