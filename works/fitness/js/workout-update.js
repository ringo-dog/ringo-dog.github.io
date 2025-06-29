
page3=(id,name,spans)=>db('img',(links)=>{
  links=links[id]
  let str=`<select class='select-0'>`
  for(let i=0;i<10;i++)str+=`<option class='small'>0${i}</option>`
  for(let i=10;i<60;i++)str+=`<option class='small'>${i}</option>`
  str+='</select>'
  let arr=Array.from(spans).map(el=>el.textContent)
  beforebegin(`<table id='T3' class='fixed-top h-100 table table-sm table-responsive table-light text-center'>
    <tr><th class='pb-4' colspan='4'>${name}</th></tr>
    <tr><td>Время работы</td><td class='shadow-sm'>${str}:${str}</td><td colspan='2' rowspan='2'><input placeholder='Дополнительно' style='max-width:35vw' class='float-right form-control form-control-sm'/></td></tr>
    <tr><td>Время отдыха</td><td class='shadow-sm'>${str}:${str}</td></tr>
    <tr class='table-secondary'><td>Повторений</td><td>${arr[0]}</td><td>${inBtn('secondary','-')}</td><td>${inBtn('secondary','+')}</td></tr>
    <tr><td colspan='4' class='p-0'><img src='${links}' style='width:100vw'/></td></tr>
  </table>`)
  let selects=T3.querySelectorAll('select'),input=T3.querySelector('input'),count=T3.querySelector('.table-secondary td:nth-child(2)');
  if(arr[3])input.value=arr[3]
  arr[1].split(':').concat(arr[2].split(':')).forEach((el,i)=>selects[i].value=el)
  input.oninput=function(){if(this.value.length>15)this.value=this.value.slice(0,15)}
  pushState(3)
  window.addEventListener('popstate',()=>{
    arr=[count.textContent,`${selects[0].value}:${selects[1].value}`,`${selects[2].value}:${selects[3].value}`,input.value]
    for(let i=0;i<3;i++)spans[i].textContent=arr[i];allTime()
  },{once:true})
})
