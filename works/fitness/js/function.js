let T=document.querySelector('table'),
JS=(name,data)=>import(`./${name}.js`).then(m=>m.default(data)),/* только в workout */
db=(name,fun)=>import(`../db/${name}.js`).then(m=>fun(m.default)),
inSec=(elem)=>{let ar=elem.textContent.split(':');return+ar[1]+ar[0]*60},
inTime=(t)=>{t=new Date(0,0,0,0,0,t).toLocaleTimeString();if(t.slice(0,2)==='00')t=t.slice(3);return t}
export{T,JS,db,inSec,inTime}
