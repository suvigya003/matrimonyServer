const express=require('express');
const app=express();
const cors= require('cors');
const dotenv = require('dotenv');
const { request, response } = require('express');
dotenv.config();

const dbService=require('./configs/dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//create
app.post('/insert',(request,response)=>{
const {name}=request.body;
const db=dbService.getDbServiceInstance();

const result =db.insertNewName(name);
result.then(data=>response.json({success:true}))
.catch(err=>console.log(err))
});

//read
app.get('/getAll',(request,response)=>{
const db=dbService.getDbServiceInstance();
    
const result=db.getAllData();

result.
then(data=>response.json({data:data}))
.catch(err=>console.log(err));
})

//update
//not changing whole data but a portion so just patch
app.patch('/update',(request,response)=>{
    const { id,name}=request.body;
    const db=dbService.getDbServiceInstance();

    const result=db.editRowById(id,name);

result.
then(data=>response.json({success:data}))
.catch(err=>console.log(err));
})

//delete
app.delete('/delete/:id',(request,response)=>{
    const{id}=request.params;
    const db=dbService.getDbServiceInstance();
    const result=db.deleteRowById(id);

result.
then(data=>response.json({success:data}))
.catch(err=>console.log(err));
})

app.listen(process.env.PORT,()=>console.log('app is runing'));