// serviceWorker.js

// Lyssna på händelsen för att installera servicearbetaren
self.addEventListener('install', function (event) {
    console.log('Service worker installing...');
    // Utför nödvändiga åtgärder för installationen här
});

// Lyssna på händelsen för att aktivera servicearbetaren
self.addEventListener('activate', function (event) {
    console.log('Service worker activating...');
    // Utför nödvändiga åtgärder för aktivering här
});

// Lyssna på händelsen för att få instruktioner om att lägga till på startskärmen
self.addEventListener('beforeinstallprompt', function (event) {
    console.log('Before install prompt fired...');
    // Förhindra att webbläsarens standarddialog visas
    event.preventDefault();
    // Spara händelsen så att den kan användas senare
    deferredPrompt = event;
    // Visa en anpassad knapp eller annan användargränssnitt för att låta användaren lägga till webbplatsen till startskärmen
    // Exempel: visa en "Lägg till på startskärmen" -knapp på webbplatsen
});
