import axios from "axios";
import { getRedirectPath } from "./../utils";


// action type const
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";

const initState = {
    redirectTo: "",
    msg: "",
    isAuth: false,
    user: "",
    pwd: "",
    type: ""
}
// reducer function
export function user ( state = initState, action ) {
    switch ( action.type ) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                redirectTo: getRedirectPath( action.payload ),
                isAuth: true,
                msg: "",
                ...action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                redirectTo: getRedirectPath( action.payload.data ),
                isAuth: true,
                ...action.payload.data
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
function loginSuccess ( data ) {
    return {
        payload: data,
        type: LOGIN_SUCCESS
    }
}
function registerSuccess ( data ) {
    return { 
        payload: data,
        type: REGISTER_SUCCESS
    }
}

// dispatcher function
export function loadData ( data ) {
    return {
        type: LOAD_DATA,
        payload: data
    }
}
export function login ( { user, pwd } ) {
    console.log( user, pwd );
    if ( !user || !pwd ) {
        return errorMsg( "请输入用户名或者密码" );
    }
    return dispatch => {
        axios.post( "/user/login", { user, pwd } )
            .then( ( response ) => {
                
                // 登录成功
                if ( response.status === 200 && response.data.code === 0 ) {
                    dispatch( loginSuccess( response.data ) );
                }
                // 登录失败
                else {
                    dispatch( errorMsg( "登录失败，请重试" ) );
                }
            })
    }
}
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

                // 注册成功
                if ( response.status === 200 && response.data.code === 0 ) {
                    dispatch( registerSuccess( { user, pwd, type } ) );
                } 

                // 注册失败
                else {
                    dispatch( errorMsg( response.data.msg ) );
                }
        })
    }   
}
