/**
 * Mobile Navigation Toggle
 * Handles the opening and closing of the mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

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

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('nav__list--active');
            navToggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !navToggle.contains(e.target) && navList.classList.contains('nav__list--active')) {
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
});
