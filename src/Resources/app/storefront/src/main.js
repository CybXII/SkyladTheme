// Minimal storefront entrypoint; place your custom JS here.
document.addEventListener('DOMContentLoaded', () => {
    // Example: ripple effect on primary buttons
    document.querySelectorAll('.btn, .btn-primary, .btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.classList.add('btn--clicked');
            setTimeout(() => btn.classList.remove('btn--clicked'), 250);
        });
    });
});