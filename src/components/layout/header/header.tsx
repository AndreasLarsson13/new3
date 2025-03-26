import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import SearchIcon from '@components/icons/search-icon';
import { siteSettings } from '@settings/site-settings';
import HeaderMenu from '@components/layout/header/header-menu';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import { addActiveScroll } from '@utils/add-active-scroll';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from '@components/ui/language-switcher';
import { HiOutlineSelector } from 'react-icons/hi';
import { useRouter } from 'next/router';


const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;
const Header: React.FC = () => {
  const { openSearch, openModal, setModalView, isAuthorized } = useUI();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleLogin() {
    setModalView('LOGIN_VIEW');
    return openModal();
  }


  const { site_header } = siteSettings;

  const options: Option[] = site_header.languageMenu;
  const optionsLocation: Option[] = site_header.currencyMenu;
  const router = useRouter();
  const { asPath, locale } = router;

  // Initial state for language and location
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)
    : options[2];
  const [selectedItem, setSelectedItem] = useState<Option | undefined>(currentSelectedItem);
  const [clickedLocation, setClickedLocation] = useState<Option | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  // Load the clicked location from local storage when component mounts
  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      const matchedOption = optionsLocation.find(option => option.id === parsedLocation.id);
      if (matchedOption) {
        setClickedLocation(matchedOption);
      }
    }
  }, []);

  // Handle language selection and redirect
  function handleLanguageChange(option: Option) {
    setSelectedItem(option);
    router.push(asPath, undefined, { locale: option.value });
    setIsLanguageDropdownOpen(false);
  }

  // Handle location selection change
  function handleLocationChange(option: Option) {
    if (option.value === "se") {
      alert("Vi säljer inte till Sverige än tyvärr");
    } else {
      setClickedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      setIsLocationDropdownOpen(false);
    }
  }

  // Toggle modal visibility
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  console.log(clickedLocation)





  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="relative z-20 w-full h-16 sm:h-20 lg:h-24"
    >
      <div className='flex gap-5 p-1 bg-gray-200 z-50 '>
        <div className='flex items-center gap-1 pl-3'>
          <h5 className="text-sm font-semibold">{/* {t('language')} */} Language:</h5>
          <div className="relative z-999">
            {/* <h5 className="text-sm font-semibold mr-1">{/* {t('language')}  */}
            <button
              className="border border-gray-300 text-heading text-sm font-semibold w-full py-1 px-2 bg-white rounded-lg shadow-md flex justify-between items-center"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <span>{selectedItem?.icon}</span>
              <HiOutlineSelector className="w-5 h-5 text-gray-400" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 sm:w-[120px] lg:w-[120px]">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                  > <span className="flex items-center gap-2 text-sm flex-nowrap">{option.icon}{t(option.name)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Location Dropdown */}

        <div className='flex items-center gap-1'>
          <h5 className="text-sm font-semibold">{t('location')}:</h5>

          <div className="relative">
            {/*               <h5 className="text-sm font-semibold mr-1">{t('location')}: </h5>
 */}              <button
              className="border border-gray-300 text-heading text-sm font-semibold w-full py-1 px-2 bg-white rounded-lg shadow-md flex justify-between items-center "
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            >
              <span className="flex items-center">

                <span className="mr-2" key={clickedLocation?.name}>{clickedLocation?.icon}</span>

                {/*  {clickedLocation?.name || t('Select Location')} */}
              </span>
              <HiOutlineSelector className="w-5 h-5 text-gray-400" />
            </button>


            {isLocationDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 sm:w-[180px] lg:w-[180px] z-50">
                {optionsLocation.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer "
                    onClick={() => handleLocationChange(option)}
                  >

                    <span className="flex items-center gap-2 text-sm flex-nowrap">{option.icon} {t(option.name)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed z-10 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-24 md:px-8 lg:px-6">

        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">

          <Logo />

          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10"
          />


          <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
            <button
              className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            {/* Login knapp <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="text-sm font-semibold xl:text-base text-heading"
                btnProps={{
                  className:
                    'text-sm xl:text-base text-heading font-semibold focus:outline-none',
                  // @ts-ignore
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div> */}
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
