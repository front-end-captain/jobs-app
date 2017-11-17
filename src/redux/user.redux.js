import axios from "axios";


// action type const
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";


const initState = {
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
                isAuth: true,
                msg: "",
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
function registerSuccess ( data ) {
    return { 
        payload: data,
        type: REGISTER_SUCCESS
    }
}

// dispatcher function
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
                if ( response.status == 200 && response.data.code == 0 ) {
                    dispatch( registerSuccess( { user, pwd, type } ) );
                } 

                // 注册失败
                else {
                    dispatch( errorMsg( response.data.msg ) );
                }
        })
    }   
}
