import React, {Component} from "react";
import auth from "../auth";

class Logout extends Component {
    componentDidMount() {
        auth.signout();
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Logout;
