import { useTranslation } from 'next-i18next';
import Select from 'react-select';
import cn from 'classnames';

interface Props {
  className?: string;
  title: string;
  attributes: {
    id: number;
    value: string;
    meta: string;
    price: number;
    img: { url: string; name: string } | string;
    customOrder: boolean;
    translationName: { [key: string]: string };
  }[];
  active: string;
  onClick: any;
  clicked: any;
}

export const ProductAttributes: React.FC<Props> = ({
  className = 'mb-4',
  title,
  attributes,
  active,
  onClick,
  clicked,
}) => {
  const { t, i18n } = useTranslation('common');

  // Determine the title based on translation or fallback
  let titleNew = attributes[0]?.translationName?.[i18n.language] || title;

  // Define dropdown options with custom label for colors and images
  const options = attributes.map(({ id, value, meta, price, img, customOrder, translationName }) => ({
    value,
    label: (
      <div className="flex items-center space-x-2">
        {title === 'color' ? (
          <span
            className="inline-block w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: meta }}
          ></span>
        ) : (
          img && typeof img === 'object' && (
            <img src={img.url} alt={img.name} className="w-6 h-6 rounded-full" />
          )
        )}
        <span>{translationName/* [i18n.language] */ || value}</span>
      </div>
    ),
    price,
    customOrder,
  }));

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        {t(title) !== title ? t(title) : titleNew}
      </h3>

      <Select
        options={options}
        className="basic-single-select"
        classNamePrefix="select"
        value={options.find((option) => option.value === active)}
        onChange={(selectedOption) => {
          onClick({
            id: title,
            [title]: selectedOption.value,
            price: selectedOption.price,
            customOrder: selectedOption.customOrder,
            value: selectedOption.value,
            name: selectedOption.label,
          });
        }}
        isMulti={title === 'img'} // Enable multi-select only for images
      />
    </div>
  );
};
