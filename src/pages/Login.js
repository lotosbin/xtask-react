import React, {Component} from "react";
import auth from "../auth";

class Login extends Component {
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleTap = event => {
        let {api_host, api_key} = this.state;
        auth.authenticate(api_host, api_key);
        this.setState({t: "t"})
    };

    constructor(props) {
        super(props);
        this.state = {
            api_host: "",
            api_key: "",
        };
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.api_host}
                       onChange={this.handleChange('api_host')}/><br/>
                <input type="text" value={this.state.api_key}
                       onChange={this.handleChange('api_key')}/><br/>
                <button onClick={this.handleTap}>Login</button>
            </div>
        );
    }
}

export default Login;