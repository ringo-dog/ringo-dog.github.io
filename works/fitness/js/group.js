import{T,back,db,inBtn,none}from'./function.js'

let select_str,
clicks=[,
  (tr)=>db('img',(links)=>{
    T.insertAdjacentHTML('beforebegin',`<table class='fixed-top h-100 table table-light text-center'><tr><th>${tr.textContent}</th></tr><tr><td class='px-0'><img src='${links[+tr.dataset.id]}' style='width:100vw'/></td></tr></table>`)
    back(()=>T.previousElementSibling.remove())
  }),
  (tr,arr,id)=>{none.add(tr);arr[id][1].push([+tr.dataset.id,1,'00:00','00:00']);localStorage.workoutMain=JSON.stringify(arr)}
],
tdOne=(a,b)=>`${a}<tr><td>${b}</td></tr>`,
tdOneId=(a,ar)=>`${a}<tr data-id='${ar[0]}'><td>${ar[1]}</td></tr>`,
page1=()=>db('workout-name',(arr)=>{
  T.innerHTML=arr.reduce(tdOne,'');arr=null
  T.querySelectorAll('tr').forEach((tr,i)=>tr.onclick=()=>page2(tr.textContent,i))
}),
page2=(name,index)=>db('drill',(arr)=>db('workout',(obj)=>{
  arr=Object.values(obj)[index].map(id=>[id,arr[id]]);obj=null
  T.insertAdjacentHTML('beforebegin',`<table id='table' class='fixed-top h-100 table table-responsive table-light'><tr><th class='vw-100 text-center'>${name}</th></tr>${arr.reduce(tdOneId,select_str)}<tr></table>`)
  arr=null;clicks[0]=clicks[1]
  table.querySelector('.btn').onclick=()=>{
    table.querySelector('.btn').classList.add('active');clicks[0]=clicks[1];table.querySelectorAll('tr.d-none').forEach(none.remove)
  }
  select.onchange=()=>db('workout-main',(arr)=>{
    table.querySelector('.btn').classList.remove('active');let id=+select.value;clicks[0]=(tr)=>clicks[2](tr,arr,id)
  })
  table.querySelectorAll('tr[data-id]').forEach(tr=>tr.onclick=()=>clicks[0](tr))
  back(()=>T.previousElementSibling.remove())
}))
db('workout-main',(arr)=>{
  select_str=arr.reduce((str,[[name]],i)=>`${str}<option value='${i}'>${name}</option>`,`<caption class='pt-0 input-group'><div class='w-50 input-group-prepend'>${inBtn('outline-secondary w-100 active','Посмотреть')}</div><select id='select' class='custom-select'><option selected disabled>Добавить в тренировку</option>`)+'</select></caption>';page1()
})
