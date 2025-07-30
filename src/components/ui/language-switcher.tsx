import { useState, useEffect } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { capitalize } from 'lodash';

interface Option {
  id: string;
  value: string;
  name: string;
  icon: JSX.Element;
}

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
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
      setClickedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      setIsLocationDropdownOpen(false);
    }
    else if (option.value === "fi") {
      alert("Vi säljer inte till Finland än tyvärr");
    }

    else {
      setClickedLocation(option);
      localStorage.setItem('clickedLocation', JSON.stringify(option));
      setIsLocationDropdownOpen(false);
    }
  }

  // Toggle modal visibility
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  /* console.log(clickedLocation) */
  const handleMouseEnter = () => {
    setIsLanguageDropdownOpen(!isLocationDropdownOpen)
    /*   const megaMenu = document.querySelectorAll('.megaMenu');
      megaMenu.forEach(item => {
        item.classList.remove('manual-hidden'); */
  }
};
return (
  <div>
    {/* Button to show current selections and open modal */}
    <button
      className="border border-gray-300 text-heading text-sm font-semibold w-full py-2 px-3 bg-white rounded-lg shadow-md flex justify-between items-center "
      onClick={toggleModal}
    >
      <span className="flex items-center">
        {/* Render the icon */}
        {clickedLocation?.icon && (
          <span className="mr-2 flex items-center">
            {clickedLocation.icon}
          </span>
        )}
        {/* Display the name only on larger screens */}
        <span className="hidden md:inline">
          {clickedLocation?.name || t('Select Location')} - {selectedItem?.id ? capitalize(selectedItem.id) : t('Select Language')}
        </span>
      </span>
      <HiOutlineSelector className="w-5 h-5 text-gray-400" />
    </button>


    {/* Modal for changing selections */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[300px]">


          {/* Language Dropdown */}
          {/*  <div className="mb-4 relative">
            <h2 className="text-lg font-semibold mb-4">{t('language')}</h2>
            <button
              className="border border-gray-300 text-heading text-sm font-semibold w-full py-2 px-3 bg-white rounded-lg shadow-md flex justify-between items-center"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <span>{selectedItem?.name || t('Select Language')}</span>
              <HiOutlineSelector className="w-5 h-5 text-gray-400" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                  >{t(option.name)}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {/* Location Dropdown */}
          <div className="relative">
            <h2 className="text-lg font-semibold mb-4">{t('location')}</h2>
            <button
              className="border border-gray-300 text-heading text-sm font-semibold w-full py-2 px-3 bg-white rounded-lg shadow-md flex justify-between items-center"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              onMouseEnter={handleMouseEnter()}
            >
              <span className="flex items-center">

                <span className="mr-2" key={clickedLocation?.name}>{clickedLocation?.icon}</span>

                {clickedLocation?.name || t('Select Location')}
              </span>
              <HiOutlineSelector className="w-5 h-5 text-gray-400" />
            </button>


            {isLocationDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {optionsLocation.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationChange(option)}
                  >
                    {option.icon} {t(option.name)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={toggleModal}
          >
            {t('text-close')}
          </button>
        </div>
      </div>
    )}
  </div>
);
}
