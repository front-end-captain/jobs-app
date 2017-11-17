import React, { Component } from 'react';
import { InputItem, WhiteSpace, TextareaItem, WingBlank, Button, NavBar } from "antd-mobile";
import { Redirect } from "react-router-dom";
import AvatarSelector from "./../../components/AvatarSelector/avatar_selector"
import { connect } from "react-redux";
import { update } from "./../../redux/user.redux";


@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            title: "",
            avatar: ""
        };
        this.handleChange = this.handleChange.bind( this );
        this.selectAvatar = this.selectAvatar.bind( this ); 
    }
    handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }
    selectAvatar ( imgName ) {
        this.setState({
            avatar: imgName
        })
    }
    render () {
        const redirectTo = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (
            <div className="user-info genius-info">
                { redirectTo && redirectTo !== path ? <Redirect to={ this.props.redirectTo }/> : null }
                <NavBar mode="dark">牛人信息</NavBar>
                <AvatarSelector selectAvatar={ this.selectAvatar }>头像</AvatarSelector>
                <WhiteSpace />
                <WingBlank>
                    <InputItem onChange={ v => this.handleChange( "title", v ) }>
                        求职岗位
                    </InputItem>
                     
                    <TextareaItem
                        title="个人简介"
                        autoHeight
                        rows={3}
                        onChange={ v => this.handleChange( "desc", v ) }
                    />
                     <WhiteSpace />
                     <WhiteSpace />
                    <Button 
                        type="primary"
                        onClick={ () => this.props.update( this.state ) }
                    >
                        保存
                    </Button>
                </WingBlank>
            </div>
        )
    }
}
export default GeniusInfo;