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

let store = createStore( reducer, compose(
	applyMiddleware( thunk ),
	window.devToolsExtension ? window.devToolsExtension() : () => {}
));

ReactDOM.render(
	<Provider store={store}>
		<Router>
		</Router>
	</Provider>,
	document.getElementById( "root" )
)

