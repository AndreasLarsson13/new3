import cn from 'classnames';
interface Props {
  className?: string;
  title: string;
  attributes: {
    id: number;
    value: string;
    meta: string;
    price: number;
    img: string;
    customOrder: boolean;
    translationName: object;
  }[];
  active: string;
  onClick: any;
  clicked: any;
}

import { useTranslation } from 'next-i18next';


export const ProductAttributes: React.FC<Props> = ({
  className = 'mb-4',
  title,
  attributes,
  active,
  onClick,
  clicked
}) => {





  const { t, i18n } = useTranslation('common');


  let titelNew = ""
  attributes.forEach((item) => {
    if (item && item.attribute && typeof item.attribute.name === 'object') {
      titelNew = item.attribute.name[i18n.language]
    }
    else {
      if (item.value) {
        titelNew = item.attribute.name
      }
    }
  })


  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        {t(title) !== title ? t(title) : titelNew}
      </h3>
      <ul className="flex flex-wrap colors ltr:-mr-3 rtl:-ml-3">
        {attributes?.map(({ id, value, meta, price, img, customOrder, attribute, translationName }) => (
          <li
            key={`${value}-${id}`}
            value={price}
            className={cn(
              'cursor-pointer rounded border w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black',
              value === active ? 'border-black' : 'border-gray-500',
              img ? 'min-h-[110px] min-w-[110px] md:w-28 md:h-28' : 'md:w-11 md:h-11',
              !img && !meta ? ' min-w-[110px] md:w-auto md:h-auto' : 'md:w-11 md:h-11'
            )}
            onClick={() => onClick({ "id": title, [title]: value, "price": price, "value": value, "customOrder": customOrder, "name": attribute.name, "translationName": translationName/* "type": attribute.slug  */ })}
          >
            {title === 'color' ? (
              <span
                className="block w-full h-full rounded"
                style={{ backgroundColor: meta }}
              />
            ) : img ? (

              <div className="relative">
                <img
                  src={img.url}
                  alt={img.name}
                  className={`max-w-[100px] min-h-[100px] max-h-[100px] min-h-[100px] ${value ? 'opacity-100' : 'opacity-25'}`}
                />
                {!value && <svg
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  width="50"
                  height="50"
                  viewBox="0 0 357 357"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M87.1238 269.766L267.223 89.6675M72.9342 282.864C45.2875 254.929 29.8479 217.169 30.0011 177.866C30.1544 138.563 45.8881 100.925 73.7518 73.206C101.615 45.4868 139.335 29.949 178.638 30.0001C217.941 30.0512 255.62 45.687 283.411 73.4785C311.203 101.27 326.839 138.949 326.89 178.252C326.941 217.555 311.403 255.275 283.684 283.138C255.965 311.002 218.327 326.736 179.024 326.889C139.721 327.042 101.961 311.603 74.0257 283.956L72.9342 282.864ZM86.578 269.22C62.6159 244.969 49.2462 212.207 49.3994 178.115C49.5527 144.023 63.2163 111.382 87.3955 87.3477C111.575 63.313 144.297 49.8452 178.389 49.8963C212.481 49.9473 245.163 63.5131 269.27 87.6202C293.377 111.727 306.943 144.409 306.994 178.501C307.045 212.593 293.577 245.315 269.542 269.495C245.508 293.674 212.867 307.337 178.775 307.491C144.683 307.644 111.921 294.274 87.6696 270.312L86.578 269.22Z"
                    stroke="#D40000"
                    strokeWidth="38"
                  />
                </svg>}
              </div>


            ) : (
              <div>{translationName[i18n.language] ? translationName[i18n.language] : value}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
