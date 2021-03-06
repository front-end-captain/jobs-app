import axios from "axios";


const USER_LIST = "USER_LIST";


// reducer
const initState = {
    userlist: []
}
export function chatuser ( state = initState, action ) {
    switch ( action.type ) {
        case USER_LIST:
            return {
                ...state,
                userlist: action.payload
            }
        default:
            return state;
    }
}

// action creator
function userlist ( data ) {
    return { type: USER_LIST, payload: data }
}


// dispatcher
export function getUserList ( type ) {
    return ( dispatch ) => {
        axios.get( "/user/list?type=" + type ).then( ( response ) => {
            if ( response.status === 200 && response.data.code === 0 ) {
                dispatch( userlist( response.data.data ) );
            }
        })
    }
}