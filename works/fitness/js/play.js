export default()=>{

T[3].innerHTML=`<tr><th id='title' colspan='2'></th></tr><tr><td colspan='2' class='p-0'><img style='height:calc(100vh - 11rem)' class='vw-100'/></td></tr><tr><td id='timer' colspan='2' class='h2 p-3'></td></tr><tr><td colspan='2' class='p-0'><img style='height:calc(100vh - 11rem)' class='vw-100'/></td></tr><tr><td><a>Пауза</a></td><td><a>Дальше</a></td></tr>`;
noneAdd(T[2]);noneRemove(T[3]);playVisible.off();
let next,ar,interval,time,
arr=Array.from(T[2].querySelectorAll('tr')).map(tr=>Array.from(tr.querySelectorAll('span')).map(el=>el.textContent).concat(tr.children[1].firstChild.textContent,tr.dataset.id)),
imgs=T[3].querySelectorAll('img'),
pauses=['Подготовка','Отдых между упражнениями','Охлаждение'].map((el,i)=>[el,T[2].querySelectorAll(`caption.d-flex span`)[i].textContent]),
pause=pauses.shift(),
clear=()=>clearInterval(interval),
end=()=>{
  let fun=()=>{clear();noneAdd(T[3]);noneRemove(T[2]);alert('Тренировка закончена')};
  pause=pauses.shift();if(pause[1]==='00:00'){fun()}else{rest[2](pause);next=fun}
},
funImg=()=>imgs[1].src=`./img/drill/${ar[4]}.png`,
minus=()=>{time--;(time===0)?next():timer.textContent=inTime(time)},
route=()=>(pause[1]==='00:00')?work():rest[1](),
show=(ar)=>{
  noneAdd(imgs[ar[2]].closest('tr'));noneRemove(imgs[ar[3]].closest('tr'));
  timer.textContent=ar[1];title.textContent=ar[0];time=inSec(timer);
  clear();interval=setInterval(minus,1000);synthVoice(ar[0])
},
synthVoice=(text)=>{
  let utterance=new SpeechSynthesisUtterance();utterance.text=text;utterance.lang='ru';
  utterance.volume=0.5;utterance.rate=0.5;utterance.pitch=0.5;
  window.speechSynthesis.speak(utterance)
},
rest=[
  ()=>{next=(ar[0]===0)?route:work;(ar[2]==='00:00')?next():rest[2](['Отдых между подходами',ar[2]])},
  ()=>{rest[2](pause);next=(ar)?work:end},
  (ar)=>show(ar.concat(0,1))
],
work=()=>{/* if(ar[1]) */
  imgs[0].src=imgs[1].src;show([ar[3],ar[1],1,0]);ar[0]--;
  if(ar[0]===0){ar=arr.shift();if(!ar){next=end;imgs[1].src='./img/plus.png'}else{next=route;funImg()}}else{next=rest[0];funImg()}
};
[()=>alert('Пауза'),()=>next()].forEach((fun,i)=>T[3].querySelectorAll('a')[i].onclick=fun)
ar=arr.shift();route();pause=pauses.shift();funImg();
setTimeout(()=>main.firstChild.onclick=(elem)=>{
  elem=elem.target;if(!elem.matches('a'))return;clear();if(elem===main.querySelector('a'))playVisible.on()
},0)

funImg=()=>{}
}
