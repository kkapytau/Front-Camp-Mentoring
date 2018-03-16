import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/Store';
import { BrowserRouter } from 'react-router-dom'
import App from './components/app/App';

let preloadedState = {};
// Grab the state from a global variable injected into the server-generated HTML
if (typeof window !== 'undefined') {
    preloadedState = window.__PRELOADED_STATE__;
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('app')
);
