import React from "react";
import {ApolloProvider as _ApolloProvider} from "react-apollo";
import ReactDOM from "react-dom";
import "typeface-roboto";
import client from "./apollo/client";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";

const ApolloProvider = _ApolloProvider as unknown as any;
const app = (
    <ApolloProvider store={store} client={client}>
        <App/>
    </ApolloProvider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
