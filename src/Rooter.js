import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import ResetPassword from './components/ResetPassword';
import Account from './components/Account';
import Addresses from './components/Addresses';
import Cart from './components/Cart';
import OrderAddress from './components/OrderAddress';
import Custom from './components/Custom';

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
                <Scene key="main" initial>
                    <Scene key="account" component={Account} hideNavBar  />
                    <Scene key="addresses" component={Addresses} hideNavBar  />
                    <Scene key="cart" component={Cart} hideNavBar  />
                    <Scene key="orderAddress" component={OrderAddress} hideNavBar initial />
                    {/*<Scene key="custom" component={Custom} hideNavBar initial />*/}
                </Scene>
            </Router>

        );
    }
}