import{T,JS,db,pushState,windowBack}from'./function.js'

let today,id_click,
days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].reduce((str,el)=>`${str}<td class='h-2r'>${el}</td>`,''),
months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
clicks=[
  ()=>{let ar=clicks[2]();if(ar[0]===0){ar=[11,--ar[1]]}else{ar[0]--}show(ar)},
  ()=>{let ar=clicks[2]();if(ar[0]===11){ar=[0,++ar[1]]}else{ar[0]++}show(ar)},
  ()=>{let ar=T.querySelector('th[colspan]').textContent.split(' ');return[months.indexOf(ar[0]),+ar[1]]},
  async(td)=>{
    let ids=[],name=[td.firstChild.textContent,T.querySelector('th[colspan]').textContent.split(' ')[0]],
    click=(i,fun)=>clicks[4](ids[i],fun),
    arr=Array.from(td.querySelectorAll('div')).map(el=>{ids.push(el.dataset.date);return[el.textContent,el.dataset.time]});
    await JS('workout-update',[arr,click,update,remove])
    arr=null;td=null;pushState(1);if(name[1].slice(-1)==='т')name[1]+='а';else name[1]=name[1].slice(0,-1)+'я'
    table.querySelectorAll('tr').forEach((tr,i)=>tr.insertAdjacentHTML('beforeend',`<td class='table-dark'>${inTime(ids[i])}</td>`))
    table.insertAdjacentHTML('afterbegin',`<thead><tr><th colspan='3'>${name.join(' ')}</th></tr></thead>`)
  },
  (key,fun)=>db('calendar',(obj)=>{
    id_click=key;let ar=obj.date[key];ar=[obj.rest[ar[1]].slice(1).concat(obj.name[ar[0]]),ar.slice(2).map(i=>obj.drill[i])];fun(ar,0)
  })
],
funDates=(arr,first)=>{
  let day=86400000,width=innerWidth/7;
  T.querySelectorAll('tr:nth-child(1n+3) td').forEach((td,i)=>{
    let start=i*day+first,end=start+day,ar=arr.filter(([date])=>date>start&&date<end);
    if(ar.length){td.innerHTML+=ar.reduce((str,ar)=>`${str}<div data-date='${ar[0]}' data-time='${ar[2]}' style='width:${width}px;margin-right:-.8rem;overflow:hidden'><span class='badge badge-danger'>${ar[1]}</span></div>`,'');td.classList.add('p-0')}
  })
},
inTime=(d)=>new Date(+d).toLocaleTimeString().slice(0,5),
next=(first,last)=>db('calendar',(obj)=>{
  let arr=[],end=()=>funDates(arr,first);
  for(let key in obj.date){let d=+key,ar=obj.date[key];if(d>first){arr.push([d,obj.name[ar[0]],obj.rest[ar[1]][0]]);if(d>last)return end()}}
  if(arr.length)end()
}),
show=([m,y])=>{
  let first=new Date(y,m,7).getDay(),last=new Date(y,m+1,0).getDate(),last_pre=(m===0)?31:new Date(y,m,0).getDate(),
  str='<tr>',i=1,end=8,
  fun=()=>{for(i;i<end;i++)str+=`<td>${i}</td>`},other=(i,end)=>{for(i;i<end;i++)str+=`<td class='text-muted'>${i}</td>`}
  if(first!==0){
    end-=first;first=last_pre+1-first;other(first,last_pre+1);fun()
    first=new Date(y,m,0).getTime()-86400000*(last_pre-first)
  }else{fun();first=new Date(y,m,1).getTime()}
  for(let x=0,z=Math.floor((last-i)/7);x<z;x++){str+='</tr><tr>';end+=7;fun()}
  str+='</tr><tr>';
  end=last+1;last=end-i;fun();last=8-last;other(1,last)
  last=new Date(y,m+1,last).getTime()
  str+='</tr>'
  T.innerHTML=`<tr class='h-2r'><th><a><</a></th><th colspan='5'>${months[m]} ${y}</th><th><a>></a></th></tr><tr>${days}</tr>${str}`
  for(let tr of T.querySelectorAll('tr:nth-child(1n+2)'))tr.className='table-bordered'
  for(let td of T.querySelectorAll('td:not([class])')){if(td.textContent===today){td.className='table-active';next(first,last);return}}
},
remove=(end)=>db('calendar',(obj)=>{
  delete obj.date[id_click];JS('write',['calendar',obj,end])
}),
update=(ar,end)=>JS('calendar-update',[ar,(arr,obj)=>obj.date[id_click]=arr,end])
;
T.addEventListener('click',(elem)=>{
  elem=elem.target
  if(elem.matches('a'))clicks[['<','>'].indexOf(elem.textContent)]()
  else if(elem.matches('.p-0'))clicks[3](elem)
})
{let d=new Date();today=String(d.getDate());show([d.getMonth(),d.getFullYear()])}
windowBack()
