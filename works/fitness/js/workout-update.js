import{JS,db,inBtn,inSec,inTime,beforebegin,pushState}from'./function.js'
export default([arr,funClick,funSave,funTrash])=>{

let select_str,tr_click,x=[0,0],y=[0,0],
inTr=(ar)=>ar.reduce((a,b)=>`${a}<td>${b}</td>`,'<tr>')+'</tr>',inTrArr=(str,ar)=>str+inTr(ar),
// tableClass=['h4 text-center','table-sm table-responsive'].map(t=>()=>T.className=`fixed-top h-100 m-0 table table-light ${t}`),
// inTrArr=(str,ar)=>str+ar.reduce((a,b)=>`${a}<td>${b}</td>`,'<tr>')+'</tr>',inTd=(a,b)=>`${a}<td>${b}</td>`,
// page1=()=>{
//   T.innerHTML=arr.reduce(inTrArr,'')
//   T.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>{funClick(i,page2);tr_click=tr})
//   T.className='fixed-top h-100 m-0 table table-light h4 text-center'
// },
page1=()=>{
  beforebegin(`<table id='table' class='fixed-top h-100 m-0 table table-light h4 text-center'></table>`)
  table.innerHTML=arr.reduce(inTrArr,'')
  table.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>{funClick(i,page2);tr_click=tr})
  // T.querySelector('tr:last-child').onclick=page2
},
page2=(ar,index)=>db('drill',(drill)=>{
  // let trueArr=(ar)=>{
  //   start(ar[0]);ar=[drill,ar[1]];
  //   append[0](ar[1].map(([id])=>[id,ar[0][id]]).reduce((str,ar)=>str+append[1](ar),''));ar=ar[1];
  //   tbody.querySelectorAll('tr').forEach((tr,id)=>tr.querySelectorAll('span').forEach((span,i)=>span.textContent=ar[id][i+1]))
  //   allTime()
  // }
  // /* заменить на выбор функции до page2 */if(ar)trueArr(ar)
  [
    ()=>{
      start(ar[0]);ar=[drill,ar[1]];
      append[0](ar[1].map(([id])=>[id,ar[0][id]]).reduce((str,ar)=>str+append[1](ar),''));ar=ar[1];
      tbody.querySelectorAll('tr').forEach((tr,id)=>tr.querySelectorAll('span').forEach((span,i)=>span.textContent=ar[id][i+1]))
      allTime()
    },
    ()=>{
      start(['01:00','01:00','01:00',ar]);T.querySelectorAll('a').forEach(a=>a.classList['add']('invisible'))
      // let playVisible=['add','remove'].map(key=>()=>T.querySelector('a:nth-child(2)').classList[key]('invisible'))
      // start(['01:00','01:00','01:00',ar]);playVisible[0]()
      select.addEventListener('change',()=>{for(let i=0;i<2;i++)T.querySelector(`a:nth-child(${i+1})`).classList.remove('invisible')},{once:true})
    }
  ][index]()
  T.querySelectorAll('a').forEach((a,i)=>a.onclick=clickHead[i])
  // ;[save,play,trash].forEach((fun,i)=>T.querySelector(`a:nth-child(${i+1})`).onclick=fun)
  T.querySelector('input').oninput=function(){if(this.value.length>30)this.value=this.value.slice(0,30)}
  T.querySelectorAll('.d-flex:nth-child(1n+2)').forEach(el=>el.onclick=clickCaption)
  if(!select_str)select.addEventListener('click',()=>db('workout-name',(names)=>db('workout',(obj)=>{
    select_str=Object.values(obj).reduce((str,ar,i)=>str+ar.reduce((s,id)=>`${s}<option value='${id}'>${drill[id]}</option>`,`<optgroup label='${names[i]}'>`)+'</optgroup>','<option selected disabled>Выбрать</option>')
    select.innerHTML=select_str
  })),{once:true})
  select.onchange=()=>append[0](append[1]([select.value,select.querySelector(`[value='${select.value}']`).textContent]))
  pushState(2)
}),
allTime=()=>{
  let sum=0,list=T.querySelectorAll('span'),size=list.length;
  for(let i=1;i<4;i++)sum+=inSec(list[i])
  for(let i=4;i<size;i++){
    let ar=[+list[i].textContent,inSec(list[++i]),inSec(list[++i])];sum+=(ar[0]>1)?ar[0]*ar[1]+(ar[0]-1)*ar[2]:ar[1]+ar[2]
  }
  list[0].textContent=inTime(sum)
},
append=[
  (str)=>{tbody.innerHTML+=str;numbers();tbody.querySelectorAll('tr').forEach(tr=>tr.onclick=clickTr)},
  (ar)=>`<tr data-id='${ar[0]}'><td class='small shadow table-secondary'></td><td class='shadow-sm'>${ar[1]}<div style='min-width:75vw' class='d-flex justify-content-around'><span class='badge badge-warning'>1</span><span class='badge badge-success'>00:00</span><span class='badge badge-danger'>00:00</span></div></td></tr>`
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
  (tr)=>{/* ? несколько пикселей для направлений */
    x[2]=x[1]-x[0];y[2]=y[1]-y[0];if(x[2]+y[2]===0)return
    if(Math.abs(x[2])>Math.abs(y[2])){if(x[2]>0){tr.remove();numbers()}else{let clone=tr.cloneNode(true);tr.after(clone);touch[3](clone.firstChild,clone);tr.firstChild.innerText='*';clone.onclick=clickTr}allTime()}
    else{if(y[2]>0){tr.nextElementSibling.after(tr)}else{tr.previousElementSibling.before(tr)}numbers();tr.firstChild.innerText='*'}    
  },
  (td,tr)=>{tr.removeEventListener('touchstart',touch[0]);tr.removeEventListener('touchend',touch[1]);td.classList.add('shadow','table-secondary');numbers()}
],
numbers=()=>T.querySelectorAll('td:first-child').forEach((td,i)=>td.textContent=i+1),
start=(arr)=>beforebegin(`<table id='T' class='fixed-top h-100 table table-responsive table-light'><caption class='h-2r d-flex justify-content-around text-center'>${['save','play','trash'].reduce((str,el)=>`${str}<a class='w-25'>${el}</a>`,'')}</caption><caption class='pb-0 input-group'><input class='form-control text-center' value='${arr[3]}'/><div class='input-group-append'><span class='input-group-text'>03:00</span></div></caption>${[['secondary','подготовки'],['danger','отдыха между упражнениями'],['secondary','охлаждения']].reduce((str,ar,i)=>`${str}<caption class='d-flex justify-content-around alert-${ar[0]}'><small>Время ${ar[1]}</small><span>${arr[i]}</span></caption>`,'')}<tbody id='tbody'></tbody><caption class='pt-0 vw-100'><select id='select' class='custom-select'>${select_str}</select></caption></table>`),
page3=(id,name,spans,tds)=>db('img',(links)=>{
  /* links=`../X/img/drill/${+id+25}.png` */
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
  ()=>JS('play',()=>JS('calendar-update',[save(),(arr,obj)=>obj.date[Date.now()]=arr])),
  ()=>funTrash(()=>{history.back();tr_click.remove()})
],
save=()=>{
  let arr=Array.from(T.querySelectorAll('tr')).map(tr=>{
    let ar=Array.from(tr.querySelectorAll('span')).map(el=>el.textContent);ar[0]-=0;return[+tr.dataset.id].concat(ar)
  }),
  title=Array.from(T.querySelectorAll('caption span')).map(el=>el.textContent);
  title.unshift(T.querySelector('input').value);return[title,arr]
}
;
page1()

/* if(!localStorage.lastDrill)localStorage.lastDrill='[1,"00:30","00:00",9]'*/
  }
