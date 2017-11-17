import React, { Component } from 'react'; 
import axios from "axios";
import { withRouter } from "react-router";


class AuthRoute extends Component {
    componentDidMount () {
        // 获取用户信息
        // 是否登录
        // 当前 URL 地址 login 页面不要跳转
        // 当前用户身份
        // 用户是否完成信息 （ 选择头像 个人简介）

        // 直接访问 login 和 register 页面 不进行用户系信息的认证
        const publicList = [ "/login", "/register" ];
        if ( publicList.indexOf( this.props.location.pathname ) > -1 ) {
            return;
        }
        
        axios.get( "/user/info" ).then( ( response ) => {
            if ( response.status == 200 ) {

                // 存在用户登录信息
                if ( response.data.code == 0 ) {
                    console.log( this.props.history );
                }
                // 不存在用户登录信息 跳转至 login 页面
                else if (  response.data.code == 1 ) {
                    this.props.history.push( "/login" ) ;
                }
            }
        })
    }
    render ( ) {
        return (
            <div>
                用户验证
            </div>
        )
    } 
}

export default withRouter( AuthRoute );