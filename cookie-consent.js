/**
 * EngMarq Solution - Cookie Consent Manager
 * LGPD-compliant cookie consent with granular categories
 */
(function () {
    'use strict';

    var CONSENT_KEY = 'engmarq_cookie_consent';
    var CONSENT_LOG_KEY = 'engmarq_consent_log';

    var defaultPreferences = {
        necessary: true,
        analytics: false,
        marketing: false
    };

    function getConsent() {
        try {
            var stored = localStorage.getItem(CONSENT_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(preferences) {
        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
            logConsent(preferences);
        } catch (e) {
            // Silently fail if storage is unavailable
        }
    }

    function logConsent(preferences) {
        try {
            var log = JSON.parse(localStorage.getItem(CONSENT_LOG_KEY) || '[]');
            log.push({
                timestamp: new Date().toISOString(),
                preferences: preferences,
                userAgent: navigator.userAgent.substring(0, 100)
            });
            // Keep only last 50 entries
            if (log.length > 50) {
                log = log.slice(-50);
            }
            localStorage.setItem(CONSENT_LOG_KEY, JSON.stringify(log));
        } catch (e) {
            // Silently fail
        }
    }

    function applyConsent(preferences) {
        if (preferences.analytics) {
            loadAnalytics();
        } else {
            removeAnalyticsCookies();
        }

        if (preferences.marketing) {
            loadMarketing();
        } else {
            removeMarketingCookies();
        }
    }

    function loadAnalytics() {
        // Only load if not already loaded
        if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17875424072';
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'AW-17875424072', { anonymize_ip: true });
    }

    function loadMarketing() {
        // Marketing scripts would be loaded here
        if (window.gtag) {
            window.gtag('config', 'AW-17875424072', {
                allow_ad_personalization_signals: true
            });
        }
    }

    function removeAnalyticsCookies() {
        var cookiesToRemove = ['_ga', '_ga_', '_gid', '_gat'];
        cookiesToRemove.forEach(function (name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        });
    }

    function removeMarketingCookies() {
        var cookiesToRemove = ['_gcl_au', '_gcl_aw'];
        cookiesToRemove.forEach(function (name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        });
    }

    function createBanner() {
        // Don't create banner if it already exists
        if (document.getElementById('cookie-consent-banner')) return;

        var banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Consentimento de Cookies');
        banner.setAttribute('aria-modal', 'false');
        banner.innerHTML =
            '<div class="ccb-content">' +
                '<div class="ccb-text">' +
                    '<h2 class="ccb-title"><i class="fas fa-cookie-bite" aria-hidden="true"></i> Cookies e Privacidade</h2>' +
                    '<p>Utilizamos cookies para melhorar sua experiência. Cookies essenciais são necessários para o funcionamento do site. Você pode aceitar, rejeitar ou personalizar os demais cookies. Saiba mais em nossa <a href="politica-cookies.html">Política de Cookies</a> e <a href="politica-privacidade.html">Política de Privacidade</a>.</p>' +
                '</div>' +
                '<div class="ccb-actions">' +
                    '<button type="button" class="ccb-btn ccb-btn-accept" id="ccb-accept-all">Aceitar Todos</button>' +
                    '<button type="button" class="ccb-btn ccb-btn-reject" id="ccb-reject-all">Rejeitar Não Essenciais</button>' +
                    '<button type="button" class="ccb-btn ccb-btn-settings" id="ccb-open-settings">Personalizar</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(banner);

        document.getElementById('ccb-accept-all').addEventListener('click', function () {
            var prefs = { necessary: true, analytics: true, marketing: true };
            saveConsent(prefs);
            applyConsent(prefs);
            closeBanner();
        });

        document.getElementById('ccb-reject-all').addEventListener('click', function () {
            var prefs = { necessary: true, analytics: false, marketing: false };
            saveConsent(prefs);
            applyConsent(prefs);
            closeBanner();
        });

        document.getElementById('ccb-open-settings').addEventListener('click', function () {
            closeBanner();
            openSettings();
        });

        // Show with animation
        requestAnimationFrame(function () {
            banner.classList.add('ccb-visible');
        });
    }

    function closeBanner() {
        var banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('ccb-visible');
            setTimeout(function () {
                banner.remove();
            }, 400);
        }
    }

    function openSettings() {
        // Remove existing modal if any
        var existing = document.getElementById('cookie-settings-modal');
        if (existing) existing.remove();

        var current = getConsent() || defaultPreferences;

        var modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-label', 'Configurações de Cookies');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML =
            '<div class="ccs-overlay" id="ccs-overlay"></div>' +
            '<div class="ccs-content" role="document">' +
                '<div class="ccs-header">' +
                    '<h2>Configurações de Cookies</h2>' +
                    '<button type="button" class="ccs-close" id="ccs-close" aria-label="Fechar configurações de cookies">&times;</button>' +
                '</div>' +
                '<div class="ccs-body">' +
                    '<p>Gerencie suas preferências de cookies. Cookies estritamente necessários não podem ser desativados.</p>' +
                    '<div class="ccs-category">' +
                        '<div class="ccs-cat-header">' +
                            '<div class="ccs-cat-info">' +
                                '<h3>Estritamente Necessários</h3>' +
                                '<p>Cookies essenciais para o funcionamento do site.</p>' +
                            '</div>' +
                            '<label class="ccs-toggle ccs-toggle-disabled">' +
                                '<input type="checkbox" checked disabled aria-label="Cookies necessários - sempre ativos">' +
                                '<span class="ccs-slider"></span>' +
                                '<span class="ccs-always">Sempre ativo</span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ccs-category">' +
                        '<div class="ccs-cat-header">' +
                            '<div class="ccs-cat-info">' +
                                '<h3>Análise e Desempenho</h3>' +
                                '<p>Nos ajudam a entender como os visitantes utilizam o site (Google Analytics).</p>' +
                            '</div>' +
                            '<label class="ccs-toggle">' +
                                '<input type="checkbox" id="ccs-analytics" ' + (current.analytics ? 'checked' : '') + ' aria-label="Cookies de análise e desempenho">' +
                                '<span class="ccs-slider"></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ccs-category">' +
                        '<div class="ccs-cat-header">' +
                            '<div class="ccs-cat-info">' +
                                '<h3>Marketing</h3>' +
                                '<p>Utilizados para rastreamento de conversões e anúncios relevantes (Google Ads).</p>' +
                            '</div>' +
                            '<label class="ccs-toggle">' +
                                '<input type="checkbox" id="ccs-marketing" ' + (current.marketing ? 'checked' : '') + ' aria-label="Cookies de marketing">' +
                                '<span class="ccs-slider"></span>' +
                            '</label>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ccs-footer">' +
                    '<button type="button" class="ccb-btn ccb-btn-accept" id="ccs-save">Salvar Preferências</button>' +
                    '<button type="button" class="ccb-btn ccb-btn-settings" id="ccs-accept-all">Aceitar Todos</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);

        requestAnimationFrame(function () {
            modal.classList.add('ccs-visible');
        });

        // Focus trap
        var closeBtn = document.getElementById('ccs-close');
        closeBtn.focus();

        document.getElementById('ccs-close').addEventListener('click', closeSettings);
        document.getElementById('ccs-overlay').addEventListener('click', closeSettings);

        document.getElementById('ccs-save').addEventListener('click', function () {
            var prefs = {
                necessary: true,
                analytics: document.getElementById('ccs-analytics').checked,
                marketing: document.getElementById('ccs-marketing').checked
            };
            saveConsent(prefs);
            applyConsent(prefs);
            closeSettings();
        });

        document.getElementById('ccs-accept-all').addEventListener('click', function () {
            var prefs = { necessary: true, analytics: true, marketing: true };
            saveConsent(prefs);
            applyConsent(prefs);
            closeSettings();
        });

        // Close on Escape
        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeSettings();
            }
        });
    }

    function closeSettings() {
        var modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('ccs-visible');
            setTimeout(function () {
                modal.remove();
            }, 400);
        }
    }

    function createSettingsButton() {
        if (document.getElementById('cookie-settings-btn')) return;

        var btn = document.createElement('button');
        btn.id = 'cookie-settings-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Configurações de Cookies');
        btn.title = 'Configurações de Cookies';
        btn.innerHTML = '<i class="fas fa-cookie-bite" aria-hidden="true"></i>';
        btn.addEventListener('click', openSettings);
        document.body.appendChild(btn);
    }

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent =
            /* Banner */
            '#cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
            'background:rgba(26,54,93,0.98);backdrop-filter:blur(10px);color:#fff;padding:1.5rem;' +
            'transform:translateY(100%);transition:transform 0.4s ease;box-shadow:0 -4px 20px rgba(0,0,0,0.2)}' +
            '#cookie-consent-banner.ccb-visible{transform:translateY(0)}' +
            '.ccb-content{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:2rem;flex-wrap:wrap}' +
            '.ccb-text{flex:1;min-width:280px}' +
            '.ccb-title{font-family:var(--font-primary,Montserrat,sans-serif);font-size:1.15rem;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem}' +
            '.ccb-text p{font-size:0.9rem;line-height:1.6;margin:0;color:rgba(255,255,255,0.85)}' +
            '.ccb-text a{color:#f5a623;text-decoration:underline}' +
            '.ccb-actions{display:flex;gap:0.75rem;flex-wrap:wrap}' +
            '.ccb-btn{padding:0.7rem 1.5rem;border:none;border-radius:0.5rem;font-family:var(--font-primary,Montserrat,sans-serif);' +
            'font-weight:600;font-size:0.875rem;cursor:pointer;transition:all 0.3s ease;white-space:nowrap}' +
            '.ccb-btn:focus-visible{outline:3px solid #f5a623;outline-offset:2px}' +
            '.ccb-btn-accept{background:#25d366;color:#fff}' +
            '.ccb-btn-accept:hover{background:#128c7e}' +
            '.ccb-btn-reject{background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3)}' +
            '.ccb-btn-reject:hover{background:rgba(255,255,255,0.25)}' +
            '.ccb-btn-settings{background:transparent;color:#f5a623;border:1px solid #f5a623}' +
            '.ccb-btn-settings:hover{background:rgba(245,166,35,0.1)}' +

            /* Settings Modal */
            '#cookie-settings-modal{position:fixed;top:0;left:0;right:0;bottom:0;z-index:100000;' +
            'display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all 0.3s}' +
            '#cookie-settings-modal.ccs-visible{opacity:1;visibility:visible}' +
            '.ccs-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6)}' +
            '.ccs-content{position:relative;background:#fff;border-radius:1rem;max-width:560px;width:calc(100% - 2rem);' +
            'max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3)}' +
            '.ccs-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem;border-bottom:1px solid #e2e8f0}' +
            '.ccs-header h2{font-family:var(--font-primary,Montserrat,sans-serif);font-size:1.25rem;color:#1a365d;margin:0}' +
            '.ccs-close{width:36px;height:36px;border-radius:50%;border:none;background:#f1f5f9;font-size:1.25rem;cursor:pointer;' +
            'display:flex;align-items:center;justify-content:center;transition:background 0.3s}' +
            '.ccs-close:hover{background:#e2e8f0}' +
            '.ccs-close:focus-visible{outline:3px solid #f5a623;outline-offset:2px}' +
            '.ccs-body{padding:1.5rem}' +
            '.ccs-body>p{font-size:0.9rem;color:#64748b;margin-bottom:1.5rem}' +
            '.ccs-category{border:1px solid #e2e8f0;border-radius:0.75rem;padding:1rem 1.25rem;margin-bottom:1rem}' +
            '.ccs-cat-header{display:flex;align-items:center;justify-content:space-between;gap:1rem}' +
            '.ccs-cat-info h3{font-family:var(--font-primary,Montserrat,sans-serif);font-size:0.95rem;color:#1f2937;margin:0 0 0.25rem}' +
            '.ccs-cat-info p{font-size:0.8rem;color:#64748b;margin:0}' +

            /* Toggle Switch */
            '.ccs-toggle{position:relative;display:inline-flex;align-items:center;gap:0.5rem;cursor:pointer;flex-shrink:0}' +
            '.ccs-toggle input{opacity:0;width:0;height:0;position:absolute}' +
            '.ccs-slider{width:44px;height:24px;background:#cbd5e1;border-radius:12px;position:relative;transition:background 0.3s}' +
            '.ccs-slider::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;' +
            'border-radius:50%;transition:transform 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2)}' +
            '.ccs-toggle input:checked+.ccs-slider{background:#25d366}' +
            '.ccs-toggle input:checked+.ccs-slider::after{transform:translateX(20px)}' +
            '.ccs-toggle input:focus-visible+.ccs-slider{outline:3px solid #f5a623;outline-offset:2px}' +
            '.ccs-toggle-disabled{cursor:default}' +
            '.ccs-toggle-disabled .ccs-slider{background:#25d366}' +
            '.ccs-toggle-disabled .ccs-slider::after{transform:translateX(20px)}' +
            '.ccs-always{font-size:0.75rem;color:#25d366;font-weight:600;white-space:nowrap}' +

            '.ccs-footer{display:flex;gap:0.75rem;padding:1rem 1.5rem;border-top:1px solid #e2e8f0;flex-wrap:wrap}' +
            '.ccs-footer .ccb-btn{flex:1;min-width:140px;text-align:center;justify-content:center}' +

            /* Settings FAB */
            '#cookie-settings-btn{position:fixed;bottom:100px;left:20px;z-index:9998;width:48px;height:48px;' +
            'border-radius:50%;background:#1a365d;color:#f5a623;border:none;cursor:pointer;font-size:1.25rem;' +
            'box-shadow:0 4px 15px rgba(0,0,0,0.2);transition:all 0.3s;display:flex;align-items:center;justify-content:center}' +
            '#cookie-settings-btn:hover{background:#0f2744;transform:scale(1.1)}' +
            '#cookie-settings-btn:focus-visible{outline:3px solid #f5a623;outline-offset:2px}' +

            /* Responsive */
            '@media(max-width:768px){.ccb-content{flex-direction:column;align-items:stretch}' +
            '.ccb-actions{flex-direction:column}.ccb-btn{width:100%;text-align:center;justify-content:center}' +
            '.ccs-cat-header{flex-direction:column;align-items:flex-start}' +
            '.ccs-footer{flex-direction:column}}';

        document.head.appendChild(style);
    }

    // Initialize
    function init() {
        injectStyles();

        var consent = getConsent();

        if (!consent) {
            // Block Google Analytics/Ads scripts that might be in the HTML
            blockExistingScripts();
            createBanner();
        } else {
            applyConsent(consent);
        }

        createSettingsButton();
    }

    function blockExistingScripts() {
        // Remove any gtag scripts that were loaded before consent
        var scripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
        scripts.forEach(function (s) { s.remove(); });
        // Clear dataLayer
        window.dataLayer = [];
    }

    // Expose public API
    window.engmarqCookieConsent = {
        openSettings: openSettings,
        getConsent: getConsent,
        getLog: function () {
            try {
                return JSON.parse(localStorage.getItem(CONSENT_LOG_KEY) || '[]');
            } catch (e) {
                return [];
            }
        }
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
