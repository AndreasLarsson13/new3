import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector } from 'react-icons/hi';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
  const options = site_header.languageMenu;
  const optionsLocation = site_header.currencyMenu;
  const router = useRouter();
  const { asPath, locale } = router;

  // Initial state for language and location
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)!
    : options[2];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);
  const [clickedLocation, setClickedLocation] = useState(null);

  // Load the clicked location from local storage when component mounts
  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem('clickedLocation'));
    if (storedLocation) {
      setClickedLocation(storedLocation); // Set the state to the stored location
    }
  }, []);

  // Handle language selection and redirect
  function handleLanguageChange(event) {
    const selectedOption = options.find((option) => option.value === event.target.value);
    setSelectedItem(selectedOption);
    router.push(asPath, undefined, { locale: selectedOption.value });
  }

  // Handle location selection change
  function handleLocationChange(event) {
    const selectedOption = optionsLocation.find((option) => option.value === event.target.value);
    if (selectedOption.value === "se") {
      alert("Vi säljer inte till Sverige än tyvärr");
    } else {
      setClickedLocation(selectedOption);
      localStorage.setItem('clickedLocation', JSON.stringify(selectedOption));
    }
  }

  // Load location on click
  function openBox() {
    const storedLocation = JSON.parse(localStorage.getItem('clickedLocation'));
    if (storedLocation) {
      setClickedLocation(storedLocation);
    }
    console.log(clickedLocation

    )
  }


  return (
    <div className="relative z-10 w-[140px] sm:w-[150px] lg:w-[130px] xl:w-[150px] ">
      {/* Wrapper div with relative positioning */}
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        {({ open }) => (
          <div className="w-full relative"> {/* Full width of the container */}
            {/* Language Dropdown */}
            <Listbox.Button
              className="border border-gray-300 text-heading text-[13px] xl:text-sm font-semibold w-full py-2 ltr:pl-3 rtl:pr-3 ltr:pr-7 rtl:pl-7 ltr:text-left rtl:text-right bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer"
              onClick={openBox}
            >
              <span className="flex truncate items-center">
                <span className="ltr:mr-1.5 rtl:ml-1.5">{selectedItem.icon}</span>{' '}
                {clickedLocation && clickedLocation.name} - {t(selectedItem.name)}
              </span>
              <span className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-1.5 rtl:pl-1.5 pointer-events-none">
                <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              id="languageLocationBox"
            >
              <Listbox.Options
                static
                className="absolute z-50 w-[300px] py-1 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm" // Fixed width and absolute position
                style={{
                  maxHeight: '300px', // Max height for scrollability
                  overflowY: 'auto', // Enable vertical scrolling
                  right: 0, // Align to the right within the relative container
                }}
              >
                {/* Language Selection */}
                <div>
                  <h3 className="px-3">Språk</h3>
                  <div id="languageBox" className="mt-4">
                    <label htmlFor="language-select" className="sr-only">Select Language</label>
                    <select
                      id="language-select"
                      value={selectedItem.value}
                      onChange={handleLanguageChange}
                      className="border border-gray-300 text-heading text-[13px] xl:text-sm font-semibold relative w-full py-2 px-3 bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer"
                    >
                      {options.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.icon} {t(option.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location Selection */}
                <div>
                  <h3 className="px-3">Location</h3>
                  <div id="locationBox" className="mt-2">
                    <select
                      id="location-select"
                      value={clickedLocation?.value || ""} // Use clickedLocation value or empty string
                      onChange={handleLocationChange}
                      className="border border-gray-300 text-heading text-[13px] xl:text-sm font-semibold relative w-full py-2 px-3 bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 cursor-pointer"
                    >
                      {optionsLocation?.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.icon} {t(option.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}
