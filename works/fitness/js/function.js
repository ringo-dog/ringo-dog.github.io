let T=document.querySelector('table'),
JS=(name,data)=>import(`./${name}.js`).then(m=>m.default(data)),
db=(name,fun)=>import(`../db/${name}.js`).then(m=>fun(m.default)),
inBtn=(c,t)=>`<button class='btn btn-sm btn-${c}'>${t}</button>`,
inSec=(elem)=>{let ar=elem.textContent.split(':');return+ar[1]+ar[0]*60},
inTime=(t)=>{t=new Date(0,0,0,0,0,t).toLocaleTimeString();if(t.slice(0,2)==='00')t=t.slice(3);return t},
none={add:(el)=>el.classList.add('d-none'),remove:(el)=>el.classList.remove('d-none')},
back=(p,fun)=>{history.pushState(null,null,'#'+p);window.addEventListener('popstate',fun,{once:true})}
export{T,JS,back,db,inBtn,inSec,inTime,none}
