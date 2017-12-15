import React, { Component } from 'react';


import "./logo.css"
// import logoImg from "./job.png"
 
// bug require 图片地址并没有被转换为 base64 的形式
// 解决方式 服务端渲染通过 steam 的形式向客户端返回数据
class Logo extends Component {
    render () {
        return (
            <div className="logo-container">
                <img src={ require( "./job.png" ) } alt="logo"/>
            </div>
        )
    }
}
export default Logo;