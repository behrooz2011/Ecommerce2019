


import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';

import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleware11 = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware11(Reducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
		<BrowserRouter>
		<Routes />
		</BrowserRouter>
	</Provider>
	 ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

