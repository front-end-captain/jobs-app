export function getRedirectPath ( { type, avatar } ) {
    let url = ( type === "boss" ) ? "/boss" : "/genius";

    // 用户信息完善页面
    if ( !avatar ) {
        url += "info";
    }
    return url;
}