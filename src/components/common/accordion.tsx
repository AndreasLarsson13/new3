import React, { useState } from 'react';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { heightCollapse } from '@utils/motion/height-collapse';
import { useTranslation } from 'next-i18next';

type CollapseProps = {
  i: number;
  titleKey?: string;
  title?: string;
  content?: any;
  contentKey?: any;
  expanded: number;
  translatorNS: string;
  setExpanded: any;
  pdf: any;
  tecnical: any;
  variant?: 'gray' | 'transparent';
};

export const Collapse: React.FC<CollapseProps> = ({
  i,
  expanded,
  setExpanded,
  titleKey,
  title,
  content,
  pdf,
  contentKey,
  translatorNS,
  variant = 'gray',
  tecnical
}) => {
  const isOpen = i === expanded; // dynamic based on state
  console.log(`Collapse ${i} isOpen:`, i === expanded);

  const { t, i18n } = useTranslation(translatorNS);
  return (
    <div
      className={cn({
        'rounded-md bg-gray-200': variant === 'gray',
        'shadow-sm': isOpen,
      })}
    >
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className={cn(
          'cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6',
          {
            'px-6 md:px-8 lg:px-10': variant === 'gray',
            'border-t border-gray-300': variant === 'transparent',
          }
        )}
      >
        <h2
          className={cn(
            'text-sm font-semibold leading-relaxed text-heading ltr:pr-2 rtl:pl-2',
            {
              'md:text-base': variant === 'gray',
              'md:text-base lg:text-lg': variant === 'transparent',
            }
          )}
        >
          {t(`common:${title}`)}
        </h2>
        <div className="relative flex items-center justify-center flex-shrink-0 w-4 h-4">
          <div className="w-full h-0.5 bg-heading rounded-sm" />
          <div
            className={`origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ${isOpen ? 'scale-0' : 'scale-100'
              }`}
          />
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          < motion.div
            key="content"
            initial="from"
            animate="to"
            exit="from"
            variants={heightCollapse()}
          >
            <div
              className={cn('pb-6 md:pb-7 leading-7 text-sm text-gray-600', {
                'pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10':
                  variant === 'gray',
              })}
            >
              {contentKey ? t(contentKey) : content}
              {tecnical && tecnical.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-2 justify-between px-2 ${index % 2 === 0 ? 'bg-gray-300' : ''
                    }`}
                >
                  <h4 className='font-semibold'>{item.title}</h4>

                  {Array.isArray(item.data) ? (
                    <h4>
                      {item.data.map((subItem, index) => (
                        <span key={index}>
                          {t(`common:${subItem}`)}{' '}
                        </span>
                      ))}
                    </h4>
                  ) : (
                    <h4>
                      {t(`common:${item.data}`, { defaultValue: item.data })}
                    </h4>
                  )}
                </div>
              ))}
              {pdf && pdf.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <h3>{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold	">{t("common:downloadPdf")}</a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

type AccordionProps = {
  translatorNS: string;
  items: {
    titleKey?: string;
    title?: string;
    contentKey?: string;
    content?: string;
    pdf: object
  }[];
  variant?: 'gray' | 'transparent';
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  translatorNS,
  variant = 'gray',
}) => {
  const [expanded, setExpanded] = useState<number | false>(false); // Start closed

  return (
    <>
      {items?.map((item, index) => (
        <Collapse
          i={index}
          key={item.titleKey || index}
          titleKey={item.titleKey}
          contentKey={item.contentKey}
          expanded={expanded}
          setExpanded={setExpanded}
          variant={variant}
          translatorNS={translatorNS}
          pdf={item.pdf}
          tecnical={item.tecnical}
          content={item.content}
          title={item.title}
        />
      ))}
    </>
  );
};


export default Accordion;
