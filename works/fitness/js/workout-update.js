export default([arr_main,id])=>db('drill',(drill)=>{
  /* стрелки или перетаскивание */
  /* funPlay(caption) */
  /* отдельно отдых между упражнениями */
let
allTime=()=>{
  let sum=0,list=T[2].querySelectorAll('span'),size=list.length-2;
  for(let i=2;i<size;i++){
    let ar=[+list[i].textContent,inSec(list[++i]),inSec(list[++i])];sum+=(ar[0]>1)?ar[0]*ar[1]+(ar[0]-1)*ar[2]:ar[1]+ar[2]
  }
  sum+=inSec(list[1])+inSec(list[size])+inSec(list[size+1]);list[0].textContent=inTime(sum)
},
append=(arr)=>{
  T[2].querySelector('.alert-danger').insertAdjacentHTML('beforebegin',arr.reduce((str,ar)=>`${str}<tr data-id='${ar[0]}'><td class='small'></td><td class='shadow-sm'>${ar[1]}<div style='min-width:75vw' class='d-flex justify-content-around'><span class='badge badge-warning'>1</span><span class='badge badge-success'>00:00</span><span class='badge badge-danger'>00:00</span></div></td></tr>`,''))
  numbers();T[2].querySelectorAll('tr').forEach(tr=>tr.onclick=clickTr)
},
clicks=[
  (tds)=>{let i=tds[0].textContent-1;if(i>0)tds[0].textContent=i},(tds)=>tds[0].textContent-=-1,
  (tds)=>clicks[14](tds[1],10),(tds)=>clicks[14](tds[1],15),(tds)=>clicks[14](tds[1],30),
  (tds)=>clicks[15](tds[1],10),(tds)=>clicks[15](tds[1],15),(tds)=>clicks[15](tds[1],30),
  (tds)=>clicks[14](tds[2],10),(tds)=>clicks[14](tds[2],15),(tds)=>clicks[14](tds[2],30),
  (tds)=>clicks[15](tds[2],10),(tds)=>clicks[15](tds[2],15),(tds)=>clicks[15](tds[2],30),
  (td,n)=>{let sec=inSec(td)-n;if(sec>0)td.textContent=inTime(sec)},
  (td,n)=>td.textContent=inTime(inSec(td)+n),
  (td,n)=>{let sec=inSec(td)-n;td.textContent=(sec>0)?inTime(sec):'00:00'},
  (td)=>clicks[16](td,10),(td)=>clicks[16](td,15),(td)=>clicks[16](td,30),
  (td)=>clicks[15](td,10),(td)=>clicks[15](td,15),(td)=>clicks[15](td,30)
],
clickTrEnd=(id,name,spans,tds)=>db('img',(links)=>{alert(links[id]
  T[3].innerHTML=`<tr><th colspan='4'>${name}</th></tr>${[['Повторений',inBtn('secondary','-'),spans[0].textContent,inBtn('secondary','+')],['Время',inBtns('-'),spans[1].textContent,inBtns('+')],['Отдых',inBtns('-'),spans[2].textContent,inBtns('+')]].reduce(inTrArr,'')}<tr><td colspan='4' class='p-0'><img src='${links[id]}' style='width:100vw'/></td></tr>`
  links=null;tds=T[3].querySelectorAll('td:nth-child(3)');
  T[3].querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i](tds))
  main.firstChild.onclick=(e)=>{
    if(e.target!==main.querySelector('a'))return
    if(tds[0].textContent==='1')tds[2].textContent='00:00';for(let i=0;i<3;i++)spans[i].textContent=tds[i].textContent;allTime()
  }
}),
inBtns=(a)=>[10,15,30].reduce((str,t)=>str+inBtn('secondary',a+t),`<div class='btn-group btn-group-vertical'>`)+'</div>',
numbers=()=>T[2].querySelectorAll('td:first-child').forEach((td,i)=>td.textContent=i+1),
start=(arr)=>{
  T[2].innerHTML=[['secondary','подготовки'],['danger','отдыха между упражнениями'],['secondary','охлаждения']].reduce((str,ar,i)=>`${str}<caption class='d-flex justify-content-around alert-${ar[0]}'><small>Время ${ar[1]}</small><span>${arr[i]}</span></caption>`,`<caption class='pb-0 input-group input-group-sm'><div class='input-group-prepend'><a class='input-group-text'>save</a></div><input class='form-control text-center' value='${arr[3]}'/><div class='input-group-append'><span class='input-group-text'>03:00</span></div></caption>`)+`<caption class='pt-0 input-group input-group-sm'><select class='custom-select'><option selected disabled>Выбрать</option></select></caption>`
  noneAdd(T[1]);noneRemove(T[2])
};
if(typeof id==='number'){
  let ar=arr_main[id];start(ar[0].slice(2).concat(ar[0][0]));ar=[drill,ar[1]];
  append(ar[1].map(([id])=>[id,ar[0][id]]));ar=ar[1];
  T[2].querySelectorAll('tr').forEach((tr,id)=>tr.querySelectorAll('span').forEach((span,i)=>span.textContent=ar[id][i+1]));
  allTime();playVisible.on()
}
else{
  start(['01:00','01:00','01:00',`Тренировка № ${arr_main.length+1}`]);playVisible.off()
  setTimeout(()=>select.addEventListener('change',playVisible.on,{once:true}),100)
}
let select=T[2].querySelector('select');
db('workout-name',(names)=>{
  let arr=['chest','leg','shoulder','loin','press','arm','back','neck','cheek']
  select.innerHTML=names.reduce((str,el,i)=>`${str}<option value='${arr[i]}' class='h4'>${el}</option>`,select.innerHTML)
})
// select.addEventListener('focus',()=>,{once:true})
select.onchange=()=>db('workout',(obj)=>{
  let arr=obj[select.value].map(id=>[drill[id],id]).sort()
  select.insertAdjacentHTML('beforebegin',`<select size='${arr.length}' class='fixed-top h-100'>${arr.reduce((str,ar)=>`${str}<option value='${ar[1]}' class='h5'>${ar[0]}</option>`,'<option class="h4 text-center badge-dark">Добавить</option>')}</select>`)
  select.previousSibling.onchange=change
})
T[2].querySelectorAll('caption.d-flex').forEach(el=>el.onclick=clickCaption)
T[2].querySelector('a').onclick=()=>{
  let arr=Array.from(T[2].querySelectorAll('tr')).map(tr=>{
    let ar=Array.from(tr.querySelectorAll('span')).map(el=>el.textContent);ar[0]-=0;return[+tr.dataset.id].concat(ar)
  }),
  title=Array.from(T[2].querySelectorAll('caption span')).map(el=>el.textContent),name=T[2].querySelector('input').value;
  title.unshift(name);if(typeof id==='number')arr_main[id]=[title,arr];else arr_main.push([title,arr]);
  localStorage.workoutMain=JSON.stringify(arr_main);alert(`Сохранена тренировка:\n${name}`)
}
T[2].querySelector('input').onfocus=function(){this.select()}
T[2].querySelector('input').oninput=function(){if(this.value.length>30)this.value=this.value.slice(0,30)}
function change(){
  let v=this.value;if(v!=='Добавить')return this.querySelector(`[value="${v}"]`).classList.toggle('badge-primary')
  append(Array.from(this.querySelectorAll('.badge-primary')).map(el=>[el.value,el.textContent]));
  this.remove();select.value=select.firstChild.value
}
function clickCaption(){
  noneAdd(T[2]);let[n,span,td]=this.children;
  T[3].innerHTML=`<tr><th colspan='3'>${n.textContent}</th></tr>${inTr([inBtns('-'),span.textContent,inBtns('+')])}`;
  noneRemove(T[3]);td=T[3].querySelector('td:nth-child(2)');
  T[3].querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>clicks[i+17](td));
  main.firstChild.onclick=(e)=>{if(e.target===main.querySelector('a')){span.textContent=td.textContent;allTime()}}
  // main.firstChild.addEventListener('click',(e)=>{if(e.target===main.querySelector('a')){span.textContent=td.textContent;allTime()}},{once:true})
}
function clickTr(){
  clickTrEnd(this.dataset,this.children[1].firstChild.textContent,this.querySelectorAll('span'))
  noneAdd(T[2]);noneRemove(T[3])
}

})
