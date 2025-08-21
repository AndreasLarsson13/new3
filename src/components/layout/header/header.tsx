import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useCart } from '@contexts/cart/cart.context';
import SearchIcon from '@components/icons/search-icon';
import { siteSettings } from '@settings/site-settings';
import HeaderMenu from '@components/layout/header/header-menu';
import http from '@framework/utils/http';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import { addActiveScroll } from '@utils/add-active-scroll';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { HiOutlineSelector } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

// Importera den nya Dropdown-komponenten
import Dropdown from '@components/ui/dropdown';

const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type Option = {
  id: string;
  name: string;
  value: string;
  icon?: JSX.Element;
};

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { clearCart } = useCart();
  const { openSearch, openModal, setModalView, isAuthorized } = useUI();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  const router = useRouter();
  const { asPath, locale } = router;

  addActiveScroll(siteHeaderRef);

  const [menu, setMenu] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const options: Option[] = site_header.languageMenu;
  const optionsLocation: Option[] = site_header.currencyMenu;

  const currentSelectedItem = useMemo(() => options.find((o) => o.value === locale) || options[2], [locale, options]);
  const [selectedItem, setSelectedItem] = useState<Option | undefined>(currentSelectedItem);
  const [clickedLocation, setClickedLocation] = useState<Option | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await http.get(API_ENDPOINTS.MENU);
        setMenu(res.data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const storedLocation = localStorage.getItem('clickedLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      const matchedOption = optionsLocation.find(option => option.id === parsedLocation.id);
      if (matchedOption) {
        setClickedLocation(matchedOption);
      }
    }
  }, [optionsLocation]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = useCallback((option: Option) => {
    setSelectedItem(option);
    router.push(asPath, undefined, { locale: option.value });
  }, [asPath, router]);

  const handleLocationChange = useCallback((option: Option) => {
    if (option.value === "SV" || option.value === "AX") {
      setClickedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      clearCart();
      window.location.reload();
    } else {
      alert(`Vi säljer inte till ${option.name} än tyvärr`);
    }
  }, [clearCart]);

  function handleLogin() {
    setModalView('LOGIN_VIEW');
    return openModal();
  }

  return (
    <header id='siteHeader' ref={siteHeaderRef} className='relative z-20 w-full h-16 sm:h-20 lg:h-24'>
      <div className='fixed w-full'>
        <div className={`hidden sm:flex gap-5 p-1 bg-gray-200 transition-all duration-300 ${isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
          <div className='flex items-center gap-1 pl-3'>
            <h5 className="text-sm font-semibold">{t('language')}</h5>
            <Dropdown
              options={options}
              selectedItem={selectedItem}
              onSelect={handleLanguageChange}
              translationKey='language'
            />
          </div>
          <div className='flex items-center gap-1'>
            <h5 className="text-sm font-semibold">{t('location')}</h5>
            <Dropdown
              options={optionsLocation}
              selectedItem={clickedLocation}
              onSelect={handleLocationChange}
              translationKey='location'
              icon={clickedLocation?.icon}
            />
          </div>
        </div>

        <div className={`z-50 w-full h-16 px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-24 md:px-8 lg:px-6 ${isScrolled ? 'fixed' : ''}`} style={{ top: isScrolled ? 0 : 'auto' }}>
          <div className='flex items-center justify-center mx-auto max-w-[1920px] h-full w-full'>
            <Logo />
            <HeaderMenu data={menu} className='hidden lg:flex ltr:md:ml-6 rtl:md:mr-6 ltr:xl:ml-10 rtl:xl:mr-10' />
            <div className='items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto'>
              <button
                className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'
                onClick={openSearch}
                aria-label='search-button'
              >
                <SearchIcon />
              </button>
              {/*  <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className='text-sm font-semibold xl:text-base text-heading'
                btnProps={{
                  className: 'text-sm xl:text-base text-heading font-semibold focus:outline-none',
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu> */}
              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;