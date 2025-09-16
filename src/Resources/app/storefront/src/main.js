// Minimal storefront entrypoint; place your custom JS here.
document.addEventListener('DOMContentLoaded', () => {
    // Example: ripple effect on primary buttons
    document.querySelectorAll('.btn, .btn-primary, .btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.classList.add('btn--clicked');
            setTimeout(() => btn.classList.remove('btn--clicked'), 250);
        });
    });

    initSkyladHeroSlider();
});

function initSkyladHeroSlider() {
    const sliders = document.querySelectorAll('[data-skylad-slider]');

    sliders.forEach((slider) => {
        const slides = Array.from(slider.querySelectorAll('[data-skylad-slide]'));
        const dotsWrapper = slider.querySelector('[data-skylad-slider-dots]');
        if (!slides.length || !dotsWrapper) {
            return;
        }

        const interval = parseInt(slider.dataset.skyladSliderInterval, 10) || 7000;
        slider.style.setProperty('--sk-slider-interval', `${interval}ms`);

        dotsWrapper.innerHTML = '';
        dotsWrapper.setAttribute('role', 'tablist');

        const dots = slides.map((slide, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'sk-home-slider__dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', 'false');
            dot.setAttribute('aria-label', `${slider.dataset.skyladSliderA11y || 'Slide'} ${index + 1}`);
            dot.addEventListener('click', () => {
                updateSlide(index);
                restartAuto();
            });
            dotsWrapper.appendChild(dot);
            return dot;
        });

        let currentIndex = 0;
        let autoTimer = null;

        const updateSlide = (newIndex) => {
            slides[currentIndex]?.classList.remove('is-active');
            if (dots[currentIndex]) {
                dots[currentIndex].classList.remove('is-active');
                dots[currentIndex].setAttribute('aria-selected', 'false');
            }

            currentIndex = newIndex % slides.length;

            slides[currentIndex].classList.add('is-active');
            dots[currentIndex].classList.add('is-active');
            dots[currentIndex].setAttribute('aria-selected', 'true');
        };

        const startAuto = () => {
            if (slides.length <= 1) {
                return;
            }
            stopAuto();
            autoTimer = window.setInterval(() => {
                updateSlide((currentIndex + 1) % slides.length);
            }, interval);
        };

        const stopAuto = () => {
            if (autoTimer) {
                window.clearInterval(autoTimer);
                autoTimer = null;
            }
        };

        const restartAuto = () => {
            stopAuto();
            startAuto();
        };

        slider.addEventListener('mouseenter', stopAuto);
        slider.addEventListener('mouseleave', startAuto);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAuto();
            } else {
                startAuto();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        updateSlide(0);
        startAuto();
    });
}
