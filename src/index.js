import 'typeface-roboto'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./redux/store";
import {ApolloProvider} from "react-apollo";
import client from "./apollo/client";

let app = (
    <ApolloProvider store={store} client={client}>
        <App/>
    </ApolloProvider>);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
