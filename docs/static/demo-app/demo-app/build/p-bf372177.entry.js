import{r as i,h as o,H as s,g as t}from"./p-506d8682.js";import{l as r}from"./p-3f7470e1.js";import{w as n}from"./p-d8cdaaf1.js";import"./p-0bc4f624.js";const l=class{constructor(o){i(this,o),this.target="main",this.hasTabIndex=!1}componentWillLoad(){const i=document.querySelector(this.target);if(!i)return void n(`[go-skip-link] target ${this.target} not found.`);if(i.hasAttribute("tabindex")&&(this.hasTabIndex=!0),i.id)return void this.setTabIndex(i,i.id);const o=r("skip-link-target-");i.id=o,this.setTabIndex(i,o)}setTabIndex(i,o){this.href=`#${o}`,this.hasTabIndex||i.setAttribute("tabindex","-1")}render(){const{href:i}=this;return o(s,null,o("a",{href:i,class:"visually-hidden-focusable"},o("slot",null)))}get el(){return t(this)}};l.style="go-skip-link{--skip-link-padding:1rem 2rem;--skip-link-bg-color:var(--go-color-secondary-700);--skip-link-text-color:var(--go-color-lightest);position:fixed;top:1rem;left:1rem}go-skip-link a,go-skip-link a:focus-visible{display:block;padding:var(--skip-link-padding);background:var(--skip-link-bg-color);color:var(--skip-link-text-color);box-shadow:var(--shadow-2)}";export{l as go_skip_link}