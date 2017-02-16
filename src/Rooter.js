import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import ResetPassword from './components/ResetPassword';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Scene key="auth">
                    <Scene key="signIn" component={SignIn} hideNavBar/>
                    <Scene key="signUp" component={SignUp} hideNavBar />
                    <Scene key="verification" component={Verification} hideNavBar />
                    <Scene key="resetPassword" component={ResetPassword} hideNavBar />
                </Scene>
            </Router>

        );
    }
}