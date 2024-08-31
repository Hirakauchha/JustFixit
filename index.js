const express= require('express')
const mongoose= require('mongoose');
const Service= require('./models/service.js');
const serviceRoute = require("./routes/services.route.js");
const authRoute=require("./routes/auth.route.js");
//middleware
const app= express()
app.use(express.json());

// routes
app.use("/api/services", serviceRoute)
app.use("/api/auth",authRoute)

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
});
app.get('/',(req, res)=>{
    res.send("Hello from Node API created by Hira Kauchha");

});
mongoose.connect("mongodb+srv://hirakauchha1234:kju5n8Vmhc2ydXen@justfixbackenddb.vezsaoj.mongodb.net/JustFix-API?retryWrites=true&w=majority&appName=JustFixBackendDB") 
.then(()=>{
    console.log("Connected to Database!");
})
.catch(()=>{
    console.log("Connection Failed");
})