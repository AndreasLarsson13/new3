import { useState, useEffect } from 'react';
import Link from '@components/ui/link';
import { siteSettings } from '@settings/site-settings';
import Scrollbar from '@components/common/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useRouter } from 'next/router';
import { HiOutlineSelector } from 'react-icons/hi';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { motion, AnimatePresence } from 'framer-motion';

const { site_header } = siteSettings;

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com/nätbutiken/',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com/nätbutiken/',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

// Inställningsmenyn (separat komponent för språk- och platsväljare)
const SettingsMenu = ({ onClose, languageOptions, locationOptions, selectedLanguage, selectedLocation, handleLanguageChange, handleLocationChange, t, clearCart }) => {
  const [activeMenus, setActiveMenus] = useState<any>([]);

  const handleDropdownClick = (menuName: string) => {
    setActiveMenus((prevActiveMenus: string[]) => {
      if (prevActiveMenus.includes(menuName)) {
        return prevActiveMenus.filter((item) => item !== menuName);
      } else {
        return [...prevActiveMenus, menuName];
      }
    });
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col justify-between w-full h-full bg-white"
    >
      <div className="flex items-center justify-between flex-shrink-0 w-full px-5 py-0.5 border-b border-gray-100 md:px-7">
        <h2 className="text-xl font-bold text-gray-900">Inställningar</h2>
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={onClose}
          aria-label="close settings menu"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>
      <Scrollbar className="flex-grow mb-auto menu-scrollbar">
        <div className="flex flex-col px-5 py-7 text-heading lg:px-2">
          {/* Språk-väljare */}
          <div className="w-full relative mb-4">
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-100 rounded-md"
              onClick={() => handleDropdownClick('language-dropdown')}
            >
              <span className="text-sm font-semibold">{t('language')}: {selectedLanguage?.name}</span>
              <IoIosArrowDown className={`transition transform ${activeMenus.includes('language-dropdown') ? '-rotate-180' : 'rotate-0'}`} />
            </div>
            {activeMenus.includes('language-dropdown') && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {languageOptions.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                  >
                    <span className="flex items-center gap-2">{t(option.name)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plats-väljare */}
          <div className="w-full relative mt-3">
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-100 rounded-md"
              onClick={() => handleDropdownClick('location-dropdown')}
            >
              <span className="text-sm font-semibold">{t('location')}: {selectedLocation?.name}</span>
              <IoIosArrowDown className={`transition transform ${activeMenus.includes('location-dropdown') ? '-rotate-180' : 'rotate-0'}`} />
            </div>
            {activeMenus.includes('location-dropdown') && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {locationOptions.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationChange(option)}
                  >
                    <span className="flex items-center gap-2">{option.icon} {t(option.name)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Scrollbar>
      <div className="flex items-center justify-center flex-shrink-0 w-full mt-4 gap-x-1 border-t border-gray-100">
        {social?.map((item, index) => (
          <a
            href={item.link}
            className={`text-heading p-5 opacity-60 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
            target="_blank"
            key={index}
          >
            <span className="sr-only">{t(`${item.title}`)}</span>
            {item.icon}
          </a>
        ))}
      </div>
    </motion.div>
  );
};


// Huvudkomponenten för mobilmenyn
export default function MobileMenu() {
  const [menu, setMenu] = useState([]);
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false); // Nytt state för inställningsmenyn
  const { closeSidebar } = useUI();
  const { t } = useTranslation('menu');
  const router = useRouter();
  const { asPath, locale } = router;
  const { clearCart } = useCart();

  const languageOptions = site_header.languageMenu;
  const locationOptions = site_header.currencyMenu;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await http.get(API_ENDPOINTS.MENUMOBILE);
        setMenu(res.data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };
    fetchMenu();
  }, []);

  const currentSelectedItem = locale
    ? languageOptions.find((o) => o.value === locale)
    : languageOptions[2];

  const [selectedLanguage, setSelectedLanguage] = useState(currentSelectedItem);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      const matchedOption = locationOptions.find(option => option.id === parsedLocation.id);
      if (matchedOption) {
        setSelectedLocation(matchedOption);
      }
    } else {
      setSelectedLocation(locationOptions[0]);
    }
  }, []);

  const handleDropdownClick = (menuName: string) => {
    setActiveMenus((prevActiveMenus: string[]) => {
      if (prevActiveMenus.includes(menuName)) {
        return prevActiveMenus.filter((item) => item !== menuName);
      } else {
        return [...prevActiveMenus, menuName];
      }
    });
  };

  function handleLanguageChange(option: any) {
    setSelectedLanguage(option);
    router.push(asPath, undefined, { locale: option.value });
  }

  function handleLocationChange(option: any) {
    if (option.value === "SV") {
      setSelectedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      window.location.reload();
      clearCart();
    } else {
      alert(`Vi säljer inte till ${option.name} än tyvärr`);
    }
  }

  const ListMenu = ({ dept, data, hasSubMenu, menuName, menuIndex, className = '' }: any) =>
    data.label && (
      <li className={`mb-0.5 ${className}`}>
        <div className="relative flex items-center justify-between">
          <Link
            href={`/store/${data.path}`}
            className={`w-full text-[15px] menu-item relative py-3 pr-4 transition duration-300 ease-in-out ${dept === 1
                ? 'pl-5'
                : dept === 2
                  ? 'pl-8'
                  : dept === 3
                    ? 'pl-11'
                    : 'pl-14'
              } ${activeMenus.includes(menuName) ? 'font-bold' : ''}`}
            onClick={closeSidebar}
          >
            <span className="block w-full">{t(`${data.label}`)}</span>
          </Link>
          {hasSubMenu && (
            <div
              className="absolute top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer pr-5"
              onClick={(e) => {
                e.preventDefault();
                handleDropdownClick(menuName);
              }}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.child}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }
    dept = dept + 1;
    return (
      <ul className="pt-0.5">
        {data?.map((menu: any, index: number) => {
          const menuName = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.child && menu.child.length > 0}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 1 ? '' : ''}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex items-center justify-between flex-shrink-0 w-full px-5 py-0.5 border-b border-gray-100 md:px-7">
          <Logo />
          <button
            className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>
        <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0 py-7 text-heading lg:px-2">
            <ul className="pl-0 pt-0.5 mobileMenu list-none">
              {menu.map((menuItem: any, index: number) => {
                const dept = 1;
                const menuName = `sidebar-menu-${dept}-${index}`;
                return (
                  <ListMenu
                    dept={dept}
                    data={menuItem}
                    hasSubMenu={menuItem.child && menuItem.child.length > 0}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
              {/* Länk till inställningsmenyn */}
              <li className="mb-0.5">
                <div
                  className="relative flex items-center justify-between w-full text-[15px] menu-item relative py-3 pr-4 transition duration-300 ease-in-out pl-5 cursor-pointer"
                  onClick={() => setShowSettingsMenu(true)}
                >
                  <span className="block w-full">{t('Inställningar')}</span>
                  <div className="absolute top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer pr-5">
                    <IoIosArrowDown className={`transition duration-200 ease-in-out transform text-heading -rotate-90`} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Scrollbar>
        <div className="flex items-center justify-center flex-shrink-0 w-full mt-4 gap-x-1 border-t border-gray-100">
          {social?.map((item, index) => (
            <a
              href={item.link}
              className={`text-heading p-5 opacity-60 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
              target="_blank"
              key={index}
            >
              <span className="sr-only">{t(`${item.title}`)}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showSettingsMenu && (
          <SettingsMenu
            onClose={() => setShowSettingsMenu(false)}
            languageOptions={languageOptions}
            locationOptions={locationOptions}
            selectedLanguage={selectedLanguage}
            selectedLocation={selectedLocation}
            handleLanguageChange={handleLanguageChange}
            handleLocationChange={handleLocationChange}
            t={t}
            clearCart={clearCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}
