import React, { useState } from 'react';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa'; // Import the icon

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[]; // Nested items
  subMenu?: MenuItem[]; // Submenu for further nesting (sub-sub-child)
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

  const toggleSubMenu = (id: number | string) => {
    setActiveSubMenu(activeSubMenu === id ? null : id); // Toggle submenu
  };


  const handleMenuClick = () => {
    const megaMenu = document.querySelectorAll('.megaMenu');
    megaMenu.forEach(iten => {
      iten.classList.add('manual-hidden');
    })
  };



  return (
    <div className="absolute bg-gray-200 megaMenu shadow-header ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0">
      <div className="grid grid-cols-6">
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
                    {t(columnItem.label)}
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
                        {t(item.label)}
                      </Link>

                      {/* Render dropdown arrow only for subMenu */}
                      {item?.subMenu && item.subMenu.length > 0 && (
                        <button
                          onClick={() => toggleSubMenu(item.id)}
                          className="text-sm px-2 hover:bg-gray-300 focus:outline-none"
                        >
                          <FaChevronDown
                            className={`transition duration-300 ease-in-out transform ${activeSubMenu === item.id ? '-rotate-180' : 'rotate-0'
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu items */}
                    {activeSubMenu === item.id && item?.subMenu && (
                      <ul className="bg-gray-100 ml-4 mt-2 shadow-inner">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.path}
                              className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                              onClick={handleMenuClick}
                            >
                              {t(subItem.label)}

                            </Link>
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
