// ===== Sidebar Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        // Update nav
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-page') === pageId);
        });

        // Update page
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Handle URL hash on load
    const hash = window.location.hash.slice(1);
    if (hash) {
        showPage(hash);
    }

    // Update hash on page change
    const observer = new MutationObserver(() => {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            window.history.replaceState(null, '', `#${activePage.id}`);
        }
    });

    pages.forEach(page => {
        observer.observe(page, { attributes: true, attributeFilter: ['class'] });
    });

    // Highlight.js for code blocks
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});
