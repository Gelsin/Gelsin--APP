import React, { Component } from 'react';
import { Body, Right, ListItem, Icon, Text, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class OrderItem extends Component {
    render() {
        const styles = {
            text: {
                fontFamily: 'SourceSansPro-Regular',
            },
            price: {
                fontFamily: 'SourceSansPro-Semibold',
                color: '#eb7b59',
            }
        };

        return (
                    <ListItem style={{  margin: 0, paddingRight: 0 }} >
                        <Body  >
                        <Text style={styles.text}>12/02/2016 - Yasamal Ev</Text>
                        <Text   style={styles.price}>14.50 &#x20bc;</Text>
                        </Body>
                        <Right >
                            <Button transparent  onPress={()=>Actions.ordersDetail()}>
                                <Icon style={{color: '#eb7b59'}} name="ios-arrow-forward-outline"></Icon>
                            </Button>
                        </Right>
                    </ListItem>
        );
    }
}