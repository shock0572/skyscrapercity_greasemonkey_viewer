// ==UserScript==
// @name         SkyscraperCity Compact View
// @namespace    https://github.com/shock0572/skyscrapercity_greasemonkey_viewer
// @version      1.7.4
// @description  Ultra-compact post layout for SkyscraperCity (XenForo 2) forums
// @author       You
// @match        https://www.skyscrapercity.com/*
// @updateURL    https://cdn.jsdelivr.net/gh/shock0572/skyscrapercity_greasemonkey_viewer@main/skyscrapercity-compact-view.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/shock0572/skyscrapercity_greasemonkey_viewer@main/skyscrapercity-compact-view.user.js
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const css = `
/* ===== LEGIBLE FONTS ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..600&display=swap');

body,
.message-body,
.message-content,
.bbWrapper,
.bbCodeBlock-content,
.p-body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  font-optical-sizing: auto !important;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1 !important;
}

/* Counteract halation: bright-on-dark text looks heavier than it is */
@media (prefers-color-scheme: dark) {
  body { -webkit-font-smoothing: antialiased !important; }
}
body {
  -webkit-text-stroke: 0.2px rgba(0,0,0,0.1) !important;
  font-synthesis: none !important;
}

/* Softer contrast — pure white on dark causes eye strain */
.message--post .message-content,
.message--post .bbWrapper {
  color: #dcdcdc !important;
}
.message--post .bbCodeBlock-content {
  color: #c8c8c8 !important;
}

.message--post .message-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-weight: 600 !important;
}

/* ===== POST LAYOUT: convert sidebar user-cell to inline header ===== */

.message--post .message-inner {
  display: flex !important;
  flex-direction: column !important;
}

.message--post .message-cell--user {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 8px !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  padding: 6px 10px !important;
  border-bottom: 1px solid rgba(255,255,255,0.06) !important;
  border-right: none !important;
  flex-basis: auto !important;
}

/* Small inline avatar */
.message--post .message-avatar {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  padding: 0 !important;
  margin: 0 !important;
}
.message--post .message-avatar .avatar {
  width: 28px !important;
  height: 28px !important;
}
.message--post .message-avatar img,
.message--post .message-avatar .avatar img {
  width: 28px !important;
  height: 28px !important;
  border-radius: 4px !important;
}
.message--post .message-avatar .avatar--s,
.message--post .message-avatar .avatar--m,
.message--post .message-avatar .avatar--l {
  width: 28px !important;
  height: 28px !important;
  font-size: 12px !important;
  line-height: 28px !important;
}

/* User details inline */
.message--post .message-userDetails {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
  padding: 0 !important;
  margin: 0 !important;
}

.message--post .message-name {
  font-size: 13px !important;
  margin: 0 !important;
}

.message--post .message-userTitle {
  display: none !important;
}

.message--post .message-userExtras {
  display: flex !important;
  flex-direction: row !important;
  gap: 8px !important;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 11px !important;
  opacity: 0.55 !important;
}
.message--post .message-userExtras dl {
  display: flex !important;
  gap: 3px !important;
  margin: 0 !important;
}
.message--post .message-userExtras dt {
  display: none !important;
}

/* User banners, ribbons, badges — hide in compact */
.message--post .message-userBanner,
.message--post .userBanner,
.message--post .message-userArrow {
  display: none !important;
}

/* ===== MAIN CONTENT CELL ===== */
.message--post .message-cell--main {
  padding: 4px 10px 6px !important;
  width: 100% !important;
  flex-basis: auto !important;
}

/* Attribution line (post number + time) — compact */
.message--post .message-attribution {
  padding: 0 0 3px !important;
  margin: 0 !important;
  font-size: 11px !important;
  opacity: 0.5 !important;
}
.message--post .message-attribution-main {
  padding: 0 !important;
}

/* ===== POST BODY ===== */
.message--post .message-body {
  padding: 2px 0 !important;
  margin: 0 !important;
}
.message--post .message-content {
  font-size: 14px !important;
  line-height: 1.6 !important;
  max-width: 100% !important;
}
.message--post .bbWrapper {
  font-size: 14px !important;
  line-height: 1.6 !important;
}
.message--post .bbWrapper p {
  margin: 0 0 10px !important;
}

/* ===== QUOTES: tighter ===== */
.message--post .bbCodeBlock--quote {
  margin: 4px 0 !important;
  padding: 0 !important;
  border-left: 3px solid rgba(255,255,255,0.15) !important;
  border-radius: 0 !important;
}
.message--post .bbCodeBlock-title {
  font-size: 11px !important;
  padding: 3px 8px !important;
  opacity: 0.6 !important;
}
.message--post .bbCodeBlock-content {
  padding: 6px 10px !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
}
.message--post .bbCodeBlock-expandLink {
  padding: 2px 8px !important;
  font-size: 11px !important;
}

/* ===== FOOTER (Reply, Like, Save, Share) ===== */
.message--post .message-footer {
  padding: 2px 0 !important;
  margin: 0 !important;
  min-height: auto !important;
}
.message--post .message-actionBar {
  font-size: 12px !important;
  padding: 0 !important;
}
.message--post .actionBar-set {
  gap: 4px !important;
}
.message--post .actionBar-action {
  padding: 2px 4px !important;
  font-size: 11.5px !important;
}

/* ===== POST SPACING ===== */
.message--post {
  margin-bottom: 2px !important;
  padding: 0 !important;
}
.message--post .message-inner {
  padding: 0 !important;
}

/* Reaction summary bar */
.message--post .reactionsBar {
  padding: 2px 0 !important;
  font-size: 11px !important;
}

/* ===== IMAGES: JS strips inline styles, CSS class does the rest ===== */
.message--post img.ssc-constrained {
  max-height: 250px !important;
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  object-fit: contain !important;
  cursor: zoom-in !important;
  border-radius: 4px !important;
}
.message--post img.ssc-constrained.ssc-expanded {
  max-height: none !important;
  cursor: zoom-out !important;
}
.message--post .ssc-wrap {
  display: inline-block !important;
  max-height: 250px !important;
  overflow: hidden !important;
  width: auto !important;
  height: auto !important;
}
.message--post .ssc-wrap-expanded {
  max-height: none !important;
  overflow: visible !important;
}

/* ===== THREAD PAGE LAYOUT ===== */

/* Remove right sidebar to reclaim width */
.p-body-sidebar {
  display: none !important;
  width: 0 !important;
  overflow: hidden !important;
}
.p-body-sideNav {
  display: none !important;
}
.p-body-content {
  flex: 1 !important;
  max-width: 80% !important;
  margin: 0 auto !important;
  width: 80% !important;
}
.p-body-main {
  max-width: 80% !important;
  margin: 0 auto !important;
}
.p-body-inner {
  max-width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

/* Tighter page padding */
.p-body-pageContent {
  padding: 4px 0 !important;
}
.block-body--messages {
  border-collapse: collapse !important;
}

/* Navigation breadcrumbs — compact */
.p-breadcrumbs {
  font-size: 12px !important;
  padding: 4px 0 !important;
}

/* Thread title bar */
.p-title {
  padding: 6px 0 !important;
}
.p-title-value {
  font-size: 18px !important;
}

/* Page nav — compact */
.pageNav {
  font-size: 12px !important;
}
.pageNav-page {
  padding: 2px 6px !important;
}

/* Header — reduce but keep functional */
.p-header-content {
  padding: 6px 10px !important;
}
.p-nav {
  font-size: 13px !important;
}

/* Signature blocks — hide to save space */
.message-signature {
  display: none !important;
}

/* "New" badge — smaller */
.message--post .message-newIndicator {
  font-size: 10px !important;
  padding: 1px 5px !important;
}

/* Bookmarks, last-edit info — compact */
.message--post .message-lastEdit {
  font-size: 11px !important;
  padding: 2px 0 !important;
  opacity: 0.5 !important;
}

/* ===== SPOILER BLOCKS ===== */
.bbCodeSpoiler {
  margin: 4px 0 !important;
}
.bbCodeSpoiler-button {
  font-size: 12px !important;
  padding: 2px 8px !important;
}

/* ===== THREAD LIST (forum index) ===== */
.structItem {
  padding: 4px 8px !important;
  min-height: auto !important;
}
.structItem-title {
  font-size: 13.5px !important;
}
.structItem-minor {
  font-size: 11.5px !important;
}
.structItem-cell--icon {
  width: 28px !important;
  padding: 4px !important;
}
.structItem-cell--icon .avatar {
  width: 24px !important;
  height: 24px !important;
}

/* ===== SCROLLBAR — thinner ===== */
::-webkit-scrollbar {
  width: 6px !important;
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15) !important;
  border-radius: 3px !important;
}

/* ===== MISC CLEANUP ===== */
.block-outer--after,
.block-outer--before {
  padding: 4px 0 !important;
}

/* ads and promo blocks */
.p-body-sidebar--ad,
.p-body-sidebar .block--widget,
.p-body-sidebar .widget,
.uix_extendedFooter,
.uix_sidebarWidget {
  display: none !important;
}
`;

  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    function nukeSidebar() {
      document.querySelectorAll('.p-body-sidebar').forEach(el => el.remove());
    }
    nukeSidebar();
    new MutationObserver(nukeSidebar).observe(document.body, { childList: true, subtree: true });

    function constrainImg(img) {
      if (img.classList.contains('ssc-constrained')) return;
      img.removeAttribute('style');
      img.classList.add('ssc-constrained');

      let el = img.parentElement;
      const body = img.closest('.message-body, .message-content');
      while (el && el !== body) {
        if (el.style && el.style.cssText) {
          el.removeAttribute('style');
        }
        if (!el.classList.contains('ssc-wrap')) {
          el.classList.add('ssc-wrap');
        }
        el = el.parentElement;
      }
    }

    function processAllImages() {
      document.querySelectorAll('.message--post img:not(.ssc-constrained)').forEach(constrainImg);
    }

    processAllImages();

    new MutationObserver(() => {
      processAllImages();
    }).observe(document.body, { childList: true, subtree: true });

    setInterval(processAllImages, 1000);

    document.addEventListener('click', (e) => {
      const post = e.target.closest('.message--post');
      if (!post) return;
      const img = e.target.closest('img.ssc-constrained');
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      img.classList.toggle('ssc-expanded');
      let el = img.parentElement;
      const body = img.closest('.message-body, .message-content');
      while (el && el !== body) {
        if (el.classList.contains('ssc-wrap')) {
          el.classList.toggle('ssc-wrap-expanded');
        }
        el = el.parentElement;
      }
    }, true);
  });
})();
