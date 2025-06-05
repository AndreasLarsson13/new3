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


    if (e.id === "AX") {
      localStorage.setItem('clickedLocation', JSON.stringify(e))
      document.getElementById("locationContainerStart")?.classList.add("hidden");
    }


/*     console.log(e)
 */    if (e.id === "SE") {
      alert("VI säljer inte till sverige än")
    }

/*     document.getElementById("locationContainerStart")?.classList.add("hidden");
 */  }

  return (
    <div id="locationContainerStart"
      style={{ display: "true" }}
      className={cn(
        'text-center p-5 bg-white text-sm flex-row justify-center items-center font-medium fixed bottom-0 w-full h-full z-30 transition-all duration-300 ease-out shadow-cookies hidden z-50',
      )}
    >
      {/*       <span className="inline-block mb:block mb-3.5 leading-6">Välkommen till våran butik! Vilken plats befinner du dig på?</span>
 */}      {/*  <div className='flex gap-10 center justify-center'>
        <div onClick={() => locationClick({
          currency: "€",
          id: "ax",
          name: "Åland",
          value: "ax"
        })} className='pointer'>
          <AXFlag width="120px" />
        </div>

        <div onClick={() => locationClick({
          currency: "SEK",
          id: "se",
          name: "Sverige",
          value: "se"
        })} className='pointer'>
          <SEFlag width="120px" />

        </div>
      </div> */}
      {/*       <img src="/assets/images/eubild.png" alt="" srcset="" style={{ height: "80vh", margin: "auto" }} />
 */}    </div>
  );
};

export default LocationOption;
