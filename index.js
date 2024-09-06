const express= require('express')
const mongoose= require('mongoose');
const Service= require('./models/service.js');
const serviceRoute = require("./routes/services.route.js");
const userRoute=require("./routes/user.route.js");
const authRoute=require("./routes/auth.route.js");
const requestRoute=require("./routes/request.route.js");
const Grid = require('gridfs-stream');



//middleware
const app= express()
app.use(express.json());


// routes
app.use("/api/services", serviceRoute)
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/request",requestRoute);
const { connectDB, gfs } = require('./database/db.js'); 

connectDB();
app.listen(3001,()=>{
    console.log('Server is running on port 3001');
});
app.get('/',(req, res)=>{
    
    res.send("Hello from Node API created by Hira Kauchha");

});
