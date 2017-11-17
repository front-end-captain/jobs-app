import React, { Component } from 'react';
import { connect } from "react-redux";
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile";

import { register } from "./../../redux/user.redux";
import Logo from "./../../components/Logo/logo";
import { Redirect } from 'react-router-dom';

const RadioItem = Radio.RadioItem;

@connect(
    state => state.user,
    { register }
)
class Register extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            user: "",
            pwd: "",
            confirmPwd: "",

            // or boss
            type: "genius" 
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleRegister = this.handleRegister.bind( this );
    }
    handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }
    handleRegister () {
        this.props.register( this.state );
    }
    render () {
        return (
            <div>
                { this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={ val => this.handleChange( "user", val ) } type="text" autoFocus>用户</InputItem>
                        <InputItem onChange={ val => this.handleChange( "pwd", val ) } type="password">密码</InputItem>
                        <InputItem onChange={ val => this.handleChange( "confirmPwd", val ) } type="password">密码</InputItem>
                    </List>
                    { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
                    <WhiteSpace/>
                    <List renderHeader="身份">
                        <RadioItem checked={ this.state.type === "genius" } onChange={ () => this.handleChange( "type", "genius" ) } >
                            牛人
                        </RadioItem>
                        <RadioItem checked={ this.state.type === "boss" } onChange={ () => this.handleChange( "type", "boss" ) }>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={ this.handleRegister }>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register;