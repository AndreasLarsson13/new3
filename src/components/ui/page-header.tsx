import { useTranslation } from 'next-i18next';

interface HeaderProps {
  pageSubHeader?: string;
  pageHeader: string;
}

const PageHeader: React.FC<HeaderProps> = ({
  pageSubHeader = 'text-page-explore',
  pageHeader = 'text-page-header',
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className="flex justify-center p-6 md:p-10 2xl:p-8 relative bg-no-repeat bg-center bg-cover"

    >
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black text-center">
        {t(`${pageHeader}`)}
      </h2>
    </div>
  );
};

export default PageHeader;
