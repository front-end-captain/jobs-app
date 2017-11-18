import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from "antd-mobile"

class UserCard extends Component {
    render () {
        return (
            <WingBlank>
            <WhiteSpace/>
            {   
                this.props.userlist.map( ( v, i ) => (
    
                    // 只显示有头像的用户
                    v.avatar
                    ?   <Card key={ i }>
                            <Card.Header
                                title={ v.user }
                                thumb={ require( `./../images/${v.avatar}.png` ) }
                                extra={ <span> { v.title } </span> }
                            ></Card.Header>
                            <Card.Body>
                                { v.company ? <strong>公司：{ v.company } </strong> : null }
                                <WhiteSpace />
                                { v.desc.split( " " ).map( ( v, i ) => ( <div key={i}>{ v }</div> ) ) }
                                <WhiteSpace />
                                { v.money ? <strong>薪水：{ v.money } </strong> : null }
                            </Card.Body>
                        </Card>
                    :   null
                    ))
                }
            </WingBlank>
        )
        
    }
}
export default UserCard;