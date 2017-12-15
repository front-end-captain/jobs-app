import React, { Component } from 'react';
import { 
	Route,
	Switch  
} from "react-router-dom"

// import component
import Login from "./container/Login/login"
import Register from "./container/register/register"
import AuthRoute from "./components/AuthRoute/authroute"
import BossInfo from "./container/BossInfo/bossinfo"
import GeniusInfo from "./container/GeniusInfo/geniusinfo"
import Dashboard from "./components/DashBoard/dashboard"
import Chat from "./components/Chat/chat"


class App extends Component {
	constructor ( props ) {
		super( props );
		this.state = { hasError: false };
	}
	componentDidCatch ( error, info ) {
		console.log( error, info );
		if ( error ) {
			this.setState( { hasError: true } );
		}
	}
    render () {
		return this.state.hasError 
		? 	<h3>页面出错了</h3>
		:  	(
				<div>
					<AuthRoute />
					<Switch>
						<Route exact path="/" component={ Login } />
						<Route path="/bossinfo" component={ BossInfo }></Route>
						<Route path="/geniusinfo" component={ GeniusInfo }></Route>
						<Route path="/login" component={ Login }></Route>
						<Route path="/register" component={ Register }></Route>
						<Route path="/chat/:user" component={ Chat }></Route>
						<Route component={ Dashboard }></Route>
					</Switch>
				</div>
			)
    }
}

export default App;