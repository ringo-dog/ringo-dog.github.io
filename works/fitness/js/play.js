import{T,db,inSec,inTime}from'./function.js'
export default()=>db('img',(links)=>{
/* img меньше высота или весь экран */
T.insertAdjacentHTML('beforebegin',`<table id='table' class='fixed-top h-100 table table-responsive table-dark text-center overflow-hidden'><tr><th id='title' colspan='3'></th></tr><tr><td colspan='3' class='p-0'><img class='img-play'/></td></tr><tr><td id='timer' colspan='3' class='h2 p-3'></td></tr><tr><td colspan='3' class='p-0'><img class='img-play'/></td></tr><tr><td class='shadow-sm'><a>Назад</a></td><td class='shadow-sm'><a>Пауза</a></td><td class='shadow-sm'><a>Дальше</a></td></tr></table>`)
let next,ar,interval,time,
arr=Array.from(T.querySelectorAll('tr')).map(tr=>Array.from(tr.querySelectorAll('span')).map(el=>el.textContent).concat(tr.children[1].firstChild.textContent,tr.dataset.id)),
imgs=table.querySelectorAll('img'),
pauses=['Подготовка','Отдых между упражнениями','Охлаждение'].map((el,i)=>[el,T.querySelectorAll(`caption.d-flex span`)[i].textContent]),
pause=pauses.shift(),
utterance=new SpeechSynthesisUtterance(),
clear=()=>clearInterval(interval),
end=()=>{
  let fun=()=>{synthVoice('Тренировка закончена');clear();table.remove()};
  pause=pauses.shift();if(pause[1]==='00:00'){fun()}else{rest[2](pause);next=fun}
},
funImg=()=>imgs[1].src=links[ar[4]],
minus=()=>{time--;(time===0)?next():timer.textContent=inTime(time)},
noneAdd=(el)=>el.classList.add('d-none'),
noneRemove=(el)=>el.classList.remove('d-none'),
route=()=>(pause[1]==='00:00')?work():rest[1](),
show=(ar)=>{
  noneAdd(imgs[ar[2]].closest('tr'));noneRemove(imgs[ar[3]].closest('tr'));
  timer.textContent=ar[1];title.textContent=ar[0];time=inSec(timer);
  clear();interval=setInterval(minus,1000);synthVoice(ar[0])
},
synthVoice=(text)=>{utterance.text=text;window.speechSynthesis.speak(utterance)},
rest=[
  ()=>{next=(ar[0]===0)?route:work;(ar[2]==='00:00')?next():rest[2](['Отдых между подходами',ar[2]])},
  ()=>{rest[2](pause);next=(ar)?work:end},
  (ar)=>show(ar.concat(0,1))
],
work=()=>{/* if(ar[1]) */
  imgs[0].src=imgs[1].src;show([ar[3],ar[1],1,0]);ar[0]--;
  if(ar[0]===0){ar=arr.shift();if(!ar){next=end;imgs[1].src='./img/plus.png'}else{next=route;funImg()}}else{next=rest[0];funImg()}
};
[()=>{clear();table.remove()},()=>alert('Пауза'),()=>next()].forEach((fun,i)=>table.querySelectorAll('a')[i].parentNode.onclick=fun)
links=arr.map(ar=>links[ar[4]])
utterance.lang='ru';utterance.volume=0.8;utterance.rate=0.8;utterance.pitch=0.8;
// synthVoice=(text)=>alert(text);funImg=()=>imgs[1].src=`../X/img/drill/${+ar[4]+25}.png`
ar=arr.shift();route();pause=pauses.shift();funImg()

})
