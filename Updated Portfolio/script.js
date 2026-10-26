(() => {
    'use strict';

    const EMAIL = 'stephentony77@gmail.com';
    const root = document.documentElement;

    // Theme management
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

    // Marquee duplication for infinite scrolling effect
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

    // Toast notification for copy action
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

    // Copy text to clipboard with fallback
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

    // Load external HTML components (e.g., nav, footer)
    const fallbackComponents = {
        'nav-placeholder': `
            <nav class="navbar" aria-label="Main navigation">

                <a href="index.html" class="brand-link"
                   aria-label="Tony Stephen, home">
                    <span class="brand-name">
                        Tony Stephen<span class="brand-period">.</span>
                    </span>
                </a>

                <div class="nav-links">
                    <a href="index.html#projects">Work</a>
                    <a href="index.html#skills">Capabilities</a>
                    <a href="index.html#about">About</a>
                </div>

                <div class="nav-actions">

                    <button
                        type="button"
                        class="icon-button theme-toggle"
                        data-theme-toggle
                        aria-label="Switch theme"
                        title="Switch theme">
                        <span class="theme-toggle-icon"
                              aria-hidden="true">◐</span>
                    </button>

                    <button
                        type="button"
                        class="nav-copy-button"
                        data-copy-email="${EMAIL}">
                        Copy Email <span aria-hidden="true">↗</span>
                    </button>

                </div>
            </nav>
        `,

        'footer-placeholder': `
            <footer class="footer-section">
                <div class="footer-content page-container">

                    <a href="index.html" class="footer-brand">
                        Tony Stephen<span>.</span>
                    </a>

                    <p class="footer-note">
                        Product Design · Front-End Development ·
                        AI &amp; Automation
                    </p>

                    <div class="footer-links-wrap">

                        <a href="https://github.com/tonysteppex"
                           target="_blank"
                           rel="noopener noreferrer">
                            GitHub ↗
                        </a>

                        <a href="https://www.linkedin.com/"
                           target="_blank"
                           rel="noopener noreferrer">
                            LinkedIn ↗
                        </a>

                        <a href="mailto:${EMAIL}">
                            Email ↗
                        </a>

                    </div>

                    <div class="footer-bottom">
                        <p>
                            © <span id="current-year"></span>
                            Tony Stephen. All rights reserved.
                        </p>

                        <a href="#main">Back to top ↑</a>
                    </div>

                </div>
            </footer>
        `
    };

    // Load external HTML components into placeholders
    async function loadComponent(elementId, filePath) {
        const target = document.getElementById(elementId);

        if (!target) return;

        try {
            const response = await fetch(filePath, {
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(
                    `${filePath} returned HTTP ${response.status}`
                );
            }

            const html = await response.text();

            if (!html.trim()) {
                throw new Error(`${filePath} is empty`);
            }

            target.innerHTML = html;

        } catch (error) {
            console.warn(
                `Unable to load ${filePath}. Using fallback component.`,
                error
            );

            const fallback = fallbackComponents[elementId];

            if (fallback) {
                target.innerHTML = fallback;
            }
        }

        if (elementId === 'footer-placeholder') {
            const year = target.querySelector('#current-year');

            if (year) {
                year.textContent = new Date().getFullYear();
            }
        }

        if (elementId === 'nav-placeholder') {
            // Reapply the active theme to the newly inserted controls.
            setTheme(root.dataset.theme || 'light');
        }
    }

    /* =========================================
       SCROLL REVEALS
    ========================================= */

    function initializeReveal() {
        const revealItems = document.querySelectorAll('[data-reveal]');

        if (
            !('IntersectionObserver' in window) ||
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
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

                    entry.target.classList.add(
                        'will-reveal',
                        'is-visible'
                    );

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

    /* =========================================
       PROJECT FILTERS
    ========================================= */

    function initializeProjectFilters() {
        document.addEventListener('click', (event) => {
            const filterButton = event.target.closest(
                '[data-project-filter]'
            );

            if (!filterButton) return;

            const category =
                filterButton.getAttribute('data-project-filter') || 'all';

            const projectGrid = document.getElementById('project-grid');

            if (!projectGrid) return;

            projectGrid.querySelectorAll('[data-category]').forEach((card) => {
                const matches =
                    category === 'all' ||
                    card.getAttribute('data-category') === category;

                card.hidden = !matches;
            });

            document.querySelectorAll('[data-project-filter]').forEach(
                (button) => {
                    const active = button === filterButton;

                    button.classList.toggle('is-active', active);
                    button.setAttribute(
                        'aria-pressed',
                        String(active)
                    );
                }
            );
        });
    }

    /* =========================================
       GLOBAL CLICK HANDLERS

       These work with both the original
       components and dynamically loaded fallbacks.
    ========================================= */

    function initializeClickHandlers() {
        document.addEventListener('click', (event) => {
            const themeButton = event.target.closest(
                '[data-theme-toggle]'
            );

            if (themeButton) {
                setTheme(
                    root.dataset.theme === 'dark' ? 'light' : 'dark'
                );

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
    }

    /* =========================================
       INITIALIZE SITE
    ========================================= */

    async function initializeSite() {
        initializeTheme();
        initializeMarquees();
        initializeReveal();
        initializeProjectFilters();
        initializeClickHandlers();

        await Promise.all([
            loadComponent('nav-placeholder', 'nav.html'),
            loadComponent('footer-placeholder', 'footer.html')
        ]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initializeSite,
            { once: true }
        );
    } else {
        initializeSite();
    }

})();