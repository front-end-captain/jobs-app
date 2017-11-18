import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class UserCard extends Component {
    constructor ( props ) {
        super( props );
        this.handleClick = this.handleClick.bind( this );
    }
    handleClick ( v ) {
        this.props.history.push( "/chat/" + v._id );
    }
    render () {
        return (
            <WingBlank>
            <WhiteSpace/>
            {   
                this.props.userlist.map( ( v, i ) => (
    
                    // 只显示有头像的用户
                    v.avatar
                    ?   <Card key={ i } onClick={ () => this.handleClick( v ) }>
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