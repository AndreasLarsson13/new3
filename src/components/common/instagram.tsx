import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import http from "@framework/utils/http";
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface InstagramData {
  id: number;
  title: string;
  slug: string;
  image: string;
}

const Instagram: React.FC = () => {
  const { t } = useTranslation('common');
  const [instagramFeed, setInstagramFeed] = useState<InstagramData[]>([]);

  useEffect(() => {
    const fetchInstagram = async () => {
      try {
        const { data } = await http.get("http://localhost:3100/instagram");
        const updatedInstagramFeed = data.slice(0, 12).map((item: any, index: number) => ({
          id: item.id,
          title: item.caption,
          slug: "/#",
          image: item.media_url
        }));
        setInstagramFeed(updatedInstagramFeed);
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      }
    };

    fetchInstagram();
  }, []);


  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 sm:gap-1 overflow-hidden">
      {instagramFeed.map((item) => (
        <a className="group flex justify-center text-center relative" href={item.slug} key={`instagram--key${item.id}`} target="_blank">
          <Image
            src={item.image || '/assets/placeholder/instagram.svg'}
            alt={t(`${item.title}`) || t('text-instagram-thumbnail')}
            width={300}
            height={300}
            className={cn('bg-gray-300 object-cover', {
              'rounded-md': true,
            })}
          />
          <div className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-50 bg-black" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <FaInstagram className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default Instagram;
