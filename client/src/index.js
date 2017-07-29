const React = require('react');
const ReactDOM = require('react-dom');
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import pubCrawler from './reducers';

import AppComponent from './components/app-component';

const store = createStore(pubCrawler);


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="#!">
            <AppComponent/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);