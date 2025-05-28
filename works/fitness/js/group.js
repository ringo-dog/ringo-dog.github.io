import{T,db}from'./function.js'

let tdOne=(a,b)=>`${a}<tr><td>${b}</td></tr>`
db('workout-name',(arr)=>T.innerHTML=arr.reduce(tdOne,''))
