// ==UserScript==
// @name         SkyscraperCity Compact View
// @namespace    https://github.com/skyscrapercity-compact
// @version      1.5.1
// @description  Ultra-compact post layout for SkyscraperCity (XenForo 2) forums
// @author       You
// @match        https://www.skyscrapercity.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'ssc_compact_enabled';

  function isEnabled() {
    return localStorage.getItem(STORAGE_KEY) !== 'false';
  }

  function toggle() {
    const next = !isEnabled();
    localStorage.setItem(STORAGE_KEY, next);
    location.reload();
  }

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand(
      isEnabled() ? 'Disable Compact View' : 'Enable Compact View',
      toggle
    );
  }

  if (!isEnabled()) return;

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
  letter-spacing: 0.01em !important;
  word-spacing: 0.02em !important;
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
  letter-spacing: 0.02em !important;
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
  font-size: 15px !important;
  line-height: 1.7 !important;
  max-width: 75ch !important;
}
.message--post .bbWrapper {
  font-size: 15px !important;
  line-height: 1.7 !important;
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
  font-size: 14px !important;
  line-height: 1.55 !important;
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

/* ===== ATTACHMENTS: smaller thumbnails ===== */
.message--post .attachment-thumb {
  max-width: 150px !important;
  max-height: 150px !important;
}
.message--post .js-lbImage {
  max-width: 400px !important;
}

/* ===== EMBEDDED IMAGES: reasonable sizing ===== */
.message--post .bbImage {
  max-height: 300px !important;
  width: auto !important;
}

/* ===== THREAD PAGE LAYOUT ===== */

/* Remove right sidebar to reclaim width */
.p-body-sidebar {
  display: none !important;
}
.p-body-content {
  flex: 1 !important;
  max-width: 80% !important;
  margin: 0 auto !important;
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

/* ads / promo blocks */
.p-body-sidebar--ad,
[data-widget-section] {
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
    const indicator = document.createElement('div');
    indicator.textContent = 'Compact';
    Object.assign(indicator.style, {
      position: 'fixed',
      bottom: '8px',
      right: '8px',
      background: 'rgba(0,0,0,0.6)',
      color: '#8f8',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      zIndex: '99999',
      cursor: 'pointer',
      opacity: '0.6',
      transition: 'opacity 0.2s',
    });
    indicator.title = 'Click to disable compact view';
    indicator.addEventListener('click', toggle);
    indicator.addEventListener('mouseenter', () => { indicator.style.opacity = '1'; });
    indicator.addEventListener('mouseleave', () => { indicator.style.opacity = '0.6'; });
    document.body.appendChild(indicator);
  });
})();
