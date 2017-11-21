const express = require( "express" );

const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );


const userRouter = require( "./user" );
const model = require( "./model" );
const Chat = model.getModel( "chat" );

const PORT = 8080;
const app  = express();

// socket with express
const App = require( "http" ).Server( app );
const io = require( "socket.io" )( App );

io.on( "connection", function ( socket ) {
    console.log( "user login" );
    socket.on( "sendmsg", function ( data ) {
        
        console.log( "sendmsg", data );

        const { from, to, msg } = data;

        const chatid = [ from, to ].sort().join( "_" );

        // let chatModel = new Chat( { chatid, from, to, content: msg } );
        // chatModel.save(function ( error, doc ) {
        //      console.log( doc._doc );
        //     if ( !error ) {
        //         io.emit( 'receivemsg', Object.assign( {}, doc._doc ))
        //     } 
        // })
        
        // or
        Chat.create({ chatid, from, to, content: msg }, function( error, doc ){
            console.log( doc._doc );
            io.emit( 'receivemsg', Object.assign( {}, doc._doc ))
        })
    })
})

app.use( function ( request, response, next ) {
	console.log( "+ new log ==========================" )
	console.log( "The request type is " + request.method + "; request url is " + request.originalUrl );
	next();
});



app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( "/user", userRouter );



const server = App.listen( PORT, "localhost", function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log( "The server is listening at http://%s:%s", host, port );
});