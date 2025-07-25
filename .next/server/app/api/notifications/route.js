"use strict";(()=>{var e={};e.id=996,e.ids=[996],e.modules={53524:e=>{e.exports=require("@prisma/client")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},25528:e=>{e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},63477:e=>{e.exports=require("querystring")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},82448:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>y,originalPathname:()=>w,patchFetch:()=>P,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>v,staticGenerationBailout:()=>b});var a={};t.r(a),t.d(a,{GET:()=>u,POST:()=>g,PUT:()=>f});var o=t(95419),s=t(69108),n=t(99678),i=t(78070),c=t(81355),l=t(3205),d=t(3214),p=t(36729);async function u(e){try{let e=await (0,c.getServerSession)(l.L);if(!e||"ADMIN"!==e.user.role)return i.Z.json({message:"Unauthorized"},{status:401});let r=await d._.notificationConfig.findFirst({where:{isActive:!0}});return i.Z.json(r)}catch(e){return console.error("Error fetching notification config:",e),i.Z.json({message:"Internal server error"},{status:500})}}async function g(e){try{let r=await (0,c.getServerSession)(l.L);if(!r||"ADMIN"!==r.user.role)return i.Z.json({message:"Unauthorized"},{status:401});let{emailEnabled:t,whatsappEnabled:a,recipients:o,whatsappNumbers:s,sendTime:n}=await e.json();await d._.notificationConfig.updateMany({where:{isActive:!0},data:{isActive:!1}});let p=await d._.notificationConfig.create({data:{emailEnabled:t||!1,whatsappEnabled:a||!1,recipients:o||[],whatsappNumbers:s||[],sendTime:n||"09:00",isActive:!0}});return i.Z.json(p,{status:201})}catch(e){return console.error("Error creating notification config:",e),i.Z.json({message:"Internal server error"},{status:500})}}async function f(e){try{let r=await (0,c.getServerSession)(l.L);if(!r||"ADMIN"!==r.user.role)return i.Z.json({message:"Unauthorized"},{status:401});let{action:t}=await e.json();if("send_test_report"===t)return await (0,p.Pz)(),i.Z.json({message:"Test report sent successfully"});return i.Z.json({message:"Invalid action"},{status:400})}catch(e){return console.error("Error processing notification action:",e),i.Z.json({message:"Internal server error"},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/notifications/route",pathname:"/api/notifications",filename:"route",bundlePath:"app/api/notifications/route"},resolvedPagePath:"C:\\Users\\suporteEsplendor50\\CascadeProjects\\esplendor_indicadores\\app\\api\\notifications\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:h,staticGenerationAsyncStorage:v,serverHooks:x,headerHooks:y,staticGenerationBailout:b}=m,w="/api/notifications/route";function P(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:v})}},3205:(e,r,t)=>{t.d(r,{L:()=>c});var a=t(86485),o=t(54896),s=t(3214),n=t(6521),i=t.n(n);let c={adapter:(0,o.N)(s._),providers:[(0,a.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;let r=await s._.user.findUnique({where:{email:e.email}});return r&&r.isActive&&await i().compare(e.password,r.password)?{id:r.id,email:r.email,name:r.name,department:r.department,role:r.role}:null}})],session:{strategy:"jwt"},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.department=r.department,e.role=r.role),e),session:async({session:e,token:r})=>(r&&(e.user.id=r.sub,e.user.department=r.department,e.user.role=r.role),e)},pages:{signIn:"/auth/signin",signUp:"/auth/signup"}}},3214:(e,r,t)=>{t.d(r,{_:()=>o});var a=t(53524);let o=globalThis.prisma??new a.PrismaClient},36729:(e,r,t)=>{t.d(r,{Pz:()=>d});var a=t(3214);let o=t(68140).createTransporter({host:process.env.SMTP_HOST,port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function s(e,r){let t=function(e){let r=e.reduce((e,r)=>e+r.overallPerformance,0)/e.length,t=e.reduce((e,r)=>e+r.totalIndicators,0),a=e.reduce((e,r)=>e+r.achievedTargets,0);return`
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
              <p class="value">${a}</p>
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
  `}(r),a={from:process.env.SMTP_USER,to:e.join(", "),subject:`Relat\xf3rio Di\xe1rio de Indicadores - ${new Date().toLocaleDateString("pt-BR")}`,html:t};try{return await o.sendMail(a),console.log("Daily report sent successfully"),{success:!0}}catch(e){return console.error("Error sending daily report:",e),{success:!1,error:e}}}var n=t(83949);async function i(e,r){try{if(!process.env.WHATSAPP_API_URL||!process.env.WHATSAPP_TOKEN)return console.log("WhatsApp API not configured"),{success:!1,error:"WhatsApp API not configured"};let t=await n.Z.post(process.env.WHATSAPP_API_URL,{to:e,message:r},{headers:{Authorization:`Bearer ${process.env.WHATSAPP_TOKEN}`,"Content-Type":"application/json"}});return console.log("WhatsApp message sent successfully"),{success:!0,data:t.data}}catch(e){return console.error("Error sending WhatsApp message:",e),{success:!1,error:e}}}async function c(e,r){let t=function(e){let r=e.reduce((e,r)=>e+r.overallPerformance,0)/e.length,t=e.reduce((e,r)=>e+r.totalIndicators,0),a=e.reduce((e,r)=>e+r.achievedTargets,0),o=`📊 *RELAT\xd3RIO DI\xc1RIO DE INDICADORES*
`;return o+=`📅 ${new Date().toLocaleDateString("pt-BR")}

📈 *RESUMO GERAL*
• Performance: ${r.toFixed(1)}%
• Indicadores: ${t}
• Metas atingidas: ${a}
• Departamentos: ${e.length}

`,e.forEach(e=>{let r=e.overallPerformance>=80?"\uD83D\uDFE2":e.overallPerformance>=60?"\uD83D\uDFE1":"\uD83D\uDD34";o+=`${r} *${e.department}*
Performance: ${e.overallPerformance.toFixed(1)}%
`,e.indicators.slice(0,3).forEach(e=>{let r="success"===e.status?"✅":"warning"===e.status?"⚠️":"❌";o+=`${r} ${e.name}: ${e.value.toLocaleString("pt-BR")}/${e.target.toLocaleString("pt-BR")} ${e.unit}
`}),e.indicators.length>3&&(o+=`... e mais ${e.indicators.length-3} indicadores
`),o+=`
`}),o+=`🔗 Acesse o dashboard completo em: ${process.env.APP_URL}

_Relat\xf3rio gerado automaticamente pelo sistema Esplendor Indicadores_`}(r);return await Promise.all(e.map(async e=>await i(e,t)))}async function l(){return Object.entries((await a._.indicator.findMany({include:{user:{select:{name:!0,department:!0}}}})).reduce((e,r)=>{let t=r.user.department;return e[t]||(e[t]=[]),e[t].push(r),e},{})).map(([e,r])=>{let t=r.map(e=>{let r=e.value/e.target*100,t="danger";return r>=100?t="success":r>=80&&(t="warning"),{name:e.name,value:e.value,target:e.target,unit:e.unit||"",percentage:r,status:t}}),a=t.filter(e=>"success"===e.status).length,o=t.length>0?a/t.length*100:0;return{department:e,indicators:t,overallPerformance:o,totalIndicators:t.length,achievedTargets:a}})}async function d(){try{console.log("Starting daily report generation...");let e=await a._.notificationConfig.findFirst({where:{isActive:!0}});if(!e){console.log("No active notification configuration found");return}let r=await l();if(0===r.length){console.log("No dashboard data available");return}if(e.emailEnabled&&e.recipients.length>0){console.log("Sending email reports...");let t=await s(e.recipients,r);t.success?console.log("Email reports sent successfully"):console.error("Failed to send email reports:",t.error)}if(e.whatsappEnabled&&e.whatsappNumbers.length>0){console.log("Sending WhatsApp reports...");let t=await c(e.whatsappNumbers,r),a=t.filter(e=>e.success).length;console.log(`WhatsApp reports: ${a}/${t.length} sent successfully`)}console.log("Daily reports completed")}catch(e){console.error("Error sending daily reports:",e)}}},77381:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0})},81355:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0});var a={};Object.defineProperty(r,"default",{enumerable:!0,get:function(){return s.default}});var o=t(77381);Object.keys(o).forEach(function(e){!("default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(a,e))&&(e in r&&r[e]===o[e]||Object.defineProperty(r,e,{enumerable:!0,get:function(){return o[e]}}))});var s=function(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=n(r);if(t&&t.has(e))return t.get(e);var a={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&({}).hasOwnProperty.call(e,s)){var i=o?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(a,s,i):a[s]=e[s]}return a.default=e,t&&t.set(e,a),a}(t(49605));function n(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(n=function(e){return e?t:r})(e)}Object.keys(s).forEach(function(e){!("default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(a,e))&&(e in r&&r[e]===s[e]||Object.defineProperty(r,e,{enumerable:!0,get:function(){return s[e]}}))})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[638,393,650,206,96],()=>t(82448));module.exports=a})();