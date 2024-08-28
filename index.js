const express= require('express')
const mongoose= require('mongoose');
const Service= require('./models/service.js');
const app= express()
app.use(express.json());

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
});
app.get('/',(req, res)=>{
    res.send("Hello from Node API created by Hira Kauchha");

});
app.get('/api/service',async(req, res)=>{
    try {
     const service=await Service.find({});
     res.status(200).json(service);
     
    } catch (error) {
     res.status(500).json({message:error.message}); 
     
    }
 
 });
 app.get('/api/service/:id',async(req,res)=>{
    try {
        const { id }=req.params;
        const service=await Service.findById(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({message:error.message}); 
        
    }
 })
app.post('/api/service',async(req, res)=>{
    console.log(req.body)
    try{
        
        const service=await Service.create(req.body);
        res.status(200).json(service);
    }
    catch(error){
        res.status(500).json({message: error.message});


    }

});

app.put('/api/service/:id',async(req, res)=>{
    try{
        const { id }=req.params;
        const service=await Service.findByIdAndUpdate(id,req.body);
        if(!service){
            return res.status(404).json({message:"Service not found"});
        }
        const updateservice = await Service.findById(id);
        res.status(200).json(updateservice);
    }
    catch(error){
        res.status(500).json({message: error.message});


    }

});

mongoose.connect("mongodb+srv://hirakauchha1234:kju5n8Vmhc2ydXen@justfixbackenddb.vezsaoj.mongodb.net/JustFix-API?retryWrites=true&w=majority&appName=JustFixBackendDB") 
.then(()=>{
    console.log("Connected to Database!");
})
.catch(()=>{
    console.log("Connection Failed");
})