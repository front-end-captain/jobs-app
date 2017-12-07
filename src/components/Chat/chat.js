import React, { Component } from 'react';
import { InputItem, List, NavBar, Icon, WhiteSpace, Grid, Toast } from "antd-mobile"
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim"


import { getMsgList, sendMsg, receiveMsg, readMsg }  from "./../../redux/chat.redux"
import { getChatId } from "./../../utils"
import { setTimeout } from 'timers';

function showToastNoMask() {
    Toast.info('发送内容不能为空！', 2, null, false);
}

@connect(
    state => state,
    { getMsgList, sendMsg, receiveMsg, readMsg }
)
class Chat extends Component {
    constructor ( props ) {
        super( props ) ;
        this.state = {
            text: "",
            showEmoji: false
        };

        this.handleSubmit = this.handleSubmit.bind( this );
        this.fixCarousel = this.fixCarousel.bind( this );
    }
    componentDidMount () {
        if ( !this.props.chat.chatmsg.length ) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    // 在组件卸载时更新未读消息的数量
    componentWillUnmount ( ) {
        const to = this.props.match.params.user;
        this.props.readMsg( to )
    }
    fixCarousel () {
        setTimeout( function () {
            window.dispatchEvent( new Event( "resize" ) );
        }, 0)
    }
    handleSubmit () {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;

        // 对发送内容进行非空判断
        if ( msg.trim() === "" ) {
            showToastNoMask();
            return;
        }

        this.props.sendMsg( { from, to, msg } );
        this.setState({ text: "" });
        

        // socket.emit( "sendmsg", { text: this.state.text } );
    }
    render () {

        // 获取路径参数中的 用户 id 这个 id 是聊天对话中接收方的 用户 id 即 targetid
        const userid = this.props.match.params.user;

        // 获取 redux 中的用户信息
        const users = this.props.chat.users;

        // 当前聊天对话的 id 有发送方和接收方两者的 id 拼接而成
        const chatid = getChatId( userid, this.props.user._id );

        // 对所有聊天信息进行过滤 过滤出
        const chatmsg = this.props.chat.chatmsg.filter( ( v, i ) => {
            return v.chatid === chatid;
        });

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter( v => v )
            .map( v => ( { text: v } ) )

        if ( !users[userid] ) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar mode="dark" icon={ <Icon type="left" />} onLeftClick={ () => this.props.history.goBack() }>

                    { users[userid].name }
                </NavBar>

                <WhiteSpace /><WhiteSpace />
                <QueueAnim type="scale" delay={ 300 }>
                    { chatmsg.map( v => {
                        const avatar = require( `./../images/${users[v.from].avatar}.png` );
                        return v.from === userid 
                            ?   ( 
                                    <List key={ v._id }>
                                        <List.Item thumb={ avatar }>
                                            { v.content }
                                        </List.Item>
                                    </List>
                                )
                            :   ( 
                                    <List key={ v._id }>
                                        <List.Item className="chat-me" extra={<img src={ avatar } alt="用户头像" />}>
                                            { v.content }
                                        </List.Item>
                                    </List>
                                )
                    })}
                </QueueAnim>
                
                
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={ this.state.text }
                            onChange={ v => this.setState( { text: v } ) }
                            extra={ 
                                <div>
                                    <span
                                        style={{ marginRight:15 }}
                                        onClick={ () => { 
                                            this.setState({ showEmoji: !this.state.showEmoji }); 
                                            this.fixCarousel(); 
                                        }}
                                        role="img"
                                    >😃</span>
                                    <span onClick={ () => this.handleSubmit() }>发送</span> 
                                </div>
                                
                            }
                        ></InputItem>
                    </List>
                    { 
                        this.state.showEmoji
                            ?   <Grid
                                    data={emoji}
                                    columnNum={9}
                                    carouselMaxRow={4}
                                    isCarousel={true}
                                    onClick={ el => {
                                        this.setState( { text: this.state.text + el.text } )
                                    }}
                                />
                            :   null
                    }
                    
                </div>
                {/* <h2> chat with user: { userid } </h2> */}
            </div>
        )
    }
}

export default Chat;