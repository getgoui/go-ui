import{r as t,h as e,g as a}from"./p-506d8682.js";import{i as n}from"./p-d8cdaaf1.js";const s=class{constructor(e){t(this,e),this.expandClickableArea=!1,this.attrs={},this.isExternal=!1,this.isNewTab=!1}componentWillLoad(){this.checkExternal(),this.attrs=n(this.el,["href","target","expand-clickable-area"])}checkNewTab(){this.isNewTab="_blank"===this.target}checkExternal(){this.href&&(this.isExternal=this.isExternalURL(this.href),this.isExternal&&(this.isNewTab=!0))}isExternalURL(t){if(t.startsWith("#"))return!1;const e=document.createElement("a");e.href=t;const a=e.host!==window.location.host;return e.remove(),a}render(){const{href:t,target:a,attrs:n,isExternal:s,isNewTab:i,expandClickableArea:r}=this;let l=["go-link"];n.class&&l.push(n.class),r&&l.push("expand");let h=Object.assign(Object.assign({},n),{href:t,class:l.join(" "),target:s||i?"_blank":a});return e("a",Object.assign({},h),e("slot",null),s||i?[e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-hidden":"true",class:"external-link-icon"},e("path",{d:"M0 0h24v24H0z",fill:"none"}),e("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"})),e("span",{class:"visually-hidden"},"Opens in new a tab or window")]:null)}get el(){return a(this)}static get watchers(){return{target:["checkNewTab"],href:["checkExternal"]}}};s.style='go-link .external-link-icon{height:0.9em;fill:currentColor;transform:translate(10%, 15%);margin-left:0.25em}go-link .expand::after{content:"";position:absolute;top:0;right:0;bottom:0;left:0}';export{s as go_link}