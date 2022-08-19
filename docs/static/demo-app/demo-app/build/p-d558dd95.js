import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-929fe042.js';
import { g as globalScripts } from './app-globals-05a7fd2f.js';

/*
 Stencil Client Patch Browser v2.17.3 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-26e7cb2c.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["demo-controls",[[0,"demo-controls",{"isOpen":[32]}]]],["wc-playground",[[4,"wc-playground",{"tag":[1025],"props":[1025],"slots":[1],"code":[1],"block":[4],"propsArray":[32],"slotsArray":[32],"renderedComponent":[32],"showConfigPanel":[32]}]]],["go-content-layout",[[4,"go-content-layout",{"pageHeading":[1,"page-heading"],"preHeading":[1,"pre-heading"],"intro":[1],"breadcrumbs":[1],"heroImgSrc":[1,"hero-img-src"],"heroImgAlt":[1,"hero-img-alt"],"toc":[4],"tocProps":[16],"sidebarMobilePosition":[1,"sidebar-mobile-position"],"sidebarDesktopPosition":[1,"sidebar-desktop-position"],"sidebarSticky":[4,"sidebar-sticky"],"computedSidebarPosition":[32],"initToc":[64]}]]],["go-footer",[[4,"go-footer",{"links":[1],"navLabel":[1,"nav-label"],"dark":[4],"navCols":[2,"nav-cols"],"navColsTablet":[2,"nav-cols-tablet"],"navColsDesktop":[2,"nav-cols-desktop"],"navItems":[32]}]]],["go-card-row",[[4,"go-card-row",{"noStretch":[4,"no-stretch"],"cols":[2],"colsTablet":[2,"cols-tablet"],"colsDesktop":[2,"cols-desktop"],"colsLarge":[2,"cols-large"],"stagger":[2],"heading":[1],"moreLinkHref":[1,"more-link-href"],"moreLinkText":[1,"more-link-text"]}]]],["go-dialog",[[4,"go-dialog",{"active":[1540],"role":[1],"persistent":[4],"heading":[1],"close":[64],"open":[64]}]]],["go-main-nav",[[4,"go-main-nav",{"items":[1],"navItems":[32],"init":[64]}]]],["go-search-bar",[[4,"go-search-bar",{"isSearchFormOpen":[32],"openSearchForm":[64],"closeSearchForm":[64]}]]],["go-to-top",[[0,"go-to-top",{"offset":[2],"active":[32]}]]],["go-banner",[[4,"go-banner",{"variant":[513],"heading":[1],"dismissible":[4],"isShowing":[32],"hasIcon":[32]}]]],["go-card",[[4,"go-card",{"cardTitle":[1,"card-title"],"cardSubtitle":[1,"card-subtitle"],"mediaPosition":[1,"media-position"],"href":[1],"target":[1],"flat":[4],"border":[4]}]]],["app-root",[[0,"app-root"]]],["go-badge",[[4,"go-badge",{"count":[2],"min":[2],"max":[2],"label":[1],"dotOnly":[4,"dot-only"]}]]],["go-button-group",[[4,"go-button-group",{"block":[513],"connected":[4]}]]],["go-chip",[[4,"go-chip",{"variant":[513],"outline":[516],"clickable":[4],"dismissible":[4]}]]],["go-gov-au-logo",[[4,"go-gov-au-logo",{"height":[1],"href":[1]}]]],["go-header-bar",[[4,"go-header-bar",{"breakpoint":[1]}]]],["go-md",[[4,"go-md",{"inline":[4],"content":[1025],"src":[1],"mdOptions":[1,"md-options"],"sanitise":[4],"useGoUi":[4,"use-go-ui"]}]]],["go-progress",[[4,"go-progress",{"min":[2],"max":[2],"value":[1026],"label":[1],"labelledby":[1],"indeterminate":[1028],"showPercentage":[4,"show-percentage"],"percentage":[32]}]]],["go-skip-link",[[4,"go-skip-link",{"target":[1],"href":[32]}]]],["go-spinner",[[4,"go-spinner",{"ringColor":[1,"ring-color"],"baseColor":[1,"base-color"],"size":[1],"ringWidth":[1,"ring-width"],"duration":[2],"stacked":[4],"loading":[516],"isLoading":[32]}]]],["go-tab",[[4,"go-tab",{"label":[1],"active":[1028],"tabId":[1025,"tab-id"],"panelId":[1025,"panel-id"]}]]],["go-table-wrapper",[[4,"go-table-wrapper",{"striped":[4],"bordered":[4],"hoverable":[4]}]]],["go-tabs",[[4,"go-tabs",{"tabGroupLabel":[1,"tab-group-label"],"vertical":[4],"manual":[4],"tabChildren":[32],"activeTabRect":[32]}]]],["go-hero",[[4,"go-hero",{"heading":[1],"preHeading":[1,"pre-heading"],"breadcrumb":[1],"imgSrc":[1,"img-src"],"imgAlt":[1,"img-alt"]}]]],["go-nav-drawer",[[4,"go-nav-drawer",{"position":[513],"items":[1],"active":[1540],"label":[1],"navItems":[32],"currentSubMenus":[32],"init":[64],"open":[64],"close":[64],"toggle":[64]}]]],["go-accordion",[[4,"go-accordion",{"multiple":[4]},[[0,"opened","openHandler"]]]]],["wc-output",[[0,"wc-output",{"usage":[1],"textCopied":[32]}]]],["go-nav-list",[[4,"go-nav-list",{"items":[1],"headingItem":[1,"heading-item"],"heading":[1],"block":[516],"navItems":[32],"navHeading":[32]}]]],["go-toc",[[0,"go-toc",{"label":[1],"scope":[1],"selector":[1],"tocItems":[32],"init":[64]}]]],["dark-mode-toggle",[[0,"dark-mode-toggle",{"inline":[4],"isDark":[32]}]]],["go-link",[[4,"go-link",{"href":[1],"target":[1],"expandClickableArea":[4,"expand-clickable-area"],"isExternal":[32],"isNewTab":[32]}]]],["go-tooltip",[[4,"go-tooltip",{"triggerId":[1,"trigger-id"],"arrow":[4],"inline":[4],"placement":[1],"isActive":[32]}]]],["props-panel",[[0,"props-panel",{"debug":[4],"values":[16]}]]],["slots-panel",[[0,"slots-panel",{"debug":[4],"values":[16]}]]],["go-icon",[[0,"go-icon",{"iconSet":[513,"icon-set"],"name":[1],"size":[1],"color":[1],"decorative":[4]}]]],["go-nav-link",[[4,"go-nav-link",{"item":[16],"showArrow":[4,"show-arrow"],"block":[516]}]]],["go-breadcrumb",[[0,"go-breadcrumb",{"label":[1],"items":[1],"hideCurrent":[4,"hide-current"],"navItems":[32]}]]],["go-accordion-item",[[4,"go-accordion-item",{"heading":[1],"headingTag":[1,"heading-tag"],"autoHeight":[4,"auto-height"],"active":[1540],"hasHeadingSlot":[32],"hasArrowSlot":[32],"toggle":[64],"close":[64],"open":[64],"focusOnControl":[64]}]]],["go-switch",[[0,"go-switch",{"checked":[4],"name":[1],"label":[1],"disabled":[4],"value":[8],"stack":[4],"fullWidth":[4,"full-width"],"showOnOff":[4,"show-on-off"],"showOnOffOutside":[4,"show-on-off-outside"],"activeLabel":[1,"active-label"],"inactiveLabel":[1,"inactive-label"],"isOn":[32]}]]],["go-overlay",[[4,"go-overlay",{"active":[1540],"persistent":[4],"close":[64],"open":[64]}]]],["go-button",[[4,"go-button",{"type":[1],"disabled":[516],"variant":[513],"block":[513],"outline":[516],"outlineFill":[516,"outline-fill"],"flat":[516],"round":[516],"icon":[516],"stack":[516],"compact":[516],"href":[1],"blockClasses":[32]}]]]], options);
});
