import React, { Component } from 'react';
import { InputItem, List, NavBar, Icon, WhiteSpace, Grid } from "antd-mobile"
import { connect } from "react-redux";

import { getMsgList, sendMsg, receiveMsg }  from "./../../redux/chat.redux"
import { getChatId } from "./../../utils"
import { setTimeout } from 'timers';


@connect(
    state => state,
    { getMsgList, sendMsg, receiveMsg }
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
    fixCarousel () {
        setTimeout( function () {
            window.dispatchEvent( new Event( "resize" ) );
        }, 0)
    }
    handleSubmit () {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
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
                { chatmsg.map( v => {
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
                            extra={ 
                                <div>
                                    <span
                                        style={{ marginRight:15 }}
                                        onClick={ () => { 
                                            this.setState({ showEmoji: !this.state.showEmoji }); 
                                            this.fixCarousel(); 
                                        }}
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