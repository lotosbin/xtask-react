import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import PrivateRoute from "./router/PrivateRoute";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">

                <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

                <hr/>
                <Route exact path="/" component={Home}/>
                <PrivateRoute path="/projects" component={Projects}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
            </div>
        </Router>
    );
  }
}

export default App;
