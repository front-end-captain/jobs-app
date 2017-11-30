import axios from "axios";
import io from "socket.io-client"

const socket = io( "ws://localhost:8080" );

/**
 *      action type
 */
const MSG_LIST  = "MSG_LIST";          // 聊天列表
const MSG_RECEIVE = "MSG_RECEIVE";     // 读取信息
const MSG_READ = "MSG_READ";           // 标志信息已读


/**
 *      reducer
 */
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

        case MSG_READ:
            const from = action.payload.from;
            return {
                ...state,
                chatmsg:  state.chatmsg.map( v => ( { ...v, read: from === v.from ? true : v.read } ) ),
                unread: state.unread - action.payload.num
            }

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
function msgRead ( from, to, num  ) {
    return { type: MSG_READ, payload: { from, to, num } };
}
export function readMsg ( from ) {
    return ( dispatch, getState ) => {
        axios.post( "/user/readmsg", { from } ).then( ( response ) => {
            const userid = getState().user._id;
            if ( response.status === 200 && response.data.code === 0 ) {
                dispatch( msgRead( userid, from, response.data.num ) )
            }
        })
    }
}
export function receiveMsg () {
    return ( dispatch, getState ) => {
        socket.on( "receivemsg", function ( data ) {
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