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
import Manage from './views/Manage';
import AddCake from './views/AddCake';

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
                path: '/cake/:category/:categoryId',
                exact: true,
                component: ListCake
            },
            {
                path: '/manage',
                exact: true,
                component: Manage
            },
            {
                path: '/add-cake',
                exact: true,
                component: AddCake
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
