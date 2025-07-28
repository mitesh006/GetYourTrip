// ========== MAIN INITIALIZATION FILE ==========
// This file handles the initial setup and loads appropriate functionality based on the current page

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common features that should run on every page
    initCommonFeatures();
    
    // Initialize page-specific functionality based on current page
    initPageSpecificFeatures();
});

function initPageSpecificFeatures() {
    const currentPath = window.location.pathname;
    
    // Landing page specific initialization
    if (currentPath.includes('Landing.html') || currentPath.endsWith('/') || currentPath === '') {
        initLandingPage();
    }
    
    // Search results page is handled by search-results.js
    // Auth page is handled by auth.js
    // My trips page can be added here when needed
}

function initLandingPage() {
    // Set default dates for the booking form
    setDefaultDates();
    
    // Initialize any landing page specific features
    console.log('Landing page initialized');
}