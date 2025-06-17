export default([key,obj,end])=>{localStorage[key]=JSON.stringify(obj);if(end)end()}
