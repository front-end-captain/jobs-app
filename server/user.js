
const express = require( "express" );

// https://github.com/node-modules/utility
const utility = require( "utility" );

const Router = express.Router();

const model = require( "./model" );
const User = model.getModel( "user" );
const Chat = model.getModel( "chat" );

// 数据查询过滤条件
const _filter = { "pwd": 0, "__v": 0 }

// 测试 用例 
Router.get( "/list", function ( request, response ) {
    let type = request.query.type;
    // User.remove( {}, function ( e, d ) {});
    User.find({ type }, function ( error, doc ) {
        return response.json( { code: 0, data: doc } );
    });
});

/**
 * @description: 获取聊天记录
 */
Router.get( "/getmsglist", function ( request, response ) {
    const userid = request.cookies.userid;
    User.find( {}, function ( error, userdoc ) {
        let users = {};
        userdoc.forEach( v => {
            users[ v._id ] = { name: v.user, avatar: v.avatar };
        })

        // 查找所有发送方为当前登录用户或者接收方为当前登录用户的聊天记录 并将所有用户的用户名和头像返回
        Chat.find( {'$or': [{from: userid}, {to: userid}]}, function ( error, doc ) {
            if ( !error ) {
                return response.json( { code: 0, data: doc, users: users } );
            }
        })
    })
})

/**
 * @description: 用户登录
 */
Router.post( "/login", function ( request, response ) {
    
    let { user, pwd } = request.body;

    User.findOne( { user: user, pwd: md5Pwd( pwd ) }, _filter, function ( error, doc ) {

        if ( !doc ) {
            return response.json( { code: 1, msg: "用户不存在" } );
        }

        // 在客户端种植 cookie
        response.cookie( "userid", doc._id );

        return response.json( { code: 0, data: doc } );
    })
});

/**
 * @description: 用户注册
 */
Router.post( "/register", function ( request, response ) {

    const { user, pwd, type } = request.body;

    User.findOne( { user: user }, function ( error, doc ) {

        // 判断用户名是否存在 防止重复注册
        if ( doc ) {
            return response.json( { code: 1, msg: "该用户已经注册" } );
        }

        // 否则将 用户信息入库
        const userModel = new User( { user, pwd: md5Pwd( pwd ), type } );
        userModel.save( function ( error, doc ) {
            if ( error ) {
                return response.json( { code: 1, msg: "数据存储出错" } );
            } 
            const { user, type, _id } = doc;

            // 向客户端种植 cookie
            response.cookie( "userid", _id );

            return response.json( { code: 0, data: { user, type, _id } } );
        })
    })
});

/**
 * @description: 更新用户信息
 */
Router.post( "/update", function ( request, response ) {

    const { userid } = request.cookies;

    // 用户信息的更新必须是在用户登录状态下进行操作
    if ( !userid ) {
        return response.json( { code: 1 } );
    }

    const body = request.body;

    User.findByIdAndUpdate( userid, body, function ( error, doc ) {
        const data = Object.assign( {}, {
            user: doc.user,
            type: doc.type
        }, body );

        return response.json( { code: 0, data } );
    })
})

/**
 * @description: 获取用户信息 通常在页面初始化或者页面中用户认证的操作
 */
Router.get( "/info", function ( request, response ) {

    const { userid } = request.cookies;

    if ( !userid ) {
        return response.json( { code: 1 } );
    }

    User.findOne( { _id: userid }, _filter,  function ( error, doc ) {
        if ( error ) {
            return response.json( { code: 1, msg: "没有查询此用户" } );
        }
        if ( doc ) {
            return response.json( { code: 0, data: doc } );
        }
    })
});

/**
 * @description: 对用户密码进行二次 md5 加密
 * @param {String} pwd 密码
 * @returns {String}  二次加密后的密码
 */
function md5Pwd ( pwd ) {
    const slat = "job_1994yxl!@#CAPTAIN";
    return utility.md5( utility.md5( pwd + slat) );
}

module.exports = Router;