const navDialog = document.getElementById('nav-dialog');

function handleMenu() {
    navDialog.classList.toggle('hidden');
}

const initialTranslateLTR = 0;
const initialTranslateRTL = 0; 

function setupSectionObserver(element, isLTR, speed) {
    // let scrollHandler;
        let scrollHandler = null;

    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
            // Create the scroll handler only once
            if (!scrollHandler) {
                scrollHandler = () => {
                    const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;
                    let totalTranslate;
                    if (isLTR) {
                        totalTranslate = translateX + initialTranslateLTR;
                    } else {
                        totalTranslate = -(translateX + initialTranslateRTL);
                    }
                    element.style.transform = `translateX(${totalTranslate}px)`;
                };
            }
            document.addEventListener('scroll', scrollHandler);
            // Trigger once immediately if already visible
            scrollHandler();
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }
    };

    const intersectionObserver = new IntersectionObserver(intersectionCallback, {
        threshold: 0.1 // Trigger when 10% of element is visible
    });
    intersectionObserver.observe(element);

    // Return a cleanup function
    return () => {
        intersectionObserver.unobserve(element);
        document.removeEventListener('scroll', scrollHandler);
    };
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

// Setup observers and store cleanup functions
const cleanupFunctions = [
    setupSectionObserver(line1, true, 0.15),
    setupSectionObserver(line2, false, 0.15),
    setupSectionObserver(line3, true, 0.15)
];

// If you need to clean up later (e.g., in a SPA when changing views)
// cleanupFunctions.forEach(cleanup => cleanup());