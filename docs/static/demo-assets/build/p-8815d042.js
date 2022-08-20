const n=(n,o=[],t=!0)=>{const r=n.attributes;let e={};for(let n=0;n<r.length;n++){const{name:t,value:c}=r[n];-1===o.indexOf(t)&&(e[t]=c)}if(t)for(let o in e)n.removeAttribute(o);return e};function o(n,o){return!!n.querySelector('[slot="'+o+'"]')}
/*!
 * Get all direct descendant elements that match a selector
 * Dependency: the matches() polyfill: https://vanillajstoolkit.com/polyfills/matches/
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element to get direct descendants for
 * @param  {String} selector The selector to match against
 * @return {Array}           The matching direct descendants
 */function t(n,o){return Array.prototype.filter.call(n.children,(function(n){return n.matches(o)}))}function r(...n){console.log("%c[Go UI warning]","background: #e63a34; color: #fff; font-size: 24px;padding: 8px;"),console.warn(...n)}export{o as h,n as i,t as s,r as w}