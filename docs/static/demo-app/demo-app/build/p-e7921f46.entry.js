import{r as o,h as r,H as s,g as t}from"./p-506d8682.js";const e=class{constructor(r){o(this,r),this.isSearchFormOpen=!1}async openSearchForm(){this.isSearchFormOpen=!0,this.el.focus()}async closeSearchForm(){this.isSearchFormOpen=!1}render(){const{isSearchFormOpen:o}=this;return r(s,{class:{open:o}},r("go-overlay",{active:!!o,class:"go-search-bar-overlay",onOverlayClose:()=>this.closeSearchForm()},r("slot",{name:"search-form"}),r("div",{class:"close-btn-wrapper"},r("go-button",{flat:!0,stack:!0,variant:"text",compact:!0,onClick:()=>this.closeSearchForm()},r("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},r("path",{d:"M18 6 6 18M6 6l12 12"})),r("span",null,"Close")))),r("div",{class:"search-btn"},r("go-button",{class:"open-btn",compact:!0,flat:!0,stack:!0,variant:"text",onClick:()=>this.openSearchForm()},r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},r("path",{d:"M0 0h24v24H0z",fill:"none"}),r("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"})),r("span",null,"Search"))))}get el(){return t(this)}};e.style="go-overlay.go-search-bar-overlay .close-btn-wrapper{display:none;position:fixed;top:1rem;right:1rem}go-overlay.go-search-bar-overlay.active .close-btn-wrapper{display:block}";export{e as go_search_bar}