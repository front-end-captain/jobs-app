import { Component } from 'react'; 
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { loadData } from "./../../redux/user.redux"


@withRouter
@connect(
    state => state.user,
    { loadData }
)
class AuthRoute extends Component {
    componentWillMount () {
        // 获取用户信息
        // 是否登录
        // 当前 URL 地址 login 页面不要跳转
        // 当前用户身份
        // 用户是否完成信息 （ 选择头像 个人简介）

        // 直接访问 login 和 register 页面 
        // 直接是认为要进行登录或者注册操作 
        // 则不进行用户系信息的认证操作
        const publicList = [ "/login", "/register" ];
        if ( publicList.indexOf( this.props.location.pathname ) > -1 ) {
            return;
        }

        // 否则 认为用户是访问其他页面 其他页面默认是需要用户权限验证的
        // 向服务端发起请求获取用户信息 
        // 请求时客户端会携带 cookie 进行访问, cookie 中带有用户的 id
        // 服务端在用户注册成功后  会在客户端种植 cookie   ` response.cookie( "userid", _id );`
        axios.get( "/user/info" ).then( ( response ) => {
            if ( response.status === 200 ) {

                // 存在用户登录信息
                if ( response.data.code === 0 ) {

                    // 加载用户信息数据 并将用户的信息保存在 redux 中
                    this.props.loadData( response.data.data );;
                }

                // 不存在用户登录信息 跳转至 login 页面
                else if ( response.data.code === 1 ) {
                    this.props.history.push( "/login" ) ;
                }
            }
        })
    }
    render () {
        return null;
    } 
}

export default AuthRoute;