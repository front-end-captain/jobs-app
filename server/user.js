
const express = require( "express" );
const utility = require( "utility" );

const Router = express.Router();

const model = require( "./model" );
const User = model.getModel( "user" );

// 测试 用例 
Router.get( "/list", function ( request, response ) {
    User.find({}, function ( error, doc ) {
        return response.json( doc );
    });
});


// 注册
Router.post( "/register", function ( request, response ) {
    console.log( request.body );
    const { user, pwd, type } = request.body;
    User.findOne( { user: user }, function ( error, doc ) {

        // 判断用户名是否存在 防止重复注册
        if ( doc ) {
            return response.json( { code: 1, msg: "用户名重复" } );
        }

        // 用户信息入库
        User.create( { user, pwd: md5Pwd( pwd ), type }, function ( error, doc ) {
            if ( error ) {
                return response.json( { code: 1, msg: "数据存储出错" } );
            } else {
                return response.json( { code: 0 } );
            }
        });
    })
});

// 测试 用例
Router.get( "/info", function ( request, response ) {
    return response.json({
        code: 1
    })
});

function md5Pwd ( pwd ) {
    const slat = "job_1994yxl!@#CAPTAIN";
    return utility.md5( utility.md5( pwd + slat) );
}
module.exports = Router;
