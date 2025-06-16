// components/product/product-accessory-options.tsx
import React, { useState, useEffect } from 'react';

interface AccessoryOption {
    id: string; // Unikt ID för tillbehöret, t.ex. "groupName_value"
    group: string; // T.ex. "Färg", "Material"
    value: string; // T.ex. "Svart", "Gjutjärn"
    price: number;
    sale_price?: number;
    url?: string; // Om tillbehöret har en bild
    sku?: string;
    itsaVariation: boolean; // För att skilja från huvudproduktens variationer
    produktvariation: boolean; // Troligen samma som itsaVariation här
}

interface ProductAccessoryOptionsProps {
    title: string;
    options: AccessoryOption[];
    onSelect: (attribute: AccessoryOption, isChecked: boolean) => void;
    resetInputFields: boolean;
}

const ProductAccessoryOptions: React.FC<ProductAccessoryOptionsProps> = ({
    title,
    options,
    onSelect,
    resetInputFields,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Håller ID:n för valda tillbehör

    useEffect(() => {
        if (resetInputFields) {
            setSelectedOptions([]); // Rensa val när produkten lagts i kundvagnen
        }
    }, [resetInputFields]);

    const handleCheckboxChange = (option: AccessoryOption, isChecked: boolean) => {
        if (isChecked) {
            setSelectedOptions((prev) => [...prev, option.id]);
        } else {
            setSelectedOptions((prev) => prev.filter((id) => id !== option.id));
        }
        onSelect(option, isChecked); // Skicka upp valt tillbehör till förälderkomponenten
    };

    return (
        <div className="flex flex-col mb-4">
            <h4 className="text-base font-semibold capitalize mb-3">{title}</h4>
            <div className="flex flex-col space-y-2">
                {options.map((option) => (
                    <label key={option.id} className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-heading transition duration-150 ease-in-out border-gray-300 rounded focus:ring-accent-500 mr-2"
                            checked={selectedOptions.includes(option.id)}
                            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                        />
                        <span className="text-sm text-body">
                            {option.value} - {option.sale_price > 0 ? option.sale_price : option.price} €
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ProductAccessoryOptions;