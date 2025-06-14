export default([key,obj,end])=>{/* alert(JSON.stringify(obj));end();return; */localStorage[key]=JSON.stringify(obj);if(end)end()}
