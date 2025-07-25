(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{22812:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(62898).Z)("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]])},77216:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(62898).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},99670:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(62898).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},5589:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(62898).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},1295:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(62898).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},70032:function(e,t,a){Promise.resolve().then(a.bind(a,55069))},55069:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return y}});var r=a(57437),s=a(2265),i=a(24033),o=a(61396),n=a.n(o);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a(62898).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var c=a(1295),d=a(22812),u=a(5589),m=a(77216),p=a(99670),f=a(5925);let h=[{value:"COMERCIAL",label:"Comercial"},{value:"LOGISTICA",label:"Log\xedstica"},{value:"COMPRAS",label:"Compras"},{value:"FINANCEIRO",label:"Financeiro"},{value:"TI",label:"TI"},{value:"DIRETORIA",label:"Diretoria"}];function y(){let[e,t]=(0,s.useState)({name:"",email:"",password:"",confirmPassword:"",department:""}),[a,o]=(0,s.useState)(!1),[y,x]=(0,s.useState)(!1),[g,b]=(0,s.useState)(!1),v=(0,i.useRouter)(),w=async t=>{if(t.preventDefault(),b(!0),e.password!==e.confirmPassword){f.default.error("As senhas n\xe3o coincidem"),b(!1);return}try{let t=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name,email:e.email,password:e.password,department:e.department})});if(t.ok)f.default.success("Conta criada com sucesso!"),v.push("/auth/signin");else{let e=await t.json();f.default.error(e.message||"Erro ao criar conta")}}catch(e){f.default.error("Erro ao criar conta")}finally{b(!1)}},j=a=>{t({...e,[a.target.name]:a.target.value})};return(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12",children:(0,r.jsx)("div",{className:"max-w-md w-full space-y-8 p-8",children:(0,r.jsxs)("div",{className:"bg-white rounded-2xl shadow-xl p-8",children:[(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Criar Conta"}),(0,r.jsx)("p",{className:"text-gray-600 mb-8",children:"Cadastre-se para acessar o sistema"})]}),(0,r.jsxs)("form",{onSubmit:w,className:"space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-2",children:"Nome Completo"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(l,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,r.jsx)("input",{id:"name",name:"name",type:"text",required:!0,value:e.name,onChange:j,className:"input-field pl-10",placeholder:"Seu nome completo"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-2",children:"Email"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(c.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,r.jsx)("input",{id:"email",name:"email",type:"email",required:!0,value:e.email,onChange:j,className:"input-field pl-10",placeholder:"seu@email.com"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"department",className:"block text-sm font-medium text-gray-700 mb-2",children:"Departamento"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(d.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,r.jsxs)("select",{id:"department",name:"department",required:!0,value:e.department,onChange:j,className:"input-field pl-10",children:[(0,r.jsx)("option",{value:"",children:"Selecione um departamento"}),h.map(e=>(0,r.jsx)("option",{value:e.value,children:e.label},e.value))]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700 mb-2",children:"Senha"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(u.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,r.jsx)("input",{id:"password",name:"password",type:a?"text":"password",required:!0,value:e.password,onChange:j,className:"input-field pl-10 pr-10",placeholder:"••••••••"}),(0,r.jsx)("button",{type:"button",onClick:()=>o(!a),className:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600",children:a?(0,r.jsx)(m.Z,{className:"w-5 h-5"}):(0,r.jsx)(p.Z,{className:"w-5 h-5"})})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700 mb-2",children:"Confirmar Senha"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(u.Z,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),(0,r.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:y?"text":"password",required:!0,value:e.confirmPassword,onChange:j,className:"input-field pl-10 pr-10",placeholder:"••••••••"}),(0,r.jsx)("button",{type:"button",onClick:()=>x(!y),className:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600",children:y?(0,r.jsx)(m.Z,{className:"w-5 h-5"}):(0,r.jsx)(p.Z,{className:"w-5 h-5"})})]})]}),(0,r.jsx)("button",{type:"submit",disabled:g,className:"w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed",children:g?"Criando conta...":"Criar Conta"})]}),(0,r.jsx)("div",{className:"mt-6 text-center",children:(0,r.jsxs)("p",{className:"text-sm text-gray-600",children:["J\xe1 tem uma conta?"," ",(0,r.jsx)(n(),{href:"/auth/signin",className:"text-primary-600 hover:text-primary-700 font-medium",children:"Fa\xe7a login"})]})})]})})})}},5925:function(e,t,a){"use strict";let r,s;a.r(t),a.d(t,{CheckmarkIcon:function(){return K},ErrorIcon:function(){return U},LoaderIcon:function(){return V},ToastBar:function(){return en},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return em},resolveValue:function(){return N},toast:function(){return P},useToaster:function(){return R},useToasterStore:function(){return $}});var i,o=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?m(o,i):i+"{"+m(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=m(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=m.p?m.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},p={},f=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+f(e[a]);return t}return e},h=(e,t,a,r,s)=>{var i;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,a,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[n]=m(s?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&p.g?p.g:null;return a&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),n},y=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function x(e){let t=this||{},a=e.call?e(t.p):e;return h(a.unshift?a.raw?y(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,b,v,w=x.bind({k:1});function j(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;a.p=Object.assign({theme:b&&b()},n),a.o=/ *go\d+/.test(l),n.className=x.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),g(c,n)}return t?t(s):s}}var k=e=>"function"==typeof e,N=(e,t)=>k(e)?e(t):e,C=(r=0,()=>(++r).toString()),E=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},M=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return M(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},O=[],I={toasts:[],pausedAt:void 0},Z=e=>{I=M(I,e),O.forEach(e=>{e(I)})},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=(e={})=>{let[t,a]=(0,o.useState)(I),r=(0,o.useRef)(I);(0,o.useEffect)(()=>(r.current!==I&&a(I),O.push(a),()=>{let e=O.indexOf(a);e>-1&&O.splice(e,1)}),[]);let s=t.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:s}},D=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),A=e=>(t,a)=>{let r=D(t,e,a);return Z({type:2,toast:r}),r.id},P=(e,t)=>A("blank")(e,t);P.error=A("error"),P.success=A("success"),P.loading=A("loading"),P.custom=A("custom"),P.dismiss=e=>{Z({type:3,toastId:e})},P.remove=e=>Z({type:4,toastId:e}),P.promise=(e,t,a)=>{let r=P.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?N(t.success,e):void 0;return s?P.success(s,{id:r,...a,...null==a?void 0:a.success}):P.dismiss(r),e}).catch(e=>{let s=t.error?N(t.error,e):void 0;s?P.error(s,{id:r,...a,...null==a?void 0:a.error}):P.dismiss(r)}),e};var T=(e,t)=>{Z({type:1,toast:{id:e,height:t}})},z=()=>{Z({type:5,time:Date.now()})},F=new Map,_=1e3,L=(e,t=_)=>{if(F.has(e))return;let a=setTimeout(()=>{F.delete(e),Z({type:4,toastId:e})},t);F.set(e,a)},R=e=>{let{toasts:t,pausedAt:a}=$(e);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&P.dismiss(t.id);return}return setTimeout(()=>P.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,o.useCallback)(()=>{a&&Z({type:6,time:Date.now()})},[a]),s=(0,o.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=a||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)L(e.id,e.removeDelay);else{let t=F.get(e.id);t&&(clearTimeout(t),F.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:T,startPause:z,endPause:r,calculateOffset:s}}},q=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,U=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,J=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${J} 1s linear infinite;
`,G=w`
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
}`,K=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,Q=j("div")`
  position: absolute;
`,W=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===a?null:o.createElement(W,null,o.createElement(V,{...r}),"loading"!==a&&o.createElement(Q,null,"error"===a?o.createElement(U,{...r}):o.createElement(K,{...r})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=j("div")`
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
`,ei=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${w(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(et,{toast:e}),n=o.createElement(ei,{...e.ariaProps},N(e.message,e));return o.createElement(es,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,m.p=void 0,g=i,b=void 0,v=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let i=o.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return o.createElement("div",{ref:i,className:t,style:a},s)},ec=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ed=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=R(a);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(a=>{let i=a.position||t,n=ec(i,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return o.createElement(el,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?ed:"",style:n},"custom"===a.type?N(a.message,a):s?s(a):o.createElement(en,{toast:a,position:i}))}))},em=P}},function(e){e.O(0,[212,971,938,744],function(){return e(e.s=70032)}),_N_E=e.O()}]);