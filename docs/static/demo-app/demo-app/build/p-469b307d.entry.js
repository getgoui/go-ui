import{r,h as e,H as a,c as n,g as t}from"./p-506d8682.js";import{i}from"./p-d8cdaaf1.js";import{t as o}from"./p-0c14c726.js";import{p as s}from"./p-e6a260f7.js";import"./p-3bbd36a2.js";import"./p-0bc4f624.js";const l=class{constructor(e){r(this,e),this.isDark=!1,this.inline=!1}componentWillLoad(){this.isDark=window.matchMedia("(prefers-color-scheme: dark)").matches,this.checkLocalStorage()}checkLocalStorage(){this.isDark="dark"===localStorage.getItem("theme")}toggleDarkMode(){this.isDark=!this.isDark}darkModeChanged(r){document.documentElement.setAttribute("data-theme",r?"dark":"light")}render(){return e(a,null,e("go-switch",{checked:this.isDark,name:"dark-toggle","full-width":!0,onChange:()=>this.toggleDarkMode(),"show-on-off":!0,"active-label":"🌙","inactive-label":"🌞"}))}static get watchers(){return{isDark:["darkModeChanged"]}}};l.style="dark-mode-toggle go-button .inner-button svg{height:1.2em}";const d=class{constructor(e){r(this,e),this.openEvent=n(this,"open",7),this.closeEvent=n(this,"close",7),this.position="left",this.navItems=null,this.active=!1,this.label="Menu",this.currentSubMenus=[],this.inheritedAttrs={},this.subMenus=null}async init(r){this.navItems=s(r)}async open(){this.active=!0,this.openEvent.emit()}async close(){for(;this.currentSubMenus.length>0;)await this.closeCurrentSubMenu();this.active=!1,this.closeEvent.emit()}async toggle(){this.active?this.close():this.open()}componentWillLoad(){this.inheritedAttrs=i(this.el,["class","style","items","active","position"],!1);try{this.navItems=s(this.items)}catch(r){console.warn("Could not parse nav items.",r)}}async closeCurrentSubMenu(){if(0===this.currentSubMenus.length)return;const r=this.currentSubMenus.slice(-1)[0];r.classList.remove("active"),r.querySelector(".nav-item-inner").setAttribute("aria-expanded","false"),this.currentSubMenus=this.currentSubMenus.slice(0,-1)}openSubMenu(r){const e=r.target,a=e.closest("li");a.classList.add("active"),e.setAttribute("aria-expanded","true"),o(a.querySelector(".nav-menu")),this.currentSubMenus=[...this.currentSubMenus,a]}renderNavItems(r,a){const n=!!a;return e("div",{class:{"nav-menu":!0,"is-sub-nav":n}},e("div",{class:"nav-drawer-header"},e("div",{class:"header-row"},a?e("go-button",{class:"back-btn",flat:!0,stack:!0,variant:"text",compact:!0,onClick:()=>this.closeCurrentSubMenu()},e("svg",{slot:"prefix","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},e("path",{d:"M19 12H5M12 19l-7-7 7-7"})),e("span",null,"Back")):e("span",null),!n&&e("div",{class:"title"},this.label),e("go-button",{class:"close-btn",flat:!0,stack:!0,variant:"text",compact:!0,onClick:()=>this.close()},e("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},e("path",{d:"M18 6 6 18M6 6l12 12"})),e("span",null,"Close")))),(null==r?void 0:r.length)>0?e("nav",{"aria-label":n?a.label:this.label},n&&a.url?e("div",{class:"parent-link"},e("a",Object.assign({href:a.url},a.linkAttrs),e("span",{class:"nav-item-label"},a.icon&&e("go-icon",{name:a.icon}),e("span",null,a.label)),e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},e("path",{d:"M5 12h14M12 5l7 7-7 7"})))):null,e("ul",null,r.map((r=>this.renderNavItem(r))))):null)}renderNavItem(r){var a;let n="a";const t=(null===(a=null==r?void 0:r.children)||void 0===a?void 0:a.length)>0;r.isCurrent&&(n="span"),t&&(n="button");let i=null;return"a"===n&&(i=Object.assign({href:r.url},r.linkAttrs)),"button"===n&&(i={type:"button","aria-haspopup":"true","aria-expanded":"false",onClick:r=>this.openSubMenu(r)}),e("li",{class:{"nav-item":!0,"has-children":t,current:r.isCurrent}},e(n,Object.assign({class:"nav-item-inner"},i),e("span",{class:"nav-item-label"},r.icon&&e("go-icon",{name:r.icon}),e("span",null,r.label)),t?e("svg",{class:"children-indicator",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},e("path",{d:"m9 18 6-6-6-6"})):null),r.children?this.renderNavItems(r.children,r):null)}render(){let{navItems:r,active:a,position:n,inheritedAttrs:t}=this;return e("go-overlay",Object.assign({active:a},t,{onOverlayClose:()=>this.close()}),e("div",{class:{"nav-drawer":!0,open:a,[n]:!!n}},r?e("div",{class:"nav-container"},this.renderNavItems(r)):e("slot",null)))}get el(){return t(this)}};d.style=".nav-drawer{--drawer-bg-color:var(--go-color-lightest);--drawer-max-width:24rem;--nav-item-text-color:var(--go-color-darkest);--nav-item-bg-color:var(--go-color-lightest);--nav-item-hover-bg-color:var(--go-color-neutral-200);--nav-item-padding:var(--go-size--1) var(--go-size-0);--nav-header-padding:var(--go-size--1) var(--go-size-0);--nav-header-border-color:var(--go-color-neutral-200);--nav-item-icon-gap:var(--go-size-0);--nav-item-current-bar-width:4px;--nav-item-current-bar-width:0.25rem;--nav-item-current-bar-color:var(--go-color-primary-500);--submenu-parent-link-border-bottom:1px solid var(--go-color-neutral-200);--submenu-parent-link-border-bottom:0.0625rem solid var(--go-color-neutral-200);display:block;width:100%;height:100%;position:fixed;top:0;left:0;z-index:var(--layer-important);background:var(--drawer-bg-color);transform:translateX(-100%);transition:transform var(--go-duration-normal) var(--go-timing-function)}@media (prefers-reduced-motion: reduce){.nav-drawer{transition-duration:0s}}@media (prefers-reduced-motion: reduce){.nav-drawer{transition-duration:0s}}@media (min-width: 600px){.nav-drawer{width:var(--drawer-max-width)}}.nav-drawer.right{left:auto;right:0;transform:translateX(100%)}.nav-drawer.open{transform:translateX(0)}.nav-drawer .nav-container{overflow:hidden;width:100%;height:100%;position:absolute}.nav-drawer .nav-menu{transition:transform var(--go-duration-normal) var(--go-timing-function), visibility var(--go-duration-normal) var(--go-timing-function);visibility:visible;transform:translateX(0);padding:0;position:absolute;top:0;right:0;z-index:1;background:var(--drawer-bg-color);display:flex;flex-direction:column;width:100%;height:100%}@media (prefers-reduced-motion: reduce){.nav-drawer .nav-menu{transition-duration:0s}}@media (prefers-reduced-motion: reduce){.nav-drawer .nav-menu{transition-duration:0s}}.nav-drawer .nav-menu .nav-drawer-header .header-row{display:flex;align-items:center;justify-content:space-between;padding:var(--nav-header-padding)}.nav-drawer .nav-menu .nav-drawer-header .header-row .back-btn{margin-right:auto}.nav-drawer .nav-menu .nav-drawer-header .header-row .close-btn{margin-left:auto;flex:0 0 auto}.nav-drawer .nav-menu .nav-drawer-header .header-row .title{font-weight:bold;font-size:var(--go-size-0);flex:1}.nav-drawer .nav-menu.is-sub-nav .nav-drawer-header .title{margin-left:1rem}.nav-drawer .nav-menu nav{border-top:2px solid var(--nav-header-border-color);border-top:0.125rem solid var(--nav-header-border-color);height:100%;padding:1rem 0;flex:1}.nav-drawer .nav-menu .nav-menu{box-shadow:var(--shadow-4);visibility:hidden;transform:translateX(100%)}.nav-drawer ul{list-style:none;margin:0;padding:0;height:100%}.nav-drawer .nav-item-inner{background:none;border:none;text-decoration:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;width:100%;padding:var(--nav-item-padding);color:var(--nav-item-text-color);text-decoration:none;background:var(--nav-item-bg-color);border-left:var(--nav-item-current-bar-width) solid transparent}.nav-drawer .nav-item-inner:hover,.nav-drawer .nav-item-inner:focus{background:var(--nav-item-hover-bg-color)}.nav-drawer .nav-item-label{display:flex;align-items:center;gap:var(--nav-item-icon-gap)}.nav-drawer .children-indicator{width:1.5em;height:1.5em}.nav-drawer li{padding:0;line-height:1.5}.nav-drawer li.active>.nav-menu{visibility:visible;transform:translateX(0);z-index:2}.nav-drawer li.current>.nav-item-inner{border-left-color:var(--nav-item-current-bar-color)}.nav-drawer .parent-link{border-bottom:var(--submenu-parent-link-border-bottom)}.nav-drawer .parent-link a{display:flex;align-items:center;justify-content:flex-start;width:100%;padding:var(--nav-item-padding);color:var(--nav-item-text-color);text-decoration:none;background:var(--nav-item-bg-color);font-weight:bold;border-left:var(--nav-item-current-bar-width) solid transparent}.nav-drawer .parent-link a svg{transition:transform var(--go-duration-normal) var(--go-timing-function);margin-left:0.5rem;width:1.25em;height:1.25em;transform:translateX(0)}@media (prefers-reduced-motion: reduce){.nav-drawer .parent-link a svg{transition-duration:0s}}.nav-drawer .parent-link a:hover,.nav-drawer .parent-link a:focus{background:var(--nav-item-hover-bg-color)}.nav-drawer .parent-link a:hover svg,.nav-drawer .parent-link a:focus svg{transform:translateX(5px);transform:translateX(0.3125rem)}";export{l as dark_mode_toggle,d as go_nav_drawer}