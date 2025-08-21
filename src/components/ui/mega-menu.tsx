import React, { useState } from 'react';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import { FaChevronDown, FaPlus } from 'react-icons/fa'; // Importerar FaPlus-ikonen

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[]; // Nivå 2
  subMenu?: MenuItem[]; // Nivå 3
  tertiaryMenu?: MenuItem[]; // Nytt: Nivå 4
}

type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation('menu');
  const [activeSubMenu, setActiveSubMenu] = useState<number | string | null>(null);
  const [activeTertiaryMenu, setActiveTertiaryMenu] = useState<number | string | null>(null); // Nytt state
  const toggleSubMenu = (id: number | string) => {
    setActiveSubMenu(activeSubMenu === id ? null : id);
  };

  const toggleTertiaryMenu = (id: number | string) => {
    setActiveTertiaryMenu(activeTertiaryMenu === id ? null : id);
  };


  const handleMenuClick = () => {
    const megaMenu = document.querySelectorAll('.megaMenu');
    megaMenu.forEach(iten => {
      iten.classList.add('manual-hidden');
    })
  };
  // Dynamiskt bestämma bredden baserat på antalet kolumner
  const numberOfColumns = columns.length;
  let gridClass = 'grid-cols-1';
  if (numberOfColumns > 1) {
    gridClass = `grid-cols-${numberOfColumns}`;
  }

  return (
    <div className="absolute bg-gray-200 megaMenu shadow-header ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0 hidden group-hover:block">
      <div className={`grid ${gridClass}`}>
        {columns?.map((column) => (
          <ul className="pt-6 even:bg-gray-150 pb-7 2xl:pb-8 2xl:pt-7" key={column.id}>
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                    onClick={handleMenuClick}
                  >
                    {t(columnItem.value)}
                  </Link>
                </li>

                {columnItem?.columnItemItems?.map((item: MenuItem) => (
                  <li
                    key={item.id}
                    className={
                      columnItem?.columnItemItems?.length === item.id
                        ? 'border-b border-gray-300 pb-3.5 mb-3'
                        : ''
                    }
                  >
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.path}
                        className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                        onClick={handleMenuClick}
                      >
                        {t(item.value)}
                      </Link>

                      {/* Render dropdown arrow or plus sign */}
                      {item?.subMenu && item.subMenu.length > 0 && (
                        <button
                          onClick={() => toggleSubMenu(item.id)}
                          className="text-sm px-2 hover:bg-gray-300 focus:outline-none"
                        >
                          <FaChevronDown
                            className={`transition duration-300 ease-in-out transform ${activeSubMenu === item.id ? '-rotate-180' : 'rotate-0'}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu items (Nivå 3) */}
                    {activeSubMenu === item.id && item?.subMenu && (
                      <ul className="bg-gray-100 ml-4 mt-2 shadow-inner">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.id}>
                            <div className="flex justify-between items-center">
                              <Link
                                href={subItem.path}
                                className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                                onClick={handleMenuClick}
                              >
                                {t(subItem.label)}
                              </Link>
                              {/* Render plus sign for tertiaryMenu (Nivå 4) */}
                              {subItem?.tertiaryMenu && subItem.tertiaryMenu.length > 0 && (
                                <button
                                  onClick={() => toggleTertiaryMenu(subItem.id)}
                                  className="text-xs px-2 hover:bg-gray-300 focus:outline-none"
                                >
                                  <FaPlus
                                    className={`transition duration-300 ease-in-out transform ${activeTertiaryMenu === subItem.id ? 'rotate-45' : 'rotate-0'}`}
                                  />
                                </button>
                              )}
                            </div>
                            {/* Tertiary menu (Nivå 4) */}
                            {activeTertiaryMenu === subItem.id && subItem.tertiaryMenu && (
                              <ul className="bg-gray-200 ml-4 mt-2">
                                {subItem.tertiaryMenu.map((tertiaryItem) => (
                                  <li key={tertiaryItem.id}>
                                    <Link
                                      href={tertiaryItem.path}
                                      className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                                      onClick={handleMenuClick}
                                    >
                                      {t(tertiaryItem.label)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;