import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Logo from "./../../components/Logo/logo"
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { login } from "./../../redux/user.redux";

@connect(
    state => state.user,
    { login }
)
class Login extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            user: "",
            pwd: ""
        }


        this.register = this.register.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.handleLogin = this.handleLogin.bind( this );
    }
    
    // 跳转至 注册页面
    register () {
        this.props.history.push( "/register" );
    }

    // 利用 input 元素的 change 事件 设置 state 的属性值
    handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }

    // 点击登录
    handleLogin () {
        this.props.login( this.state );
    }

    render () {
        return (
            <div>

                {/* logo 图片  */}
                <Logo />

                
                { ( this.props.redirectTo && this.props.redirectTo !== "/login" ) ? <Redirect to={ this.props.redirectTo } /> : null }

                <WingBlank>

                    {/* 登录失败的提示信息 */}
                    { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }

                    <List>
                        <InputItem onChange={ val => this.handleChange( "user", val ) } autoFocus>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={ val => this.handleChange( "pwd", val ) } type="password">密码</InputItem>
                    </List>

                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>

                    <Button type="primary" onClick={ this.handleLogin }>登录</Button>

                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>

                    <Button type="primary" onClick={ this.register }>注册</Button>

                </WingBlank>
            </div>
        );
    }
}
export default Login;