import{JS,db}from'./function.js'
export default([ar,edit,end])=>db('calendar',(obj)=>{

let arr=[],i=obj.name.indexOf(ar[0][0]);
if(i<0){obj.name.push(ar[0][0]);i=obj.name.length-1}arr.push(i)
i=obj.rest.findIndex(arr=>arr.every((el,i)=>el===ar[0][i+1]))
if(i<0){obj.rest.push(ar[0].slice(1));i=obj.rest.length-1}arr.push(i)
ar[1].forEach(a=>{i=obj.drill.findIndex(arr=>arr.every((el,i)=>el===a[i]));if(i<0){obj.drill.push(a);i=obj.drill.length-1}arr.push(i)})
edit(arr,obj)
JS('write',['calendar',obj,end])

})
