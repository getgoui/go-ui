let e,t,n=!1,l=!1,o=!1,s=!1,i=!1;const r="undefined"!=typeof window?window:{},c=r.document||{head:{}},f={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},a=e=>Promise.resolve(e),u=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replaceSync}catch(e){}return!1})(),$=(e,t,n)=>{n&&n.map((([n,l,o])=>{const s=e,i=h(t,o),r=p(n);f.ael(s,l,i,r),(t.o=t.o||[]).push((()=>f.rel(s,l,i,r)))}))},h=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){fe(e)}},p=e=>0!=(2&e),y="http://www.w3.org/1999/xlink",d=new WeakMap,b=e=>"sc-"+e.$,m={},w=e=>"object"==(e=typeof e)||"function"===e,g=(e,t,...n)=>{let l=null,o=null,s=null,i=!1,r=!1;const c=[],f=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?f(l):null!=l&&"boolean"!=typeof l&&((i="function"!=typeof e&&!w(l))&&(l+=""),i&&r?c[c.length-1].h+=l:c.push(i?v(null,l):l),r=i)};if(f(n),t){t.key&&(o=t.key),t.name&&(s=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,j);const a=v(e,null);return a.p=t,c.length>0&&(a.m=c),a.g=o,a.v=s,a},v=(e,t)=>({t:0,k:e,h:t,j:null,m:null,p:null,g:null,v:null}),k={},j={forEach:(e,t)=>e.map(S).forEach(t),map:(e,t)=>e.map(S).map(t).map(O)},S=e=>({vattrs:e.p,vchildren:e.m,vkey:e.g,vname:e.v,vtag:e.k,vtext:e.h}),O=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),g(e.vtag,t,...e.vchildren||[])}const t=v(e.vtag,e.vtext);return t.p=e.vattrs,t.m=e.vchildren,t.g=e.vkey,t.v=e.vname,t},M=(e,t,n,l,o,s)=>{if(n!==l){let i=ce(e,t),c=t.toLowerCase();if("class"===t){const t=e.classList,o=C(n),s=C(l);t.remove(...o.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!o.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(i||"o"!==t[0]||"n"!==t[1]){const r=w(l);if((i||r&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{const o=null==l?"":l;"list"===t?i=!1:null!=n&&e[t]==o||(e[t]=o)}}catch(e){}let f=!1;c!==(c=c.replace(/^xlink\:?/,""))&&(t=c,f=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(f?e.removeAttributeNS(y,t):e.removeAttribute(t)):(!i||4&s||o)&&!r&&(l=!0===l?"":l,f?e.setAttributeNS(y,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):ce(r,c)?c.slice(2):c[2]+t.slice(3),n&&f.rel(e,t,n,!1),l&&f.ael(e,t,l,!1)}},x=/\s/,C=e=>e?e.split(x):[],P=(e,t,n,l)=>{const o=11===t.j.nodeType&&t.j.host?t.j.host:t.j,s=e&&e.p||m,i=t.p||m;for(l in s)l in i||M(o,l,s[l],void 0,n,t.t);for(l in i)M(o,l,s[l],i[l],n,t.t)},R=(l,i,r)=>{const f=i.m[r];let a,u,$,h=0;if(n||(o=!0,"slot"===f.k&&(f.t|=f.m?2:1)),null!==f.h)a=f.j=c.createTextNode(f.h);else if(1&f.t)a=f.j=c.createTextNode("");else{if(s||(s="svg"===f.k),a=f.j=c.createElementNS(s?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&f.t?"slot-fb":f.k),s&&"foreignObject"===f.k&&(s=!1),P(null,f,s),f.m)for(h=0;h<f.m.length;++h)u=R(l,f,h),u&&a.appendChild(u);"svg"===f.k?s=!1:"foreignObject"===a.tagName&&(s=!0)}return a["s-hn"]=t,3&f.t&&(a["s-sr"]=!0,a["s-cr"]=e,a["s-sn"]=f.v||"",$=l&&l.m&&l.m[r],$&&$.k===f.k&&l.j&&T(l.j,!1)),a},T=(e,n)=>{f.t|=1;const l=e.childNodes;for(let e=l.length-1;e>=0;e--){const s=l[e];s["s-hn"]!==t&&s["s-ol"]&&(A(s).insertBefore(s,W(s)),s["s-ol"].remove(),s["s-ol"]=void 0,o=!0),n&&T(s,n)}f.t&=-2},E=(e,t,n,l,o,s)=>{let i,r=e["s-cr"]&&e["s-cr"].parentNode||e;for(;o<=s;++o)l[o]&&(i=R(null,n,o),i&&(l[o].j=i,r.insertBefore(i,W(t))))},L=(e,t,n,o,s)=>{for(;t<=n;++t)(o=e[t])&&(s=o.j,V(o),l=!0,s["s-ol"]?s["s-ol"].remove():T(s,!0),s.remove())},N=(e,t)=>e.k===t.k&&("slot"===e.k?e.v===t.v:e.g===t.g),W=e=>e&&e["s-ol"]||e,A=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,F=(e,t)=>{const n=t.j=e.j,l=e.m,o=t.m,i=t.k,r=t.h;let c;null===r?(s="svg"===i||"foreignObject"!==i&&s,"slot"===i||P(e,t,s),null!==l&&null!==o?((e,t,n,l)=>{let o,s,i=0,r=0,c=0,f=0,a=t.length-1,u=t[0],$=t[a],h=l.length-1,p=l[0],y=l[h];for(;i<=a&&r<=h;)if(null==u)u=t[++i];else if(null==$)$=t[--a];else if(null==p)p=l[++r];else if(null==y)y=l[--h];else if(N(u,p))F(u,p),u=t[++i],p=l[++r];else if(N($,y))F($,y),$=t[--a],y=l[--h];else if(N(u,y))"slot"!==u.k&&"slot"!==y.k||T(u.j.parentNode,!1),F(u,y),e.insertBefore(u.j,$.j.nextSibling),u=t[++i],y=l[--h];else if(N($,p))"slot"!==u.k&&"slot"!==y.k||T($.j.parentNode,!1),F($,p),e.insertBefore($.j,u.j),$=t[--a],p=l[++r];else{for(c=-1,f=i;f<=a;++f)if(t[f]&&null!==t[f].g&&t[f].g===p.g){c=f;break}c>=0?(s=t[c],s.k!==p.k?o=R(t&&t[r],n,c):(F(s,p),t[c]=void 0,o=s.j),p=l[++r]):(o=R(t&&t[r],n,r),p=l[++r]),o&&A(u.j).insertBefore(o,W(u.j))}i>a?E(e,null==l[h+1]?null:l[h+1].j,n,l,r,h):r>h&&L(t,i,a)})(n,l,t,o):null!==o?(null!==e.h&&(n.textContent=""),E(n,null,t,o,0,o.length-1)):null!==l&&L(l,0,l.length-1),s&&"svg"===i&&(s=!1)):(c=n["s-cr"])?c.parentNode.textContent=r:e.h!==r&&(n.data=r)},H=e=>{const t=e.childNodes;let n,l,o,s,i,r;for(l=0,o=t.length;l<o;l++)if(n=t[l],1===n.nodeType){if(n["s-sr"])for(i=n["s-sn"],n.hidden=!1,s=0;s<o;s++)if(r=t[s].nodeType,t[s]["s-hn"]!==n["s-hn"]||""!==i){if(1===r&&i===t[s].getAttribute("slot")){n.hidden=!0;break}}else if(1===r||3===r&&""!==t[s].textContent.trim()){n.hidden=!0;break}H(n)}},U=[],q=e=>{let t,n,o,s,i,r,c=0;const f=e.childNodes,a=f.length;for(;c<a;c++){if(t=f[c],t["s-sr"]&&(n=t["s-cr"])&&n.parentNode)for(o=n.parentNode.childNodes,s=t["s-sn"],r=o.length-1;r>=0;r--)n=o[r],n["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||(D(n,s)?(i=U.find((e=>e.S===n)),l=!0,n["s-sn"]=n["s-sn"]||s,i?i.O=t:U.push({O:t,S:n}),n["s-sr"]&&U.map((e=>{D(e.S,n["s-sn"])&&(i=U.find((e=>e.S===n)),i&&!e.O&&(e.O=i.O))}))):U.some((e=>e.S===n))||U.push({S:n}));1===t.nodeType&&q(t)}},D=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,V=e=>{e.p&&e.p.ref&&e.p.ref(null),e.m&&e.m.map(V)},_=e=>se(e).M,z=(e,t,n)=>{const l=_(e);return{emit:e=>B(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},B=(e,t,n)=>{const l=f.ce(t,n);return e.dispatchEvent(l),l},G=(e,t)=>{t&&!e.C&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.C=t)))},I=(e,t)=>{if(e.t|=16,!(4&e.t))return G(e,e.P),we((()=>J(e,t)));e.t|=512},J=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>Z(n,e,t))),e.u=null),l=Z(n,"componentWillLoad")),ee(l,(()=>K(e,n,t)))},K=async(e,t,n)=>{const l=e.M,o=l["s-rc"];n&&(e=>{const t=e.R;((e,t)=>{let n=b(t);const l=$e.get(n);if(e=11===e.nodeType?e:c,l)if("string"==typeof l){let t,o=d.get(e=e.head||e);o||d.set(e,o=new Set),o.has(n)||(t=c.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l])})(e.M.getRootNode(),t)})(e);Q(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>X(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},Q=(s,i)=>{try{i=i.render(),s.t&=-17,s.t|=2,((s,i)=>{const r=s.M,a=s.R,u=s.T||v(null,null),$=(e=>e&&e.k===k)(i)?i:g(null,null,i);if(t=r.tagName,a.L&&($.p=$.p||{},a.L.map((([e,t])=>$.p[t]=r[e]))),$.k=null,$.t|=4,s.T=$,$.j=u.j=r,e=r["s-cr"],n=0!=(1&a.t),l=!1,F(u,$),f.t|=1,o){let e,t,n,l,o,s;q($.j);let i=0;for(;i<U.length;i++)e=U[i],t=e.S,t["s-ol"]||(n=c.createTextNode(""),n["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=n,t));for(i=0;i<U.length;i++)if(e=U[i],t=e.S,e.O){for(l=e.O.parentNode,o=e.O.nextSibling,n=t["s-ol"];n=n.previousSibling;)if(s=n["s-nr"],s&&s["s-sn"]===t["s-sn"]&&l===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&l!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),l.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}l&&H($.j),f.t&=-2,U.length=0})(s,i)}catch(e){fe(e,s.M)}return null},X=e=>{const t=e.M,n=e.i,l=e.P;64&e.t||(e.t|=64,te(t),Z(n,"componentDidLoad"),e.N(t),l||Y()),e.W(t),e.C&&(e.C(),e.C=void 0),512&e.t&&me((()=>I(e,!1))),e.t&=-517},Y=()=>{te(c.documentElement),me((()=>B(r,"appload",{detail:{namespace:"app"}})))},Z=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){fe(e)}},ee=(e,t)=>e&&e.then?e.then(t):t(),te=e=>e.classList.add("hydrated"),ne=(e,t,n)=>{if(t.A){e.watchers&&(t.F=e.watchers);const l=Object.entries(t.A),o=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(o,e,{get(){return((e,t)=>se(this).H.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=se(e),s=o.M,i=o.H.get(t),r=o.t,c=o.i;if(n=((e,t)=>null==e||w(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.A[t][0]),(!(8&r)||void 0===i)&&n!==i&&(!Number.isNaN(i)||!Number.isNaN(n))&&(o.H.set(t,n),c)){if(l.F&&128&r){const e=l.F[t];e&&e.map((e=>{try{c[e](n,i,t)}catch(e){fe(e,s)}}))}2==(18&r)&&I(o,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(o,e,{value(...t){const n=se(this);return n.U.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;o.attributeChangedCallback=function(e,t,l){f.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(o.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const o=l[1]||e;return n.set(o,e),512&l[0]&&t.L.push([e,o]),o}))}}return e},le=(e,t={})=>{const n=[],l=t.exclude||[],o=r.customElements,s=c.head,i=s.querySelector("meta[charset]"),a=c.createElement("style"),h=[];let p,y=!0;Object.assign(f,t),f.l=new URL(t.resourcesUrl||"./",c.baseURI).href,e.map((e=>{e[1].map((t=>{const s={t:t[0],$:t[1],A:t[2],q:t[3]};s.A=t[2],s.q=t[3],s.L=[],s.F={};const i=s.$,r=class extends HTMLElement{constructor(e){super(e),re(e=this,s)}connectedCallback(){p&&(clearTimeout(p),p=null),y?h.push(this):f.jmp((()=>(e=>{if(0==(1&f.t)){const t=se(e),n=t.R,l=()=>{};if(1&t.t)$(e,t,n.q);else{t.t|=1,12&n.t&&(e=>{const t=e["s-cr"]=c.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){G(t,t.P=n);break}}n.A&&Object.entries(n.A).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=ue(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(n.F=o.watchers,ne(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(e){fe(e)}t.t&=-9,t.t|=128,e()}if(o.style){let e=o.style;const t=b(n);if(!$e.has(t)){const l=()=>{};((e,t,n)=>{let l=$e.get(e);u&&n?(l=l||new CSSStyleSheet,"string"==typeof l?l=t:l.replaceSync(t)):l=t,$e.set(e,l)})(t,e,!!(1&n.t)),l()}}}const s=t.P,i=()=>I(t,!0);s&&s["s-rc"]?s["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){f.jmp((()=>(()=>{if(0==(1&f.t)){const e=se(this);e.o&&(e.o.map((e=>e())),e.o=void 0)}})()))}componentOnReady(){return se(this).D}};s.V=e[0],l.includes(i)||o.get(i)||(n.push(i),o.define(i,ne(r,s,1)))}))})),a.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",a.setAttribute("data-styles",""),s.insertBefore(a,i?i.nextSibling:s.firstChild),y=!1,h.length?h.map((e=>e.connectedCallback())):f.jmp((()=>p=setTimeout(Y,30)))},oe=new WeakMap,se=e=>oe.get(e),ie=(e,t)=>oe.set(t.i=e,t),re=(e,t)=>{const n={t:0,M:e,R:t,H:new Map};return n.U=new Promise((e=>n.W=e)),n.D=new Promise((e=>n.N=e)),e["s-p"]=[],e["s-rc"]=[],$(e,n,t.q),oe.set(e,n)},ce=(e,t)=>t in e,fe=(e,t)=>(0,console.error)(e,t),ae=new Map,ue=e=>{const t=e.$.replace(/-/g,"_"),n=e.V,l=ae.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(ae.set(n,e),e[t])),fe)
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/},$e=new Map,he=[],pe=[],ye=(e,t)=>n=>{e.push(n),i||(i=!0,t&&4&f.t?me(be):f.raf(be))},de=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){fe(e)}e.length=0},be=()=>{de(he),de(pe),(i=he.length>0)&&f.raf(be)},me=e=>a().then(e),we=ye(pe,!0);export{k as H,le as b,z as c,_ as g,g as h,a as p,ie as r}