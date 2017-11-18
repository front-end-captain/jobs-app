import axios from "axios";
import { getRedirectPath } from "./../utils";


// action type const
// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGOUT =  "LOGOUT";

const initState = {
    redirectTo: "",
    msg: "",
    user: "",
    type: ""
}
// reducer function
export function user ( state = initState, action ) {
    switch ( action.type ) {
        case AUTH_SUCCESS:
            return {
                ...state,
                redirectTo: getRedirectPath( action.payload ),
                msg: "",
                ...action.payload
            }
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.payload
            }
        case LOGOUT:
            return {
                ...initState,
                redirectTo: "/login"
            }
        default:
            return state;
    }
};

// action creator function
function errorMsg ( msg ) {
    return {
        payload: msg,
        type: ERROR_MSG
    }
}
function authSuccess ( data ) {
    return {
        payload: data,
        type: AUTH_SUCCESS
    }
}
export function loadData ( data ) {
    return {
        type: LOAD_DATA,
        payload: data
    }
}
export function logoutSubmit () {
    return {
        type: LOGOUT
    }
}

// dispatcher function
/**
 * @description: 用户信息更新
 * @param {Object} data
 */
export function update ( data ) {
    return dispatch => {
        axios.post( "/user/update", data ).then( ( response ) => {
            console.log( "服务端返回更新响应信息", response.data );

            if ( response.status === 200 && response.data.code === 0 ) {
                dispatch( authSuccess( response.data.data ) );
            }
            // 更新失败
            else {
                dispatch( errorMsg( response.data.msg ) );
            }
        })
    }
}
/**
 * @description: 用户登录
 * @param {Object} user[用户名]  pwd[密码]
 */
export function login ( { user, pwd } ) {
    if ( !user || !pwd ) {
        return errorMsg( "请输入用户名或者密码" );
    }
    return dispatch => {
        axios.post( "/user/login", { user, pwd } )
            .then( ( response ) => {
                console.log( "服务端返回登录响应信息", response.data );

                // 登录成功
                if ( response.status === 200 && response.data.code === 0 ) {
                    dispatch( authSuccess( response.data.data ) );
                }
                // 登录失败
                else {
                    dispatch( errorMsg( response.data.msg ) );
                }
            })
    }
}
/**
 * @description: 用户注册
 * @param {Pbject} user[用户名]  pwd[密码]  confirmPwd[确认密码]  type[用户类型]
 */
export function register ( { user, pwd, confirmPwd, type } ) {
    if ( !user || !pwd || !type ) {
        return errorMsg( "请输入用户名和密码" );
    }
    if ( pwd !== confirmPwd ) {
        return errorMsg( "两次输入的密码不一致" );
    }
    return ( dispatch ) => {
        axios.post( "/user/register", { user, pwd, type } )
            .then( ( response ) => {

                console.log( "服务端返回注册响应信息:", response.data );

                // 注册成功
                if ( response.status === 200 && response.data.code === 0 ) {
                    dispatch( authSuccess( response.data.data ) );
                } 

                // 注册失败
                else {
                    dispatch( errorMsg( response.data.msg ) );
                }
        })
    }   
}