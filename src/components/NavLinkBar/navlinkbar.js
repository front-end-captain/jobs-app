import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile"
import { connect } from "react-redux";

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends Component {
    
    render () {
        const navList = this.props.data.filter( v => !v.hide );
        const { pathname } = this.props.location;
        return (
            <TabBar>
                {
                    navList.map( (v, i) => (
                        <TabBar.Item
                            key={ i }
                            title={ v.title }
                            icon={ { uri: require( `./img/${v.icon}.png` )} }
                            selectedIcon={ { uri: require( `./img/${v.icon}-active.png` ) } }
                            selected={ pathname === v.path }
                            onPress={ () => {
                                this.props.history.push( v.path );
                            }}
                            badge={ v.path === "/msg" ? this.props.unread : "" }
                        >
                        </TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
}
export default NavLinkBar;