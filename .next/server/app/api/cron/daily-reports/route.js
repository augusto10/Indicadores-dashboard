"use strict";(()=>{var e={};e.id=802,e.ids=[802],e.modules={53524:e=>{e.exports=require("@prisma/client")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},23472:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>f,originalPathname:()=>y,patchFetch:()=>v,requestAsyncStorage:()=>u,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g,staticGenerationBailout:()=>h});var o={};t.r(o),t.d(o,{GET:()=>c,POST:()=>d});var a=t(95419),s=t(69108),n=t(99678),i=t(78070),l=t(36729);async function c(e){try{if(e.headers.get("authorization")!==`Bearer ${process.env.CRON_SECRET}`)return i.Z.json({message:"Unauthorized"},{status:401});return console.log("Starting scheduled daily reports..."),await (0,l.Pz)(),i.Z.json({message:"Daily reports sent successfully",timestamp:new Date().toISOString()})}catch(r){console.error("Error in daily reports cron job:",r);let e=r instanceof Error?r.message:"An unknown error occurred";return i.Z.json({message:"Error sending daily reports",error:e},{status:500})}}async function d(e){try{return console.log("Manual trigger of daily reports..."),await (0,l.Pz)(),i.Z.json({message:"Daily reports sent successfully",timestamp:new Date().toISOString()})}catch(r){console.error("Error in manual daily reports trigger:",r);let e=r instanceof Error?r.message:"An unknown error occurred";return i.Z.json({message:"Error sending daily reports",error:e},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/cron/daily-reports/route",pathname:"/api/cron/daily-reports",filename:"route",bundlePath:"app/api/cron/daily-reports/route"},resolvedPagePath:"C:\\Users\\suporteEsplendor50\\CascadeProjects\\esplendor_indicadores\\app\\api\\cron\\daily-reports\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:u,staticGenerationAsyncStorage:g,serverHooks:m,headerHooks:f,staticGenerationBailout:h}=p,y="/api/cron/daily-reports/route";function v(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}},3214:(e,r,t)=>{t.d(r,{_:()=>a});var o=t(53524);let a=globalThis.prisma??new o.PrismaClient},36729:(e,r,t)=>{t.d(r,{Pz:()=>d});var o=t(3214);let a=t(68140).createTransporter({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function s(e,r){let t=function(e){let r=e.reduce((e,r)=>e+r.overallPerformance,0)/e.length,t=e.reduce((e,r)=>e+r.totalIndicators,0),o=e.reduce((e,r)=>e+r.achievedTargets,0);return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Relat\xf3rio Di\xe1rio de Indicadores</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .summary { padding: 30px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .summary-card { background: white; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #3b82f6; }
        .summary-card h3 { margin: 0 0 10px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-card .value { font-size: 32px; font-weight: bold; color: #3b82f6; margin: 0; }
        .department { margin: 30px; }
        .department h2 { color: #1f2937; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .indicators-grid { display: grid; gap: 15px; }
        .indicator { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #6b7280; }
        .indicator.success { border-left-color: #10b981; }
        .indicator.warning { border-left-color: #f59e0b; }
        .indicator.danger { border-left-color: #ef4444; }
        .indicator-header { display: flex; justify-content: between; align-items: center; margin-bottom: 10px; }
        .indicator-name { font-weight: bold; color: #1f2937; }
        .indicator-value { font-size: 18px; font-weight: bold; }
        .indicator-target { font-size: 14px; color: #6b7280; }
        .progress-bar { width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 10px; }
        .progress-fill { height: 100%; transition: width 0.3s ease; }
        .progress-fill.success { background-color: #10b981; }
        .progress-fill.warning { background-color: #f59e0b; }
        .progress-fill.danger { background-color: #ef4444; }
        .footer { padding: 30px; text-align: center; background-color: #1f2937; color: white; }
        .footer p { margin: 0; opacity: 0.8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Relat\xf3rio Di\xe1rio de Indicadores</h1>
          <p>Esplendor Indicadores - ${new Date().toLocaleDateString("pt-BR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        </div>

        <div class="summary">
          <div class="summary-grid">
            <div class="summary-card">
              <h3>Performance Geral</h3>
              <p class="value">${r.toFixed(1)}%</p>
            </div>
            <div class="summary-card">
              <h3>Total de Indicadores</h3>
              <p class="value">${t}</p>
            </div>
            <div class="summary-card">
              <h3>Metas Atingidas</h3>
              <p class="value">${o}</p>
            </div>
            <div class="summary-card">
              <h3>Departamentos</h3>
              <p class="value">${e.length}</p>
            </div>
          </div>
        </div>

        ${e.map(e=>`
          <div class="department">
            <h2>${e.department}</h2>
            <div class="indicators-grid">
              ${e.indicators.map(e=>`
                <div class="indicator ${e.status}">
                  <div class="indicator-header">
                    <span class="indicator-name">${e.name}</span>
                    <div>
                      <span class="indicator-value">${e.value.toLocaleString("pt-BR")} ${e.unit}</span>
                      <div class="indicator-target">Meta: ${e.target.toLocaleString("pt-BR")} ${e.unit}</div>
                    </div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill ${e.status}" style="width: ${Math.min(e.percentage,100)}%"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}

        <div class="footer">
          <p>Este relat\xf3rio foi gerado automaticamente pelo sistema Esplendor Indicadores</p>
        </div>
      </div>
    </body>
    </html>
  `}(r),o={from:process.env.SMTP_USER,to:e.join(", "),subject:`Relat\xf3rio Di\xe1rio de Indicadores - ${new Date().toLocaleDateString("pt-BR")}`,html:t};try{return await a.sendMail(o),console.log("Daily report sent successfully"),{success:!0}}catch(e){return console.error("Error sending daily report:",e),{success:!1,error:e}}}var n=t(83949);async function i(e,r){try{if(!process.env.WHATSAPP_API_URL||!process.env.WHATSAPP_TOKEN)return console.log("WhatsApp API not configured"),{success:!1,error:"WhatsApp API not configured"};let t=await n.Z.post(process.env.WHATSAPP_API_URL,{to:e,message:r},{headers:{Authorization:`Bearer ${process.env.WHATSAPP_TOKEN}`,"Content-Type":"application/json"}});return console.log("WhatsApp message sent successfully"),{success:!0,data:t.data}}catch(e){return console.error("Error sending WhatsApp message:",e),{success:!1,error:e}}}async function l(e,r){let t=function(e){let r=e.reduce((e,r)=>e+r.overallPerformance,0)/e.length,t=e.reduce((e,r)=>e+r.totalIndicators,0),o=e.reduce((e,r)=>e+r.achievedTargets,0),a=`📊 *RELAT\xd3RIO DI\xc1RIO DE INDICADORES*
`;return a+=`📅 ${new Date().toLocaleDateString("pt-BR")}

📈 *RESUMO GERAL*
• Performance: ${r.toFixed(1)}%
• Indicadores: ${t}
• Metas atingidas: ${o}
• Departamentos: ${e.length}

`,e.forEach(e=>{let r=e.overallPerformance>=80?"\uD83D\uDFE2":e.overallPerformance>=60?"\uD83D\uDFE1":"\uD83D\uDD34";a+=`${r} *${e.department}*
Performance: ${e.overallPerformance.toFixed(1)}%
`,e.indicators.slice(0,3).forEach(e=>{let r="success"===e.status?"✅":"warning"===e.status?"⚠️":"❌";a+=`${r} ${e.name}: ${e.value.toLocaleString("pt-BR")}/${e.target.toLocaleString("pt-BR")} ${e.unit}
`}),e.indicators.length>3&&(a+=`... e mais ${e.indicators.length-3} indicadores
`),a+=`
`}),a+=`🔗 Acesse o dashboard completo em: ${process.env.APP_URL}

_Relat\xf3rio gerado automaticamente pelo sistema Esplendor Indicadores_`}(r);return await Promise.all(e.map(async e=>await i(e,t)))}async function c(){return Object.entries((await o._.indicator.findMany({include:{user:{select:{name:!0,department:!0}}}})).reduce((e,r)=>{let t=r.user.department;return e[t]||(e[t]=[]),e[t].push(r),e},{})).map(([e,r])=>{let t=r.map(e=>{let r=e.value/e.target*100,t="danger";return r>=100?t="success":r>=80&&(t="warning"),{name:e.name,value:e.value,target:e.target,unit:e.unit||"",percentage:r,status:t}}),o=t.filter(e=>"success"===e.status).length,a=t.length>0?o/t.length*100:0;return{department:e,indicators:t,overallPerformance:a,totalIndicators:t.length,achievedTargets:o}})}async function d(){try{console.log("Starting daily report generation...");let e=await o._.notificationConfig.findFirst({where:{isActive:!0}});if(!e){console.log("No active notification configuration found");return}let r=await c();if(0===r.length){console.log("No dashboard data available");return}if(e.emailEnabled&&e.recipients.length>0){console.log("Sending email reports...");let t=await s(e.recipients,r);t.success?console.log("Email reports sent successfully"):console.error("Failed to send email reports:",t.error)}if(e.whatsappEnabled&&e.whatsappNumbers.length>0){console.log("Sending WhatsApp reports...");let t=await l(e.whatsappNumbers,r),o=t.filter(e=>e.success).length;console.log(`WhatsApp reports: ${o}/${t.length} sent successfully`)}console.log("Daily reports completed")}catch(e){console.error("Error sending daily reports:",e)}}},97347:e=>{var r=Object.defineProperty,t=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,s={};function n(e){var r;let t=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean);return`${e.name}=${encodeURIComponent(null!=(r=e.value)?r:"")}; ${t.join("; ")}`}function i(e){let r=new Map;for(let t of e.split(/; */)){if(!t)continue;let e=t.indexOf("=");if(-1===e){r.set(t,"true");continue}let[o,a]=[t.slice(0,e),t.slice(e+1)];try{r.set(o,decodeURIComponent(null!=a?a:"true"))}catch{}}return r}function l(e){var r,t;if(!e)return;let[[o,a],...s]=i(e),{domain:n,expires:l,httponly:p,maxage:u,path:g,samesite:m,secure:f,priority:h}=Object.fromEntries(s.map(([e,r])=>[e.toLowerCase(),r]));return function(e){let r={};for(let t in e)e[t]&&(r[t]=e[t]);return r}({name:o,value:decodeURIComponent(a),domain:n,...l&&{expires:new Date(l)},...p&&{httpOnly:!0},..."string"==typeof u&&{maxAge:Number(u)},path:g,...m&&{sameSite:c.includes(r=(r=m).toLowerCase())?r:void 0},...f&&{secure:!0},...h&&{priority:d.includes(t=(t=h).toLowerCase())?t:void 0}})}((e,t)=>{for(var o in t)r(e,o,{get:t[o],enumerable:!0})})(s,{RequestCookies:()=>p,ResponseCookies:()=>u,parseCookie:()=>i,parseSetCookie:()=>l,stringifyCookie:()=>n}),e.exports=((e,s,n,i)=>{if(s&&"object"==typeof s||"function"==typeof s)for(let n of o(s))a.call(e,n)||void 0===n||r(e,n,{get:()=>s[n],enumerable:!(i=t(s,n))||i.enumerable});return e})(r({},"__esModule",{value:!0}),s);var c=["strict","lax","none"],d=["low","medium","high"],p=class{constructor(e){this._parsed=new Map,this._headers=e;let r=e.get("cookie");if(r)for(let[e,t]of i(r))this._parsed.set(e,{name:e,value:t})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let r="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(r)}getAll(...e){var r;let t=Array.from(this._parsed);if(!e.length)return t.map(([e,r])=>r);let o="string"==typeof e[0]?e[0]:null==(r=e[0])?void 0:r.name;return t.filter(([e])=>e===o).map(([e,r])=>r)}has(e){return this._parsed.has(e)}set(...e){let[r,t]=1===e.length?[e[0].name,e[0].value]:e,o=this._parsed;return o.set(r,{name:r,value:t}),this._headers.set("cookie",Array.from(o).map(([e,r])=>n(r)).join("; ")),this}delete(e){let r=this._parsed,t=Array.isArray(e)?e.map(e=>r.delete(e)):r.delete(e);return this._headers.set("cookie",Array.from(r).map(([e,r])=>n(r)).join("; ")),t}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},u=class{constructor(e){var r,t,o;this._parsed=new Map,this._headers=e;let a=null!=(o=null!=(t=null==(r=e.getSetCookie)?void 0:r.call(e))?t:e.get("set-cookie"))?o:[];for(let e of Array.isArray(a)?a:function(e){if(!e)return[];var r,t,o,a,s,n=[],i=0;function l(){for(;i<e.length&&/\s/.test(e.charAt(i));)i+=1;return i<e.length}for(;i<e.length;){for(r=i,s=!1;l();)if(","===(t=e.charAt(i))){for(o=i,i+=1,l(),a=i;i<e.length&&"="!==(t=e.charAt(i))&&";"!==t&&","!==t;)i+=1;i<e.length&&"="===e.charAt(i)?(s=!0,i=a,n.push(e.substring(r,o)),r=i):i=o+1}else i+=1;(!s||i>=e.length)&&n.push(e.substring(r,e.length))}return n}(a)){let r=l(e);r&&this._parsed.set(r.name,r)}}get(...e){let r="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(r)}getAll(...e){var r;let t=Array.from(this._parsed.values());if(!e.length)return t;let o="string"==typeof e[0]?e[0]:null==(r=e[0])?void 0:r.name;return t.filter(e=>e.name===o)}has(e){return this._parsed.has(e)}set(...e){let[r,t,o]=1===e.length?[e[0].name,e[0].value,e[0]]:e,a=this._parsed;return a.set(r,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:r,value:t,...o})),function(e,r){for(let[,t]of(r.delete("set-cookie"),e)){let e=n(t);r.append("set-cookie",e)}}(a,this._headers),this}delete(...e){let[r,t,o]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:r,path:t,domain:o,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(n).join("; ")}}},63608:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{RequestCookies:function(){return o.RequestCookies},ResponseCookies:function(){return o.ResponseCookies}});let o=t(97347)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[638,206,96],()=>t(23472));module.exports=o})();