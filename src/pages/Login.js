import React, {Component} from "react";
import auth from "../auth";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
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

    componentDidMount() {
        let {api_host, api_key} = auth.getAuth()
        this.setState({api_host})
    }
    render() {
        const {classes} = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'start'}}>
                <TextField
                    label="api_host"
                    className={classes.textField}
                    style={{width: '100%'}}
                    onChange={this.handleChange('api_host')}
                    margin="normal"
                    value={this.state.api_host}
                />
                <TextField
                    label="api_key"
                    margin="normal"
                    value={this.state.api_key}
                    className={classes.textField}
                    style={{width: '100%'}}
                    onChange={this.handleChange('api_key')}/>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleTap}>
                    Login
                </Button>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);