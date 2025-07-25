(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[455],{62898:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});var a=r(2265),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,t)=>{let r=(0,a.forwardRef)(({color:r="currentColor",size:n=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:d,...u},p)=>(0,a.createElement)("svg",{ref:p,...s,width:n,height:n,stroke:r,strokeWidth:l?24*Number(o)/Number(n):o,className:["lucide",`lucide-${i(e)}`,c].join(" "),...u},[...t.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(d)?d:[d]]));return r.displayName=`${e}`,r}},6141:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},1295:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},9883:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},82549:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62898).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},79228:function(e,t,r){Promise.resolve().then(r.bind(r,11149))},11149:function(e,t,r){"use strict";r.r(t),r.d(t,{NotificationSettings:function(){return m}});var a=r(57437),s=r(2265),i=r(10732),n=r(1295),o=r(9883),l=r(82549),c=r(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,c.Z)("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);var u=r(6141);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let p=(0,c.Z)("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);var f=r(5925);function m(e){let{initialConfig:t}=e,[r,c]=(0,s.useState)({emailEnabled:(null==t?void 0:t.emailEnabled)||!1,whatsappEnabled:(null==t?void 0:t.whatsappEnabled)||!1,recipients:(null==t?void 0:t.recipients)||[],whatsappNumbers:(null==t?void 0:t.whatsappNumbers)||[],sendTime:(null==t?void 0:t.sendTime)||"09:00"}),[m,h]=(0,s.useState)(!1),[y,x]=(0,s.useState)(""),[g,b]=(0,s.useState)(""),v=async()=>{h(!0);try{(await fetch("/api/notifications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok?f.default.success("Configura\xe7\xf5es salvas com sucesso!"):f.default.error("Erro ao salvar configura\xe7\xf5es")}catch(e){f.default.error("Erro ao salvar configura\xe7\xf5es")}finally{h(!1)}},w=async()=>{h(!0);try{(await fetch("/api/notifications",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"send_test_report"})})).ok?f.default.success("Relat\xf3rio de teste enviado!"):f.default.error("Erro ao enviar relat\xf3rio de teste")}catch(e){f.default.error("Erro ao enviar relat\xf3rio de teste")}finally{h(!1)}},N=()=>{y&&!r.recipients.includes(y)&&(c({...r,recipients:[...r.recipients,y]}),x(""))},j=e=>{c({...r,recipients:r.recipients.filter(t=>t!==e)})},k=()=>{g&&!r.whatsappNumbers.includes(g)&&(c({...r,whatsappNumbers:[...r.whatsappNumbers,g]}),b(""))},E=e=>{c({...r,whatsappNumbers:r.whatsappNumbers.filter(t=>t!==e)})};return(0,a.jsxs)(i.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"bg-white rounded-xl shadow-sm border border-gray-200 p-6",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-6",children:"Configura\xe7\xf5es de Notifica\xe7\xe3o"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)(n.Z,{className:"w-5 h-5 text-blue-500"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-medium text-gray-900",children:"Notifica\xe7\xf5es por Email"}),(0,a.jsx)("p",{className:"text-sm text-gray-500",children:"Enviar relat\xf3rios di\xe1rios por email"})]})]}),(0,a.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,a.jsx)("input",{type:"checkbox",checked:r.emailEnabled,onChange:e=>c({...r,emailEnabled:e.target.checked}),className:"sr-only peer"}),(0,a.jsx)("div",{className:"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"})]})]}),r.emailEnabled&&(0,a.jsxs)("div",{className:"ml-8 space-y-3",children:[(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsx)("input",{type:"email",value:y,onChange:e=>x(e.target.value),placeholder:"Adicionar email",className:"input-field flex-1",onKeyPress:e=>"Enter"===e.key&&N()}),(0,a.jsx)("button",{onClick:N,className:"btn-primary px-3",children:(0,a.jsx)(o.Z,{className:"w-4 h-4"})})]}),(0,a.jsx)("div",{className:"space-y-2",children:r.recipients.map(e=>(0,a.jsxs)("div",{className:"flex items-center justify-between bg-gray-50 p-2 rounded",children:[(0,a.jsx)("span",{className:"text-sm",children:e}),(0,a.jsx)("button",{onClick:()=>j(e),className:"text-red-500 hover:text-red-700",children:(0,a.jsx)(l.Z,{className:"w-4 h-4"})})]},e))})]})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)(d,{className:"w-5 h-5 text-green-500"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-medium text-gray-900",children:"Notifica\xe7\xf5es por WhatsApp"}),(0,a.jsx)("p",{className:"text-sm text-gray-500",children:"Enviar relat\xf3rios di\xe1rios por WhatsApp"})]})]}),(0,a.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,a.jsx)("input",{type:"checkbox",checked:r.whatsappEnabled,onChange:e=>c({...r,whatsappEnabled:e.target.checked}),className:"sr-only peer"}),(0,a.jsx)("div",{className:"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"})]})]}),r.whatsappEnabled&&(0,a.jsxs)("div",{className:"ml-8 space-y-3",children:[(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsx)("input",{type:"tel",value:g,onChange:e=>b(e.target.value),placeholder:"Adicionar n\xfamero (+55...)",className:"input-field flex-1",onKeyPress:e=>"Enter"===e.key&&k()}),(0,a.jsx)("button",{onClick:k,className:"btn-primary px-3",children:(0,a.jsx)(o.Z,{className:"w-4 h-4"})})]}),(0,a.jsx)("div",{className:"space-y-2",children:r.whatsappNumbers.map(e=>(0,a.jsxs)("div",{className:"flex items-center justify-between bg-gray-50 p-2 rounded",children:[(0,a.jsx)("span",{className:"text-sm",children:e}),(0,a.jsx)("button",{onClick:()=>E(e),className:"text-red-500 hover:text-red-700",children:(0,a.jsx)(l.Z,{className:"w-4 h-4"})})]},e))})]})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsx)(u.Z,{className:"w-5 h-5 text-purple-500"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-medium text-gray-900",children:"Hor\xe1rio de Envio"}),(0,a.jsx)("p",{className:"text-sm text-gray-500",children:"Hor\xe1rio para envio dos relat\xf3rios di\xe1rios"})]})]}),(0,a.jsx)("div",{className:"ml-8",children:(0,a.jsx)("input",{type:"time",value:r.sendTime,onChange:e=>c({...r,sendTime:e.target.value}),className:"input-field w-32"})})]}),(0,a.jsxs)("div",{className:"flex space-x-3 pt-4 border-t border-gray-200",children:[(0,a.jsx)("button",{onClick:v,disabled:m,className:"btn-primary disabled:opacity-50",children:m?"Salvando...":"Salvar Configura\xe7\xf5es"}),(0,a.jsxs)("button",{onClick:w,disabled:m,className:"btn-secondary flex items-center space-x-2",children:[(0,a.jsx)(p,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Enviar Teste"})]})]})]})]})}},30622:function(e,t,r){"use strict";var a=r(2265),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,o=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var a,i={},c=null,d=null;for(a in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)n.call(t,a)&&!l.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===i[a]&&(i[a]=t[a]);return{$$typeof:s,type:e,key:c,ref:d,props:i,_owner:o.current}}t.Fragment=i,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)},5925:function(e,t,r){"use strict";let a,s;r.r(t),r.d(t,{CheckmarkIcon:function(){return V},ErrorIcon:function(){return B},LoaderIcon:function(){return J},ToastBar:function(){return eo},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return ep},resolveValue:function(){return k},toast:function(){return D},useToaster:function(){return F},useToasterStore:function(){return Z}});var i,n=r(2265);let o={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",a="",s="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":a+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(i,n):i+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+a},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},h=(e,t,r,a,s)=>{var i;let n=m(e),o=f[n]||(f[n]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(n));if(!f[o]){let t=n!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(r=t[3].replace(u," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);f[o]=p(s?{["@keyframes "+o]:t}:t,r?"":"."+o)}let l=r&&f.g?f.g:null;return r&&(f.g=f[o]),i=f[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},y=(e,t,r)=>e.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?y(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,b,v,w=x.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function s(i,n){let o=Object.assign({},i),l=o.className||s.className;r.p=Object.assign({theme:b&&b()},o),r.o=/ *go\d+/.test(l),o.className=x.apply(r,a)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),g(c,o)}return t?t(s):s}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,E=(a=0,()=>(++a).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},_=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return _(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},O=[],$={toasts:[],pausedAt:void 0},T=e=>{$=_($,e),O.forEach(e=>{e($)})},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Z=(e={})=>{let[t,r]=(0,n.useState)($),a=(0,n.useRef)($);(0,n.useEffect)(()=>(a.current!==$&&r($),O.push(r),()=>{let e=O.indexOf(r);e>-1&&O.splice(e,1)}),[]);let s=t.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},P=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),A=e=>(t,r)=>{let a=P(t,e,r);return T({type:2,toast:a}),a.id},D=(e,t)=>A("blank")(e,t);D.error=A("error"),D.success=A("success"),D.loading=A("loading"),D.custom=A("custom"),D.dismiss=e=>{T({type:3,toastId:e})},D.remove=e=>T({type:4,toastId:e}),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?k(t.success,e):void 0;return s?D.success(s,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let s=t.error?k(t.error,e):void 0;s?D.error(s,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var I=(e,t)=>{T({type:1,toast:{id:e,height:t}})},z=()=>{T({type:5,time:Date.now()})},L=new Map,M=1e3,R=(e,t=M)=>{if(L.has(e))return;let r=setTimeout(()=>{L.delete(e),T({type:4,toastId:e})},t);L.set(e,r)},F=e=>{let{toasts:t,pausedAt:r}=Z(e);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&D.dismiss(t.id);return}return setTimeout(()=>D.dismiss(t.id),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,r]);let a=(0,n.useCallback)(()=>{r&&T({type:6,time:Date.now()})},[r]),s=(0,n.useCallback)((e,r)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=r||{},n=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<o&&e.visible).length;return n.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,n.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)R(e.id,e.removeDelay);else{let t=L.get(e.id);t&&(clearTimeout(t),L.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:I,startPause:z,endPause:a,calculateOffset:s}}},H=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,K=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Y=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,V=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Y} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,X=N("div")`
  position: absolute;
`,G=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(ee,null,t):t:"blank"===r?null:n.createElement(G,null,n.createElement(J,{...a}),"loading"!==r&&n.createElement(X,null,"error"===r?n.createElement(B,{...a}):n.createElement(V,{...a})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=N("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ei=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let r=e.includes("top")?1:-1,[a,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(r),ea(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=n.memo(({toast:e,position:t,style:r,children:a})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(et,{toast:e}),o=n.createElement(ei,{...e.ariaProps},k(e.message,e));return n.createElement(es,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof a?a({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))});i=n.createElement,p.p=void 0,g=i,b=void 0,v=void 0;var el=({id:e,className:t,style:r,onHeightUpdate:a,children:s})=>{let i=n.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return n.createElement("div",{ref:i,className:t,style:r},s)},ec=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ed=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:s,containerStyle:i,containerClassName:o})=>{let{toasts:l,handlers:c}=F(r);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,o=ec(i,c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return n.createElement(el,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?ed:"",style:o},"custom"===r.type?k(r.message,r):s?s(r):n.createElement(eo,{toast:r,position:i}))}))},ep=D}},function(e){e.O(0,[732,971,938,744],function(){return e(e.s=79228)}),_N_E=e.O()}]);