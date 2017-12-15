import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { 
	BrowserRouter as Router 
} from "react-router-dom"


import reducer from "./reducers"

// 在处理请求或响应之前拦截请求或响应
// 做出 loading 效果
import "./config"

import "./index.css"

import App from "./app";

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
ReactDOM.hydrate(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById( "root" )
)