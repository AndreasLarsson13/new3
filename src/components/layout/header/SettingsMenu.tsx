// components/mobile-menu/SettingsMenu.tsx

import { useState } from 'react';
import { IoIosArrowDown, IoIosClose, } from 'react-icons/io';
import {
    IoLogoInstagram,
    IoLogoTwitter,
    IoLogoFacebook,
    IoLogoYoutube,
} from 'react-icons/io5';
import { motion } from 'framer-motion';
import Scrollbar from '@components/common/scrollbar';
import { useTranslation } from 'next-i18next';

const social = [
    // ... (Sociala ikoner)
    { id: 0, link: 'https://www.facebook.com/nätbutiken/', icon: <IoLogoFacebook />, className: 'facebook', title: 'text-facebook' },
    { id: 2, link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw', icon: <IoLogoYoutube />, className: 'youtube', title: 'text-youtube' },
    { id: 3, link: 'https://www.instagram.com/nätbutiken/', icon: <IoLogoInstagram />, className: 'instagram', title: 'text-instagram' },
];

const handleNavigateToSubMenu = (subMenu, label) => {
    setCurrentMenuStack(prevStack => [...prevStack, { menu: subMenu, label: label }]);
};

const SettingsMenu = ({ onClose, languageOptions, locationOptions, selectedLanguage, selectedLocation, handleLanguageChange, handleLocationChange, clearCart }) => {
    const [activeMenus, setActiveMenus] = useState<any>([]);
    const { t } = useTranslation('menu');

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
                    <IoIosClose className="text-black mt-1 md:mt-0.5" />
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

export default SettingsMenu;