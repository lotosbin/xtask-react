import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PrivateRoute from "./router/PrivateRoute";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import {ApolloProvider} from "react-apollo";
import client from "./apollo/client";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import ProjectGantt from "./pages/ProjectGantt";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import auth from "./auth";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {},
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};
class App extends Component {
  render() {
      const {classes} = this.props;
      return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                xRedmine
                            </Typography>
                            <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/about">About</Link></li>
                            </ul>
                            {auth.isAuthenticated() ? <Button color="inherit" component={Link} to={"/logout"}>Logout</Button> : <Button color="inherit" component={Link} to={"/login"}>Login</Button>}
                        </Toolbar>
                    </AppBar>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/projects" component={Projects}/>
                    <PrivateRoute path="/project/:projectId" component={Project}/>
                    <PrivateRoute path="/project/:projectId/gantt" component={ProjectGantt}/>
                    <Route path="/about" component={About}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                </div>
            </Router>
        </ApolloProvider>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);