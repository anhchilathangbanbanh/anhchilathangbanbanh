import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './header.css';
import './style.css';

import Header from './components/Header';
import Fooder from './components/Fooder';
import Home from './views/Home';
import ListCake from './views/ListCake';

class App extends Component {
    render() {
        // router
        const routes = [
            {
                path     : '/',
                exact    : true,
                component: Home
            },
            {
                path: '/:category',
                exact: true,
                component: ListCake
            }
        ]

        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        {routes.map((route, index) => (
                            <Route key={index} {...route} />
                        ))}
                    </Switch>
                    <Fooder />
                </div>
            </Router>
        );
    }
}

export default App;
