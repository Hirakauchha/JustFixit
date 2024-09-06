const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// MongoDB connection string
const mongoURI = "mongodb+srv://hirakauchha1234:kju5n8Vmhc2ydXen@justfixbackenddb.vezsaoj.mongodb.net/JustFix-API?retryWrites=true&w=majority&appName=JustFixBackendDB";

// Initialize GridFS variable
let gfs;

// Mongoose connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        
        console.log("Connected to Database!");

        // Initialize GridFS once connection is open
        

    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
};
// mongoose.connection.once('open', () => {
//     const gfs = Grid(mongoose.connection.db, mongoose.mongo);
//     gfs.collection('uploads'); 

// });

// Export the connection and gfs for file operations
module.exports = { connectDB, gfs,mongoURI }
