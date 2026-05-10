(() => {
    const backToTop = document.querySelector('.back-to-top');

    if (!backToTop) {
        return;
    }

    const toggleBackToTop = () => {
        if (window.scrollY > 260) {
            backToTop.style.display = 'inline-flex';
        } else {
            backToTop.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
