let obj;try{obj=JSON.parse(localStorage.calendar)}catch{obj={date:{},drill:[],name:[],rest:[]}}export default obj
// export default(()=>{try{return JSON.parse(localStorage.calendar)}catch{return{date:[],drill:[],name:[],rest:[]}}})()
