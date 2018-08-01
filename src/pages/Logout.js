// @flow
import React, {Component} from "react";
import auth from "../auth";

type P = {}
type S = {}

class Logout extends Component<P, S> {
    componentDidMount() {
        auth.signout()
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Logout;