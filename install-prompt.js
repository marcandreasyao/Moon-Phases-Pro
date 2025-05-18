// PWA Install Prompt Logic
let deferredPrompt;
const installSection = document.getElementById('pwa-install-section');
const installButton = document.getElementById('pwa-install-button');

// Track install state
let hasInstalledPWA = false;

// Check if app is installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    hasInstalledPWA = true;
}

// Capture install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show the install section if not already installed
    if (!hasInstalledPWA) {
        installSection.classList.remove('hidden');
        installSection.classList.add('animate-fade-in');
    }
});

// Handle install button click
if (installButton) {
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        // Show install prompt
        deferredPrompt.prompt();
        
        // Wait for user choice
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            hasInstalledPWA = true;
            installSection.classList.add('hidden');
        }
        
        // Clear the prompt
        deferredPrompt = null;
    });
}

// Handle successful installation
window.addEventListener('appinstalled', (e) => {
    hasInstalledPWA = true;
    installSection.classList.add('hidden');
    
    // Show success notification using your existing notification system
    const notificationBar = document.getElementById('notification-bar');
    if (notificationBar) {
        notificationBar.className = 'visible success';
        notificationBar.innerHTML = `
            <span class="notif-icon">✓</span>
            Moon Phases Pro was successfully installed
            <button class="notif-close">×</button>
        `;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notificationBar.className = '';
        }, 3000);
    }
});
