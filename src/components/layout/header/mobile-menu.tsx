import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { AnimatePresence } from 'framer-motion';
import { siteSettings } from '@settings/site-settings';

import MenuPanel from './MenuPanel';
import SettingsMenu from './SettingsMenu';

const { site_header } = siteSettings;

export default function MobileMenu() {
  const [menuData, setMenuData] = useState([]);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [currentMenuStack, setCurrentMenuStack] = useState([{ menu: [], label: 'Huvudmeny' }]);
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
        setMenuData(res.data);
        setCurrentMenuStack([{ menu: res.data, label: 'Huvudmeny' }]);
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
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  function handleLanguageChange(option) {
    setSelectedLanguage(option);
    router.push(asPath, undefined, { locale: option.value });
  }

  function handleLocationChange(option) {
    if (option.value === "SV") {
      setSelectedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      window.location.reload();
      clearCart();
    } else {
      alert(`Vi säljer inte till ${option.name} än tyvärr`);
    }
  }

  const handleNavigateToSubMenu = (subMenu, label) => {
    setCurrentMenuStack(prevStack => [...prevStack, { menu: subMenu, label: label }]);
  };

  const handleGoBack = () => {
    setCurrentMenuStack(prevStack => prevStack.slice(0, -1));
  };

  const handleCloseMainMenu = () => {
    closeSidebar();
  };

  const currentMenu = currentMenuStack[currentMenuStack.length - 1];

  return (
    <>
      <AnimatePresence>
        {!showSettingsMenu && (
          <MenuPanel
            menu={currentMenu.menu}
            onClose={handleCloseMainMenu}
            onNavigate={handleNavigateToSubMenu}
            onGoBack={handleGoBack}
            isRoot={currentMenuStack.length === 1}
            openSettingsMenu={() => setShowSettingsMenu(true)}
            t={t}
            currentTitle={currentMenu.label}
          />
        )}
      </AnimatePresence>

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
            clearCart={clearCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}