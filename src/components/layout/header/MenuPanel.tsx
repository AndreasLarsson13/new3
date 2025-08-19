import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowBack, IoIosClose } from 'react-icons/io';
import {
    IoLogoInstagram,
    IoLogoTwitter,
    IoLogoFacebook,
    IoLogoYoutube,
} from 'react-icons/io5';
import { motion } from 'framer-motion';
import Scrollbar from '@components/common/scrollbar';
import Logo from '@components/ui/logo';
import { siteSettings } from '@settings/site-settings';

const social = [
    { id: 0, link: 'https://www.facebook.com/nätbutiken/', icon: <IoLogoFacebook />, className: 'facebook', title: 'text-facebook' },
    { id: 2, link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw', icon: <IoLogoYoutube />, className: 'youtube', title: 'text-youtube' },
    { id: 3, link: 'https://www.instagram.com/nätbutiken/', icon: <IoLogoInstagram />, className: 'instagram', title: 'text-instagram' },
];

const MenuPanel = ({ menu, onClose, onNavigate, onGoBack, isRoot, openSettingsMenu, t, currentTitle }) => {
    return (
        <motion.div
            initial={{ x: isRoot ? '0' : '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 flex flex-col justify-between w-full h-full bg-white"
        >
            <div className="flex items-center justify-between flex-shrink-0 w-full px-5 py-0.5 border-b border-gray-100 md:px-7">
                {!isRoot ? (
                    <div className="flex items-center">
                        <button
                            className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
                            onClick={onGoBack}
                            aria-label="go back"
                        >
                            <IoIosArrowBack className="text-black mt-1 md:mt-0.5" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900 ml-2">{t(currentTitle)}</h2>
                    </div>
                ) : (
                    <Logo />
                )}
                <button
                    className="flex items-center justify-center px-4 py-6 text-2xl text-gray-500 transition-opacity md:px-6 lg:py-8 focus:outline-none hover:opacity-60"
                    onClick={onClose}
                    aria-label="close"
                >
                    <IoIosClose className="text-black mt-1 md:mt-0.5" />
                </button>
            </div>
            <Scrollbar className="flex-grow mb-auto menu-scrollbar">
                <div className="flex flex-col px-0 py-7 text-heading lg:px-2">
                    <ul className="pl-0 pt-0.5 mobileMenu list-none">
                        {menu.map((menuItem, index) => {
                            const hasSubMenu = menuItem.subMenu && menuItem.subMenu.length > 0;
                            return (
                                <li key={index} className="mb-0.5">
                                    <div className="relative flex items-center justify-between">
                                        {hasSubMenu ? (
                                            <div
                                                className="w-full text-[15px] menu-item relative py-3 pr-4 transition duration-300 ease-in-out pl-5 cursor-pointer"
                                                onClick={() => onNavigate(menuItem.subMenu, menuItem.label)}
                                            >
                                                <span className="block w-full">{t(`${menuItem.label}`)}</span>
                                            </div>
                                        ) : (
                                            <Link
                                                href={`/store/${menuItem.path}`}
                                                className="w-full text-[15px] menu-item relative py-3 pr-4 transition duration-300 ease-in-out pl-5"
                                                onClick={onClose}
                                            >
                                                <span className="block w-full">{t(`${menuItem.label}`)}</span>
                                            </Link>
                                        )}
                                        {hasSubMenu && (
                                            <div
                                                className="top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer pr-5"
                                                onClick={() => onNavigate(menuItem.subMenu, menuItem.label)}
                                            >
                                                <IoIosArrowDown className="transition duration-200 ease-in-out transform text-heading -rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                        {isRoot && (
                            <li className="mb-0.5">
                                <div
                                    className="relative flex items-center justify-between"
                                    onClick={openSettingsMenu}
                                >
                                    <span className="w-full text-[15px] menu-item relative py-3 pr-4 transition duration-300 ease-in-out pl-5 cursor-pointer">{t('Inställningar')}</span>
                                    <div className="top-0 flex items-center justify-end w-full h-full text-lg cursor-pointer pr-5">
                                        <IoIosArrowDown className="transition duration-200 ease-in-out transform text-heading -rotate-90" />
                                    </div>
                                </div>
                            </li>
                        )}
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
        </motion.div>
    );
};

export default MenuPanel;