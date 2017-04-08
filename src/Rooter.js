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
import Categories from './components/Categories';
import Products from './components/Products';
import SubCategories from './components/SubCategories';
import OrdersMain from './components/OrdersMain';
import OrdersDetail from './components/OrdersDetail';
import NewAddress from './components/NewAddress';
import SelectBranchAddress from './components/SelectBranchAddress';
import SelectBranch from './components/SelectBranch';


export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>

                <Scene key="signIn" component={SignIn} hideNavBar/>
                <Scene key="signUp" component={SignUp} hideNavBar/>
                <Scene key="verification" component={Verification} hideNavBar/>
                <Scene key="resetPassword" component={ResetPassword} hideNavBar/>
                <Scene key="selectBranch" component={SelectBranch} hideNavBar initial/>
                <Scene key="selectBranchAddress" component={SelectBranchAddress} hideNavBar/>

                <Scene key="account" component={Account} hideNavBar/>
                <Scene key="newAddress" component={NewAddress} hideNavBar/>
                <Scene key="addresses" component={Addresses} hideNavBar/>
                <Scene key="cart" component={Cart} hideNavBar/>
                <Scene key="ordersMain" component={OrdersMain} hideNavBar/>
                <Scene key="ordersDetail" component={OrdersDetail} hideNavBar/>
                <Scene key="orderAddress" component={OrderAddress} hideNavBar/>
                <Scene key="category" component={Categories} hideNavBar/>
                <Scene key="products" component={Products} hideNavBar/>
                <Scene key="subCategories" component={SubCategories} hideNavBar/>

            </Router>

        );
    }
}