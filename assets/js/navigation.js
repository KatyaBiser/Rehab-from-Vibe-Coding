/**
 * Mobile Navigation Toggle
 * Handles the opening and closing of the mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');


    if (!navToggle || !navList) return;

    // Toggle menu on button click
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('nav__list--active');
        navToggle.classList.toggle('nav__toggle--active');

        // Prevent scrolling when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        const isOutside = !navList.contains(e.target) && !navToggle.contains(e.target);
        const isLink = e.target.closest('.nav__link');
        const isOpen = navList.classList.contains('nav__list--active');

        if (isOpen && (isOutside || isLink)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('nav__list--active');
            navToggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = '';
        }
    });

    // Prevent default behavior for dummy links
    const dummyLinks = document.querySelectorAll('a[href="#"]');
    dummyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.blur(); // Remove focus to avoid lingering focus styles
        });
    });

    // Handle viewport resize to reset menu state and body overflow using matchMedia for better performance
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    function handleTabletChange(e) {
        // If we've switched to desktop view (matches min-width: 768px)
        if (e.matches) {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('nav__list--active');
            navToggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = '';
        }
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleTabletChange);

    /* ============================================
       Search Toggle Logic
       ============================================ */
    const searchToggle = document.querySelector('.search-toggle');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchInput = document.querySelector('.search-dropdown .search__input');

    if (searchToggle && searchDropdown) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';

            searchToggle.setAttribute('aria-expanded', !isExpanded);
            searchDropdown.classList.toggle('search-dropdown--active');

            if (!isExpanded && searchInput) {
                // Focus input when opening
                setTimeout(() => searchInput.focus(), 50);
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
                searchToggle.setAttribute('aria-expanded', 'false');
                searchDropdown.classList.remove('search-dropdown--active');
            }
        });

        // Prevent closing when clicking inside the dropdown
        searchDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
