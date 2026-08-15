/* dsh-pixterm-theme client bundle: hand-written lazy-CJS factory for the DSH
   web module table (same shape tsdown emits).
 *
 * Pixel Terminal Blue (Light): recolors the DSH Web GUI through the theme
 * service's overrideTokens (stacked, fully removable) and injects one
 * stylesheet carrying the pixel-terminal look — VT323 / Press Start 2P
 * fonts, CRT scanlines, sharp corners, hard borders and offset shadows —
 * around #4176E6 on a white base.
 *
 * Everything is registered inside apply() and disposed with the plugin
 * fiber, so disabling or uninstalling the plugin restores the stock GUI.
 */
window.__ModuleLoader__.load({
  id: "dsh-pixterm-theme",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var STYLE_TAG_ID = "dsh-pixterm-theme/css";

    var TOKENS = {
      "--dsw-alias-bg-base":               { light: "#ffffff", dark: "#ffffff" },
      "--dsw-alias-bg-layer-1":            { light: "#ffffff", dark: "#ffffff" },
      "--dsw-alias-bg-layer-2":            { light: "#ffffff", dark: "#ffffff" },
      "--dsw-alias-bg-overlay":            { light: "#ffffff", dark: "#ffffff" },
      "--dsw-alias-border-l1":             { light: "#c3d1f2", dark: "#c3d1f2" },
      "--dsw-alias-border-l2":             { light: "#4176e6", dark: "#4176e6" },
      "--dsw-alias-brand-primary":         { light: "#4176e6", dark: "#4176e6" },
      "--dsw-alias-label-primary":         { light: "#1c2c56", dark: "#1c2c56" },
      "--dsw-alias-label-secondary":       { light: "#5674c4", dark: "#5674c4" },
      "--dsw-alias-state-error-primary":   { light: "#d93b4a", dark: "#d93b4a" },
      "--dsw-alias-state-success-primary": { light: "#1288a8", dark: "#1288a8" },
      "--dsw-alias-state-warn-primary":    { light: "#c98f1b", dark: "#c98f1b" },
      "--dsw-specific-sidebar-fill":       { light: "#ffffff", dark: "#ffffff" },
    };

    var CSS = [
      '@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap");',
      '',
      '/* product-specific fills → white */',
      ':root {',
      '  --dsw-specific-input-major: #ffffff !important;',
      '  --dsw-specific-bubble: #ffffff !important;',
      '}',
      '',
      '/* composer backdrop: soft blue GRADIENT */',
      '[data-phase="active"] div:has(> [data-composer-card]) {',
      '  background: linear-gradient(180deg,',
      '    rgba(207,221,248,0) 0%,',
      '    #eef3fd 38%,',
      '    #e3ecfc 72%,',
      '    #d3e0f9 100%) !important;',
      '}',
      '',
      '/* xterm terminal: force white surface (allowTransparency lets CSS through) */',
      '.xterm, .xterm-viewport, .xterm-screen, .xterm-rows {',
      '  background-color: #ffffff !important;',
      '}',
      '',
      '/* better-sidebar dock panels (right Explorer / bottom terminal): white frames */',
      '.W-zNGW_panel, .W-zNGW_bottomPanel, .W-zNGW_panelBody, .W-zNGW_tabBar {',
      '  background-color: #ffffff !important;',
      '}',
      '',
      '/* hover preview card: dark → white + blue text */',
      'div { --dsw-hovercard-bg: #ffffff !important; }',
      'body > div[role="button"][aria-label^="复制"],',
      'body > div[role="button"][aria-label^="Copy"] {',
      '  background-color: #ffffff !important;',
      '  border: 2px solid #4176e6 !important;',
      '  box-shadow: 6px 6px 0 #c3d1f2 !important;',
      '}',
      'body > div[role="button"][aria-label^="复制"] *,',
      'body > div[role="button"][aria-label^="Copy"] * {',
      '  color: #4176e6 !important;',
      '}',
      '',
      '/* dock details column: white */',
      '[data-slot="details"] { background-color: #ffffff !important; }',
      '',
      '/* chat transcript area → white (ONLY the conversation root phases) */',
      '[data-phase="active"], [data-phase="hero"], [data-phase="settling"] {',
      '  background-color: #ffffff !important;',
      '}',
      'textarea[data-phase] { background-color: transparent !important; }',
      '',
      '/* user message bubble → white + blue frame + hard projection */',
      '[data-time-hover-root]:not([data-turn-tail]) > div > div:last-child {',
      '  background-color: #ffffff !important;',
      '  border: 2px solid #4176e6 !important;',
      '  box-shadow: 6px 6px 0 #c3d1f2 !important;',
      '}',
      '',
      '/* header + sidebar foot rows → white */',
      'header { background-color: #ffffff !important; }',
      '[data-slot="sidebar.footer.action"] button, [data-slot="sidebar.footer.action"] [role="button"],',
      '[data-slot="sidebar.settings"] button, [data-slot="sidebar.settings"] [role="button"] {',
      '  background-color: #ffffff !important;',
      '}',
      '',
      '/* file-tree rows: white + unframed */',
      '[role="tree"] button, [role="tree"] [role="button"], button[role="treeitem"] {',
      '  border-color: transparent !important;',
      '  box-shadow: none !important;',
      '  background-color: #ffffff !important;',
      '}',
      '',
      '/* settings panel title: bold + accent blue */',
      '[data-slot="settings.header"] {',
      '  font-weight: 700 !important;',
      '  color: #4176e6 !important;',
      '}',
      '',
      '/* pressed/selected controls: blue fill + ALL descendants white */',
      'button[aria-pressed="true"] {',
      '  background-color: #4176e6 !important;',
      '  font-weight: 700 !important;',
      '  border-color: #2f5fd0 !important;',
      '}',
      'button[aria-pressed="true"], button[aria-pressed="true"] * {',
      '  color: #ffffff !important;',
      '}',
      '',
      '/* pixel font + sharp corners everywhere */',
      '*, *::before, *::after {',
      '  font-family: "VT323", "Microsoft YaHei", monospace !important;',
      '  border-radius: 0 !important;',
      '}',
      'body { font-size: 17px; letter-spacing: 0.02em; }',
      '',
      '/* faint paper-CRT scanlines + soft blue vignette */',
      'body::before {',
      '  content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;',
      '  background: repeating-linear-gradient(0deg, rgba(23,52,120,.05) 0 2px, transparent 2px 4px);',
      '}',
      'body::after {',
      '  content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;',
      '  background: radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(65,118,230,.10) 100%);',
      '}',
      '',
      '/* main headings: bold + accent blue (Press Start 2P + hard shadow) */',
      'h1, h2, [role="heading"][aria-level="1"], [role="heading"][aria-level="2"] {',
      '  font-family: "Press Start 2P", "VT323", "Microsoft YaHei", monospace !important;',
      '  font-weight: 700 !important;',
      '  color: #4176e6 !important;',
      '  text-shadow: 4px 4px 0 #c3d1f2;',
      '  line-height: 1.7 !important;',
      '}',
      'h3, h4, [role="heading"] {',
      '  font-weight: 700 !important;',
      '  color: #4176e6 !important;',
      '  text-transform: uppercase;',
      '  letter-spacing: .1em;',
      '  text-shadow: 2px 2px 0 #d5e0f8;',
      '}',
      '',
      '/* selected text: bold + accent blue */',
      '[aria-selected="true"],',
      '[aria-current="true"], [aria-current="page"],',
      'header nav button:disabled {',
      '  font-weight: 700 !important;',
      '  color: #4176e6 !important;',
      '}',
      '',
      '/* links */',
      'a { color: #2f5fd0; }',
      'a:hover { color: #4176e6; }',
      '',
      '/* pixel buttons: border + hard shadow, steps() press */',
      'button, [role="button"] {',
      '  border: 2px solid #4176e6 !important;',
      '  box-shadow: 4px 4px 0 #c3d1f2 !important;',
      '  transition: transform .08s steps(2), box-shadow .08s steps(2), background-color .12s steps(3) !important;',
      '}',
      'button:active, [role="button"]:active {',
      '  transform: translate(2px, 2px);',
      '  box-shadow: 2px 2px 0 #c3d1f2 !important;',
      '}',
      '',
      '/* icon-only buttons (LOGO / glyph buttons): no frame */',
      'button:has(> svg:only-child), button:has(> img:only-child),',
      '[role="button"]:has(> svg:only-child), [role="button"]:has(> img:only-child) {',
      '  border-color: transparent !important;',
      '  box-shadow: none !important;',
      '}',
      '',
      '/* session title pill + ALL tabs: no frame, no background; selected tab blue underline */',
      'header nav button,',
      '[role="tablist"] [role="tab"],',
      '[role="tablist"] button {',
      '  border-color: transparent !important;',
      '  box-shadow: none !important;',
      '  background-color: transparent !important;',
      '}',
      '[role="tab"][aria-selected="true"]::after, [role="tab"][data-active="true"]::after {',
      '  background: #4176e6 !important;',
      '}',
      '',
      '/* dropdown menu items: no frame */',
      '[role="menu"] button, [role="menu"] [role="button"],',
      '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"],',
      '[role="listbox"] [role="option"], [role="listbox"] button {',
      '  border-color: transparent !important;',
      '  box-shadow: none !important;',
      '}',
      '',
      '/* inputs: border removed, white field + focus underline */',
      'input, select, [contenteditable="true"] {',
      '  background-color: #ffffff !important;',
      '  border: none !important;',
      '  color: #1c2c56 !important;',
      '  caret-color: #4176e6 !important;',
      '}',
      '/* textarea: TRANSPARENT background (composer glyph layer); color non-important */',
      'textarea {',
      '  background-color: transparent !important;',
      '  border: none !important;',
      '  color: #1c2c56;',
      '  caret-color: #4176e6 !important;',
      '}',
      'input:focus, textarea:focus, select:focus, [contenteditable="true"]:focus {',
      '  border: none !important;',
      '  box-shadow: 0 2px 0 #4176e6 !important;',
      '}',
      '',
      '/* focus outline removed for text/logo; kept on real buttons */',
      ':focus-visible { outline: none !important; }',
      'button:focus-visible, [role="button"]:focus-visible {',
      '  outline: 2px solid #4176e6 !important; outline-offset: 1px;',
      '}',
      '',
      '/* inline text chips: no border, soft background only */',
      'code, kbd, samp {',
      '  background-color: #e3ebfc !important;',
      '  border: none !important;',
      '}',
      '/* block code stays a framed terminal panel */',
      'pre {',
      '  background-color: #e3ebfc !important;',
      '  border: 2px solid #c3d1f2 !important;',
      '  box-shadow: 6px 6px 0 #c3d1f2;',
      '}',
      'blockquote { border-left: 4px solid #4176e6 !important; background: #e3ebfc; }',
      'hr { border: none !important; border-top: 2px solid #c3d1f2 !important; }',
      'table, th, td { border-color: #c3d1f2 !important; }',
      '',
      '::selection { background: #4176e6; color: #ffffff; }',
      '',
      '/* pixel scrollbars */',
      '::-webkit-scrollbar { width: 12px; height: 12px; }',
      '::-webkit-scrollbar-track { background: #e9effc; }',
      '::-webkit-scrollbar-thumb { background: #c3d1f2; border: 2px solid #e9effc; }',
      '::-webkit-scrollbar-thumb:hover { background: #4176e6; }',
      '* { scrollbar-color: #c3d1f2 #e9effc; }',
    ].join("\n");

    /**
     * Client plugin body: stack the token layer, then inject the stylesheet.
     * Both side effects belong to the plugin fiber and roll back on disable.
     * @param {import('@deepseek-ai/dsh-client-runtime/client').ClientContext} ctx
     */
    function apply(ctx) {
      // 1. Token layer (no-op where the theme service is absent).
      var theme = ctx.get && ctx.get("theme");
      if (theme !== undefined && theme !== null) {
        ctx.effect(function () {
          return theme.overrideTokens("dsh-pixterm-theme", TOKENS);
        }, "dsh-pixterm-theme: tokens");
      }

      // 2. Stylesheet (manual <style> tag, removed with the plugin).
      ctx.effect(function () {
        if (typeof document === "undefined") return function () {};
        var existing = document.querySelector("style[data-plugin-css=" + JSON.stringify(STYLE_TAG_ID) + "]");
        if (existing !== null) return function () {};
        var tag = document.createElement("style");
        tag.dataset.pluginCss = STYLE_TAG_ID;
        tag.dataset.plugin = "dsh-pixterm-theme";
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return function () { tag.remove(); };
      }, "dsh-pixterm-theme: css");

      if (typeof console !== "undefined") console.log("[dsh-pixterm-theme] pixel terminal blue (light) applied");
    }

    exports.apply = apply;
    exports.name = "dsh-pixterm-theme";
    return module.exports;
  },
});
