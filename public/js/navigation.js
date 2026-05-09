document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-menu-close');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.remove('hidden');
            setTimeout(() => menu.classList.add('opacity-100'), 10);
        });
    }

    if (close && menu) {
        close.addEventListener('click', () => {
            menu.classList.remove('opacity-100');
            setTimeout(() => menu.classList.add('hidden'), 300);
        });
    }
});
