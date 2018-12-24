import React, {Component} from "react";
import auth from "../auth";

class Logout extends Component {
    public componentDidMount() {
        auth.signout();
    }

    public render() {
        return (
            <div></div>
        );
    }
}

export default Logout;
