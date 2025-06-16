import{beforebegin,db,inSec,inTime,none}from'./function.js'
export default(funEnd)=>db('img',(links)=>{

beforebegin(`<table id='T3' class='fixed-top h-100 table table-responsive table-dark text-center overflow-hidden'><tr><th id='title' colspan='3'></th></tr><tr><td colspan='3' class='p-0'><img class='vw-100'/></td></tr><tr><td id='timer' colspan='3' class='h2 p-3'></td></tr><tr><td colspan='3' class='p-0'><img class='vw-100'/></td></tr><tr><td class='shadow-sm'><a>Пауза</a></td><td class='shadow-sm'><a>Дальше</a></td></tr></table>`)
let next,ar,interval,time,
arr=Array.from(T.querySelectorAll('tr')).map(tr=>Array.from(tr.querySelectorAll('span')).map(el=>el.textContent).concat(tr.children[1].firstChild.textContent,tr.dataset.id)),
imgs=T3.querySelectorAll('img'),
pauses=['Подготовка','Отдых между упражнениями','Охлаждение'].map((el,i)=>[el,T.querySelectorAll(`caption.d-flex span`)[i].textContent]),
pause=pauses.shift(),
utterance=new SpeechSynthesisUtterance(),
clear=()=>clearInterval(interval),
end=()=>{
  let fun=()=>{funEnd();synthVoice('Тренировка закончена');history.back()};
  pause=pauses.shift();if(pause[1]==='00:00'){fun()}else{rest[2](pause);next=fun}
},
funImg=()=>imgs[1].src=ar[4],
minus=()=>{time--;(time===0)?next():timer.textContent=inTime(time)},
route=()=>(pause[1]==='00:00')?work[0]():rest[1](),
show=(ar)=>{
  none.add(imgs[ar[2]].closest('tr'));none.remove(imgs[ar[3]].closest('tr'));
  timer.textContent=ar[1];title.textContent=ar[0];time=inSec(timer);
  clear();interval=setInterval(minus,1000);synthVoice(ar[0])
},
synthVoice=(text)=>{utterance.text=text;window.speechSynthesis.speak(utterance)},
rest=[
  ()=>{next=(ar[0]===0)?route:work[0];(ar[2]==='00:00')?next():rest[2](['Отдых между подходами',ar[2]])},
  ()=>{rest[2](pause);next=(ar)?work[0]:end},
  (ar)=>show(ar.concat(0,1))
],
work=[
  ()=>{
    if(ar[1]==='00:00'){work[1]();next();return}
    imgs[0].src=imgs[1].src;show([ar[3],ar[1],1,0]);ar[0]--;if(ar[0]===0){work[1]()}else{next=rest[0];funImg()}
  },
  ()=>{ar=arr.shift();if(ar){next=route;funImg()}else{next=end;imgs[1].src=links}}
];
[()=>alert('Пауза'),()=>next()].forEach((fun,i)=>T3.querySelectorAll('a')[i].parentNode.onclick=fun)
arr.forEach(ar=>ar[4]=links[ar[4]]);links=links[0]
utterance.lang='ru';utterance.volume=1;utterance.rate=1.3;utterance.pitch=0.5;
// synthVoice=(text)=>alert(text);funImg=()=>imgs[1].src=`../X/img/drill/${+ar[4]+25}.png`
ar=arr.shift();route();pause=pauses.shift();funImg()
window.addEventListener('popstate',clear,{once:true})
// work=()=>{
//   imgs[0].src=imgs[1].src;show([ar[3],ar[1],1,0]);ar[0]--;
//   if(ar[0]===0){ar=arr.shift();if(!ar){next=end;imgs[1].src=links}else{next=route;funImg()}}else{next=rest[0];funImg()}
// };

})
