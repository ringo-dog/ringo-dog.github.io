import{T,JS,db,beforebegin,pushState,windowBack}from'./function.js'
/* table на T и наооборот */
let today,id_click,
days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].reduce((str,el)=>`${str}<td class='h-2r'>${el}</td>`,''),
months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
clicks=[
  ()=>{let ar=clicks[2]();if(ar[0]===0){ar=[11,--ar[1]]}else{ar[0]--}show(ar)},
  ()=>{let ar=clicks[2]();if(ar[0]===11){ar=[0,++ar[1]]}else{ar[0]++}show(ar)},
  ()=>{let ar=T.querySelector('th[colspan]').textContent.split(' ');return[months.indexOf(ar[0]),+ar[1]]},
  (td)=>{
    let ids=[],click=(i,fun)=>clicks[4](ids[i],fun),
    arr=Array.from(td.querySelectorAll('div')).map(el=>{ids.push(el.dataset.date);return[el.textContent,el.dataset.time]});
    JS('workout-update',[arr,click,update,remove])
    // JS('workout-update',[T.previousElementSibling,arr,(i,fun)=>fun(clicks[4](ids[i])),update])
    arr=null;pushState(1)
  },
  (key,fun)=>db('calendar',(obj)=>{
    id_click=key;let ar=obj.date[key];ar=[obj.rest[ar[1]].slice(1).concat(obj.name[ar[0]]),ar.slice(2).map(i=>obj.drill[i])];fun(ar,0)
  })
],
funDates=(arr,first)=>{
  // let arr=obj.date.map(ar=>[ar[0],obj.name[ar[1]],obj.rest[ar[2]]].concat(ar.slice(3).map(i=>obj.drill[i])))
  let day=86400000,width=innerWidth/7;
  T.querySelectorAll('tr:nth-child(1n+3) td').forEach((td,i)=>{
    let start=i*day+first,end=start+day,ar=arr.filter(([date])=>date>start&&date<end);
    if(ar.length){td.innerHTML+=ar.reduce((str,ar)=>`${str}<div data-date='${ar[0]}' data-time='${ar[2]}' style='width:${width}px;margin-right:-.8rem;overflow:hidden'><span class='badge badge-danger'>${ar[1]}</span></div>`,'');td.classList.add('p-0')}
    // td.style.width=innerWidth/7+'px'position-absolute ;margin-top:${1*i}rem,'align-top'
  })
},
next=(first,last)=>db('calendar',(obj)=>{
  let arr=[],end=()=>funDates(arr,first);
  for(let key in obj.date){let d=+key,ar=obj.date[key];if(d>first){arr.push([d,obj.name[ar[0]],obj.rest[ar[1]][0]]);if(d>last)return end()}}
  if(arr.length)end()
  // for(let key in obj.date){if(key>first){arr[0].push(key);arr[1].push(obj.date[key][0]);if(key>last)return end()}}
}),
// let d=new Date()let today=d.toLocaleDateString().split('.') new Date(y-1,12,0).getDate()
show=([m,y])=>{
  let first=new Date(y,m,7).getDay(),last=new Date(y,m+1,0).getDate(),last_pre=(m===0)?31:new Date(y,m,0).getDate(),
  str='<tr>',i=1,end=8,
  fun=()=>{for(i;i<end;i++)str+=`<td>${i}</td>`},other=(i,end)=>{for(i;i<end;i++)str+=`<td class='text-muted'>${i}</td>`}
  // if(first!==0){other(last_pre+1-first,last_pre+1);end-=first;fun()}else{fun()}
  if(first!==0){
    end-=first;first=last_pre+1-first;other(first,last_pre+1);fun()
    // alert([new Date(y,m-1,first).getTime(),new Date(y,m,0).getTime()-86400000*(last_pre-first)])
    first=new Date(y,m,0).getTime()-86400000*(last_pre-first)
  }else{fun();first=new Date(y,m,1).getTime()}
  for(let x=0,z=Math.floor((last-i)/7);x<z;x++){str+='</tr><tr>';end+=7;fun()}
  str+='</tr><tr>';
  // end=last+1;last=end-i;fun();other(1,8-last)
  end=last+1;last=end-i;fun();last=8-last;other(1,last)
  last=new Date(y,m+1,last).getTime()
  str+='</tr>'
  T.innerHTML=`<tr class='h-2r'><th><a><</a></th><th colspan='5'>${months[m]} ${y}</th><th><a>></a></th></tr><tr>${days}</tr>${str}`
  // next(first,last)
  for(let tr of T.querySelectorAll('tr:nth-child(1n+2)'))tr.className='table-bordered'
  // T.querySelectorAll('a').forEach((a,i)=>a.onclick=()=>clicks[i]())
  // for(let td of T.querySelectorAll('td:not([class])')){if(td.textContent===today)return td.className='table-active'}
  for(let td of T.querySelectorAll('td:not([class])')){if(td.textContent===today){td.className='table-active';next(first,last);return}}
  // for(i;i<8-first;i++)str+=`<td>${i}</td>` for(i;i<8;i++)str+=`<td>${i}</td>`
  // for(let td of T[3].querySelectorAll('td'))td.classList.add('border')
},
// play=(arr,obj)=>obj.date[id_click]=arr,
remove=(end)=>db('calendar',(obj)=>{
  delete obj.date[id_click];JS('write',['calendar',obj,end])/* удалить badge */
}),
update=(ar,end)=>JS('calendar-update',[ar,(arr,obj)=>obj.date[id_click]=arr,end])/* изменить badge */
;
T.addEventListener('click',(elem)=>{
  elem=elem.target
  if(elem.matches('a'))clicks[['<','>'].indexOf(elem.textContent)]()
  else if(elem.matches('.p-0'))clicks[3](elem)
})
{let d=new Date();today=String(d.getDate());show([d.getMonth(),d.getFullYear()])}
windowBack()
// let obj={date:[],drill:[],name:[],rest:[]}
// db('workout-main',(ar)=>{
//   // alert(JSON.stringify(ar))
//   // ar=ar[0]
//   ar.forEach((ar,index)=>{
//     let arr=[index*70000000+Date.now()],i=obj.name.indexOf(ar[0][0])
//     if(i<0){obj.name.push(ar[0][0]);i=obj.name.length-1}arr.push(i)
//     i=obj.rest.findIndex((a,i)=>a===ar[0][i+1]);if(i<0){obj.rest.push(ar[0].slice(1));i=obj.rest.length-1}arr.push(i)
//     ar[1].forEach(a=>{i=obj.drill.indexOf(a);if(i<0){obj.drill.push(a);i=obj.drill.length-1}arr.push(i)})
//     // obj.date.push(arr)
//     obj.date[arr[0]]=arr.slice(1)
//     // obj.date.push([i*100000000+Date.now()].concat())
//   })
//   // return alert(JSON.stringify(obj.date))
//   // obj={date:[[Date.now(),0,0,0,1]],drill:ar[1],name:[ar[0][0]],rest:[ar[0].slice(1)]};
//   let d=new Date();today=String(d.getDate());show([d.getMonth(),d.getFullYear()])
//   // let obj={};obj[Date.now()]=ar[0]
//   // let[dates,arr]=Object.entries(obj)
//   // let dates=Object.keys(obj)
//   // alert(JSON.stringify(obj))
// })
