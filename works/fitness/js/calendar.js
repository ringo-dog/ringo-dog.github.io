import{T,db}from'./function.js'

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
  T.innerHTML=`<tr class='h-2r'><th><a><</a></th><th colspan='5'>${months[m]} ${y}</th><th><a>></a></th></tr><tr>${days.reduce((str,el)=>`${str}<td class='h-2r'>${el}</td>`,'')}</tr>${str}`
  for(let tr of T.querySelectorAll('tr:nth-child(1n+2)'))tr.className='table-bordered'
  T.querySelectorAll('a').forEach((a,i)=>a.onclick=()=>clicks[i]())
  for(let td of T.querySelectorAll('td:not([class])')){if(td.textContent===today)return td.className='table-active'}
  // for(i;i<8-first;i++)str+=`<td>${i}</td>` for(i;i<8;i++)str+=`<td>${i}</td>`
  // for(let td of T[3].querySelectorAll('td'))td.classList.add('border')
},
clicks=[
  ()=>{let ar=clicks[2]();if(ar[0]===0){ar=[11,--ar[1]]}else{ar[0]--}show(ar)},
  ()=>{let ar=clicks[2]();if(ar[0]===11){ar=[0,++ar[1]]}else{ar[0]++}show(ar)},
  ()=>{let ar=T.querySelector('th[colspan]').textContent.split(' ');return[months.indexOf(ar[0]),+ar[1]]}
]
{let d=new Date();today=String(d.getDate());show([d.getMonth(),d.getFullYear()])}
