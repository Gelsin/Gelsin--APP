import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SignIn from './components/SignIn';

export default class AppRouter extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Scene key="signin" component={SignIn} hideNavBar />
            </Router>

        );
    }
}