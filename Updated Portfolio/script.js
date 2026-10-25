(() => {
    const EMAIL = 'stephentony77@gmail.com';
    const root = document.documentElement;

    function setTheme(theme) {
        const nextTheme = theme === 'dark' ? 'dark' : 'light';

        root.dataset.theme = nextTheme;

        try {
            localStorage.setItem('tony-portfolio-theme', nextTheme);
        } catch (_) {
            // Private browsing may block storage.
        }

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            const icon = button.querySelector('.theme-toggle-icon');
            const switchingTo = nextTheme === 'dark' ? 'light' : 'dark';

            button.setAttribute('aria-label', `Switch to ${switchingTo} mode`);
            button.setAttribute('title', `Switch to ${switchingTo} mode`);

            if (icon) {
                icon.textContent = nextTheme === 'dark' ? '☼' : '◐';
            }
        });

        const themeColor = document.querySelector('meta[name="theme-color"]');

        if (themeColor) {
            themeColor.setAttribute(
                'content',
                nextTheme === 'dark' ? '#0B0D10' : '#F4F1EA'
            );
        }
    }

    function initializeTheme() {
        let savedTheme = null;

        try {
            savedTheme = localStorage.getItem('tony-portfolio-theme');
        } catch (_) {
            // Keep the default theme.
        }

        setTheme(savedTheme || 'light');
    }

    function initializeMarquees() {
        document.querySelectorAll('.marquee-content').forEach((track) => {
            if (track.dataset.duplicated === 'true') return;

            const originalItems = Array.from(track.children);

            if (!originalItems.length) return;

            originalItems.forEach((item) => {
                const clone = item.cloneNode(true);

                clone.setAttribute('aria-hidden', 'true');

                clone.querySelectorAll('img').forEach((image) => {
                    image.setAttribute('alt', '');
                    image.setAttribute('aria-hidden', 'true');
                    image.setAttribute('tabindex', '-1');
                });

                track.appendChild(clone);
            });

            track.dataset.duplicated = 'true';
        });
    }

    function setToast(message) {
        let toast = document.getElementById('site-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-message';
            toast.id = 'site-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.setAttribute('aria-atomic', 'true');

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('is-visible');

        window.clearTimeout(setToast.timeoutId);

        setToast.timeoutId = window.setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 2600);
    }

    async function copyText(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                setToast('Copied to clipboard!');
                return;
            }

            const temporaryInput = document.createElement('textarea');

            temporaryInput.value = text;
            temporaryInput.setAttribute('readonly', '');
            temporaryInput.style.position = 'fixed';
            temporaryInput.style.opacity = '0';
            temporaryInput.style.pointerEvents = 'none';

            document.body.appendChild(temporaryInput);
            temporaryInput.select();

            const copied = document.execCommand('copy');

            temporaryInput.remove();

            setToast(
                copied
                    ? 'Copied to clipboard!'
                    : `Email address: ${text}`
            );
        } catch (_) {
            setToast(`Email address: ${text}`);
        }
    }

    function loadComponent(elementId, filePath) {
        const target = document.getElementById(elementId);

        if (!target) return;

        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Could not load ${filePath} (${response.status})`
                    );
                }

                return response.text();
            })
            .then((html) => {
                target.innerHTML = html;

                if (elementId === 'footer-placeholder') {
                    const year = target.querySelector('#current-year');

                    if (year) {
                        year.textContent = new Date().getFullYear();
                    }
                }

                if (elementId === 'nav-placeholder') {
                    setTheme(root.dataset.theme || 'light');
                }
            })
            .catch((error) => {
                console.warn(
                    error.message,
                    'Make sure the site is opened through a local server, not directly from file://.'
                );
            });
    }

    function initializeReveal() {
        const revealItems = document.querySelectorAll('[data-reveal]');

        if (
            !('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            revealItems.forEach((item) => {
                item.classList.add('is-visible');
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('will-reveal', 'is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -35px 0px'
            }
        );

        revealItems.forEach((item) => {
            item.classList.add('will-reveal');
            observer.observe(item);
        });
    }

    document.addEventListener('click', (event) => {
        const themeButton = event.target.closest('[data-theme-toggle]');

        if (themeButton) {
            setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
            return;
        }

        const filterButton = event.target.closest('[data-project-filter]');

        if (filterButton) {
            const category =
                filterButton.getAttribute('data-project-filter') || 'all';

            const projectGrid = document.getElementById('project-grid');

            if (projectGrid) {
                projectGrid.querySelectorAll('[data-category]').forEach((card) => {
                    card.hidden =
                        category !== 'all' &&
                        card.getAttribute('data-category') !== category;
                });

                projectGrid
                    .querySelectorAll('[data-category]:not([hidden])')
                    .forEach((card) => {
                        card.classList.remove('is-visible');

                        requestAnimationFrame(() => {
                            card.classList.add('is-visible');
                        });
                    });
            }

            document.querySelectorAll('[data-project-filter]').forEach((button) => {
                const active = button === filterButton;

                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', String(active));
            });

            return;
        }

        const copyButton = event.target.closest('[data-copy-email]');

        if (copyButton) {
            event.preventDefault();

            copyText(
                copyButton.getAttribute('data-copy-email') || EMAIL
            );
        }
    });

    initializeTheme();
    initializeMarquees();
    initializeReveal();

    loadComponent('nav-placeholder', 'nav.html');
    loadComponent('footer-placeholder', 'footer.html');
})();