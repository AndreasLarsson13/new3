// InitializeLocation.tsx or similar file
import { useEffect } from 'react';
import { siteSettings } from '@settings/site-settings';

export default function InitializeLocation() {
    useEffect(() => {
        // Check if 'clickedLocation' is already in localStorage
        const storedLocation = localStorage.getItem('clickedLocation');

        if (!storedLocation) {
            // Get Åland location from currencyMenu
            const alandLocation = siteSettings.site_header.currencyMenu.find(
                (option) => option.value === 'ax'
            );

            if (alandLocation) {
                // Store in localStorage
                localStorage.setItem('clickedLocation', JSON.stringify(alandLocation));
                console.log('Åland location saved:', alandLocation);
            } else {
                console.warn('Åland location not found in currencyMenu');
            }
        }
    }, []);

    return null; // No rendering needed
}
