let T=document.querySelector('table'),
JS=(name,data)=>import(`./${name}.js`).then(m=>m.default(data)),
beforebegin=(str)=>T.insertAdjacentHTML('beforebegin',str),
db=(name,fun)=>import(`../db/${name}.js`).then(m=>fun(m.default)),
inBtn=(c,t)=>`<button class='btn btn-sm btn-${c}'>${t}</button>`,
inSec=(elem)=>{let ar=elem.textContent.split(':');return+ar[1]+ar[0]*60},
inTime=(t)=>{t=new Date(0,0,0,0,0,t).toLocaleTimeString();if(t.slice(0,2)==='00')t=t.slice(3);return t},
none={add:(el)=>el.classList.add('d-none'),remove:(el)=>el.classList.remove('d-none')},
pushState=(page)=>history.pushState(null,null,`#${page}`),
windowBack=()=>{
  window.addEventListener('popstate',()=>T.previousElementSibling.remove())
  /* ПКwindow.addEventListener('keypress',(e)=>{if(e.keyCode===127)history.back()}) */
}
export{T,JS,beforebegin,db,inBtn,inSec,inTime,none,pushState,windowBack}
