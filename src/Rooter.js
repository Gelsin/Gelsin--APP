import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';


export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Scene key="auth">
                    <Scene key="signin" component={SignIn} hideNavBar/>
                    <Scene key="signup" component={SignUp} hideNavBar />
                    <Scene key="verification" component={Verification} hideNavBar  initial/>
                </Scene>
            </Router>

        );
    }
}