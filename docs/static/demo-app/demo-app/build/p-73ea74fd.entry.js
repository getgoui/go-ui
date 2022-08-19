import{r as o,c as t,h as e,H as n,g as i}from"./p-506d8682.js";import{d as r}from"./p-3bbd36a2.js";import{l as a}from"./p-bea3ce46.js";import"./p-0bc4f624.js";const s=class{constructor(e){o(this,e),this.loadedEvent=t(this,"loaded",7),this.propsArray=[],this.slotsArray=[],this.code="",this.block=!1,this.debug=!1,this.renderedComponent="",this.showConfigPanel=!0}log(...o){this.debug&&console.trace("[Demo Playground]",...o)}componentWillLoad(){this.initiateData(),this.renderedComponent=this.getUsage()}initiateData(){this.propsArray="string"==typeof this.props?r.parse(this.props):this.props,this.slotsArray="string"==typeof this.slots?r.parse(this.slots):this.slots;const o=document.createElement("div");o.innerHTML=this.code;const{tag:t}=this,e=o.querySelector(t);if(!e)return void console.error("[WebComponent Playground] Target element "+t+" not found");this.propsArray=this.propsArray.map((o=>{const t=o.attr?o.attr:a(o.name);return Object.assign(Object.assign({},o),{value:e.getAttribute(t)})})),o.remove();const n=`<${t}(.*)>`,i=`</${t}>`,s=this.code.match(new RegExp(`${n}(.|\n)*?${i}`,"gi"));if(!s)return void console.error("[WebComponent Playground] Tag "+t+" not found in code");const l=s[0].replace(new RegExp(n,"gi"),"").replace(new RegExp(i,"gi"),"").trim(),c=document.createElement("div");c.innerHTML=l;let d=[...this.slotsArray];d=this.slotsArray.map((o=>{const t=c.querySelector(`[slot="${o.name}"]`);return t?(c.removeChild(t),Object.assign(Object.assign({},o),{show:!0,content:t})):o})),c.innerHTML.trim()&&(d=d.map((o=>"default"===o.name?Object.assign(Object.assign({},o),{show:!0,content:c.innerHTML}):o))),this.slotsArray=d,c.remove()}getPropsObject(o){return o.map((({name:o,attr:t,value:e,type:n})=>{const i=t||a(o);if("null"===e||null===e)return!1;if("boolean"===n&&!e)return!1;if("object"===n||"array"===n)try{return`${i}="${r.stringify(e,void 0,4)}"`}catch(o){return!1}return{[i]:e}})).filter(Boolean).reduce(((o,t)=>Object.assign(Object.assign({},o),t)),{})}getSlotContents(o){return o.map((({name:o,show:t,content:e})=>!!t&&!!e&&("default"===o?e:e.outerHTML))).filter(Boolean)}getUsage(){const o="\n  ",t=this.getPropsObject(this.propsArray),e=Object.entries(t).map((([o,t])=>`${o}="${t}"`)),n=this.getSlotContents(this.slotsArray),i=this.tag;return`<${i}${e.length?o:""}${e.join(o)}${e.length?o:""}>\n  ${n.length?n.join("\n  "):""}\n</${i}>`}copyUsage(){!function(o,{target:t=document.body}={}){const e=document.createElement("textarea"),n=document.activeElement;e.value=o,e.setAttribute("readonly",""),e.style.contain="strict",e.style.position="absolute",e.style.left="-9999px",e.style.fontSize="12pt";const i=document.getSelection();let r=!1;i.rangeCount>0&&(r=i.getRangeAt(0)),t.append(e),e.select(),e.selectionStart=0,e.selectionEnd=o.length;let a=!1;try{a=document.execCommand("copy")}catch{}e.remove(),r&&(i.removeAllRanges(),i.addRange(r)),n&&n.focus()}(this.getUsage())}closeConfigPanel(){this.showConfigPanel=!1}openConfigPanel(){this.showConfigPanel=!0}handlePropsChange(o){this.propsArray=[...o.detail],this.renderedComponent=this.getUsage()}handleSlotsChange(o){this.slotsArray=[...o.detail],this.renderedComponent=this.getUsage()}render(){const{block:o,debug:t,renderedComponent:i}=this;return e(n,null,e("div",{class:"container"},e("div",{class:"demo-row"},e("div",{class:"demo"},e("div",{class:"demo-bg"}),e("div",{id:"demo-content",class:{"demo-content":!0,block:o},innerHTML:i}),this.showConfigPanel?null:e("go-button",{compact:!0,class:{"control-panel-opener":!0},variant:"success",onClick:()=>this.openConfigPanel(),"aria-label":"Open configuration panel"},"Configure")),e("div",{class:{"control-panel":!0,show:this.showConfigPanel}},e("div",{class:"control-header"},e("span",null,"Configuration"),e("go-button",{round:!0,compact:!0,variant:"text",flat:!0,icon:!0,onClick:()=>this.closeConfigPanel(),"aria-label":"Close configuration panel"},e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",viewBox:"0 0 24 24"},e("path",{d:"M18 6 6 18M6 6l12 12"})))),e("go-accordion",{class:"props",multiple:!0},e("go-accordion-item",{heading:"Props",active:!0},e("props-panel",{debug:t,values:this.propsArray,onPropChange:o=>this.handlePropsChange(o)})),e("go-accordion-item",{heading:"Slots",active:!0},e("slots-panel",{debug:t,values:this.slotsArray,onSlotDisplayChange:o=>this.handleSlotsChange(o)}))),e("slot",{name:"controls"}))),e("wc-output",{onCopyCode:()=>this.copyUsage(),usage:this.getUsage()})))}get el(){return i(this)}};s.style='@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@1,300&display=swap");wc-playground{--min-demo-content-height:400px;--min-demo-content-height:25rem;--max-demo-control-panel-height:800px;--max-demo-control-panel-height:50rem;--demo-bg-line-color:var(--go-color-text);--demo-content-padding:4rem 2rem;display:block}wc-playground .demo-row{border-radius:var(--radius-2);box-shadow:var(--shadow-2);display:flex;flex:1;flex-direction:column-reverse;gap:1rem;margin-bottom:1rem;overflow:hidden;position:relative}@media (min-width:768px){wc-playground .demo-row{flex-direction:row}}wc-playground .demo{flex:1;position:relative}wc-playground .demo-bg{background:linear-gradient(90deg,var(--go-color-bg) 14px,transparent 0) 50%,linear-gradient(var(--go-color-bg) 14px,transparent 0) 50%,var(--go-color-text);background:linear-gradient(90deg,var(--go-color-bg) .875rem,transparent 0) 50%,linear-gradient(var(--go-color-bg) .875rem,transparent 0) 50%,var(--go-color-text);background-size:16px 16px;background-size:1rem 1rem;inset:0;opacity:.2;position:absolute}wc-playground .demo-content{display:grid;height:100%;min-height:var(--min-demo-content-height);padding:var(--demo-content-padding);place-items:center;position:relative;width:100%}wc-playground .demo-content.block{display:block;position:absolute;top:20%}wc-playground .control-panel{box-shadow:var(--shadow-2);max-height:0;opacity:0;overflow:auto;overflow-x:hidden;position:relative;transform-origin:right;transition:all .2s;visibility:hidden;width:100%}@media (min-width:768px){wc-playground .control-panel{transform:scaleX(0) translateX(100%);width:0}}wc-playground .control-panel.show{max-height:var(--max-demo-control-panel-height);opacity:1;visibility:visible;width:100%}@media (min-width:768px){wc-playground .control-panel.show{max-height:none;transform:translateX(0);width:37%}}wc-playground .control-header{align-items:center;background:var(--go-color-bg);border-bottom:.0625rem solid var(--go-color-neutral-200);box-shadow:var(--shadow-1);display:flex;font-size:var(--go-size-0);justify-content:space-between;padding:1rem;position:-webkit-sticky;position:sticky;top:0}wc-playground .props{padding:1rem}wc-playground .prop-control{margin-bottom:1rem}wc-playground .prop-control label{display:block;font-size:var(--go-size--1);font-weight:700;margin-bottom:.5rem;text-transform:capitalize}wc-playground .prop-control input:not([type=checkbox]),wc-playground .prop-control select,wc-playground .prop-control textarea{padding:.5rem;width:100%}wc-playground .prop-control textarea{resize:vertical}wc-playground .usage .panel-wrapper{--body-max-height:50vh!important}wc-playground .usage .panel{position:relative}wc-playground .usage .output{height:auto;min-height:5rem}wc-playground .usage .output-controls{position:absolute;right:8px;right:.5rem;top:8px;top:.5rem}wc-playground .usage pre code{font-family:JetBrains Mono,monospace;font-size:var(--go-size-0);font-style:italic}wc-playground .control-panel-opener{position:absolute;right:1rem;top:1rem;width:auto}';export{s as wc_playground}