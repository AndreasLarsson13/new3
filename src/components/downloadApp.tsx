// AddToHomeScreenButton.js

import React, { useState, useEffect } from 'react';

function AddToHomeScreenButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // Lyssna på händelsen för att få instruktioner om att lägga till på startskärmen
    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            console.log('Before install prompt fired...');
            // Förhindra webbläsarens standarddialog
            event.preventDefault();
            // Spara händelsen så att den kan användas senare
            setDeferredPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Ta bort händelselyssnaren när komponenten avmonteras
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    // Funktion för att visa installationsprompten
    const addToHomeScreen = () => {
        if (deferredPrompt) {
            // Visa installationsprompten
            deferredPrompt.prompt();
            // Vänta på användarens svar på installationsprompten
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                // Återställ deferredPrompt efter att användaren har svarat
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <button onClick={addToHomeScreen}>Lägg till på startskärmen</button>
    );
}

export default AddToHomeScreenButton;
