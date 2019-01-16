import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, {Component} from "react";
import auth from "../auth";

const styles: any = (theme: { spacing: { unit: any; }; }) => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: "none",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class Login extends Component<any, any> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            api_host: "",
            api_key: "",
        };
    }

    handleChange = (name: any) => (event: { target: { value: any; }; }) => {
        this.setState({
            [name]: event.target.value,
        });
    }
    handleTap = (event: any) => {
        const {api_host, api_key} = this.state;
        auth.authenticate(api_host, api_key);
        this.setState({t: "t"});
    }

    componentDidMount() {
        const {api_host, api_key} = auth.getAuth();
        this.setState({api_host});
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "start"}}>
                <TextField
                    label="api_host"
                    className={classes.textField}
                    style={{width: "100%"}}
                    onChange={this.handleChange("api_host")}
                    margin="normal"
                    value={this.state.api_host}
                />
                <TextField
                    label="api_key"
                    margin="normal"
                    value={this.state.api_key}
                    className={classes.textField}
                    style={{width: "100%"}}
                    onChange={this.handleChange("api_key")}/>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleTap}>
                    Login
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
