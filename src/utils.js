
export function getRedirectPath ( { type, avatar } ) {

    // 用户信息已经完善 跳转至 /boss or /genius
    let url = ( type === "boss" ) ? "/boss" : "/genius";

    // 用户信息没有完善 跳转至 /bossinfo or /geniusinfo
    if ( !avatar ) {
        url += "info";
    }
    return url;
}