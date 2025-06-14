import{JS,db,windowBack}from'./function.js'

let id_click,
click=(id,fun)=>db('workout-main',(arr)=>{
  let ar=arr[id]
  if(ar){fun([ar[0].slice(2).concat(ar[0][0]),ar[1]],0);id_click=id}else{fun(`Тренировка № ${arr.length+1}`,1);id_click=null}
}),
// play=(arr,obj)=>obj.date[Date.now()]=arr,
remove=(end)=>db('workout-main',(arr)=>{delete arr[id_click];JS('write',['workoutMain',arr,end])}),
update=(ar,end)=>db('workout-main',(arr)=>{
  (typeof id_click==='number')?arr[id_click]=ar:arr.push(ar);JS('write',['workoutMain',arr,end])
})
;
db('workout-main',(arr)=>{
  arr=arr.map(ar=>ar[0].slice(0,2)).concat([['Добавить','']])
  JS('workout-update',[arr,click,update,remove])
})
windowBack()
