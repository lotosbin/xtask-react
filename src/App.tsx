import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {HashRouter as Router, Link, Route} from "react-router-dom";
import "./App.css";
import auth from "./auth";
import About from "./pages/About";
import Agile from "./pages/Agile";
import Gantt from "./pages/Gantt";
import Home from "./pages/Home";
import Issue from "./pages/Issue";
import Issues from "./pages/Issues";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import PrivateRoute from "./router/PrivateRoute";

const styles = {
    root: {
        flexGrow: 1,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    flex: {},
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class App extends Component<any, any> {
    public render() {
        const {classes} = this.props;
        return (
            <Router>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                xRedmine
                            </Typography>
                            <ul style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flex: 1}}>
                                <li><Link to="/">Issues</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/gantt">Gantt</Link></li>
                                <li><Link to="/agile">Agile</Link></li>
                            </ul>
                            {auth.isAuthenticated() ? <Button color="inherit" component={Link} {...{to: "/logout"} as any} >Logout</Button> : <Button color="inherit" component={Link} {...{to: "/login"} as any}>Login</Button>}
                        </Toolbar>
                    </AppBar>
                    <div style={{flex: 1, minHeight: 0, display: "flex", flexDirection: "column"}}>
                        <Route exact path="/" component={Issues}/>

                        <PrivateRoute path="/projects" component={Projects}/>
                        <PrivateRoute path="/issue/:id" component={Issue}/>
                        <PrivateRoute path="/gantt" component={Gantt}/>
                        <PrivateRoute path="/agile" component={Agile}/>
                        <PrivateRoute path="/project/:projectId" component={Project}/>

                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                    </div>
                </div>
            </Router>
        );
    }
}

// App.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(App);
