import React from 'react';
import ActiveLink from '@components/ui/active-link';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import { useTranslation } from 'next-i18next';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-body mt-0.5" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);
  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center chawkbazarBreadcrumb">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string; product?: any }> = ({ separator = '/', product }) => {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation('common');

  // Remove unnecessary breadcrumbs if needed

  let currentPath = "";

  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
        <a>{t('breadcrumb-home')}</a>
      </ActiveLink>



      <ActiveLink
        href={`/store/${product.categoryPaths[0]}`}
        activeClassName="font-semibold text-heading"
        key={product.categoryPaths}
      >
        <a className="capitalize">
          {/* t(`${convertBreadcrumbTitle(link)}`) */ product.categoryPaths[0]}
        </a>
      </ActiveLink>

      {/*   {breadcrumbs &&



        <ActiveLink
          href={breadcrumbs[0].href}
          activeClassName="font-semibold text-heading"
          key={breadcrumbs[0].href}
        >
          <a className="capitalize">
            {t(`${convertBreadcrumbTitle(breadcrumbs[0].breadcrumb)}`)}
          </a>

        </ActiveLink>} */}





      {/*   {product && (
        <a className="capitalize">
          {product.name}
        </a>
      )} */}



    </BreadcrumbItems>
  );
};

export default Breadcrumb;
