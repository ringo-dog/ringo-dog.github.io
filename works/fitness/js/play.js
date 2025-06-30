import{beforebegin,db,inSec,inTime,none}from'./function.js'
export default(funEnd)=>db('img',(links)=>{

beforebegin(`<table id='T3' class='fixed-top h-100 table table-responsive table-dark text-center overflow-hidden'><tr><th id='title' colspan='3'></th></tr><tr><td colspan='3' class='p-0'><img class='vw-100'/></td></tr><tr><td id='timer' colspan='3' class='h2 p-3'></td></tr><tr><td colspan='3' class='p-0'><img class='vw-100'/></td></tr><tr>${['<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>','<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>'].map(el=>`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">${el}</svg>`).concat('Дальше').reduce((str,el)=>`${str}<td class='w-50 shadow-sm'>${el}</td>`,'')}</tr></table>`)
let next,ar,interval,time,timeout,
arr=Array.from(T.querySelectorAll('tr')).map(tr=>Array.from(tr.querySelectorAll('span')).map(el=>el.textContent).concat(tr.children[1].firstChild.textContent,tr.dataset.id)),
imgs=T3.querySelectorAll('img'),
pauses=['Подготовка','Отдых между упражнениями','Охлаждение'].map((el,i)=>[el,T.querySelectorAll(`caption.d-flex span`)[i].textContent]),
pause=pauses.shift(),
utterance=new SpeechSynthesisUtterance(),
clear=()=>{clearInterval(interval);clearTimeout(timeout)},
end=()=>{
  let fun=()=>funEnd(()=>{synthVoice('Тренировка закончена');history.back()})
  pause=pauses.shift();if(pause[1]==='00:00'){fun()}else{rest[2](pause);next=fun}
},
funImg=()=>imgs[1].src=ar[5],
funTimeout=()=>{setTimeout(timeout,2000);setTimeout(timeout,1000);timeout()},
minus=()=>{time--;(time===0)?next():timer.textContent=inTime(time)},
route=()=>(pause[1]==='00:00')?work[0]():rest[1](),
show=(ar)=>{
  none.add(imgs[ar[2]].closest('tr'));none.remove(imgs[ar[3]].closest('tr'));
  timer.textContent=ar[1];title.textContent=ar[0];time=inSec(timer);
  clear();if(T3.querySelector('td.shadow-sm:first-child.d-none')){interval=setInterval(minus,1000)}synthVoice(ar[0])
},
synthVoice=(text)=>{utterance.text=text;window.speechSynthesis.speak(utterance)},
rest=[
  ()=>{next=(ar[0]===0)?route:work[0];(ar[2]==='00:00')?next():rest[2](['Отдых между подходами',ar[2]])},
  ()=>{rest[2](pause);next=(ar)?work[0]:end},
  (ar)=>{show(ar.concat(0,1));timeout=()=>synthVoice(time),sec=time-3;setTimeout(funTimeout,sec*1000)}
],
work=[
  ()=>{
    if(ar[1]==='00:00'){work[1]();next();return}
    imgs[0].src=imgs[1].src;show([ar[4],ar[1],1,0]);ar[0]--;if(ar[0]===0){work[1]()}else{next=rest[0];funImg()}
  },
  ()=>{ar=arr.shift();if(ar){next=route;funImg()}else{next=end;imgs[1].src=links}}
];
[
  function(){minus();interval=setInterval(minus,1000);none.add(this);none.remove(this.nextSibling)},
  function(){clear();none.add(this);none.remove(this.previousSibling)},
  ()=>next()
].forEach((fun,i)=>T3.querySelector(`td.shadow-sm:nth-child(${i+1})`).onclick=fun)
none.add(T3.querySelector('td.shadow-sm'))
arr.forEach(ar=>ar[5]=links[ar[5]]);links=links[0]
utterance.lang='ru';utterance.volume=1;utterance.rate=1.1;utterance.pitch=0.4;
ar=arr.shift();funImg();route();pause=pauses.shift()
window.addEventListener('popstate',clear,{once:true})

})
