const express = require( "express" );

const Router = express.Router();

Router.get( "/info", function ( request, response ) {
    return response.json({
        code: 1
    })
});
module.exports = Router;
