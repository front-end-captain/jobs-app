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
    componentDidMount () {
        
    }
    register () {
        this.props.history.push( "/register" );
    }
    handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }
    handleLogin () {
        this.props.login( this.state );
    }
    render () {
        return (
            <div>
                <Logo></Logo>
                { this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
                <WingBlank>
                    { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
                    <List>
                        <InputItem onChange={ val => this.handleChange( "user", val ) } autoFocus>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={ val => this.handleChange( "pwd", val ) } type="password">密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={ this.handleLogin }>登录</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={ this.register }>注册</Button>
                </WingBlank>
            </div>
        );
    }
}
export default Login;