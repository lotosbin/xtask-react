import React from "react";
import {Redirect, Route} from "react-router-dom";
import auth from "../auth";

class PrivateRoute extends React.Component<any> {
    public render() {
        const {component, ...rest} = this.props;
        const Component: any = component;
        return <Route {...rest} render={(props: any) => auth.isAuthenticated() ? <Component {...props} /> : <Redirect to={{pathname: "/login", state: {from: props.location}}}/>}/>;
    }
}

export default PrivateRoute;
