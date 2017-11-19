/**
 * @description: 根据用户类型以及用户是否已经选择了头像返回不同的 url
 * @param {String} type 用户类型  boss or genius
 * @param {String} avatar 用户头像 存在或不存在
 */
export function getRedirectPath ( { type, avatar } ) {

    // 用户信息已经完善 跳转至 /boss or /genius
    let url = ( type === "boss" ) ? "/boss" : "/genius";

    // 用户信息没有完善 跳转至 /bossinfo or /geniusinfo
    if ( !avatar ) {
        url += "info";
    }
    return url;
}

/**
 * @description: 根据用户的 id 以及 目标用户的 id 返回当前对话的 id
 * @param {String} userId 当前登录用户的 id
 * @param {String} targetId 对话的目标用户 id
 */
export function getChatId ( userId, targetId ) {
    return [ userId, targetId ].sort().join( "_" );
}