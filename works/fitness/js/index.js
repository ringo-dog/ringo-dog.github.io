const
db=(name,fun)=>import(`../db/${name}.js`).then(m=>fun(m.default)),
pages=[
  ()=>{
    noneRemove(T[1]);noneAdd(T[2]);noneAdd(T[3])
    let today,days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
    let months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    // let d=new Date()let today=d.toLocaleDateString().split('.') new Date(y-1,12,0).getDate()
    let show=([m,y])=>{/* метки из бд */
      let first=new Date(y,m,7).getDay(),last=new Date(y,m+1,0).getDate(),
      last_pre=(m===0)?31:new Date(y,m,0).getDate()
      let str='<tr>'
      let i=1,end=8
      let fun=()=>{for(i;i<end;i++)str+=`<td>${i}</td>`},
      other=(i,end)=>{for(i;i<end;i++)str+=`<td class='text-muted'>${i}</td>`}
      if(first!==0){other(last_pre+1-first,last_pre+1);end-=first;fun()}else{fun()}
      for(let x=0,z=Math.floor((last-i)/7);x<z;x++){str+='</tr><tr>';end+=7;fun()}
      str+='</tr><tr>';
      end=last+1;last=end-i;fun();other(1,8-last)
      str+='</tr>'
      T[1].innerHTML=`<tr class='h-2r'><th><a><</a></th><th colspan='5'>${months[m]} ${y}</th><th><a>></a></th></tr><tr>${days.reduce((str,el)=>`${str}<td class='h-2r'>${el}</td>`,'')}</tr>${str}`
      for(let tr of T[1].querySelectorAll('tr:nth-child(1n+2)'))tr.className='table-bordered'
      T[1].querySelectorAll('a').forEach((a,i)=>a.onclick=()=>clicks[i]())
      for(let td of T[1].querySelectorAll('td:not([class])')){if(td.textContent===today)return td.className='table-active'}
      // for(i;i<8-first;i++)str+=`<td>${i}</td>` for(i;i<8;i++)str+=`<td>${i}</td>`
      // for(let td of T[3].querySelectorAll('td'))td.classList.add('border')
    },
    clicks=[
      ()=>{let ar=clicks[2]();if(ar[0]===0){ar=[11,--ar[1]]}else{ar[0]--}show(ar)},
      ()=>{let ar=clicks[2]();if(ar[0]===11){ar=[0,++ar[1]]}else{ar[0]++}show(ar)},
      ()=>{let ar=T[1].querySelector('th[colspan]').textContent.split(' ');return[months.indexOf(ar[0]),+ar[1]]}
    ]
    {let d=new Date();today=String(d.getDate());show([d.getMonth(),d.getFullYear()])}
    // {let d=new Date();d=new Date(d.getFullYear(),d.getMonth(),d.getDate()-20);alert([d.getDate(),d.getMonth(),d.getFullYear()])}
    // {let today=new Date().toLocaleDateString().split('.');today.splice(0,1,parseInt(today[0]));show(today)}
    // show(new Date().toLocaleDateString().split('.'))
    // show(['30','08','2025'])
    // T[1].innerHTML=`<tr><th style=''><</th><th colspan='5' style=''>${months[d.getMonth()]} ${d.getFullYear()}</th><th style=''>></th></tr><tr>${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].reduce((str,el)=>`${str}<td>${el}</td>`,'')}</tr>`
  },
  ()=>db('workout-main',(arr)=>{
    T[1].innerHTML=arr.map(ar=>ar[0].slice(0,2)).concat([['Добавить','']]).reduce(inTrArr,'')
    let fun=(id)=>JS('workout-update',[arr,id])
    T[1].querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>fun(i))
    T[1].querySelector('tr:last-child').onclick=fun
  }),
  ()=>{
    let tdOne=(a,b)=>`${a}<tr><td>${b}</td></tr>`
    db('workout-name',(arr)=>T[1].innerHTML=arr.reduce(tdOne,''))
  }
],
// db('workout-main',arr=>alert(arr));return
JS=(name,data)=>import(`./${name}.js`).then(m=>m.default(data)),
T=document.querySelectorAll('table'),
main=T[0].nextElementSibling,
inSec=(elem)=>{let ar=elem.textContent.split(':');return+ar[1]+ar[0]*60},
inTime=(t)=>{t=new Date(0,0,0,0,0,t).toLocaleTimeString();if(t.slice(0,2)==='00')t=t.slice(3);return t},
inBtn=(c,t)=>`<button class='btn btn-sm btn-${c}'>${t}</button>`,
inTd=(a,b)=>`${a}<td>${b}</td>`,
inTr=(ar)=>ar.reduce(inTd,'<tr>')+'</tr>',
inTrArr=(str,ar)=>str+inTr(ar),
noneAdd=(el)=>el.classList.add('d-none'),
noneRemove=(el)=>el.classList.remove('d-none'),
playVisible={on:()=>main.querySelector('a:nth-child(2)').classList.remove('invisible'),off:()=>main.querySelector('a:nth-child(2)').classList.add('invisible')}
;
/* ? для всех T[2].addEventListener('click',click) */
[
  ()=>{for(let i=2;i<4;i++){if(!T[i].matches('.d-none')){noneAdd(T[i]);noneRemove(T[i-1]);playVisible.off();return}}noneAdd(main)},
  ()=>JS('play'),
  ()=>noneAdd(main)
].forEach((fun,i)=>main.querySelector(`a:nth-child(${++i})`).addEventListener('click',fun))
T[0].querySelectorAll('td[class]').forEach((tr,i)=>tr.addEventListener('click',()=>{
  pages[i]();playVisible.off();noneRemove(main);noneRemove(T[1]);noneAdd(T[2]);noneAdd(T[3])
}))
if(!localStorage.workoutMain)localStorage.workoutMain='[]'
if(window.speechSynthesis)alert('Синтезатор речи поддерживается');else alert('Синтезатор речи не поддерживается')
