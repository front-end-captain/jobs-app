
const express = require( "express" );
const utility = require( "utility" );

const Router = express.Router();

const model = require( "./model" );
const User = model.getModel( "user" );

// 数据查询过滤条件
const _filter = { "pwd": 0, "__v": 0 }

// 测试 用例 
Router.get( "/list", function ( request, response ) {
    // User.remove( {}, function ( e, d ) {});
    User.find({}, function ( error, doc ) {
        return response.json( doc );
    });
});

// 登录
Router.post( "/login", function ( request, response ) {
    console.log( request.body );
    let { user, pwd } = request.body;
    User.findOne( { user: user, pwd: md5Pwd( pwd ) }, _filter, function ( error, doc ) {
        if ( !doc ) {
            return response.json( { code: 1, msg: "用户不存在" } );
        }
        response.cookie( "userid", doc._id );
        return response.json( { code: 0, data: doc } );
    })
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
        const userModel = new User( { user, pwd: md5Pwd( pwd ), type } );
        userModel.save( function ( error, doc ) {
            if ( error ) {
                return response.json( { code: 1, msg: "数据存储出错" } );
            } 
            const { user, type, _id } = doc;
            response.cookie( "userid", _id );
            return response.json( { code: 0, data: { user, type, _id } } );
        })
    })
});

// 测试 用例
Router.get( "/info", function ( request, response ) {
    const { userid } = request.cookies;
    if ( !userid ) {
        return response.json({
            code: 1
        })
    }
    User.findOne( { _id: userid }, _filter,  function ( error, doc ) {
        if ( error ) {
            return response.json( { code: 1, msg: "数据查询出错" } )
        }
        if ( doc ) {
            return response.json( { code: 0, data: doc } );
        }
    })
   
});

function md5Pwd ( pwd ) {
    const slat = "job_1994yxl!@#CAPTAIN";
    return utility.md5( utility.md5( pwd + slat) );
}
module.exports = Router;
