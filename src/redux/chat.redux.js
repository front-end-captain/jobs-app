import axios from "axios";
import io from "socket.io-client"

const socket = io( "ws://localhost:8080" );

// action type
const MSG_LIST  = "MSG_LIST";          // 聊天列表
const MSG_RECEIVE = "MSG_RECEIVE";     // 读取信息
const MSG_READ = "MSG_READ";           // 标志信息已读


const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
};
export function chat ( state = initState, action ) {
    switch ( action.type ) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter( v => !v.read && v.to === action.payload.userid  ).length
            }
        case MSG_RECEIVE:
            const n = action.payload.msgs.to === action.payload.userid ? 1 : 0;
            return {
                ...state,
                chatmsg: [ ...state.chatmsg, action.payload.msgs ], 
                unread: state.unread + n
            }

        // case MSG_READ:

        default:
            return state;        
    }
}
function msgReceive ( msgs, userid ) {  
    return { type: MSG_RECEIVE, payload: { msgs, userid } };
}
function msglist ( msgs, users, userid ) {
    return { type: MSG_LIST, payload: { msgs, users, userid } };
}
export function receiveMsg () {
    return ( dispatch, getState ) => {
        socket.on( "receivemsg", function ( data ) {
            // console.log( data );
            const userId = getState().user._id;
            dispatch( msgReceive( data, userId ) );
        })
    }
}
export function sendMsg ( { from, to, msg } ) {
    return dispatch => {
        socket.emit( "sendmsg", { from, to, msg } );
    }
}

export function getMsgList () {
    return ( dispatch, getState ) => {
        axios.get( "/user/getmsglist" ).then( ( response ) => {
            if ( response.status === 200 && response.data.code === 0 ) {
                const userId = getState().user._id;
                dispatch( msglist( response.data.data, response.data.users, userId ) );
            }
        })
    }
}