import{r as a,h as t,g as s}from"./p-506d8682.js";import{p as i}from"./p-e6a260f7.js";import"./p-3bbd36a2.js";import"./p-0bc4f624.js";const e=class{constructor(t){a(this,t),this.block=!1}async watchItems(a){this.navItems=i(a)}async watchHeadingItem(a){this.navHeading=i(a)}componentWillLoad(){this.navItems=i(this.items),this.navHeading=i(this.headingItem)}render(){const{navItems:a,navHeading:s,heading:i,block:e}=this;return t("div",null,s?t("div",{class:"nav-list-header"},t("go-nav-link",{showArrow:!0,block:e,class:"nav-list-header-text",item:s})):null,i?t("div",{class:"nav-list-header"},t("span",{class:"nav-list-header-text"},i)):null,t("slot",{name:"heading"}),(null==a?void 0:a.length)>0?t("ul",{class:"nav-list"},a.map((a=>t("li",null,t("go-nav-link",{block:e,item:a}))))):t("slot",null))}get el(){return s(this)}static get watchers(){return{items:["watchItems"],headingItem:["watchHeadingItem"]}}};e.style="go-nav-list{--nav-list-header-padding:var(--go-base-spacing) 0;--nav-list-header-gap:0;--nav-list-header-text-color:var(--go-color-text);display:inline-block}go-nav-list[block]{display:block}go-nav-list .nav-list-header{margin-top:var(--nav-list-header-gap);font-size:var(--go-size-0);color:var(--nav-list-header-text-color);margin-bottom:1rem}go-nav-list .nav-list-header .nav-list-header-text{display:flex;line-height:1.5;padding:var(--nav-list-header-padding)}go-nav-list .nav-list{list-style:none;padding:0;margin:0}go-nav-list .nav-list .nav-item-link{font-size:1rem;margin:0.25rem 0}";export{e as go_nav_list}