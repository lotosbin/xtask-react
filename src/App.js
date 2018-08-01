import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

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
                <Route path="/projects" component={Projects}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    );
  }
}

export default App;
