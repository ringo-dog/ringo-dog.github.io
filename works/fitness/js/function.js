let T=document.querySelector('table'),
JS=(name,data)=>import(`./${name}.js`).then(m=>m.default(data)),
beforebegin=(str)=>T.insertAdjacentHTML('beforebegin',str),
db=(name,fun)=>import(`../db/${name}.js`).then(m=>fun(m.default)),
funBack=(fun)=>window.addEventListener('popstate',fun,{once:true}),
inBtn=(c,t)=>`<button class='btn btn-sm btn-${c}'>${t}</button>`,
inSec=(elem)=>{let ar=elem.textContent.split(':');return+ar[1]+ar[0]*60},
inTime=(t)=>{t=new Date(0,0,0,0,0,t).toLocaleTimeString();if(t.slice(0,2)==='00')t=t.slice(3);return t},
none={add:(el)=>el.classList.add('d-none'),remove:(el)=>el.classList.remove('d-none')},
pushState=(page)=>history.pushState(null,null,`#${page}`),
windowBack=()=>window.onpopstate=()=>T.previousElementSibling.remove()
export{T,JS,beforebegin,db,funBack,inBtn,inSec,inTime,none,pushState,windowBack}
