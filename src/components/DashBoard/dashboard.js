import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";
import { NavBar }  from "antd-mobile";
import QueueAnim from "rc-queue-anim"

import NavLinkBar from "./../NavLinkBar/navlinkbar";
import Boss from "./../Boss/boss"
import Genius from "./../Genius/genius"
import User from "./../User/user"
import Msg from "./../Msg/msg"
import { getMsgList, receiveMsg }  from "./../../redux/chat.redux"
// function Boss () {
//     return <h2>Boss首页</h2>
// }
// function Genius () {
//     return <h2>Genius</h2>
// }
// function Msg () {
//     return <h2>Msg</h2>
// }
// function User () {
//     return <h2>User</h2>
// }
@connect(
    state => state,
    { getMsgList, receiveMsg }
)
class DashBoard extends Component {
    componentDidMount () {
        if ( !this.props.chat.chatmsg.length ) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }
    render () {
        const user    = this.props.user;
        const navList = [
            { path: "/boss", text: "牛人", icon: "boss", title: "牛人列表", component: Boss, hide: user.type === "genius" },
            { path: "/genius", text: "Boss", icon: "job", title: "BOSS列表", component: Genius, hide: user.type === "boss" },
            { path: "/msg", text: "消息", icon: "msg", title: "消息列表", component: Msg },
            { path: "/me", text: "我", icon: "user", title: "个人中心", component: User },
        ];
        
        const pathname = this.props.location.pathname;
        const currentPage = navList.find( v => v.path === pathname );
        
        // 404
        if ( !currentPage ) {
            return <Redirect to="/" />
        }

        return (
            <div>

                {/* 顶部导航头 */}
                <NavBar mode="dard" className="fixed-header">
                    { 
                        navList.find( v => v.path === pathname ) 
                            ? navList.find( v => v.path === pathname ).title 
                            : null
                    }
                </NavBar>

                {/* 内容页面 */}
                <div style={ { marginTop: "45px" }}>

                    <QueueAnim type="scaleY" duration={1000}>
                        <Route key={ currentPage.path } path={ currentPage.path } component={ currentPage.component }></Route>
                    </QueueAnim>

                </div>

                {/* 底部 tab bar */}
                <NavLinkBar data={ navList }></NavLinkBar>
            </div>
        )
    }
}

export default withRouter( DashBoard );