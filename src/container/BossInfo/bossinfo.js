import React, { Component } from 'react';
import AvatarSelector from "./../../components/AvatarSelector/avatar_selector"
import { InputItem, WhiteSpace, TextareaItem, WingBlank, Button, NavBar } from "antd-mobile";
import { connect } from "react-redux";
import { update } from "./../../redux/user.redux"
import { Redirect } from "react-router-dom";



@connect(
    state => state.user,
    { update }
)
class BossInfo extends Component {
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
            <div className="user-info boss-info">
                { redirectTo && redirectTo !== path ? <Redirect to={ this.props.redirectTo }/> : null }
                <NavBar mode="dark">Boss信息</NavBar>
                <AvatarSelector selectAvatar={ this.selectAvatar }>头像</AvatarSelector>
                <WhiteSpace />
                <WingBlank>
                    <InputItem onChange={ v => this.handleChange( "title", v ) }>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={ v => this.handleChange( "company", v ) }>
                        公司名称
                    </InputItem>
                    <InputItem onChange={ v => this.handleChange( "money", v ) }>
                        职位薪资
                    </InputItem>
                    <TextareaItem
                        title="职位简介"
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
export default BossInfo;