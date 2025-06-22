import{JS,db,inBtn,inSec,inTime,beforebegin,pushState}from'./function.js'
export default([arr,funClick,funSave,funTrash])=>{

let select_str,tr_click,x=[0,0],y=[0,0],
inTr=(ar)=>ar.reduce((a,b)=>`${a}<td>${b}</td>`,'<tr>')+'</tr>',inTrArr=(str,ar)=>str+inTr(ar),
page1=()=>{
  beforebegin(`<table id='table' class='fixed-top h-100 m-0 table table-light h4 text-center'></table>`)
  table.innerHTML=arr.reduce(inTrArr,'')
  table.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>{funClick(i,page2);tr_click=tr})
},
page2=(ar,index)=>{
  [
    ()=>{
      start(ar[0]);ar=ar[1];append[0](ar.reduce((str,[id])=>str+append[1](id),''));
      tbody.querySelectorAll('tr').forEach((tr,id)=>tr.querySelectorAll('span').forEach((span,i)=>span.textContent=ar[id][i+1]))
      allTime()
    },
    ()=>{
      start(['01:00','01:00','01:00',ar]);T.querySelectorAll('a').forEach(a=>a.classList.add('invisible'))
      select.addEventListener('change',()=>{for(let i=0;i<2;i++)T.querySelector(`a:nth-child(${i+1})`).classList.remove('invisible')},{once:true})
    }
  ][index]()
  T.querySelectorAll('a').forEach((a,i)=>a.onclick=clickHead[i])
  T.querySelector('input').oninput=function(){if(this.value.length>30)this.value=this.value.slice(0,30)}
  T.querySelectorAll('.d-flex:nth-child(1n+2)').forEach(el=>el.onclick=clickCaption)
  select.onchange=()=>append[0](append[1](select.value))
  pushState(2)
},
allTime=()=>{
  let sum=0,list=T.querySelectorAll('span'),size=list.length;
  if(size===4){
    select.addEventListener('change',()=>T.querySelector('a:nth-child(2)').classList.remove('invisible'),{once:true})
    list[0].textContent='00:00';T.querySelector('a:nth-child(2)').classList.add('invisible');return
  }
  sum+=inSec(list[1]);sum+=inSec(list[3]);sum+=inSec(list[2])*((size-4)/3-1);
  for(let i=4;i<size;i++){
    let ar=[+list[i].textContent,inSec(list[++i]),inSec(list[++i])];sum+=(ar[0]>1)?ar[0]*ar[1]+(ar[0]-1)*ar[2]:ar[1]+ar[2]
  }
  list[0].textContent=inTime(sum)
},
append=[
  (str)=>{tbody.innerHTML+=str;numbers();tbody.querySelectorAll('tr').forEach(tr=>tr.onclick=clickTr)},
  (id)=>`<tr data-id='${id}'><td class='small shadow table-secondary'></td><td class='shadow-sm'>${select.querySelector(`[value='${id}']`).textContent}<div style='min-width:75vw' class='d-flex justify-content-around'><span class='badge badge-warning'>1</span><span class='badge badge-success'>00:00</span><span class='badge badge-danger'>00:00</span></div></td></tr>`
],
clickCaption=function(){
  let[n,span,td]=this.children;
  beforebegin(`<table id='T3' class='fixed-top h-100 table table-light text-center'><tr><th colspan='3'>${n.textContent}</th></tr>${inTr([inBtns('-'),span.textContent,inBtns('+')])}</table>`)
  td=T3.querySelector('td:nth-child(2)');T3.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i+17](td))
  window.addEventListener('popstate',()=>{span.textContent=td.textContent;allTime()},{once:true})
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
svgs=[
'<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>',
'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>',
'<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>'
].map(el=>`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">${el}</svg>`),
start=(arr)=>beforebegin(`<table id='T' class='fixed-top h-100 table table-responsive table-light'><caption class='h-2r d-flex justify-content-around text-center'>${svgs.reduce((str,el)=>`${str}<a class='w-25'>${el}</a>`,'')}</caption><caption class='pb-0 input-group'><input class='form-control text-center' value='${arr[3]}'/><div class='input-group-append'><span class='input-group-text'>03:00</span></div></caption>${[['secondary','подготовки'],['danger','отдыха между упражнениями'],['secondary','охлаждения']].reduce((str,ar,i)=>`${str}<caption class='d-flex justify-content-around alert-${ar[0]}'><small>Время ${ar[1]}</small><span>${arr[i]}</span></caption>`,'')}<tbody id='tbody'></tbody><caption class='pt-0 vw-100'><select id='select' class='custom-select'>${select_str}</select></caption></table>`),
page3=(id,name,spans,tds)=>db('img',(links)=>{
  links=links[id]
  beforebegin(`<table id='T3' class='fixed-top h-100 table table-sm table-responsive table-light text-center'><tr><th colspan='4'>${name}</th></tr>${[['Повторений',inBtn('secondary','-'),spans[0].textContent,inBtn('secondary','+')],['Время',inBtns('-'),spans[1].textContent,inBtns('+')],['Отдых',inBtns('-'),spans[2].textContent,inBtns('+')]].reduce(inTrArr,'')}<tr><td colspan='4' class='p-0'><img src='${links}' style='width:100vw'/></td></tr></table>`)
  T3.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i](tds))
  tds=T3.querySelectorAll('td:nth-child(3)');pushState(3)
  window.addEventListener('popstate',()=>{
    if(tds[0].textContent==='1')tds[2].textContent='00:00';for(let i=0;i<3;i++)spans[i].textContent=tds[i].textContent;allTime()
  },{once:true})
}),
clicks=[
  (tds)=>{let i=tds[0].textContent-1;if(i>0)tds[0].textContent=i},(tds)=>tds[0].textContent-=-1,
  (tds)=>clicks[16](tds[1],10),(tds)=>clicks[16](tds[1],15),(tds)=>clicks[16](tds[1],30),
  (tds)=>clicks[15](tds[1],10),(tds)=>clicks[15](tds[1],15),(tds)=>clicks[15](tds[1],30),
  (tds)=>clicks[16](tds[2],10),(tds)=>clicks[16](tds[2],15),(tds)=>clicks[16](tds[2],30),
  (tds)=>clicks[15](tds[2],10),(tds)=>clicks[15](tds[2],15),(tds)=>clicks[15](tds[2],30),
  (td,n)=>{let sec=inSec(td)-n;if(sec>0)td.textContent=inTime(sec)},//было
  (td,n)=>td.textContent=inTime(inSec(td)+n),
  (td,n)=>{let sec=inSec(td)-n;td.textContent=(sec>0)?inTime(sec):'00:00'},
  (td)=>clicks[16](td,10),(td)=>clicks[16](td,15),(td)=>clicks[16](td,30),
  (td)=>clicks[15](td,10),(td)=>clicks[15](td,15),(td)=>clicks[15](td,30)
],
inBtns=(a)=>[10,15,30].reduce((str,t)=>str+inBtn('secondary',a+t),`<div class='btn-group btn-group-vertical'>`)+'</div>',
clickHead=[
  ()=>{
    let end=()=>{alert(`Сохранена тренировка:\n${arr[0][0]}`);for(let i=0;i<2;i++)tr_click.children[i].innerText=arr[0][i]},
    arr=save();funSave(arr,end)
  },
  ()=>JS('play',(end)=>JS('calendar-update',[save(),(arr,obj)=>obj.date[Date.now()]=arr,end])),
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
db('workout-name',(names)=>db('workout',(obj)=>db('drill',(drill)=>{
  let arr=Object.entries(obj).map(([,ar],i)=>[names[i],ar.map(id=>[drill[id],id]).sort()]).sort();names=null;obj=null;drill=null;
  select_str=arr.reduce((str,[name,arr])=>`${str}<optgroup label='${name}'>${arr.reduce((s,ar)=>`${s}<option value='${ar[1]}'>${ar[0]}</option>`,'')}</optgroup>`,'<option selected disabled>Добавить</option>')
})))

}
