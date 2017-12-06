import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { 
	BrowserRouter as Router,
	Route,
	Switch ,
	Redirect
} from "react-router-dom"


import reducer from "./reducers"

// 在处理请求或响应之前拦截请求或响应
// 做出 loading 效果
import "./config"

import "./index.css"

// import component
import Login from "./container/Login/login";
import Register from "./container/register/register"
import AuthRoute from "./components/AuthRoute/authroute"
import BossInfo from "./container/BossInfo/bossinfo"
import GeniusInfo from "./container/GeniusInfo/geniusinfo"
import Dashboard from "./components/DashBoard/dashboard"
import Chat from "./components/Chat/chat"

const store = createStore( reducer, composeWithDevTools(
	applyMiddleware( thunk )
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// 测试用例
// function Boss () {
// 	return <h2>Boss 页面</h2>
// }
// function Dashboard () {
// 	return <h2>Dashboard</h2>
// }
ReactDOM.render(
	<Provider store={store}>
		<Router>
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
		</Router>
	</Provider>,
	document.getElementById( "root" )
)