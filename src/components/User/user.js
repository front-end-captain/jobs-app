import React, { Component } from 'react';
import { connect } from "react-redux"
import { Result, List, WingBlank, WhiteSpace, Button, Modal } from "antd-mobile"
import cookies from "browser-cookies";
import { Redirect } from "react-router-dom"
import { logoutSubmit } from "./../../redux/user.redux"

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {
    constructor ( props ) {
        super( props );
        this.logout = this.logout.bind( this );
    }
    logout () {
        Modal.alert( "注销", "确认退出么", [
            { text: "取消", onPress: () => console.log( "取消" ) },
            { text: "确认", onPress: () => { 
                cookies.erase( "userid" ) ;
                this.props.logoutSubmit();
            }},
        ] )
      
        // 擦出 cookie
        // cookies.erase( "userid" );
    }
    render () {
        const props = this.props;
        return (
            props.user
                ?   
                    <div>
                        <Result 
                            img={ 
                                <img 
                                    src={ props.avatar ? require( `./../images/${ props.avatar }.png` ) : require( `./../images/hedgehog.png` ) }
                                    alt={ props.user } 
                                    style={ { width: "60px", height: "60px" } }
                                /> 
                            }
                            title={ this.props.user }
                            message={ props.type == "boss" ? props.company  : null }
                        />
                        <WingBlank>
                            <List renderHeader="简介" >
                                <List.Item multipleLine>
                                    { props.title }
                                    { props.desc.split( " " ).map( (v, i) => (
                                        <List.Item.Brief key={ i }> { v} </List.Item.Brief>
                                    ))}
                                    <WhiteSpace />
                                    { props.money ? <strong>薪资： { props.money } </strong> : null }
                                </List.Item>
                            </List>
                            <WhiteSpace /> <WhiteSpace /> <WhiteSpace /> <WhiteSpace /> <WhiteSpace />
                            <Button type="ghost" onClick={ this.logout } >退出</Button>
                        </WingBlank>
                    </div>

                :   <Redirect to={ props.redirectTo } />
        )
    }
}
export default User;