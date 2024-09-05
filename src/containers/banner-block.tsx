import BannerCard from '@components/common/banner-card';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';



interface BannerProps {
  data: any
  className?: string
}


const BannerBlock: React.FC<BannerProps> = ({
  data,
  className = 'mb-12 md:mb-14 xl:mb-16 px-2.5',

}) => {
  const { t } = useTranslation('common'); // Place it inside the functional component
  const test = t('bannersTop', { returnObjects: true });


  data.forEach((item, index) => {

    item.image.desktop.url = test[index].desktop
    item.image.mobile.url = test[index].mobile
  });

  return (
    <div
      className={`${className} grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto`}
    >
      {data.map((banner: any) => (
        <BannerCard
          key={`banner--key${banner.id}`}
          banner={banner}
          href={`search?q=${banner.slug}`}
          effectActive={true}
          variant='default'
          className={
            banner.type === 'medium'
              ? 'col-span-full sm:col-span-5'
              : 'col-span-1 sm:col-span-2'
          }
        />
      ))}
    </div>
  )
}

export default BannerBlock
