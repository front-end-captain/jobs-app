import React, { Component } from 'react';
import { Grid, List } from "antd-mobile";

/**
 * @description: 用户头像选择组件
 * 用于 bossinfo 页面 和 geniusinfo 页面
 */
class AvatarSelector extends Component {
    constructor ( props ) {
        super( props );
        this.state = {};
    }
    render () {
        const avatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
                            .split(",")
                            .map( ( item, index ) => ({
                                icon: require( `./../images/${item}.png` ),
                                text: item
                            }));
        const gridHeader = this.state.text
                            ?   (
                                    <div>
                                        <span>已经选择的头像</span>
                                        <img src={ this.state.icon } alt={ this.state.text }/>
                                    </div>
                                )
                            :   <div style={{ color: "red" }}>请选择头像</div>;

        return (
            <div>
                <List renderHeader={ gridHeader }>
                    <Grid 
                        data={ avatarList } 
                        columnNum={5}
                        onClick={ elm => {
                            this.setState( elm )
                            this.props.selectAvatar( elm.text )
                        }}
                    ></Grid>
                </List>
            </div>
        )
    }
}

export default AvatarSelector;