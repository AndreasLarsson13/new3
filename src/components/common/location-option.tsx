import cn from 'classnames';
import { ILFlag } from '@components/icons/ILFlag';
import { SAFlag } from '@components/icons/SAFlag';
import { CNFlag } from '@components/icons/CNFlag';
import { USFlag } from '@components/icons/USFlag';
import { DEFlag } from '@components/icons/DEFlag';
import { ESFlag } from '@components/icons/ESFlag';
import { SEFlag } from '@components/icons/SEFlag';
import { AXFlag } from '@components/icons/AXFlag';
import { useEffect } from 'react';

interface LocationOptionProps {
  className?: string;
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const LocationOption: React.FC<LocationOptionProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {




  const locationClick = (e: any) => {

    localStorage.setItem('clickedLocation', JSON.stringify(e))



    document.getElementById("locationContainerStart")?.classList.add("hidden");
  }

  return (
    <div id="locationContainerStart"
      className={cn(
        'text-center p-5 bg-white text-sm flex-row justify-center items-center font-medium fixed bottom-0 w-full h-full z-30 transition-all duration-300 ease-out shadow-cookies hidden',
      )}
    >
      <span className="inline-block mb:block mb-3.5 leading-6">Välkommen till våran butik! Vilken plats befinner du dig på?</span>
      <div className='flex gap-10 center'>
        <div onClick={() => locationClick({
          currency: "SEK",
          id: "se",
          name: "Sverige",
          value: "se"
        })} className='pointer'>
          <AXFlag width="120px" />
        </div>

        <div onClick={() => locationClick({
          currency: "€",
          id: "ax",
          name: "Åland",
          value: "ax"
        })} className='pointer'>
          <SEFlag width="120px" />

        </div>
      </div>

    </div>
  );
};

export default LocationOption;
