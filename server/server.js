const express = require( "express" );

const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const userRouter = require( "./user" );

const PORT = 8080;
const app  = express();

app.use( function ( request, response, next ) {
	console.log( "+ new log ==========================" )
	console.log( "The request type is " + request.method + "; request url is " + request.originalUrl );
	next();
});

app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( "/user", userRouter );




const server = app.listen( PORT, "localhost", function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log( "The server is listening at http://%s:%s", host, port );
});