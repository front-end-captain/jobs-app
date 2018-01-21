const path = require( "path" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );


import React, { Component } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./../src/reducers"
import { compose } from "redux";
import { StaticRouter }  from "react-router-dom";
import csshook from 'css-modules-require-hook/preset';
import assetHook from "asset-require-hook";
assetHook({
    extensions: ['png']
});
import App from "./../src/app";
import staticPath from "./../build/asset-manifest.json";


const userRouter = require( "./user" );
const model = require( "./model" );
const Chat = model.getModel( "chat" );


const PORT = 8000;
const app  = express();
  

// socket with express
const ServerApp = require( "http" ).Server( app );
const io = require( "socket.io" )( ServerApp );

io.on( "connection", function ( socket ) {
    console.log( "user login" );
    socket.on( "sendmsg", function ( data ) {
        
        console.log( "sendmsg", data );

        const { from, to, msg } = data;

        const chatid = [ from, to ].sort().join( "_" );

        // or
        Chat.create({ chatid, from, to, content: msg }, function( error, doc ){
            console.log( doc._doc );
            io.emit( 'receivemsg', Object.assign( {}, doc._doc ))
        })
    })
})

app.use( function ( request, response, next ) {
	console.log( "The request type is " + request.method + "; request url is " + request.originalUrl );
	next();
});



app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( "/user", userRouter );

// 拦截路由 设置白名单
app.use( function ( request, response, next ) {
    if ( request.url.startsWith( "/user/" ) || request.url.startsWith( "/static/" ) ) {
        return next();
    } else {
        const context = {};

        const store = createStore( reducer, compose(
            applyMiddleware( thunk ) 
        ));

        response.write( `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link rel="stylesheet" href="/${ staticPath['main.css'] }">
            </head>
            <body>
                <div id='root'>
        `);
        
        // 以流的形式返回数据
        const MarkupStream = renderToNodeStream(
            (<Provider store={store}>
                <StaticRouter
                    location={ request.url }
                    context={ context }
                >
                    <App />
                </StaticRouter>
            </Provider>)
        );

        MarkupStream.pipe( response, { end: false } );
        MarkupStream.on( "end", function () {
            response.write( `
                    </div>
                    <script src="/${ staticPath['main.js'] }"></script>
                </body>
                </html>
            ` );
            response.end();
        });
        
    }
});

// 设置静态资源目录
app.use( "/static", express.static( path.resolve( "./build/static/" ) ) );


const server = ServerApp.listen( PORT, "localhost", function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log( "The server is listening at http://%s:%s", host, port );
});