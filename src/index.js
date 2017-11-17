import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { 
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom"


import reducer from "./reducers"
import "./config"
import "./index.css"

// import component
import Login from "./container/Login/login";
import Register from "./container/register/register"
import AuthRoute from "./components/AuthRoute/authroute"

let store = createStore( reducer, compose(
	applyMiddleware( thunk ),
	window.devToolsExtension ? window.devToolsExtension() : () => {}
));

function Boss () {
	return <h2>Boss 页面</h2>
}
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<AuthRoute></AuthRoute>
				<Route path="/boss" component={ Boss }></Route>
				<Route path="/login" component={ Login }></Route>
				<Route path="/register" component={ Register }></Route>
			</div>
		</Router>
	</Provider>,
	document.getElementById( "root" )
)

