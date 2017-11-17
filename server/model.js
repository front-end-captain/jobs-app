const mongoose = require( "mongoose" );


const DB_URL = "mongodb://localhost:27017/data/db/job";
mongoose.connect( DB_URL );

const connection = mongoose.connection;
connection.on( "connected", function () {
    console.log( "mongodb is connected" );
});
connection.on( "error", function () {
    console.log( "connected has an error" );
});