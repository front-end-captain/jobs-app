import React, { Component } from 'react';
import { connect } from "react-redux";
import { List, Badge, Result } from "antd-mobile"

@connect(
    state => state
)
class Msg extends Component {
    render () {
        const userid = this.props.user._id;

        // 根据 chatid 对聊天进行分组
        const msgGroup = {};
        this.props.chat.chatmsg.forEach( v => {
            msgGroup[ v.chatid ] = msgGroup[ v.chatid ] || [];
            msgGroup[ v.chatid ].push( v );
        })
        const chatList = Object.values( msgGroup ).sort( ( a, b ) => {
            let a_last = a[a.length - 1].create_time;
            let b_last = b[b.length - 1].create_time;
            return b_last - a_last;
        });
        
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        // 当前无聊天内容 不能返回 null 会引起 QueueAnim 的报错
        // 而是进行用户提示
        if ( !chatList.length ) {
            return <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
                        title="您还没有和任何人聊过天-_-"
                    />
        }

        return (
            <div>
                <List>
                    {   
                        chatList.map( ( v, i ) => {
                            const lastItem = v[v.length - 1];
                            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from;
                            const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].name;
                            const unreadNum = v.filter( v => !v.read && v.to === userid ).length;
                            return (
                                        <List.Item 
                                            thumb={ require( `./../images/${this.props.chat.users[targetId].avatar}.png` ) }
                                            key={ lastItem._id }
                                            extra={ <Badge text={ unreadNum }></Badge> }
                                            arrow="horizontal"
                                            onClick={ () => {
                                                this.props.history.push( `/chat/${targetId}` );
                                            }}
                                        > 
                                            { lastItem.content }
                                            <List.Item.Brief> 
                                                { name } 
                                            </List.Item.Brief>
                                        </List.Item>
                                    )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default Msg;