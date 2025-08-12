// components/ui/dropdown.tsx (ny fil)

import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { HiOutlineSelector } from 'react-icons/hi';

type Option = {
    id: string;
    name: string;
    value: string;
    icon?: JSX.Element;
};

type DropdownProps = {
    options: Option[];
    selectedItem: Option | undefined | null;
    onSelect: (option: Option) => void;
    translationKey: string;
    icon?: JSX.Element;
};

const Dropdown = ({ options, selectedItem, onSelect, translationKey, icon }: DropdownProps) => {
    const { t } = useTranslation('common');
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Funktion för att öppna menyn
    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    }, []);

    // Funktion för att stänga menyn med en fördröjning
    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Liten fördröjning för att musen ska hinna ner
    }, []);

    // Använd en extern klickhanterare för att dölja menyn
    // Den här behövs bara om du vill att menyn ska döljas när man klickar någon annanstans.
    // Jag har tagit bort den i detta exempel för att fokusera på hover-logiken.

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="border border-gray-300 text-heading text-sm font-semibold w-full py-1 px-2 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
                {icon && <span className="mr-2">{icon}</span>}
                {translationKey === "language" && <span>{selectedItem?.name}</span>}
                <HiOutlineSelector className="w-5 h-5 text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-max min-w-[120px]">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-sm flex-nowrap"
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon} {t(option.name)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;