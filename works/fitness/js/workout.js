import{T,JS,db,inSec,inTime}from'./function.js'
// import{default as module}from'./workout-update.js'
let arr_main,
inBtn=(c,t)=>`<button class='btn btn-sm btn-${c}'>${t}</button>`,
inTd=(a,b)=>`${a}<td>${b}</td>`,
inTr=(ar)=>ar.reduce(inTd,'<tr>')+'</tr>',
inTrArr=(str,ar)=>str+inTr(ar),
// tableClass=(a,b)=>{T.classList[a]('table-sm','table-responsive');T.classList[b]('h3','text-center')},
tableClass=['h3 text-center','table-sm table-responsive'].map(t=>()=>T.className=`table h-100 m-0 ${t}`),
page1=()=>db('workout-main',(arr)=>{
  T.innerHTML=arr.map(ar=>ar[0].slice(0,2)).concat([['Добавить','']]).reduce(inTrArr,'')
  T.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>page2(i))
  T.querySelector('tr:last-child').onclick=page2
  tableClass[0]();arr_main=arr
}),
page2=(id)=>db('drill',(drill)=>{
  /* стрелки или перетаскивание */
  /* funPlay(caption) */
  /* отдельно отдых между упражнениями */
  /* localstorage.last... */
let
allTime=()=>{
  let sum=0,list=T.querySelectorAll('span'),size=list.length-2;
  for(let i=2;i<size;i++){
    let ar=[+list[i].textContent,inSec(list[++i]),inSec(list[++i])];sum+=(ar[0]>1)?ar[0]*ar[1]+(ar[0]-1)*ar[2]:ar[1]+ar[2]
  }
  sum+=inSec(list[1])+inSec(list[size])+inSec(list[size+1]);list[0].textContent=inTime(sum)
},
append=[
  (str)=>{T.querySelector('.alert-danger').insertAdjacentHTML('beforebegin',str);numbers();T.querySelectorAll('tr').forEach(tr=>tr.onclick=clickTr)},
  (ar)=>`<tr data-id='${ar[0]}'><td class='small'></td><td class='shadow-sm'>${ar[1]}<div style='min-width:75vw' class='d-flex justify-content-around'><span class='badge badge-warning'>1</span><span class='badge badge-success'>00:00</span><span class='badge badge-danger'>00:00</span></div></td></tr>`
],
clicks=[
  (tds)=>{let i=tds[0].textContent-1;if(i>0)tds[0].textContent=i},(tds)=>tds[0].textContent-=-1,
  (tds)=>clicks[14](tds[1],10),(tds)=>clicks[14](tds[1],15),(tds)=>clicks[14](tds[1],30),/* не меньше 10 сек */
  (tds)=>clicks[15](tds[1],10),(tds)=>clicks[15](tds[1],15),(tds)=>clicks[15](tds[1],30),
  (tds)=>clicks[14](tds[2],10),(tds)=>clicks[14](tds[2],15),(tds)=>clicks[14](tds[2],30),
  (tds)=>clicks[15](tds[2],10),(tds)=>clicks[15](tds[2],15),(tds)=>clicks[15](tds[2],30),
  (td,n)=>{let sec=inSec(td)-n;if(sec>0)td.textContent=inTime(sec)},
  (td,n)=>td.textContent=inTime(inSec(td)+n),
  (td,n)=>{let sec=inSec(td)-n;td.textContent=(sec>0)?inTime(sec):'00:00'},
  (td)=>clicks[16](td,10),(td)=>clicks[16](td,15),(td)=>clicks[16](td,30),
  (td)=>clicks[15](td,10),(td)=>clicks[15](td,15),(td)=>clicks[15](td,30)
],
clickTrEnd=(id,name,spans,tds)=>db('img',(links)=>{/* ../X/img/drill/${+id+25}.png */
  // T.insertAdjacentHTML('beforebegin',`<table id='table' class='fixed-top h-100 table table-sm table-responsive table-light text-center'><tr><th><a>назад</a></th></tr><tr><th colspan='4'>${name}</th></tr>${[['Повторений',inBtn('secondary','-'),spans[0].textContent,inBtn('secondary','+')],['Время',inBtns('-'),spans[1].textContent,inBtns('+')],['Отдых',inBtns('-'),spans[2].textContent,inBtns('+')]].reduce(inTrArr,'')}<tr><td colspan='4' class='p-0'><img src='${links[id]}' style='width:100vw'/></td></tr></table>`)
  T.insertAdjacentHTML('beforebegin',`<table id='table' class='fixed-top h-100 table table-sm table-responsive table-light text-center'><tr><th colspan='4'>${name}</th></tr>${[['Повторений',inBtn('secondary','-'),spans[0].textContent,inBtn('secondary','+')],['Время',inBtns('-'),spans[1].textContent,inBtns('+')],['Отдых',inBtns('-'),spans[2].textContent,inBtns('+')]].reduce(inTrArr,'')}<tr><td colspan='4' class='p-0'><img src='${links[id]}' style='width:100vw'/></td></tr></table>`)
  links=null;tds=table.querySelectorAll('td:nth-child(3)');
  history.replaceState(null,null,'#')
  table.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i](tds))
  // table.querySelector('a').onclick=()=>{
  //   if(tds[0].textContent==='1')tds[2].textContent='00:00';for(let i=0;i<3;i++)spans[i].textContent=tds[i].textContent
  //   table.remove();allTime()
  // }
  window.addEventListener('popstate',()=>{
    if(tds[0].textContent==='1')tds[2].textContent='00:00';for(let i=0;i<3;i++)spans[i].textContent=tds[i].textContent
    table.remove();allTime()
    alert(location.pathname)
    return false
  },{once:true})
}),
inBtns=(a)=>[10,15,30].reduce((str,t)=>str+inBtn('secondary',a+t),`<div class='btn-group btn-group-vertical'>`)+'</div>',
numbers=()=>T.querySelectorAll('td:first-child').forEach((td,i)=>td.textContent=i+1),
start=(arr)=>{
  T.innerHTML=[['secondary','подготовки'],['danger','отдыха между упражнениями'],['secondary','охлаждения']].reduce((str,ar,i)=>`${str}<caption class='d-flex justify-content-around alert-${ar[0]}'><small>Время ${ar[1]}</small><span>${arr[i]}</span></caption>`,`<div class="h-2r d-flex justify-content-around"><a>назад</a><a>play</a><a href="../index.html">дом</a></div><caption class='pb-0 input-group input-group-sm'><div class='input-group-prepend'><a class='input-group-text'>save</a></div><input class='form-control text-center' value='${arr[3]}'/><div class='input-group-append'><span class='input-group-text'>03:00</span></div></caption>`)+`<caption class='pt-0 input-group input-group-sm'><select class='custom-select'><option selected disabled>Выбрать</option></select></caption>`
};
tableClass[1]()
if(typeof id==='number'){
  let ar=arr_main[id];start(ar[0].slice(2).concat(ar[0][0]));ar=[drill,ar[1]];
  append[0](ar[1].map(([id])=>[id,ar[0][id]]).reduce((str,ar)=>str+append[1](ar),''));ar=ar[1];
  T.querySelectorAll('tr').forEach((tr,id)=>tr.querySelectorAll('span').forEach((span,i)=>span.textContent=ar[id][i+1]));
  allTime()
}
else{/* save тоже не показывать */
  let playVisible=['add','remove'].map(key=>()=>T.querySelector('a:nth-child(2)').classList[key]('invisible'))
  start(['01:00','01:00','01:00',`Тренировка № ${arr_main.length+1}`]);playVisible[0]()
  setTimeout(()=>select.addEventListener('change',playVisible[1],{once:true}),100)
}
T.querySelector('a').onclick=page1
T.querySelector('a:nth-child(2)').onclick=()=>JS('play')
T.querySelector('a.input-group-text').onclick=()=>{
  let arr=Array.from(T.querySelectorAll('tr')).map(tr=>{
    let ar=Array.from(tr.querySelectorAll('span')).map(el=>el.textContent);ar[0]-=0;return[+tr.dataset.id].concat(ar)
  }),
  title=Array.from(T.querySelectorAll('caption span')).map(el=>el.textContent),name=T.querySelector('input').value;
  title.unshift(name);if(typeof id==='number')arr_main[id]=[title,arr];else arr_main.push([title,arr]);
  localStorage.workoutMain=JSON.stringify(arr_main);alert(`Сохранена тренировка:\n${name}`)
}
let select=T.querySelector('select');
db('workout-name',(names)=>db('workout',(obj)=>{
  select.innerHTML=Object.values(obj).reduce((str,ar,i)=>str+ar.reduce((s,id)=>`${s}<option value='${id}'>${drill[id]}</option>`,`<optgroup label='${names[i]}'>`)+'</optgroup>',select.innerHTML)
}))
select.onchange=()=>append[0](append[1]([select.value,select.querySelector(`[value='${select.value}']`).textContent]))
T.querySelector('input').onfocus=function(){this.select()}
T.querySelector('input').oninput=function(){if(this.value.length>30)this.value=this.value.slice(0,30)}
T.querySelectorAll('caption.d-flex').forEach(el=>el.onclick=clickCaption)
function clickCaption(){
  let[n,span,td]=this.children;
  T.insertAdjacentHTML('beforebegin',`<table id='table' class='fixed-top h-100 table table-light text-center'><tr><th><a>назад</a></th></tr><tr><th colspan='3'>${n.textContent}</th></tr>${inTr([inBtns('-'),span.textContent,inBtns('+')])}</table>`)
  td=table.querySelector('td:nth-child(2)');table.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i+17](td))
  table.querySelector('a').onclick=()=>{span.textContent=td.textContent;table.remove();allTime()}
}
function clickTr(){clickTrEnd(this.dataset.id,this.children[1].firstChild.textContent,this.querySelectorAll('span'))}

})
page1()
