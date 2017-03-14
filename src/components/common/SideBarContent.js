import React, {Component} from 'react';
import {Text,View,Container} from 'react-native';
import {Button,Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class SideBarContent extends Component{
    constructor() {
        super();
    }
    render()
    {
        const css = {
            "Button": {color: '#E5DDCB',fontFamily: 'SourceSansPro-Regular'}
        }

        return(


            <View style={{top: 80}} >
                <Button transparent onPress={()=>Actions.ordersDetail()}><Text style={css.Button}>Order History</Text></Button>
                <Button transparent onPress={()=>Actions.account()}><Text style={css.Button}>Hesabım</Text></Button>
                <Button transparent onPress={()=>Actions.addresses()}><Text style={css.Button}>Adreslərim</Text></Button>
                <Button transparent><Text style={css.Button}>Haqqımızda</Text></Button>
                <Button transparent onPress={()=>Actions.category()}><Text style={css.Button}>Kateqoriyalar</Text></Button>
            </View>
        );
    }
}