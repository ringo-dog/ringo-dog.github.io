import{JS,beforebegin,db,funBack,inBtn,inSec,inTime,pushState}from'./function.js'
export default([arr,funClick,funSave,funTrash])=>{

let select_str,time_str,tr_click,x=[0,0],y=[0,0],
svgs=[
'<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>',
'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>',
'<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>'
].map(el=>`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">${el}</svg>`),
inTr=(ar)=>ar.reduce((a,b)=>`${a}<td>${b}</td>`,'<tr>')+'</tr>',inTrArr=(str,ar)=>str+inTr(ar),
page1=()=>{
  beforebegin(`<table id='table' class='fixed-top h-100 m-0 table table-light h4 text-center'></table>`)
  table.innerHTML=arr.reduce(inTrArr,'')
  table.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>{funClick(i,page2);tr_click=tr})
},
page2=(ar,index)=>{
  [
    ()=>{start(ar[0]);ar=ar[1];append[0](ar.reduce((str,arr)=>str+append[1](arr),''));allTime()},
    ()=>{
      start(localStorage.lastRest.split(',').concat(ar));T.querySelectorAll('a').forEach(a=>a.classList.add('invisible'))
      select.addEventListener('change',()=>{for(let i=0;i<2;i++)T.querySelector(`a:nth-child(${i+1})`).classList.remove('invisible')},{once:true})
    }
  ][index]()
  pushState(2)
  T.querySelectorAll('a').forEach((a,i)=>a.onclick=clickHead[i])
  T.querySelector('input').oninput=function(){if(this.value.length>30)this.value=this.value.slice(0,30)}
  T.querySelectorAll('.d-flex:nth-child(1n+2)').forEach((el,i)=>el.onclick=()=>clickCaption(el,i))
  select.onchange=()=>{append[0](append[1]([select.value].concat(localStorage.lastDrill.split(','))));allTime()}
},
allTime=()=>{
  let sum=0,list=T.querySelectorAll('span'),size=list.length;
  if(size===4){
    select.addEventListener('change',()=>T.querySelector('a:nth-child(2)').classList.remove('invisible'),{once:true})
    list[0].textContent='00:00';T.querySelector('a:nth-child(2)').classList.add('invisible');return
  }
  sum+=inSec(list[1]);sum+=inSec(list[3]);sum+=inSec(list[2])*((size-4)/4-1);
  for(let i=4;i<size;i++){
    let ar=[+list[i].textContent,inSec(list[++i]),inSec(list[++i])];sum+=(ar[0]>1)?ar[0]*ar[1]+(ar[0]-1)*ar[2]:ar[1]+ar[2];++i
  }
  list[0].textContent=inTime(sum)
},
append=[
  (str)=>{tbody.innerHTML+=str;numbers();tbody.querySelectorAll('tr').forEach(tr=>tr.onclick=clickTr)},
  (ar)=>`<tr data-id='${ar[0]}'><td class='small shadow table-secondary'></td><td class='shadow-sm'>${select.querySelector(`[value='${ar[0]}']`).textContent}<div style='min-width:75vw' class='d-flex justify-content-around'><span class='badge badge-warning'>${ar[1]}</span><span class='badge badge-success'>${ar[2]}</span><span class='badge badge-danger'>${ar[3]}</span><div class='col-4 text-right overflow-hidden'><span class='badge badge-info'>${ar[4]||''}</span></div></div></td></tr>`
],
clickCaption=(elem,i)=>{
  let[n,span]=elem.children;
  beforebegin(`<table id='T3' class='fixed-top h-100 table table-light text-center'><tr><th colspan='3'>${n.textContent}</th></tr><tr><td class='h3 shadow-sm'>${time_str}:${time_str}</td></tr></table>`)
  pushState(3)
  let selects=T3.querySelectorAll('select'),data=span.textContent;data.split(':').forEach((el,i)=>selects[i].value=el)
  funBack(()=>{
    n=`${selects[0].value}:${selects[1].value}`;if(n!==data){span.textContent=n;allTime()}
    data=localStorage.lastRest.split(',');if(data[i]!==n){data[i]=n;localStorage.lastRest=data}
  })
},
clickNum=(td,tr)=>{
  let active=T.querySelector('td:first-child:not(.shadow)');if(active)touch[3](active,active.parentNode)
  td.className='small';td.innerText='*';tr.addEventListener('touchstart',touch[0]);tr.addEventListener('touchend',touch[1])
},
clickTr=(elem)=>{
  elem=elem.target;let tr=elem.closest('tr');
  if(elem.matches('.small'))((elem.matches('.shadow'))?clickNum:touch[3])(elem,tr)
  else if(tr.firstChild.textContent!=='*')page3(tr.dataset.id,tr.children[1].firstChild.textContent,tr.querySelectorAll('span'))
},
touch=[
  (e)=>{x[0]=e.changedTouches[0].screenX;y[0]=e.changedTouches[0].screenY},
  (e)=>{x[1]=e.changedTouches[0].screenX;y[1]=e.changedTouches[0].screenY;touch[2](e.target.closest('tr'))},
  (tr)=>{
    x[2]=x[1]-x[0];y[2]=y[1]-y[0];if(x[2]+y[2]===0)return
    if(Math.abs(x[2])>Math.abs(y[2])){if(x[2]>0){tr.remove();numbers()}else{let clone=tr.cloneNode(true);tr.after(clone);touch[3](clone.firstChild,clone);tr.firstChild.innerText='*';clone.onclick=clickTr}allTime()}
    else{if(y[2]>0){tr.nextElementSibling.after(tr)}else{tr.previousElementSibling.before(tr)}numbers();tr.firstChild.innerText='*'}    
  },
  (td,tr)=>{tr.removeEventListener('touchstart',touch[0]);tr.removeEventListener('touchend',touch[1]);td.classList.add('shadow','table-secondary');numbers()}
],
numbers=()=>T.querySelectorAll('td:first-child').forEach((td,i)=>td.textContent=i+1),
start=(arr)=>beforebegin(`<table id='T' class='fixed-top h-100 table table-responsive table-light'><caption class='h-2r d-flex justify-content-around text-center'>${svgs.reduce((str,el)=>`${str}<a class='w-25'>${el}</a>`,'')}</caption><caption class='pb-0 input-group'><input class='form-control text-center' value='${arr[3]}'/><div class='input-group-append'><span class='input-group-text'></span></div></caption>${[['secondary','подготовки'],['danger','отдыха между упражнениями'],['secondary','охлаждения']].reduce((str,ar,i)=>`${str}<caption class='d-flex justify-content-around alert-${ar[0]}'><small>Время ${ar[1]}</small><span>${arr[i]}</span></caption>`,'')}<tbody id='tbody'></tbody><caption class='pt-0 vw-100'><select id='select' class='custom-select'>${select_str}</select></caption></table>`),
page3=(id,name,spans)=>db('img',(links)=>{
  links=links[id]
  let arr=Array.from(spans).map(el=>el.textContent)
  beforebegin(`<table id='T3' class='fixed-top h-100 table table-sm table-responsive table-light text-center'>
    <tr><th class='pb-4 border-bottom' colspan='4'>${name}</th></tr>
    <tr><td>Время работы</td><td class='shadow-sm'>${time_str}:${time_str}</td><td colspan='2' rowspan='2'><input placeholder='Дополнительно' style='max-width:35vw' class='float-right form-control form-control-sm'/></td></tr>
    <tr><td>Время отдыха</td><td class='shadow-sm'>${time_str}:${time_str}</td></tr>
    <tr><td>Повторений</td><td>${arr[0]}</td><td>${inBtn('secondary','-')}</td><td>${inBtn('secondary','+')}</td></tr>
    <tr><td colspan='4' class='p-0 pt-4 border-top'><img src='${links}' class='vw-100'/></td></tr>
  </table>`)
  pushState(3)
  let selects=T3.querySelectorAll('select'),input=T3.querySelector('input'),count=T3.querySelector('tr:nth-child(4) td:nth-child(2)');
  if(arr[3])input.value=arr[3]
  arr[1].split(':').concat(arr[2].split(':')).forEach((el,i)=>selects[i].value=el)
  input.oninput=function(){if(this.value.length>15)this.value=this.value.slice(0,15)}
  T3.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i](count))
  funBack(()=>{
    arr=[count.textContent,`${selects[0].value}:${selects[1].value}`,`${selects[2].value}:${selects[3].value}`,input.value]
    if(arr[0]==='1')arr[2]='00:00';for(let i=0;i<4;i++){if(spans[i].textContent!==arr[i]){spans[i].textContent=arr[i];arr.push(null)}}
    if(arr.length>4){allTime()}localStorage.lastDrill=arr.slice(0,-1)
  })
}),
clicks=[(td)=>{let i=td.textContent-1;if(i>0)td.textContent=i},(td)=>td.textContent-=-1],
clickHead=[
  ()=>{
    let end=()=>{alert(`Сохранена тренировка:\n${arr[0][0]}`);for(let i=0;i<2;i++)tr_click.children[i].innerText=arr[0][i]},
    arr=save();funSave(arr,end)
  },
  ()=>{JS('play',(end)=>JS('calendar-update',[save(),(arr,obj)=>obj.date[Date.now()]=arr,end]));pushState(3)},
  ()=>funTrash(()=>{history.back();tr_click.remove()})
],
save=()=>{
  let arr=Array.from(T.querySelectorAll('tr')).map(tr=>{
    let ar=Array.from(tr.querySelectorAll('span')).map(el=>el.textContent);ar[0]-=0;return[+tr.dataset.id].concat(ar)
  }),
  title=Array.from(T.querySelectorAll('caption span')).map(el=>el.textContent);
  title.unshift(T.querySelector('input').value);return[title,arr]
}
;page1()
db('workout-name',(names)=>db('workout',(arr)=>db('drill',(drill)=>{
  arr=arr.map((ar,i)=>[names[i],ar.map(id=>[drill[id],id]).sort()]).sort();names=null;drill=null;
  select_str=arr.reduce((str,[name,arr])=>`${str}<optgroup label='${name}'>${arr.reduce((s,ar)=>`${s}<option value='${ar[1]}'>${ar[0]}</option>`,'')}</optgroup>`,'<option selected disabled>Добавить</option>')
  arr=null;time_str=`<select class='select-0'>`
  for(let i=0;i<10;i++)time_str+=`<option class='small'>0${i}</option>`
  for(let i=10;i<60;i++)time_str+=`<option class='small'>${i}</option>`
  time_str+='</select>'
})))

}
