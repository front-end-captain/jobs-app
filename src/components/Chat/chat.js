import React, { Component } from 'react';
import { InputItem, List, NavBar, Icon } from "antd-mobile"
import { connect } from "react-redux";

import { getMsgList, sendMsg, receiveMsg }  from "./../../redux/chat.redux"
@connect(
    state => state,
    { getMsgList, sendMsg, receiveMsg }
)
class Chat extends Component {
    constructor ( props ) {
        super( props ) ;
        this.state = {
            text: ""
        }
        this.handleSubmit = this.handleSubmit.bind( this );
    }
    componentDidMount () {
        if ( !this.props.chat.chatmsg.length ) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }
    handleSubmit () {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg( { from, to, msg } );
        // socket.emit( "sendmsg", { text: this.state.text } );
        this.setState({ text: "" });
    }
    render () {
        console.log( this.props );
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        
        if ( !users[userid] ) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar mode="dark" icon={ <Icon type="left" />} onLeftClick={ () => this.props.history.goBack() }>

                    { users[userid].name }
                </NavBar>


                { this.props.chat.chatmsg.map( v => {
                    const avatar = require( `./../images/${users[v.from].avatar}.png` );
                    return v.from == userid 
                        ?   ( 
                                <List key={ v._id }>
                                    <List.Item thumb={ avatar }>
                                        { v.content }
                                    </List.Item>
                                </List>
                            )
                        :   ( 
                                <List key={ v._id }>
                                    <List.Item className="chat-me" extra={<img src={ avatar } />}>
                                        { v.content }
                                    </List.Item>
                                </List>
                            )
                })}

                
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={ this.state.text }
                            onChange={ v => this.setState( { text: v } ) }
                            extra={ <span onClick={ () => this.handleSubmit() }>发送</span> }
                        >信息</InputItem>
                    </List>
                </div>
                {/* <h2> chat with user: { userid } </h2> */}
            </div>
        )
    }
}

export default Chat;